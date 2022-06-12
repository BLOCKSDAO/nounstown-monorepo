import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
/*import { Auction } from '../../wrappers/nounsAuction';*/
import { ContractAuction } from '../../utils/trackerTypes';
import classes from './TrackerAuctionTimerBlock.module.css';
import { Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';
import { Trans } from '@lingui/macro';
import BigNumber from 'bignumber.js';

dayjs.extend(duration);

const TrackerAuctionTimerBlock: React.FC<{
  auctionContract: ContractAuction;
  auctionEnded: boolean;
  blocksLeft: BigNumber;
}> = props => {
  const { auctionContract, auctionEnded, blocksLeft } = props;

  /*
  const [auctionTimer, setAuctionTimer] = useState(0);
  const [timerToggle, setTimerToggle] = useState(true);

  const auctionTimerRef = useRef(auctionTimer); // to access within setTimeout
  auctionTimerRef.current = auctionTimer;

  const timerDuration = dayjs.duration(auctionTimerRef.current, 's');
  const endTimeUnix = Math.floor(Date.now() / 1000) + auctionTimerRef.current;
  */

  /*
  // timer logic
  useEffect(() => {
    const timeLeft = (auctionContract && Number(auctionContract.endTime)) - dayjs().unix();

    setAuctionTimer(auctionContract && timeLeft);

    if (auctionContract && timeLeft <= 0) {
      setAuctionTimer(0);
    } else {
      const timer = setTimeout(() => {
        setAuctionTimer(auctionTimerRef.current - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auctionContract, auctionTimer]);
  */

  const auctionContentLong = auctionEnded ? (
    <Trans>Auction ended</Trans>
  ) : (
    <Trans>Auction ends in</Trans>
  );
  const auctionContentShort = auctionEnded ? (
    <Trans>Auction ended</Trans>
  ) : (
    <Trans>Time left</Trans>
  );

  //const flooredMinutes = Math.floor(timerDuration.minutes());
  //const flooredSeconds = Math.floor(timerDuration.seconds());
  const isCool = useAppSelector(state => state.application.isCoolBackground); //not really used right now...

  if (!auctionContract) return null;
  
  return (
    <Row
      className={clsx(classes.wrapper, classes.section)}
    >
      <Col xs={true ? 4 : 6} lg={12} className={classes.leftCol}>
        <h4
          style={{
            color: isCool ? '#a3efd0' : '#a3efd0',
          }}
        >
          {true && (
            window.innerWidth < 992 ? (
              auctionContentShort
            ) : (
              auctionContentLong
            )
          ) }
        </h4>
      </Col>
      <Col xs="auto" lg={12}>
        {true && (
          <h2
            className={clsx(classes.timerWrapper, classes.timeLeft)}
            style={{
              color: isCool ? 'white' : 'white',
            }}
          >
            <div className={classes.timerSection}>

		        {(auctionEnded || blocksLeft.lte(new BigNumber(0))) ? (	        
				    <span>--- Blocks</span>
	      		) : (	        
	          		<span>{blocksLeft.toString()} Blocks</span>
	      		)}

            </div>
          </h2>
        ) }
      </Col>
    </Row>
  );
};

export default TrackerAuctionTimerBlock;
