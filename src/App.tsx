import React from 'react';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <>
      {/* Demo page – replace with your actual website content */}
      <div className="demo">
        <h1>ZeAI Soft</h1>
        <p>
          Your website content goes here. The ZeNA chatbot widget floats at the
          bottom-right corner and is available on every page.
        </p>
        <div className="demo-chips">
          <div className="demo-chip">Custom Software</div>
          <div className="demo-chip">EdTech Solutions</div>
          <div className="demo-chip">AI &amp; Manufacturing</div>
          <div className="demo-chip">Training Programs</div>
          <div className="demo-chip">BeautyTech</div>
        </div>
      </div>

      {/* ZeNA Chatbot Widget */}
      <Chatbot />
    </>
  );
}

export default App;
