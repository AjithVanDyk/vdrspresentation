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
    <PresentationSlide backgroundImage="/images/image (3).jpg">
      <div className="slide-header">
        <h1>Customers Worked On</h1>
        <h2>Delivering Value Across North America</h2>
      </div>

      <div style={{ 
        margin: '40px auto', 
        maxWidth: '900px',
        padding: '0 20px'
      }}>
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0 
        }}>
          {customers.map((customer, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                padding: '20px 30px',
                marginBottom: '15px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                minWidth: '50px'
              }}>
                <Icon name={customer.icon} size={32} color="var(--vdrs-orange)" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 5px 0', 
                  fontSize: '1.4em', 
                  color: 'white', 
                  fontWeight: '600' 
                }}>
                  {customer.name}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '1em',
                  fontWeight: '400' 
                }}>
                  {customer.location}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: '60px', color: 'rgba(255,255,255,0.6)' }}>
        <p style={{ fontSize: '1.2em' }}>Providing on-site technical solutions and system optimizations.</p>
      </div>
    </PresentationSlide>
  );
}

export default Customers;
