import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type FeatureItem = {
  title: JSX.Element;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: <Translate>Easy to Use</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <Translate>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </Translate>
    ),
  },
  {
    title: <Translate>Focus on What Matters</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <Translate>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the docs directory.
      </Translate>
    ),
  },
  {
    title: <Translate>Powered by React</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <Translate>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </Translate>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
