/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "../assets/css/landing-page-main-caption.css";

function LandingPageMainCaption() {
  const [text, setText] = useState("");
  const subtitle = "Streamlining Resources, Empowering Progress. Stay updated with news, schedules, inventory, and more.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
    
      if (index < subtitle.length) {
        const newText = subtitle.charAt(index);  
        setText((prevText) => prevText + newText); 
        console.log(newText);  
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); 
    return () => clearInterval(interval); 
  }, []); 

  return (
    <div className="landing-page-main-caption">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.2 }}
        className="landing-page-main-caption__title"
        viewport={{ once: false }}
      >
        Barangay Sulong Inventory and Management System
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="landing-page-main-caption__subtitle"
        viewport={{ once: false }}
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          borderRight: "2px solid black", 
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}

export default LandingPageMainCaption;
