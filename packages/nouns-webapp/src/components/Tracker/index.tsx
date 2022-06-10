import { useState, useEffect } from 'react';
import classes from './Tracker.module.css';
import { Row, Col, Button } from 'react-bootstrap';
import { getLastAuctionBids, getNounSVGBuffer } from '../../utils/trackerUtils';
import { GraphAuction } from '../../utils/trackerTypes';
import TrackerAuctionTimer from '../TrackerAuctionTimer';
import TrackerWinner from '../TrackerWinner';
import Noun from '../Noun';
import TrackerCurrentBid from '../TrackerCurrentBid';
import BigNumber from 'bignumber.js';

const Tracker: React.FC<{ name: string; uri: string; tokenAddress: string; subgraphApiUri: string }> = props => {
  const { name, uri, tokenAddress, subgraphApiUri } = props;

  const [auctionEnded, setAuctionEnded] = useState(false);
  const [auctionTimer, setAuctionTimer] = useState(false);
  
  const [auctionGraph, setAuctionGraph] = useState<GraphAuction | null>();
  const [auctionSVG, setAuctionSVG] = useState<Buffer | null>();
  const [auctionId, setAuctionId] = useState('');
  const [auctionBidderId, setAuctionBidderId] = useState('0x0000000000000000000000000000000000000000');
  const [auctionBidderAmount, setAuctionBidderAmount] = useState(new BigNumber(0));
  
  const [notificationToggle, setNotificationToggle] = useState(false);
    
  useEffect(() => {
    
    const loadGraph = async () => {
      setAuctionGraph(await getLastAuctionBids(subgraphApiUri));
    };
    loadGraph();

    return () => {
    };
  }, [subgraphApiUri, auctionTimer]);
    
  if (auctionGraph) {
  	const initLoad = (auctionId === '') ? true : false;  	
  
  	if (auctionId !== auctionGraph.id.toString()) {
  		console.log('New auction id', auctionId, auctionGraph.id.toString());
	    if (notificationToggle && !initLoad) {
	    	const message = 'New Auction Discovered: ' + name + ' ' + auctionGraph.id.toString();
	    	var auctionNotification = new Notification(message);
	    	console.log('New Auction Notification', auctionNotification);
	    }
  		
  		setAuctionId(auctionGraph.id.toString());
  		
  		//reset the bidder and amount on new auction
  		setAuctionBidderId('0x0000000000000000000000000000000000000000');
  		setAuctionBidderAmount(new BigNumber(0));
  	}
  	
  	if ((auctionGraph.bids.length > 0) && (auctionBidderId !== auctionGraph.bids[0].bidder.id)) {
  		console.log('New bidder id', auctionBidderId, auctionGraph.bids[0].bidder.id, auctionGraph.bids[0].amount.toString());
	    if (notificationToggle && !initLoad) {
	    	const message = 'New Bid Placed: ' + name;
	    	var bidderNotification = new Notification(message);
	    	console.log('New Bidder Notification', bidderNotification);
	    }
  		
  		setAuctionBidderId(auctionGraph.bids[0].bidder.id);
  		setAuctionBidderAmount(new BigNumber(auctionGraph.bids[0].amount.toString()));
  	}
  }


  useEffect(() => {
    const loadSVG = async () => {
      setAuctionSVG(await getNounSVGBuffer(tokenAddress, auctionId));
    };
    loadSVG();

    return () => {
    };
  }, [tokenAddress, auctionId]);
    
  /*
  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  
  const showBidModalHandler = () => {
    setShowBidHistoryModal(true);
  };
  const dismissBidModalHanlder = () => {
    setShowBidHistoryModal(false);
  };
  */

  // timer logic - check auction status every 30 seconds, until five minutes remain, then check status every second
  // change to check every 10 seconds on < 5 minutes
  useEffect(() => {
    if (!auctionGraph) return;

    const timeLeft = Number(auctionGraph.endTime) - Math.floor(Date.now() / 1000);
    
    if (auctionGraph && timeLeft <= 0) {
      setAuctionEnded(true);
    } else {
      setAuctionEnded(false);
    }
    
    if (true) { //always run
      const timer = setTimeout(
        () => {
          setAuctionTimer(!auctionTimer);
        },
        (timeLeft > 300 || timeLeft <= 0) ? 30000 : 10000,
      );

      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionTimer, auctionGraph]);
  
  if (!auctionGraph) return null;
  
  const handleNotificationChange = () => {
  	//enable notifications
  	if (notificationToggle === false) {
	    if (!("Notification" in window)) {
	      console.log("This browser does not support desktop notification");
	    } else {
		    Notification.requestPermission().then(function(result) {
			  console.log(result);
			});
		}
  	}

	setNotificationToggle(!notificationToggle);
  };  	


    return (

          <>

	      <Row className={classes.activityRow}>
	        <Col lg={2} className={classes.currentBidCol}>
				<h3>{name} {auctionId}</h3>
	        	<Noun 
	        		imgPath={(auctionSVG) ? `data:image/svg+xml;base64,${btoa(auctionSVG.toString())}` : ''} 
	        		alt={name} 
	        		className={classes.nounImg}
	        		wrapperClassName={classes.nounWrapper}
	        	/>
	        </Col>
	        <Col lg={2} className={classes.currentBidCol}>
	          <TrackerCurrentBid
	            currentBid={auctionBidderAmount}
	            auctionEnded={auctionEnded}
	          />
	          <div className={classes.verifyButtonWrapper} style={{ textAlign: 'center' }}>
	            <br />
	          	<a href={uri} target="_blank" rel="noreferrer">
	            	<Button className={classes.whiteInfo}>View</Button>
	            </a>
	            <br />&nbsp;
	            <br />
	            <span style={{ fontStyle: 'bold', fontSize: 'medium' }}>
	            Notifications&nbsp;
	            <input type="checkbox" 
				   name={'notifications'} 
				   defaultChecked={notificationToggle} 
				   value={'notifications1'}
				   onChange={ handleNotificationChange } />
				</span>
	            <br />&nbsp;
	            <br />
	          </div>
	
	        </Col>
	        <Col lg={4} className={classes.currentBidderCol}>
	        	<TrackerWinner winner={auctionBidderId} auctionEnded={auctionEnded} />
	        </Col>
	        <Col lg={4} className={classes.auctionTimerCol}>
			    <TrackerAuctionTimer auctionGraph={auctionGraph} auctionEnded={auctionEnded} />
	        </Col>        
	      </Row>

          </ >

    );
};

export default Tracker;
