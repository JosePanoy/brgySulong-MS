import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from 'react-intersection-observer';
import "../assets/css/brgy-map.css";

const BrgyMap = () => {
  const AnimatedDiv = animated.div;
  

  const { ref: leftRef, inView: leftInView } = useInView({
    triggerOnce: false, 
    threshold: 0.1,
    delay: 300,
  });


  const { ref: rightRef, inView: rightInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    delay: 600,
  });


  const leftAnimation = useSpring({
    opacity: leftInView ? 1 : 0,
    transform: leftInView ? 'translateY(0)' : 'translateY(-50px)',
    config: { duration: 1000 },
    reset: true, 
  });


  const rightAnimation = useSpring({
    opacity: rightInView ? 1 : 0,
    transform: rightInView ? 'translateY(0)' : 'translateY(-50px)',
    config: { duration: 1500 },
    reset: true, 
  });

  return (
    <div className="brgy-map-container">
      <animated.div
        className="brgy-map-left"
        ref={leftRef}
        style={leftAnimation}
      >
        <h2 style={{ textAlign: 'center' }}>Households</h2>
        <p>The household population of Sulong in the 2015 Census was 969, broken down into 206 households or an average of 4.70 members per household.</p>
        <p>Sulong is a barangay in the municipality of Alimodian, in the province of Iloilo. Its population as determined by the 2020 Census was 1,049. This represented 2.64% of the total population of Alimodian.</p>
      </animated.div>

      <animated.div
        className="brgy-map-right"
        ref={rightRef}
        style={rightAnimation}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2412.3118000818226!2d122.45213236841919!3d10.798038174461915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sph!4v1747635894556!5m2!1sen!2sph"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sulong Map"
          className="map-locked"
        ></iframe>
      </animated.div>
    </div>
  );
};

export default BrgyMap;
