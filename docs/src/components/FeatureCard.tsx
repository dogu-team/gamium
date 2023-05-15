import React from 'react';
import '../css/feature-card.css';

interface Props {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: Props) => {
  return (
    <div className="card">
      <div>{icon}</div>
      <h3>{title}</h3>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
