import React from 'react'
import LandingPageNavbar from '../sub-components/landing-page-navbar';
import LandingPageMainCaption from '../sub-components/landing-page-main-caption';
import BrgyComp1 from '../sub-components/brgy-info-comp-1';
import BrgyMap from '../sub-components/brgy-map';

function LandingPage() {
  return (

    <>
    <LandingPageNavbar />
    <LandingPageMainCaption />
    <BrgyMap />
    <BrgyComp1 />
        
    </>

  )
}

export default LandingPage;