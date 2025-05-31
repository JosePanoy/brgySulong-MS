import React, { useState, useEffect } from 'react'
import ButtonToTop from "../assets/img/up-arrow.png"
import "../assets/css/btn-scroll-to-top.css"

function BTNtoTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {visible && (
        <img
          src={ButtonToTop}
          alt="Scroll to top"
          className="btn-to-top show"
          onClick={scrollToTop}
        />
      )}
    </>
  )
}

export default BTNtoTop
