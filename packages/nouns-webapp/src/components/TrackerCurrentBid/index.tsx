import BigNumber from 'bignumber.js';
import classes from './TrackerCurrentBid.module.css';
import TruncatedAmount from '../TruncatedAmount';
import { Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';
import { Trans } from '@lingui/macro';

/**
 * Passible to CurrentBid as `currentBid` prop to indicate that
 * the bid amount is not applicable to this auction. (Nounder Noun)
 */
export const BID_N_A = 'n/a';

/**
 * Special Bid type for not applicable auctions (Nounder Nouns)
 */
type BidNa = typeof BID_N_A;

const TrackerCurrentBid: React.FC<{ currentBid: BigNumber | BidNa; auctionEnded: boolean }> = props => {
  const { currentBid, auctionEnded } = props;
  const isCool = useAppSelector(state => state.application.isCoolBackground);
  const titleContent = auctionEnded ? <Trans>Winning bid</Trans> : <Trans>Current bid</Trans>;

  return (
    <Row className={clsx(classes.wrapper, classes.container, classes.section)}>
      <Col xs={5} lg={12} className={classes.leftCol}>
        <h4
          style={{
            color: isCool ? '#a3efd0' : '#a3efd0',
          }}
        >
          {titleContent}
        </h4>
      </Col>
      <Col xs="auto" lg={12}>
        <h2
          className={classes.currentBid}
          style={{ color: isCool ? 'white' : 'white' }}
        >
          {currentBid === BID_N_A ? BID_N_A : <TruncatedAmount amount={currentBid && currentBid} />}
        </h2>
      </Col>
    </Row>
  );
};

export default TrackerCurrentBid;