import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
/*import { Auction } from '../../wrappers/nounsAuction';*/
import { GraphAuction } from '../../utils/trackerTypes';
import classes from './TrackerAuctionTimer.module.css';
import { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import clsx from 'clsx';
import { Trans } from '@lingui/macro';
import { i18n } from '@lingui/core';

dayjs.extend(duration);

const TrackerAuctionTimer: React.FC<{
  auctionGraph: GraphAuction;
  auctionEnded: boolean;
}> = props => {
  const { auctionGraph, auctionEnded } = props;

  const [auctionTimer, setAuctionTimer] = useState(0);
  const [timerToggle, setTimerToggle] = useState(true);

  const auctionTimerRef = useRef(auctionTimer); // to access within setTimeout
  auctionTimerRef.current = auctionTimer;

  const timerDuration = dayjs.duration(auctionTimerRef.current, 's');
  const endTimeUnix = Math.floor(Date.now() / 1000) + auctionTimerRef.current;

  // timer logic
  useEffect(() => {
    const timeLeft = (auctionGraph && Number(auctionGraph.endTime)) - dayjs().unix();

    setAuctionTimer(auctionGraph && timeLeft);

    if (auctionGraph && timeLeft <= 0) {
      setAuctionTimer(0);
    } else {
      const timer = setTimeout(() => {
        setAuctionTimer(auctionTimerRef.current - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auctionGraph, auctionTimer]);

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

  const flooredMinutes = Math.floor(timerDuration.minutes());
  const flooredSeconds = Math.floor(timerDuration.seconds());
  const isCool = useAppSelector(state => state.application.isCoolBackground); //not really used right now...

  if (!auctionGraph) return null;

  return (
    <Row
      className={clsx(classes.wrapper, classes.section)}
      onClick={() => setTimerToggle(!timerToggle)}
    >
      <Col xs={timerToggle ? 4 : 6} lg={12} className={classes.leftCol}>
        <h4
          style={{
            color: isCool ? '#a3efd0' : '#a3efd0',
          }}
        >
          {timerToggle ? (
            window.innerWidth < 992 ? (
              auctionContentShort
            ) : (
              auctionContentLong
            )
          ) : (
            <>
              <Trans>Ends on</Trans> {i18n.date(new Date(endTimeUnix * 1000), { month: 'short' })}{' '}
              {i18n.date(new Date(endTimeUnix * 1000), { day: 'numeric' })} <Trans>at</Trans>
            </>
          )}
        </h4>
      </Col>
      <Col xs="auto" lg={12}>
        {timerToggle ? (
          <h2
            className={clsx(classes.timerWrapper, classes.timeLeft)}
            style={{
              color: isCool ? 'white' : 'white',
            }}
          >
            <div className={classes.timerSection}>
              <span>
                {`${Math.floor(timerDuration.hours())}`}
                <span className={classes.small}>
                  <Trans>h</Trans>
                </span>
              </span>
            </div>
            <div className={classes.timerSection}>
              <span>
                {`${flooredMinutes}`}
                <span className={classes.small}>
                  <Trans>m</Trans>
                </span>
              </span>
            </div>
            <div className={classes.timerSectionFinal}>
              <span>
                {`${flooredSeconds}`}
                <span className={classes.small}>
                  <Trans>s</Trans>
                </span>
              </span>
            </div>
          </h2>
        ) : (
          <h2
            className={classes.timerWrapper}
            style={{
              color: isCool ? 'white' : 'white',
            }}
          >
            <div className={clsx(classes.timerSection, classes.clockSection)}>
              <span>{i18n.date(new Date(endTimeUnix * 1000), { timeStyle: 'medium' })}</span>
            </div>
          </h2>
        )}
      </Col>
    </Row>
  );
};

export default TrackerAuctionTimer;