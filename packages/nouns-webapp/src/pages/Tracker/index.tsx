import React from 'react';
import classes from './TrackerPage.module.css';
import Section from '../../layout/Section';
import { Container } from 'react-bootstrap';
import { setStateBackgroundColor } from '../../state/slices/application';
import { useAppDispatch } from '../../hooks';

import Tracker from '../../components/Tracker';
import trackerConfig from '../../utils/trackerConfig';

const TrackerPage = () => {
  const dispatch = useAppDispatch();
  dispatch(setStateBackgroundColor(''));
  
  return (
    <>
    
    <Section fullWidth={true} className={classes.noundersPage}>
    <div className={classes.wrapper}>

      <Container fluid="xl" style={{ borderBottomColor: '#a3efd0', borderBottomWidth: 'thin', borderBottomStyle: 'solid', marginBottom: '20px' }}>

	    <h1 style={{ marginBottom: '2rem' }}>
	      Nouns Auction Tracker
	    </h1>
	    Track all your favorites Nouns auctions on one page. <strong>Note: The Auction Tracker is in BETA.</strong>
	    <br />
	    <span style={{ fontStyle: 'italic', fontSize: 'small' }}>Data refreshes every 30 seconds -- if &lt; 5 minutes remaining, data refreshes every 10 seconds. Stats are from last 25 auctions.</span>
	    <br />
	    <br />

      </Container>
    </div>

      {trackerConfig.slice().map(tracker => (

	    <div className={classes.wrapper}>
	      <Container fluid="xl" style={{ borderBottomColor: '#a3efd0', borderBottomWidth: 'thin', borderBottomStyle: 'solid', marginBottom: '20px' }}>
	
	          <Tracker 
	          	name={tracker.name} 
	          	uri={tracker.uri} 
	          	tokenAddress={tracker.tokenAddress} 
	          	auctionHouseProxyAddress={tracker.auctionHouseProxyAddress} 
	          	subgraphApiUri={tracker.subgraphApiUri} 
	          	
	          	tokenSVGFunction={tracker.tokenSVGFunction}
	          	subgraphType={tracker.subgraphType}
	          	timerType={tracker.timerType}
	          />
	
	      </Container>
	    </div>
	
      ))}

    </Section>

    </>
  );  
};

export default TrackerPage;
