import { useState, useEffect } from 'react';
import classes from './Tracker.module.css';
import { Row, Col } from 'react-bootstrap';
import { getNounSVGBuffer, getRecenttAuctionBids, getAuction, getBlockNumber, getAuctionMinBidIncPercentage } from '../../utils/trackerUtils';
import { GraphAuction, ContractAuction } from '../../utils/trackerTypes';
import TrackerAuctionTimer from '../TrackerAuctionTimer';
import TrackerAuctionTimerBlock from '../TrackerAuctionTimerBlock';
import TrackerWinner from '../TrackerWinner';
import TrackerBid from '../TrackerBid';
import Noun from '../Noun';
import TrackerCurrentBid from '../TrackerCurrentBid';
import TruncatedAmount from '../TruncatedAmount';
import BigNumber from 'bignumber.js';
//import { Auction, AuctionHouseContractFunction } from '../../wrappers/trackerAuction';
//import { useAuction, useAuctionMinBidIncPercentage } from '../../wrappers/trackerAuction';

const Tracker: React.FC<{ 
	name: string; 
	uri: string; 
	tokenAddress: string; 
	auctionHouseProxyAddress: string; 
	subgraphApiUri?: string; 
	tokenSVGFunction?: string;
	subgraphType?: string;
	timerType?: string;
	auctionHouseFixedParam?: number;
	bidsDisabled?: boolean;
	pingInterval?: number;
	}> = props => {
  const { 
  	name, uri, tokenAddress, auctionHouseProxyAddress, subgraphApiUri, 
  	tokenSVGFunction, subgraphType, timerType, auctionHouseFixedParam, bidsDisabled, pingInterval
  } = props;

  const [auctionEnded, setAuctionEnded] = useState(false);
  const [auctionTimer, setAuctionTimer] = useState(false);
  const [blockNumber, setBlockNumber] = useState<number | null>();
  const [blocksLeft, setBlocksLeft] = useState(new BigNumber(0));
  const [auctioMinBidIncPercentage, setAuctioMinBidIncPercentage] = useState<BigNumber | null>();
  
  
  //const [auctionGraph, setAuctionGraph] = useState<GraphAuction | null>();
  const [auctionSVG, setAuctionSVG] = useState<Buffer | null>();
  const [auctionStats, setAuctionStats] = useState<GraphAuction[] | null>();

  const [auctionContract, setAuctionContract] = useState<ContractAuction | null>();

  const [auctionId, setAuctionId] = useState('');
  const [auctionBidderId, setAuctionBidderId] = useState('0x0000000000000000000000000000000000000000');
  const [auctionBidderAmount, setAuctionBidderAmount] = useState(new BigNumber(0));
  
  const [notificationToggle, setNotificationToggle] = useState(false);    
    
  /*
  useEffect(() => {
    
    const loadGraph = async () => {
      setAuctionGraph(await getLastAuctionBids(subgraphApiUri));
    };
    loadGraph();

    return () => {
    };
  }, [subgraphApiUri, auctionTimer]);
  */

  useEffect(() => {
    
    const loadContract = async () => {
		setAuctionContract(await getAuction(auctionHouseProxyAddress, auctionHouseFixedParam));	    	
    };
    loadContract();
    

    return () => {
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionHouseProxyAddress, auctionTimer]);

  //get the Auction Min Bid Inc Percentage, once per Tracker item
  useEffect(() => {
    
    const loadMinBid = async () => {
		setAuctioMinBidIncPercentage(await getAuctionMinBidIncPercentage(auctionHouseProxyAddress));	    	
    };
    loadMinBid();
    

    return () => {
    };
  }, [auctionHouseProxyAddress]);

      
  if (auctionContract) {
  	const initLoad = (auctionId === '') ? true : false;  	
  
  	if (auctionId !== auctionContract.nounId.toString()) {
  		console.log('New auction id', auctionId, auctionContract.nounId.toString());
	    if (notificationToggle && !initLoad) {
	    	const message = 'New Auction Discovered: ' + name + ' ' + auctionContract.nounId.toString();
	    	var auctionNotification = new Notification(message);
	    	console.log('New Auction Notification', auctionNotification);
	    }
  		
  		setAuctionId(auctionContract.nounId.toString());
  		
  		//reset the bidder and amount on new auction
  		setAuctionBidderId('0x0000000000000000000000000000000000000000');
  		setAuctionBidderAmount(new BigNumber(0));
  	}
  	
  	if (auctionContract.bidder && (auctionBidderId !== auctionContract.bidder)) {
  		console.log('New bidder id', auctionBidderId, auctionContract.bidder, auctionContract.amount.toString());
	    if (notificationToggle && !initLoad) {
	    	const message = 'New Bid Placed: ' + name + ' ' + auctionContract.nounId.toString();
	    	var bidderNotification = new Notification(message);
	    	console.log('New Bidder Notification', bidderNotification);
	    }
  		
  		setAuctionBidderId(auctionContract.bidder);
  		setAuctionBidderAmount(new BigNumber(auctionContract.amount.toString()));
  	}
  }

  //load up the Noun item image, only when there's a new auctionId
  useEffect(() => {
    const loadSVG = async () => {
      setAuctionSVG(await getNounSVGBuffer(tokenAddress, auctionId, tokenSVGFunction));
    };
    loadSVG();

    return () => {
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenAddress, auctionId]);

  //load up the Noun item stat, only when there's a new auctionId
  useEffect(() => {
    const loadStats = async () => {
      if (typeof subgraphApiUri != "undefined") {
	      setAuctionStats(await getRecenttAuctionBids(subgraphApiUri, subgraphType));
	  }
    };    
	loadStats();

    return () => {
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subgraphApiUri, auctionId]);
    
  /*
  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  
  const showBidModalHandler = () => {
    setShowBidHistoryModal(true);
  };
  const dismissBidModalHanlder = () => {
    setShowBidHistoryModal(false);
  };
  */

  const timerInterval = (pingInterval !== undefined) ? pingInterval : 30000; //default to 30 seconds
  // timer logic - check auction status every 30 seconds, until five minutes remain, then check status every second
  // change to check every 10 seconds on < 5 minutes
  useEffect(() => {
    if (!auctionContract) return;
	
	if (timerType === 'blocks') {
		//blocks based end time

	    const loadBlockNumber = async () => {
	      setBlockNumber(await getBlockNumber());
	    };
	    loadBlockNumber();

	      //check every 30 seconds
	      const timer = setTimeout(
	        () => {
	          setAuctionTimer(!auctionTimer);
	        },
	        timerInterval,
	      );
	
	      return () => {
	        clearTimeout(timer);
	      };
	
	} else {
		//time based end time

	    const timeLeft = Number(auctionContract.endTime) - Math.floor(Date.now() / 1000);
		    
	    if (auctionContract && timeLeft <= 0) {
	      setAuctionEnded(true);
	    } else {
	      setAuctionEnded(false);
	    }
	    
	    if (true) { //always run
	      const timer = setTimeout(
	        () => {
	          setAuctionTimer(!auctionTimer);
	        },
	        (timeLeft > 300 || timeLeft <= 0) ? timerInterval : 10000,
	      );
	
	      return () => {
	        clearTimeout(timer);
	      };
	    }	
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionTimer, auctionContract]);


  //check block number against blocks left
  useEffect(() => {
	if (!auctionContract) return;
	
    if (blockNumber) {
    	const endBlock = auctionContract.endTime;
    	
    	const tempBlockNumber = new BigNumber(blockNumber.toString());
    	const tempEndBlock = new BigNumber(endBlock.toString());
    	
	    if (tempEndBlock.lte(tempBlockNumber)) {
	      setAuctionEnded(true);
	    } else {
	      setAuctionEnded(false);
	    }
	    
	    setBlocksLeft(tempEndBlock.minus(tempBlockNumber));
    }
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);
  
  if (!auctionContract) return null;
  
  var statsSum = new BigNumber(0);
  var statsAvg = new BigNumber(0);
  
  if (auctionStats) {
    //skip the first one, will be current one...
  	for(var i=1; i < auctionStats.length; i++){
  		const auctionItem = auctionStats[i];
  		if (subgraphType === 'flat') {
  			if (typeof auctionItem.value != 'undefined') {
	  			statsSum = statsSum.plus(new BigNumber(auctionItem.value.toString()));
	  		}
  		} else {
	  		if (auctionItem.bids.length > 0) {
	  			statsSum = statsSum.plus(new BigNumber(auctionItem.bids[0].amount.toString()));
	  		}
	  	}
  	}
  	if (statsSum) {
  		statsAvg = statsSum.dividedBy(new BigNumber(auctionStats.length));
  		statsAvg = new BigNumber(statsAvg.toFixed(0));
  	}
  }
  
  const bidsEnabled = (bidsDisabled !== undefined && bidsDisabled) ? false : true;
  
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

				<a href={uri} target="_blank" rel="noreferrer">
		        	<Noun 
		        		imgPath={(auctionSVG) ? `data:image/svg+xml;base64,${btoa(auctionSVG.toString())}` : ''} 
		        		alt={name} 
		        		className={classes.nounImg}
		        		wrapperClassName={classes.nounWrapper}
		        	/>
		        </a>
	        </Col>
	        <Col lg={2} className={classes.currentBidCol}>
	          <TrackerCurrentBid
	            currentBid={auctionBidderAmount}
	            auctionEnded={auctionEnded}
	          />
		      <br />
	          
	          {auctionStats && (
		          <div className={classes.statsWrapper} style={{ color: 'white', fontSize: 'medium' }}>
			        <TruncatedAmount amount={statsAvg && statsAvg} /> avg&nbsp;
			      </div>
		     )}

		      <br />
	          	
	        </Col>
	        <Col lg={5} className={classes.currentBidderCol}>
	        	<TrackerWinner winner={auctionBidderId} auctionEnded={auctionEnded} />

		        {bidsEnabled ? (
		          <>
		            <Row className={classes.activityRow}>
		              <Col lg={1}>
		              	&nbsp;
		              </Col>
		              <Col lg={10}>
		                {(auctioMinBidIncPercentage && auctioMinBidIncPercentage !== undefined) && (
		                	<TrackerBid auctionContract={auctionContract} auctionHouseProxyAddress={auctionHouseProxyAddress} auctionEnded={auctionEnded} auctioMinBidIncPercentage={auctioMinBidIncPercentage} />
		                )}
		              </Col>
		              <Col lg={1}>
		              	&nbsp;
		              </Col>
		            </Row>
		          </>
		        ) : (
		          <>
		            <Row className={classes.activityRow}>
		              <Col lg={1}>
		              	&nbsp;
		              </Col>
		              <Col lg={10}>
		              	<div className={classes.notificationsWrapper} style={{ marginTop: '10px'}}>
				        {auctionEnded ? (	        
						    <span style={{ color: 'white', fontSize: 'medium' }}>Settling from the tracker not available</span>
			      		) : (	        
						    <span style={{ color: 'white', fontSize: 'medium' }}>Bidding from the tracker not available</span>
			      		)}
			      		</div>
		              </Col>
		              <Col lg={1}>
		              	&nbsp;
		              </Col>		              
		            </Row>
		          </>
		        )}

	        </Col>

	        <Col lg={3} className={classes.auctionTimerCol}>
	        
	        {timerType === 'blocks' ? (	        
			    <TrackerAuctionTimerBlock auctionContract={auctionContract} auctionEnded={auctionEnded} blocksLeft={blocksLeft} />
      		) : (	        
			    <TrackerAuctionTimer auctionContract={auctionContract} auctionEnded={auctionEnded} />
      		)}

	          <div className={classes.notificationsWrapper} style={{ marginTop: '5px'}}>
	          	<br />
	            <span style={{ color: 'white', fontSize: 'medium' }}>
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
	      </Row>

          </ >

    );
};

export default Tracker;
