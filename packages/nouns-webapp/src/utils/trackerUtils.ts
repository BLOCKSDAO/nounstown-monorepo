import config from '../config';
import { Contract, providers } from 'ethers';
import { NounsTokenABI } from '@nouns/contracts';
import { request, gql } from 'graphql-request'
import { TokenMetadata, GraphAuction } from './trackerTypes';

/**
 * Get the SVG buffer data of a Noun
 * @param tokenAddress The ERC721 token address
 * @param tokenId The ERC721 token id
 * @returns The svg buffer of the Noun or undefined
 */
export async function getNounSVGBuffer(tokenAddress: string, tokenId: string): Promise<Buffer | undefined> {

  	const jsonRpcProvider = new providers.JsonRpcProvider(config.app.jsonRpcUri);

	if (tokenAddress && tokenId) {

		console.log('Fetching SVG for:', tokenAddress, tokenId);

		const nounsTokenContract = new Contract(
			tokenAddress,
			NounsTokenABI,
			jsonRpcProvider,
	  	);

	  	const dataURI = await nounsTokenContract.dataURI(tokenId);

	  	if (dataURI) {
			const data: TokenMetadata = JSON.parse(
			    Buffer.from(dataURI.substring(29), 'base64').toString('ascii'),
			);

			const svg = Buffer.from(data.image.substring(26), 'base64');
			return svg;
	  	}	
	}
}

/**
 * Query the subgraph and return the last auction id and bid created.
 * @param subgraphApiUri The token subgraph api uri
 * @returns The last auction id and bid from the subgraph.
 */
export async function getLastAuctionBids(subgraphApiUri: string): Promise<GraphAuction> {
  const res = await request<{ auctions: GraphAuction[] }>(
    subgraphApiUri,
    gql`
      query {
        auctions(orderBy: startTime, orderDirection: desc, first: 1) {
          id
          endTime
          bids(orderBy: blockNumber, orderDirection: desc, first: 1) {
            id
            amount
            bidder {
              id
            }
          }
        }
      }
    `,
  );
  return res.auctions[0];
}

/**
 * Query the subgraph and return the recent auction data to show stats.
 * @param subgraphApiUri The token subgraph api uri
 * @returns The most recent auctions and final bids from the subgraph.
 */
export async function getRecenttAuctionBids(subgraphApiUri: string): Promise<GraphAuction[]> {
  const res = await request<{ auctions: GraphAuction[] }>(
    subgraphApiUri,
    gql`
      query {
		  auctions(orderBy: startTime, orderDirection: desc, first: 16) {
		    id
		    bids(orderBy: blockNumber, orderDirection: desc, first: 1) {
		      amount
		    }
		  }
      }
    `,
  );
  return res.auctions;
}