/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import "../assets/css/landing-page-main-caption.css";

function LandingPageMainCaption() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState("0.7rem");
  const [cursorVisible, setCursorVisible] = useState(true);  // State to toggle cursor visibility

  const subtitle = "Streamlining Resources, Empowering Progress. Stay updated with news, schedules, inventory, and more.";

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth > 1024) {
        setFontSize("1rem");
      } else if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setFontSize("0.9rem");
      } else {
        setFontSize("0.7rem");
      }
    };

    updateFontSize();

    window.addEventListener("resize", updateFontSize);

    let index = 0;
    const interval = setInterval(() => {
      if (index < subtitle.length) {
        const newText = subtitle.charAt(index);
        setText((prevText) => prevText + newText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 90);

    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);  // Toggle the cursor visibility
    }, 500);  // Adjust blink speed here

    return () => {
      window.removeEventListener("resize", updateFontSize);
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [subtitle]);

  return (
    <div className="landing-page-main-caption">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.2 }}
        className="landing-page-main-caption__title"
        viewport={{ once: false }}
      >
        Sulong <br />
Municipality of Alimodian
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
        className="landing-page-main-caption__subtitle"
        viewport={{ once: false }}
        style={{
          display: "inline-block",
          whiteSpace: "normal",
          fontSize: fontSize,
          wordWrap: "break-word",
          overflow: "visible",
          lineHeight: 1.5,
        }}
      >
        {text}
        <span className={`cursor ${cursorVisible ? 'visible' : ''}`} />
      </motion.p>
    </div>
  );
}

export default LandingPageMainCaption;
