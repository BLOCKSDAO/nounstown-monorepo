export const trackerConfig = [
  {
    name: 'Noun',
    uri: 'https://nouns.wtf/',
    tokenAddress: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    auctionHouseProxyAddress: '0x830bd73e4184cef73443c15111a1df14e495c706',    
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
    description: 'Nouns',
    handle: 'nouns',
    backgroundColor: '#d5d7e1'
  },  
  {
    name: 'Lil Noun',
    uri: 'https://lilnouns.wtf/',
    tokenAddress: '0x4b10701Bfd7BFEdc47d50562b76b436fbB5BdB3B',
    auctionHouseProxyAddress: '0x55e0f7a3bb39a28bd7bcc458e04b3cf00ad3219e',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/lilnounsdao/lil-nouns-subgraph',
    description: 'Lil Nouns',
    handle: 'lilnouns',
    backgroundColor: '#dad1cf'
  },
  {
    name: 'Lost Noun',
    uri: 'https://lostnouns.wtf/',
    tokenAddress: '0x2605afbb22c59296c16ef5e477110357f760b20f',
    auctionHouseProxyAddress: '0x3a91eaacd2d5d5b7e102e17ca8bd467b79139ed5',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/12bnoun/lost-nouns-rinkeby',
    description: 'Lost Nouns',
    handle: 'lostnouns',
    backgroundColor: '#eed8ab'
  },
  {
    name: 'NounsTown',
    uri: 'https://nounstown.wtf/',
    tokenAddress: '0xb632fD44053B09bddDaF92dE2C212bB12Ce8DbDF',
    auctionHouseProxyAddress: '0xA2f1c683C8E2dEdFC02929f4e6f5C01D078D6274',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/blocksdao/nounstown',
    description: 'NounsTown',
    handle: 'nounstown',
    backgroundColor: ''
  },  
  {
    name: 'Gnar',
    uri: 'https://gnars.wtf/',
    tokenAddress: '0x494715b2a3c75dadd24929835b658a1c19bd4552',
    tokenSVGFunction: 'tokenURI',
    auctionHouseProxyAddress: '0x494715b2a3c75dadd24929835b658a1c19bd4552',
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/cryptosnowmickey/gnars-subgraph',
    subgraphType: 'flat',
    timerType: 'blocks',
    bidsDisabled: true,
    description: 'Gnars',
    handle: 'Gnars',
    backgroundColor: '#eed8ab'
  },
  {
    name: 'Wizard',
    uri: 'https://wizardsdao.com/auction/1',
    tokenAddress: '0xc23b12eba3af92dc3ec94744c0c260cad0eed0e5',
    auctionHouseProxyAddress: '0x418cbb82f7472b321c2c5ccf76b8d9b6df47daba',
    auctionHouseFixedParam: 1,
    bidsDisabled: true,
    description: 'Wizard DAO',
    handle: 'WizardsDAO',
    backgroundColor: '#eed8ab'
  },
  {
    name: 'Wizard',
    uri: 'https://wizardsdao.com/auction/2',
    tokenAddress: '0xc23b12eba3af92dc3ec94744c0c260cad0eed0e5',
    auctionHouseProxyAddress: '0x418cbb82f7472b321c2c5ccf76b8d9b6df47daba',
    auctionHouseFixedParam: 2,
    bidsDisabled: true,
    description: 'Wizard DAO',
    handle: 'WizardsDAO',
    backgroundColor: '#eed8ab'
  },
  {
    name: 'Wizard',
    uri: 'https://wizardsdao.com/auction/3',
    tokenAddress: '0xc23b12eba3af92dc3ec94744c0c260cad0eed0e5',
    auctionHouseProxyAddress: '0x418cbb82f7472b321c2c5ccf76b8d9b6df47daba',
    auctionHouseFixedParam: 3,
    bidsDisabled: true,
    description: 'Wizard DAO',
    handle: 'WizardsDAO',
    backgroundColor: '#eed8ab'
  },  
];

export default trackerConfig;