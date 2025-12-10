import React from 'react';
import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import { Icon } from '../components/Icons';

function Customers() {
  const customers = [
    { name: "Athens Environmental Services", location: "Was Crown Disposal, Community Recycling", icon: "recycle" },
    { name: "WM St. Paul", location: "Ramsey", icon: "building" },
    { name: "FCC Houston", location: "Houston, TX", icon: "building" },
    { name: "Marin Resource Recovery", location: "Marin County, CA", icon: "recycle" },
    { name: "WM Indianapolis 2025 Stout Field", location: "Indianapolis, IN (ex-Rays Trash)", icon: "building" },
    { name: "WM Menasha", location: "Paper Valley", icon: "building" },
    { name: "Tomra New York Recycling", location: "Schenectady, NY", icon: "recycle" },
    { name: "Republic Services Pittsburgh", location: "Pittsburgh, PA (was Recycle Source)", icon: "recycle" },
    { name: "Sort Folders", location: "Various Locations", icon: "folder" },
    { name: "G Drive Child Parts", location: "Subassembly Drawings", icon: "folder" },
    { name: "WM Dumfries", location: "Dumfries, VA", icon: "building" },
    { name: "WM Napnee", location: "Napnee, IN", icon: "building" },
    { name: "FCC Placer County", location: "Placer County, CA", icon: "building" },
    { name: "WM Mesquite Creek", location: "Mesquite Creek", icon: "building" },
    { name: "City Carting Stamford", location: "Stamford, CT", icon: "building" }
  ];

  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Customers Worked On</h1>
        <h2>Delivering Value Across North America</h2>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '40px', 
        margin: '60px auto', 
        maxWidth: '1200px',
        padding: '0 20px'
      }}>
        {customers.map((customer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, translateY: -10 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={customer.icon} size={48} color="var(--vd-accent)" />
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.8em', color: 'var(--vd-off-white)', fontWeight: 'bold' }}>
              {customer.name}
            </h3>
            <p style={{ margin: 0, color: 'var(--vdrs-orange)', fontSize: '1.1em', fontWeight: '500' }}>
              {customer.location}
            </p>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '60px', color: 'rgba(255,255,255,0.6)' }}>
        <p style={{ fontSize: '1.2em' }}>Providing on-site technical solutions and system optimizations.</p>
      </div>
    </PresentationSlide>
  );
}

export default Customers;
