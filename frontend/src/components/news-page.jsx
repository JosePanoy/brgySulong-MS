import React from 'react'
import LandingPageNavbar from '../sub-components/landing-page-navbar'
import "../assets/css/news-page.css"
import WrongComponent from '../sub-components/wrong-div'


function NewsPage() {
  return (
    <>
      <LandingPageNavbar />
      <WrongComponent />
      <div className="news-page-container">
        <div className="news-page-placeholder">
          <h2 className="news-page-message">No news available at the moment</h2>
          <p className="news-page-subtext">Please check back later for updates.</p>
        </div>
      </div>
    </>
  )
}

export default NewsPage
