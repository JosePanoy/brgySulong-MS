import React from 'react'
import "../../../assets/css/dashboard/sub-dashboard/brgy-news.css"
import AdminMainNav from '../admin-sub-components/admin-main-nav'
import AdminSideNav from '../admin-sub-components/admin-side-nav'
import AdminSlideNav from '../admin-sub-components/admin-slide-nav'
import BrgyNewsUploadSection from '../admin-sub-components/brgy-news-upload-section'
import BrgyNewsFeedAdmin from '../admin-sub-components/brgy-news-feed-admin'

function BrgyNews() {
  const [events, setEvents] = React.useState([]);

  const fetchEvents = () => {
    fetch("http://127.0.0.1:8000/api/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  };

  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />

      <div style={{ textAlign: 'center' }}>Barangay News Page</div>

      <BrgyNewsUploadSection refreshEvents={fetchEvents} />
      <BrgyNewsFeedAdmin events={events} refreshEvents={fetchEvents} />
    </>
  );
}


export default BrgyNews