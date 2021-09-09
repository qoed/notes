import React from 'react';
import './Spinner.css';

const Spinner: React.FC<{}> = () => {
  return (
    <div className='flex flex-align-center flex-justify-center'>
      <div className='lds-ripple'>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
