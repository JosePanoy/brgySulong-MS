import React, { useEffect, useState } from 'react';
import "../../../assets/css/dashboard/sub-dashboard/brgy-news-feed-admin.css";
import EditBTN from "../../../assets/img/edit.png";
import BrgyNewsFeedEdit from './brgy-news-feed-edit';


function BrgyNewsFeedAdmin() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/events")
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className="brgy-news-feed-admin">
      {events.map(event => (
        <div key={event.event_id} className="brgy-news-card">
          <div className="brgy-news-card-header">
            <div className="brgy-news-card-title-wrapper">
              <div className="brgy-news-card-title">{event.title}</div>
              <button
                className="brgy-news-card-edit-icon-btn"
                onClick={() => setSelectedEvent(event)}
                aria-label="Edit event"
              >
                <img src={EditBTN} alt="Edit" className="brgy-news-card-edit-icon" />
              </button>
            </div>
            <div className="brgy-news-card-meta">
              <span className="brgy-news-card-category">{event.category}</span>
              <span className="brgy-news-card-date">{new Date(event.date_start).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="brgy-news-card-body">
            <p className="brgy-news-card-description">{event.description}</p>
            {event.image_url && (
              <img src={event.image_url} alt={event.title} className="brgy-news-card-image" />
            )}
          </div>
          <div className="brgy-news-card-footer">
            <span className="brgy-news-card-status">{event.status}</span>
            {event.rsvp_required && <span className="brgy-news-card-rsvp">RSVP Required</span>}
          </div>
        </div>
      ))}

      {selectedEvent && (
        <BrgyNewsFeedEdit
          eventData={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default BrgyNewsFeedAdmin;
