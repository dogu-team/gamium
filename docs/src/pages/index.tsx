import React from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';
import MainLogo from '@site/static/img/logo.svg';
import RocketLogo from '@site/static/img/main/rocket.svg';
import CodeLogo from '@site/static/img/main/code.svg';

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
          <div style={{marginTop: '2rem'}}>
            <a href='/gamium/get-started/introduction'>
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
      description="Documentation for Dogu, game test automation service."
    >
      <HomepageHeader />
      <main className={styles.docsMain}>
        <div className={styles.docsSection}>
          <h2 className={styles.docsSectionTitle}>
            <div className={styles.logoWrapper}>
              <RocketLogo />
            </div>
            Get Started
          </h2>
          <ul className={styles.docsSectionListContainer}>
            <li className={styles.docsSectionListItem}>
              <Link to="/gamium/get-started/introduction">About Gamium</Link>
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
              <Link to="/gamium/get-started/introduction">소개</Link>
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
      </main>
    </Layout>
  );
}
