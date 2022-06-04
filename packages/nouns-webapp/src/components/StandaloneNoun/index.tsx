import { ImageData as data, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { BigNumber as EthersBN } from 'ethers';
import { INounSeed, useNounSeed } from '../../wrappers/nounToken';
import Noun from '../Noun';
import { Link } from 'react-router-dom';
import classes from './StandaloneNoun.module.css';
import { useDispatch } from 'react-redux';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';
import nounClasses from '../Noun/Noun.module.css';

interface StandaloneNounProps {
  nounId: EthersBN;
}
interface StandaloneCircularNounProps {
  nounId: EthersBN;
}

interface StandaloneNounWithSeedProps {
  nounId: EthersBN;
  onLoadSeed?: (seed: INounSeed) => void;
  shouldLinkToProfile: boolean;
}

const parseTraitName = (partName: string): string =>
  capitalizeFirstLetter(partName.substring(partName.indexOf('-') + 1));

const capitalizeFirstLetter = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const getNoun = (nounId: string | EthersBN, seed: INounSeed) => {
  const id = nounId.toString();
  const name = `NounsTown ${id}`;
  const description = `NounsTown ${id} is a member of the NounsTown DAO`;
  const { parts, background } = getNounData(seed);
  
  const seedSum = (seed.body + seed.accessory + seed.head + seed.glasses);
  //const seedMod = seedSum % 20;  
  //console.log('Sum, Mod, Seed data', seedSum, seedMod, seed);
  //console.log('assets data', data);
  const bsvg = buildSVG(parts, data.palette, background, seedSum);
    
  const image = `data:image/svg+xml;base64,${btoa(bsvg)}`;

  //Now do the Nounies Name logic  
  let head = '';
  head = data.images.heads[seed.head].filename;
  head = parseTraitName(head);
  
  if (head.indexOf('-') !== -1) {
  	const subHead = parseTraitName(head);
	head = head.substring(0, head.indexOf('-')) + ' '  + subHead;
  }
    
  //Brave, Impish, Jolly, Quirky, Sassy, Timid
  let nature = 'Brave';
  const seedMod = seedSum % 20;
  if (seedMod > 7) {
  	if (seedMod === 8) { //up
  		nature = 'Sassy';
  	} else if (seedMod === 9) { //down
  		nature = 'Timid';
  	} else if (seedMod === 10 || seedMod === 11) { //cross
  		nature = 'Jolly';
  	} else if (seedMod === 12 || seedMod === 13) { //opposite
  		nature = 'Quirky';
	} else { //left
		nature = 'Impish';
	}
  }
  
  const nounieName = nature + ' ' + head;

  return {
    name,
    description,
    image,
    nounieName,
  };
};

const StandaloneNoun: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/block/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      <Noun imgPath={noun ? noun.image : ''} alt={noun ? noun.description : 'Noun'} />
    </Link>
  );
};

export const StandaloneNounCircular: React.FC<StandaloneCircularNounProps> = (
  props: StandaloneCircularNounProps,
) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/block/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      <Noun
        imgPath={noun ? noun.image : ''}
        alt={noun ? noun.description : 'Noun'}
        wrapperClassName={nounClasses.circularNounWrapper}
        className={nounClasses.circular}
      />
    </Link>
  );
};

export const StandaloneNounRoundedCorners: React.FC<StandaloneNounProps> = (
  props: StandaloneNounProps,
) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);

  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  return (
    <Link
      to={'/block/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      <Noun
        imgPath={noun ? noun.image : ''}
        alt={noun ? noun.description : 'Noun'}
        className={nounClasses.rounded}
      />
    </Link>
  );
};

export const StandaloneNounWithSeed: React.FC<StandaloneNounWithSeedProps> = (
  props: StandaloneNounWithSeedProps,
) => {
  const { nounId, onLoadSeed, shouldLinkToProfile } = props;
	
  const dispatch = useDispatch();
  const seed = useNounSeed(nounId);
  const seedIsInvalid = Object.values(seed || {}).every(v => v === 0);
  
  if (!seed || seedIsInvalid || !nounId || !onLoadSeed) return <Noun imgPath="" alt="Noun" />;

  onLoadSeed(seed);

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
  };

  const { image, description, nounieName } = getNoun(nounId, seed);

  const noun = <Noun imgPath={image} alt={description} className={classes.centerNoun} nounieName={nounieName} />;
  const nounWithLink = (
    <Link
      to={'/block/' + nounId.toString()}
      className={classes.clickableNoun}
      onClick={onClickHandler}
    >
      {noun}
    </Link>
  );
  return shouldLinkToProfile ? nounWithLink : noun;
};

export default StandaloneNoun;
