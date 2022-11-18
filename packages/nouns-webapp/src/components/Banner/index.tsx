import classes from './Banner.module.css';
import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
//import calendar_noun from '../../assets/calendar_noun.png';
import nounstown from '../../assets/nounstown-wtf-image.png';
import Noun from '../Noun';
import { Trans } from '@lingui/macro';

const Banner = () => {
  return (
    <Section fullWidth={false} className={classes.bannerSection}>
      <Col lg={6}>
        <div className={classes.wrapper}>
          <h1>
          	<a href="https://twitter.com/NounsTown/status/1593647648795287552?s=20&t=8FAOR9GxnW14_Q1L0aDWiQ" style={{textDecoration: 'none', color: 'inherit'}}>
            <Trans>NOUNSTOWN</Trans>
            <br />
            <Trans>IS NOW</Trans>
            <br />
            <Trans>ON ROVE!</Trans>
            </a>
          </h1>
        </div>
      </Col>
      <Col lg={6}>
        <div style={{ padding: '2rem' }}>
          <Noun imgPath={nounstown} alt="nounstown" />
        </div>
      </Col>
    </Section>
  );
};

export default Banner;
