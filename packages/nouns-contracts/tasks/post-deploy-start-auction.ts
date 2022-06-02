import { Result } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';

task('post-deploy-start-auction', 'Starts an auction post-deployment')
  .addOptionalParam(
    'nounsAuctionHouse',
    'The `NounsHouseAuction` contract address',
    '0x2f7C0c0eFe1FF90Cc18a6Fce5183D6Ba142406D8',
    types.string,
  )
  .addOptionalParam(
    'nounsAuctionHouseProxy',
    'The `NounsHouseAuctionProxy` contract address',
    '0x1Dc2eCc7d23C12E91542eB09F5e99ef0EED715F5',
    types.string,
  )
  .setAction(async ({ nounsAuctionHouse, nounsAuctionHouseProxy }, { ethers }) => {
    console.log('step 1');

    const nounsAuctionHouseFactory = await ethers.getContractFactory('NounsAuctionHouse');
    const nounsAuctionHouseContract = nounsAuctionHouseFactory.attach(nounsAuctionHouse);
    
    console.log('step 2');
    const auctionHouse = nounsAuctionHouseContract.attach(
    	nounsAuctionHouseProxy,
  	);
  	
	/*
    console.log('step 3');
  	const duration1 = await auctionHouse.duration();
    console.log(`Duration1: ${duration1.toString()}.`);
	
    console.log('step 4, setting duration');
	await auctionHouse.setDuration(60 *60 * 1);
  	const duration2 = await auctionHouse.duration();
    console.log(`Duration2: ${duration2.toString()}.`);
    */
    
    console.log('Starting the auction process');
    await auctionHouse.unpause({
    	gasLimit: 1_000_000,
    });    
  });
