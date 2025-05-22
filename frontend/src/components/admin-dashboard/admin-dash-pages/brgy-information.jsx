import React from 'react'
import AdminSideNav from '../admin-sub-components/admin-side-nav'
import AdminSlideNav from '../admin-sub-components/admin-slide-nav'
import AdminMainNav from '../admin-sub-components/admin-main-nav'

function BrgyInformation() {
  return (

    <>
    <AdminMainNav />
    <AdminSideNav />
    <AdminSlideNav />
   

   <div style={{textAlign: 'center'}}>Barangay Information Page</div>
    </>
  )
}

export default BrgyInformation