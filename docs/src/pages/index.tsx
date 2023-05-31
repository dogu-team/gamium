import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';
import MainLogo from '@site/static/img/logo.svg';
import OpenSourceIcon from '@site/static/img/main/open-source.svg';
import GameControllerIcon from '@site/static/img/main/game-controller.svg';
import InspectIcon from '@site/static/img/main/inspect.svg';
import FeatureCard from '../components/FeatureCard';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <center>
      <section className={styles.headerBanner}>
        <div className={styles.headerBannerInner}>
          {/* <h1 className={styles.headerBannerTitle}>{siteConfig.title}</h1> */}
          <MainLogo width={180} height={180} />
          <p className={styles.headerBannerDescription}>
            Automate game testing in android, ios, windows devices
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a href="/docs/get-started/introduction">
              <button className={styles.primaryButton}>Get Started</button>
            </a>
          </div>
        </div>
      </section>
    </center>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Home`}
      description="Documentation for Gamium, game test automation tools."
    >
      <HomepageHeader />
      {/* <main className={styles.docsMain}>
        <div className={styles.docsSection}>
          <h2 className={styles.docsSectionTitle}>
            <div className={styles.logoWrapper}>
              <RocketLogo />
            </div>
            Get Started
          </h2>
          <ul className={styles.docsSectionListContainer}>
            <li className={styles.docsSectionListItem}>
              <Link to="/docs/get-started/introduction">About Gamium</Link>
            </li>
          </ul>
        </div>
        <div className={styles.docsSection}>
          <h2 className={styles.docsSectionTitle}>
            <div className={styles.logoWrapper}>
              <CodeLogo />
            </div>
            Gamium
          </h2>
          <ul className={styles.docsSectionListContainer}>
            <li className={styles.docsSectionListItem}>
              <Link to="/docs/get-started/introduction">소개</Link>
            </li>
            <li className={styles.docsSectionListItem}>
              <Link to="/gamium/engine/unity/project-configuration">
                Gamium Engine
              </Link>
            </li>
            <li className={styles.docsSectionListItem}>
              <Link to="/gamium/client/write-testscript">
                Gamium Client
              </Link>
            </li>
          </ul>
        </div>
      </main> */}
      <main className={styles.docsMain}>
        <FeatureCard
          icon={<OpenSourceIcon className={styles.svg} />}
          title="Open source"
          description={
            <p>
              Gamium is{' '}
              <a href="https://github.com/dogu-team/gamium">
                open source project
              </a>{' '}
              maintained by Dogu Technologies team.
            </p>
          }
        />
        <FeatureCard
          icon={<GameControllerIcon className={styles.svg} />}
          title="Test in real game"
          description="Gamium allows you to run test in environment like android, ios, windows real device and emulator."
        />
        <FeatureCard
          icon={<InspectIcon className={styles.svg} />}
          title="Manipulating in-game UI"
          description="Gamium can manipulate UI elements easily. It helps click game object, text input, etc."
        />
      </main>
    </Layout>
  );
}
