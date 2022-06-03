import { task, types } from 'hardhat/config';
import ImageData from '../files/image-data.json';
import { chunkArray } from '../utils';

task('populate-descriptor', 'Populates the descriptor with color palettes and Noun parts')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptor` contract address',
    '0x5095f67C855B37964D005B48f8bf52F7F7b57bD1',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptor',
    'The `NounsDescriptor` contract address',
    '0x67771f28db47a46ddE8077d36710BeaCe5C3Ca38',
    types.string,
  )
  .addOptionalParam(
    'nounsDescriptorDeployed',
    'The `NounsDescriptorDeployed` contract address',
    '0x0cfdb3ba1694c2bb2cfacb0339ad7b1ae5932b63',
    types.string,
  )
  .setAction(async ({ nftDescriptor, nounsDescriptor, nounsDescriptorDeployed }, { ethers }) => {
    const descriptorFactory = await ethers.getContractFactory('NounsDescriptor', {
      libraries: {
        NFTDescriptor: nftDescriptor,
      },
    });
    const descriptorContract = descriptorFactory.attach(nounsDescriptor);

    const { bgcolors, palette, images } = ImageData;
    const { bodies, accessories, heads, glasses } = images;
    
    console.log('setting deployed descriptor', nounsDescriptorDeployed);
    await descriptorContract.setDeployedDescriptor(nounsDescriptorDeployed);

    // Chunk head and accessory population due to high gas usage
    await descriptorContract.addManyBackgrounds(bgcolors);
    await descriptorContract.addManyColorsToPalette(0, palette);
    
    /*
    * Don't load any of the body, accessory, head or glasses assets
    await descriptorContract.addManyBodies(bodies.map(({ data }) => data));

    const accessoryChunk = chunkArray(accessories, 10);
    for (const chunk of accessoryChunk) {
      await descriptorContract.addManyAccessories(chunk.map(({ data }) => data));
    }

    const headChunk = chunkArray(heads, 10);
    for (const chunk of headChunk) {
      await descriptorContract.addManyHeads(chunk.map(({ data }) => data));
    }

    await descriptorContract.addManyGlasses(glasses.map(({ data }) => data));
    */

    console.log('MAIN Descriptor populated with palettes and parts.');

	//const version1 = await descriptorContract.getVersion();
	//console.log('main version', version1);

	/*
	const bodyCount = await descriptorContract.bodyCount();
	console.log('main body count', bodyCount);
	
	const bg1 = await descriptorContract.backgrounds(0);
	console.log('main bg 1', bg1);
	*/
  });
