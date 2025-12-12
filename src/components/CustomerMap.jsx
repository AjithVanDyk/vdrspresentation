import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const markers = [
  // AMI Customers (Group 1)
  { markerOffset: -30, name: "Athens Environmental", location: "Sun Valley, CA", coordinates: [-118.3734, 34.2384], type: "ami", desc: "Was Crown Disposal, Community Recycling" },
  { markerOffset: -30, name: "WM St. Paul", location: "Ramsey, MN", coordinates: [-93.3891, 45.2606], type: "ami", desc: "Ramsey" },
  { markerOffset: 15, name: "FCC Houston", location: "Houston, TX", coordinates: [-95.3698, 29.7604], type: "ami", desc: "Houston, TX" },
  { markerOffset: -30, name: "Marin Resource", location: "San Rafael, CA", coordinates: [-122.5311, 37.9735], type: "ami", desc: "Marin County, CA" },
  { markerOffset: -30, name: "WM Indianapolis", location: "Indianapolis, IN", coordinates: [-86.1581, 39.7684], type: "ami", desc: "2025 Stout Field (ex-Rays Trash)" },
  { markerOffset: -30, name: "WM Menasha", location: "Menasha, WI", coordinates: [-88.4507, 44.2023], type: "ami", desc: "Paper Valley" },
  { markerOffset: 15, name: "Tomra New York", location: "Schenectady, NY", coordinates: [-73.9396, 42.8142], type: "ami", desc: "Schenectady, NY" },
  { markerOffset: -30, name: "Republic Pittsburgh", location: "Pittsburgh, PA", coordinates: [-79.9959, 40.4406], type: "ami", desc: "Was Recycle Source" },

  // G-Drive Customers (Group 2)
  { markerOffset: 15, name: "WM Dumfries", location: "Dumfries, VA", coordinates: [-77.3280, 38.5676], type: "gdrive", desc: "Dumfries, VA" },
  { markerOffset: -30, name: "WM Napnee", location: "Nappanee, IN", coordinates: [-85.9961, 41.4439], type: "gdrive", desc: "Napnee, IN" },
  { markerOffset: 15, name: "FCC Placer County", location: "Lincoln, CA", coordinates: [-121.2933, 38.8916], type: "gdrive", desc: "Placer County, CA" },
  { markerOffset: 15, name: "WM Mesquite Creek", location: "New Braunfels, TX", coordinates: [-98.1245, 29.7030], type: "gdrive", desc: "Mesquite Creek" },
  { markerOffset: 15, name: "City Carting", location: "Stamford, CT", coordinates: [-73.5387, 41.0534], type: "gdrive", desc: "Stamford, CT" },
];

const CustomerMap = () => {
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  // Custom styling for the map to fit the theme
  const mapStyles = {
    default: {
      fill: "#D6D6DA", // Light gray for neutral states
      outline: "none",
      stroke: "#FFFFFF",
      strokeWidth: 0.75,
    },
    hover: {
      fill: "#F53",
      outline: "none",
    },
    pressed: {
      fill: "#E42",
      outline: "none",
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ComposableMap projection="geoAlbersUsa" projectionConfig={{ scale: 1000 }} style={{ width: "100%", height: "auto", maxHeight: "65vh" }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { name } = geo.properties;
                    setHoveredState(name);
                  }}
                  onMouseLeave={() => {
                    setHoveredState(null);
                  }}
                  style={{
                    default: {
                        fill: "rgba(255, 255, 255, 0.2)",
                        stroke: "rgba(255, 255, 255, 0.4)",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 0.3s ease"
                    },
                    hover: {
                        fill: "rgba(255, 107, 53, 0.4)", // Tint color (Orange-ish)
                        stroke: "rgba(255, 255, 255, 0.8)",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer"
                    },
                    pressed: {
                        fill: "rgba(255, 255, 255, 0.5)",
                        outline: "none",
                    }
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map((marker) => (
            <Marker 
                key={marker.name} 
                coordinates={marker.coordinates}
                onMouseEnter={() => setHoveredMarker(marker)}
                onMouseLeave={() => setHoveredMarker(null)}
                style={{
                    default: { outline: "none" },
                    hover: { outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" },
                }}
            >
              <g
                transform="translate(-12, -24)"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
              >
                <path 
                    d="M12 0C5.3 0 0 5.3 0 12c0 9 12 24 12 24s12-15 12-24c0-6.7-5.3-12-12-12z" 
                    fill={marker.type === 'ami' ? "#FF6B35" : "#1e3c72"} // Orange vs Blue
                />
                <circle cx="12" cy="12" r="5" fill="white" />
                <path 
                    d={marker.type === 'ami' ? "M12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" :  "M9 10h6v4H9z"} // Simple dot vs box
                    fill={marker.type === 'ami' ? "#FF6B35" : "#1e3c72"}
                    opacity="0.8"
                />
              </g>
            </Marker>
          ))}
        </ComposableMap>

        {/* Hover Tooltip/Popup */}
        <AnimatePresence>
            {hoveredMarker ? (
                <motion.div
                    key="marker-tooltip"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(255,255,255,0.95)',
                        padding: '20px 25px',
                        borderRadius: '16px',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        zIndex: 20,
                        textAlign: 'center',
                        minWidth: '300px',
                        maxWidth: '400px'
                    }}
                >
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4em', color: hoveredMarker.type === 'ami' ? '#FF6B35' : '#1e3c72' }}>
                        {hoveredMarker.name}
                    </h3>
                    <p style={{ margin: '0 0 10px 0', fontSize: '1.1em', color: '#4a5568', fontWeight: '500' }}>
                        {hoveredMarker.location}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.95em', color: '#718096', fontStyle: 'italic' }}>
                        {hoveredMarker.desc}
                    </p>
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #edf2f7', fontSize: '0.85em', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#a0aec0' }}>
                        {hoveredMarker.type === 'ami' ? 'Customer Info & AMI Updates' : 'G-Drive Structure'}
                    </div>
                </motion.div>
            ) : hoveredState && (
                <motion.div
                    key="state-tooltip"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(30, 60, 114, 0.9)',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        backdropFilter: 'blur(5px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        zIndex: 10,
                        textAlign: 'center'
                    }}
                >
                    <h3 style={{ margin: 0, fontSize: '1.2em', color: 'white', fontWeight: '500' }}>
                        {hoveredState}
                    </h3>
                </motion.div>
            )}
        </AnimatePresence>
        
        {/* Legend */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ width: '12px', height: '12px', background: '#FF6B35', borderRadius: '50%', marginRight: '10px', boxShadow: '0 0 10px rgba(255,107,53,0.5)' }}></span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>Customer Info & AMI</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '12px', height: '12px', background: '#1e3c72', borderRadius: '50%', marginRight: '10px', boxShadow: '0 0 10px rgba(30,60,114,0.5)' }}></span>
                <span style={{ fontSize: '14px', color: 'white', fontWeight: '500' }}>G-Drive Structure</span>
            </div>
        </div>
    </div>
  );
};

export default CustomerMap;
