import { BigNumber } from '@ethersproject/bignumber';
import { BigNumber as EthersBN } from 'ethers';

export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
}

export interface GraphAuction {
  id: string;
  endTime: number;
  bids: GraphBid[];
  value?: BigNumber;
}

export interface GraphBid {
  id: string;
  amount: BigNumber;
  bidder: GraphBidder;
}

export interface GraphBidder {
  id: string;
}

export interface ContractAuction {
  amount: EthersBN;
  bidder: string;
  endTime: EthersBN;
  startTime: EthersBN;
  nounId: EthersBN;
  settled: boolean;
  endBlock?: EthersBN;
}

