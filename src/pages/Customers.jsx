import React from 'react';
import PresentationSlide from '../components/PresentationSlide';
import CustomerMap from '../components/CustomerMap';

const Customers = () => {
  return (
    <PresentationSlide backgroundImage="/images/customers_bg.jpg">
      <div className="slide-header">
        <h1>Customers Worked On</h1>
        <h2>Delivering Value Across North America</h2>
      </div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        padding: '0 20px',
        minHeight: 0 // Allow flex container to manage height
      }}>
        <CustomerMap />
      </div>
    </PresentationSlide>
  );
}

export default Customers;
