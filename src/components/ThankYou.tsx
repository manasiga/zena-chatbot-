import React from 'react';

interface ThankYouProps {
  name?: string;
}

const ThankYou: React.FC<ThankYouProps> = ({ name }) => (
  <div className="ty">
    <div className="tyi">✅</div>
    <div className="tyt">
      Thank you{name ? (
        <>, <strong>{name}</strong></>
      ) : null}{' '}
      for sharing your details.<br />
      Our ZeAI Soft team will review your requirement and contact you soon.
    </div>
  </div>
);

export default ThankYou;
