import { BigNumber } from '@ethersproject/bignumber';

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
}

export interface GraphAuction {
  id: string;
  endTime: number;
  bids: GraphBid[];
}

export interface GraphBid {
  id: string;
  amount: BigNumber;
  bidder: GraphBidder;
}

export interface GraphBidder {
  id: string;
}