import { useEffect } from 'react';
import { useEthers } from '@usedapp/core';
import { useAppDispatch, useAppSelector } from './hooks';
import { setActiveAccount } from './state/slices/account';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { setAlertModal } from './state/slices/application';
import classes from './App.module.css';
import '../src/css/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlertModal from './components/Modal';
import NavBar from './components/NavBar';
import NetworkAlert from './components/NetworkAlert';
import Footer from './components/Footer';
import AuctionPage from './pages/Auction';
import TrackerPage from './pages/Tracker';
import TrackerTesterPage from './pages/TrackerTester';
import GovernancePage from './pages/Governance';
import CreateProposalPage from './pages/CreateProposal';
import VotePage from './pages/Vote';
import NoundersPage from './pages/Nounders';
import NouniesPage from './pages/Nounies';
import NotFoundPage from './pages/NotFound';
import Playground from './pages/Playground';
import { CHAIN_ID } from './config';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

function App() {
  const { account, chainId } = useEthers();
  const dispatch = useAppDispatch();
  dayjs.extend(relativeTime);

  useEffect(() => {
    // Local account array updated
    dispatch(setActiveAccount(account));
  }, [account, dispatch]);

  const alertModal = useAppSelector(state => state.application.alertModal);

  return (
    <div className={`${classes.wrapper}`}>
      {Number(CHAIN_ID) !== chainId && <NetworkAlert />}
      {alertModal.show && (
        <AlertModal
          title={alertModal.title}
          content={<p>{alertModal.message}</p>}
          onDismiss={() => dispatch(setAlertModal({ ...alertModal, show: false }))}
        />
      )}
      <BrowserRouter>
          <NavBar />
          <Switch>
            <Route exact path="/" component={AuctionPage} />
            <Redirect from="/auction/:id" to="/block/:id" />
            <Redirect from="/noun/:id" to="/block/:id" />
            <Redirect from="/nouncil" to="/nounders" />
            <Route
              exact
              path="/block/:id"
              render={props => <AuctionPage initialAuctionId={Number(props.match.params.id)} />}
            />
            <Route exact path="/x-tracker" component={TrackerPage} />
            <Route exact path="/tester" component={TrackerTesterPage} />
            <Route exact path="/nounders" component={NoundersPage} />
            <Route exact path="/x-nounies" component={NouniesPage} />
            <Route exact path="/create-proposal" component={CreateProposalPage} />
            <Route exact path="/vote" component={GovernancePage} />
            <Route exact path="/vote/:id" component={VotePage} />
            <Route exact path="/playground" component={Playground} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
