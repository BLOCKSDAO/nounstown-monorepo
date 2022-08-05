import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';
import { Trans } from '@lingui/macro';

const Documentation = () => {
  const nounsLink = (
    <Link
      text={<Trans>Nouns</Trans>}
      url="https://nouns.wtf"
      leavesPage={true}
    />
  );
  const playgroundLink = (
    <Link text={<Trans>Playground</Trans>} url="/playground" leavesPage={false} />
  );
  const publicDomainLink = (
    <Link
      text={<Trans>public domain</Trans>}
      url="https://creativecommons.org/publicdomain/zero/1.0/"
      leavesPage={true}
    />
  );
  /*
  const compoundGovLink = (
    <Link
      text={<Trans>Compound Governance</Trans>}
      url="https://compound.finance/governance"
      leavesPage={true}
    />
  );
  */
  return (
    <Section fullWidth={false} className={classes.documentationSection}>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>
            <Trans>WTF?</Trans>
          </h1>
          <p className={classes.aboutText}>
              An expansion of the {nounsLink} DAO universe, NounsTown works to create a new layer within the Nouns ecosystem. 
			  NounsTowners feature the CC0 artwork from Nouns DAO, and come with an extra neighborly vibe in the form of a Nature Trait!	
			  NounsTown aims to expose more people to Nouns and the broader Nouns mission to bootstrap identity, community and governance.
			  Auction proceeds are used to acquire Nouns, and to provide the community with access to the broader Nouns governance model.
          </p>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
              Learn more below, or start creating NounsTowners off-chain using the {playgroundLink}.
          </p>
        </div>
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Summary</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>
                  NounsTown artwork is in the {publicDomainLink}.
                </li>
                <li>
                  <Trans>One NounsTowner is trustlessly auctioned every 6 hours, forever.</Trans>
                </li>
                <li>
                  <Trans>100% of NounsTown auction proceeds are trustlessly sent to the treasury.</Trans>
                </li>
                <li>
                  <Trans>Settlement of one auction kicks off the next.</Trans>
                </li>
                <li>
                  <Trans>Artwork is generative and stored directly on-chain (not IPFS).</Trans>
                </li>
                <li>
                  <Trans>
                    The NounsTown Founders receive rewards in the form of NounsTowners (1/16th of supply for the first 4 years (365 total NounsTowners)).
                  </Trans>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>6 Hour Auctions</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p className={classes.aboutText}>
                <Trans>
                  The NounsTown Auction Contract will act as a self-sufficient generation and
                  distribution mechanism, auctioning one NounsTowner every 6 hours, forever. 100% of
                  auction proceeds (ETH) are automatically deposited in the treasury.
                </Trans>
              </p>

              <p className={classes.aboutText}>
                  Each time an auction is settled, the settlement transaction will also cause a new
                  NounsTowner to be minted and a new 6 hour auction to begin.{' '}
              </p>
              <p>
                  While settlement is most heavily incentivized for the winning bidder, it can be
                  triggered by anyone, allowing the system to trustlessly auction NounsTowners as long as
                  Ethereum is operational and there are interested bidders.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="3" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Bidding and Settling Auctions</Trans>
            </Accordion.Header>
            <Accordion.Body>
	            <h3>Bids</h3>
	              Once an auction starts, everyone has 6 hours to bid. Anyone can bid an amount
	              at/above 0.01 ETH. The Amount bid is returned to bidder if they don't win the auction
	              (minus gas spent on bid transaction). If a bid is made within the last 5 minutes, the auction is extended by 5 minutes.
	              <br />
	              <br />
	              	
	              <h3>Bid Refunds</h3>
	              Unsuccessful bids are refunded in full. The timing of refunds may be offset by 1 bidder. This means that a refund is processed for an unsuccessful bid when a higher bid is submitted.
	              <br />
	              <br />
	            
	            <h3>Settlement</h3>
	              When an auction ends, a gas-only transaction is required to mint the current NounsTowner
	              to the winner's wallet and start the next auction. Anyone can settle an auction. As gas
	              price fluctuates, the cost of settlement also fluctuates.
	              <br />
	              <br />
	              Settlement gas price of every 15th auction is higher. This is due to the transaction
	              also triggering the Founders reward mint.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Traits</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  NounsTowners are based on the core Nouns traits, which are generated randomly based on Ethereum block hashes. 
                  They also have additional personality traits called nature. 
                  As of this writing, NounsTowners are made up of:
                </Trans>
              </p>
              <ul>
                <li>
                  <Trans>Backgrounds (2) </Trans>
                </li>
                <li>
                  <Trans>Bodies (30)</Trans>
                </li>
                <li>
                  <Trans>Accessories (137) </Trans>
                </li>
                <li>
                  <Trans>Heads (234) </Trans>
                </li>
                <li>
                  <Trans>Glasses (21)</Trans>
                </li>
                <li>
                  <Trans>Nature (6): Brave, Impish, Jolly, Quirky, Sassy, Timid</Trans>
                </li>
              </ul>
                You can experiment with off-chain NounsTowner generation at the {playgroundLink}.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="6" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>On-Chain Artwork</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  NounsTowners are stored directly on Ethereum and do not utilize pointers to other
                  networks such as IPFS. This is possible because the parts are compressed and
                  stored on-chain using a custom run-length encoding (RLE), which is a form of
                  lossless compression.
                </Trans>
              </p>

              <p>
                <Trans>
                  The compressed parts are efficiently converted into a single base64 encoded SVG
                  image on-chain. To accomplish this, each part is decoded into an intermediate
                  format before being converted into a series of SVG rects using batched, on-chain
                  string concatenation. Once the entire SVG has been generated, it is base64
                  encoded.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="7" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Seeder Contract</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  The NounsTown Seeder contract is used to determine traits during the minting
                  process. The seeder contract can be replaced to allow for future trait generation
                  algorithm upgrades. Additionally, it can be locked to prevent any
                  future updates. Currently, traits are determined using pseudo-random number
                  generation:
                </Trans>
              </p>
              <code>keccak256(abi.encodePacked(blockhash(block.number - 1), nounId))</code>
              <br />
              <br />
              <p>
                <Trans>
                  Trait generation is not truly random. Traits can be predicted when minting a NounsTowner
                  on the pending block.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Section>
  );
};
export default Documentation;
