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
  const nouncilLink = (
    <Link
      text={<Trans>Nouncil</Trans>}
      url="/nouncil"
      leavesPage={false}
    />
  );
  const blocksLink = (
    <Link
      text={<Trans>BLOCKS</Trans>}
      url="https://joinblocks.com"
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
			  NounsTown PFDs (profile deeds) feature the CC0 artwork from Nouns DAO, but have the added benefit of being linked to space in the Metaverse on the {blocksLink} platform!	
			  By expanding the ecosystem into the Metaverse, building in the open, and inviting others to participate, NounsTown aims to expose more people to Nouns 
			  and the broader Nouns mission to bootstrap identity, community and governance.
			  Auction proceeds are split 50/50 between the {nouncilLink}, a special council of Nounish BUIDLers & Nounish extension reps, and BLOCKS DAO.
          </p>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
              Learn more below, or start creating PFDs off-chain using the {playgroundLink}.
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
                  NounsTown PFD artwork is in the {publicDomainLink}.
                </li>
                <li>
                  <Trans>One NounsTown PFD is trustlessly auctioned every 6 hours, forever.</Trans>
                </li>
                <li>
                  <Trans>100% of NounsTown auction proceeds are trustlessly sent to the treasury, to be split 50/50 between the Nouncil and BLOCKS DAO</Trans>
                </li>
                <li>
                  <Trans>Settlement of one auction kicks off the next.</Trans>
                </li>
                <li>
                  <Trans>All NounsTown owners are members of BLOCKS DAO.</Trans>
                </li>
                <li>
                  <Trans>Artwork is generative and stored directly on-chain (not IPFS).</Trans>
                </li>
                <li>
                  <Trans>
                    The Nouncil receives rewards in the form of NounsTown PFDs (1/16th of supply for the first 4 years (365 total NounsTown PFDs))
                  </Trans>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>6 Hour Auctions</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p className={classes.aboutText}>
                <Trans>
                  The NounsTown Auction Contract will act as a self-sufficient generation and
                  distribution mechanism, auctioning one NounsTown PFD every 6 hours, forever. 100% of
                  auction proceeds (ETH) are automatically deposited in the treasury,
                  to be split 50/50 between the Nouncil and BLOCKS DAO.
                </Trans>
              </p>

              <p className={classes.aboutText}>
                  Each time an auction is settled, the settlement transaction will also cause a new
                  NounsTown PFD to be minted and a new 6 hour auction to begin.{' '}
              </p>
              <p>
                  While settlement is most heavily incentivized for the winning bidder, it can be
                  triggered by anyone, allowing the system to trustlessly auction NounsTown PFDs as long as
                  Ethereum is operational and there are interested bidders.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Bidding and Settling Auctions</Trans>
            </Accordion.Header>
            <Accordion.Body>
				<p className={classes.aboutText}>
	            <h3>Bids</h3>
	              Once an auction starts, everyone has 6 hours to bid. Anyone can bid an amount
	              at/above 0.01 ETH. The Amount bid is returned to bidder if they don't win the auction
	              (minus gas spent on bid transaction). If a bid is made within the last 5 minutes, the auction is extended by 5 minutes.
	              	
	              <p className={classes.aboutText}>
	              <h3>Bid Refunds</h3>
	              Unsuccessful bids are refunded in full. The timing of refunds may be offset by 1 bidder. This means that a refund is processed for an unsuccessful bid when a higher bid is submitted.
	              </p>
	            </p>
	            
	            <p className={classes.aboutText}>
	            <h3>Settlement</h3>
	              When an auction ends, a gas-only transaction is required to mint the current NounsTown PFD
	              to the winner's wallet and start the next auction. Anyone can settle an auction. As gas
	              price fluctuates, the cost of settlement also fluctuates.
	              <br />
	              <br />
	              Settlement gas price of every 16th auction is higher. This is due to the transaction
	              also triggering the Nouncil reward mint.
	            </p>
            </Accordion.Body>
          </Accordion.Item>          
          <Accordion.Item eventKey="3" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Nouncil</Trans>
            </Accordion.Header>
            <Accordion.Body>
                Nouncil is a special council of Nounish BUIDLers and NFT community leaders that seek to extend the Nouns DAO universe. 
                The goal of the Nouncil is to work together within the framework of Nouns DAO, using the Nouns that have been generously delegated to the Nouncil, to be a voice for the nounish states and do their part to proliferate CC0 and Nounish culture.
                Learn more about the {nouncilLink}.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>WTF PFD?</Trans>
            </Accordion.Header>
            <Accordion.Body>
              	A PFD (Profile Deed) is a PFP (Profile Pic) that also represents a parcel of Metaverse land.
				Each parcel of NounsTown Metaverse land will come with a PFD that acts as proof of ownership of that parcel on the BLOCKS platform.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>PFD Traits</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  NounsTown PFDs are based on the core Nouns traits, which are generated randomly based on Ethereum block hashes. 
                  PFDs also have additional personality traits called nature. 
                  As of this writing, NounsTown PDFs are made up of:
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
                You can experiment with off-chain PFD generation at the {playgroundLink}.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>On-Chain Artwork</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  NounsTown PFDs are stored directly on Ethereum and do not utilize pointers to other
                  networks such as IPFS. This is possible because PFD parts are compressed and
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
              <Trans>NounsTown Seeder Contract</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  The NounsTown Seeder contract is used to determine PFD traits during the minting
                  process. The seeder contract can be replaced to allow for future trait generation
                  algorithm upgrades. Additionally, it can be locked to prevent any
                  future updates. Currently, PFD traits are determined using pseudo-random number
                  generation:
                </Trans>
              </p>
              <code>keccak256(abi.encodePacked(blockhash(block.number - 1), nounId))</code>
              <br />
              <br />
              <p>
                <Trans>
                  Trait generation is not truly random. Traits can be predicted when minting a PFD
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
