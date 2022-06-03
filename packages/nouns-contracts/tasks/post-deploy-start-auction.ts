import { Result } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';

task('post-deploy-start-auction', 'Starts an auction post-deployment')
  .addOptionalParam(
    'nounsAuctionHouse',
    'The `NounsHouseAuction` contract address',
    '0x64EE5bbe90B6B85a7f823Da11FDB502d2A14E4f7',
    types.string,
  )
  .addOptionalParam(
    'nounsAuctionHouseProxy',
    'The `NounsHouseAuctionProxy` contract address',
    '0xA2f1c683C8E2dEdFC02929f4e6f5C01D078D6274',
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
