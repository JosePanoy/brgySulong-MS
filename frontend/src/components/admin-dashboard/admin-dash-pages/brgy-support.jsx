import React from 'react'
import AdminMainNav from '../admin-sub-components/admin-main-nav'
import AdminSideNav from '../admin-sub-components/admin-side-nav'
import AdminSlideNav from '../admin-sub-components/admin-slide-nav'

function BrgySupport() {
  return (
    <>
        <AdminMainNav />
        <AdminSideNav />
        <AdminSlideNav />

        <div style={{textAlign: 'center'}}>Admin Support Page</div>
    </>
  )
}

export default BrgySupport