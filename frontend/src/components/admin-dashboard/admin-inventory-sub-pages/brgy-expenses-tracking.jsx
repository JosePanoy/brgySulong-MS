import React from 'react'
import AdminMainNav from "../admin-sub-components/admin-main-nav";
import AdminSideNav from "../admin-sub-components/admin-side-nav";
import AdminSlideNav from "../admin-sub-components/admin-slide-nav";

function BrgyExpenseTracking() {
  return (
    <>
        <AdminMainNav />
    <AdminSideNav />
    <AdminSlideNav />
        <div style={{textAlign: 'center'}}>Brgy Expense Tracking</div>
    </>
  )
}

export default BrgyExpenseTracking