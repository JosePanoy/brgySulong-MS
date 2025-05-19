import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import "../assets/css/brgycomp1.css";

function BrgyComp1() {
  const AnimatedDiv = animated.div;


  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.1,
    delay: 500,
  });

  const fadeInAnimation1 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(-50px)', 
    config: { duration: 1000 },
    reset: true, 
  });

    const fadeInAnimation2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(-50px)', 
    config: { duration: 1500 },
    reset: true, 
  });


  return (
    <div className="brgycomp1-container">
      <AnimatedDiv
        ref={ref}
        style={fadeInAnimation1}
        className="brgycomp1-heading"
      >
     
      </AnimatedDiv>

      <AnimatedDiv
        ref={ref}
        style={fadeInAnimation1} 
        className="brgycomp1-description"
      >
        Sulong is a barangay in the municipality of Alimodian, in the province of Iloilo. 
        Its population as determined by the 2020 Census was 1,049. This represented 2.64% 
        of the total population of Alimodian.
      </AnimatedDiv>

      <div className="brgycomp1-summary-wrapper">
        <AnimatedDiv
          ref={ref}
          style={fadeInAnimation2} 
          className="brgycomp1-summary-table"
        >
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Island group</th>
                <th>Region</th>
                <th>Province</th>
                <th>Municipality</th>
                <th>Postal code</th>
                <th>Population (2020)</th>
                <th>Philippine major island(s)</th>
                <th>Coordinates</th>
                <th>Estimated elevation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Barangay</td>
                <td>Visayas</td>
                <td>Western Visayas (Region VI)</td>
                <td>Iloilo</td>
                <td>Alimodian</td>
                <td>5028</td>
                <td>1,049</td>
                <td>Panay</td>
                <td>10.7985, 122.4508</td>
                <td>58.8 meters</td>
              </tr>
            </tbody>
          </table>
        </AnimatedDiv>
      </div>
    </div>
  );
}

export default BrgyComp1;
