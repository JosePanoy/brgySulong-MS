import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

import "../../../assets/css/dashboard/sub-dashboard/brgy-news-feed-admin.css";
import EditBTN from "../../../assets/img/edit.png";
import NewsLogo from "../../../assets/img/news.png";
import EventLogo from "../../../assets/img/event.png";

import BrgyNewsFeedEdit from "./brgy-news-feed-edit";
import BTNtoTop from "../../../sub-components/button-top-top";

function EventCard({ event, onEdit }) {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { duration: 600 },
    reset: true,
  });
  const AnimatedDiv = animated.div;

  return (
    <AnimatedDiv ref={ref} style={fadeIn} className="brgy-news-card">
      <div className="brgy-news-card-header">
        <div className="brgy-news-card-title-wrapper">
          <div className="brgy-news-card-title">
            {event.title}
            <span className="event-type-icon">
              <img
                src={event.type === "Event" ? EventLogo : NewsLogo}
                alt={event.type}
                width={30}
                height={30}
                style={{ marginLeft: "15px", verticalAlign: "middle" }}
              />
            </span>
          </div>
          <button
            className="brgy-news-card-edit-icon-btn"
            onClick={() => onEdit(event)}
            aria-label="Edit event"
          >
            <img
              src={EditBTN}
              alt="Edit"
              className="brgy-news-card-edit-icon"
            />
          </button>
        </div>
        <div className="brgy-news-card-meta">
          <span className="brgy-news-card-category">{event.category}</span>
          <span className="brgy-news-card-date">
            {new Date(event.date_start).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="brgy-news-card-body">
        <p className="brgy-news-card-description">{event.description}</p>
        {event.image_url && (
          <img
            src={`http://127.0.0.1:8000/${event.image_url}`}
            alt={event.title}
            className="brgy-news-card-image"
          />
        )}
      </div>
      <div className="brgy-news-card-footer">
        <span className="brgy-news-card-status">{event.status}</span>
        {event.rsvp_required && (
          <span className="brgy-news-card-rsvp">RSVP Required</span>
        )}
      </div>
    </AnimatedDiv>
  );
}

function BrgyNewsFeedAdmin() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/events");
    const data = await response.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdateEvent = async () => {
    await fetchEvents();
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (deletedEventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.event_id !== deletedEventId)
    );
    setSelectedEvent(null);
  };

  return (
    <>
      <BTNtoTop />
      <div className="brgy-news-feed-admin">
        {events.map((event) => (
          <EventCard
            key={event.event_id}
            event={event}
            onEdit={setSelectedEvent}
          />
        ))}

        {selectedEvent && (
          <BrgyNewsFeedEdit
            eventData={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onUpdate={handleUpdateEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </div>
    </>
  );
}

export default BrgyNewsFeedAdmin;
