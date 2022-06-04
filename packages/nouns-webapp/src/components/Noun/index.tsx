import classes from './Noun.module.css';
import React from 'react';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import Image from 'react-bootstrap/Image';

export const LoadingNoun = () => {
  return (
    <div className={classes.imgWrapper}>
      <Image className={classes.img} src={loadingNoun} alt={'loading noun'} fluid />
    </div>
  );
};

const Noun: React.FC<{
  imgPath: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  nounieName?: string;
}> = props => {
  const { imgPath, alt, className, wrapperClassName, nounieName } = props;
  return (
    <div className={`${classes.imgWrapper} ${wrapperClassName}`}>
      <Image
        className={`${classes.img} ${className}`}
        src={imgPath ? imgPath : loadingNoun}
        alt={alt}
        fluid
      />
      {nounieName}
    </div>
  );
};

export default Noun;
