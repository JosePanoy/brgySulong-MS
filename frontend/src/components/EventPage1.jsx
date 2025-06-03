import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import "../assets/css/events-page1.css";
import FilteringEvents from "../sub-components/filtering-events";

import CategoryIcon from "../assets/img/news_logo/category.png";
import WhenIcon from "../assets/img/news_logo/when.png";
import LocationLogo from "../assets/img/news_logo/location.png";
import OrganizerLogo from "../assets/img/news_logo/organizer.png";
import StatusLogo from "../assets/img/news_logo/status.png";
import RsvpLogo from "../assets/img/news_logo/rsvp.png";
import ContactLogo from "../assets/img/news_logo/contact.png";
import BTNtoTop from "../sub-components/button-top-top";


function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  const datePart = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} ${timePart}`;
}


function EventBox({ event }) {
  const AnimatedDiv = animated.div;
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const fadeIn = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    config: { duration: 600 },
    reset: true,
  });

  const isExpired = new Date(event.date_end) < new Date();

  return (
    <>
      <BTNtoTop />
      <AnimatedDiv ref={ref} style={fadeIn} className="event-page1-box">
        <div className="event-page1-header">
          <div>
            <h2 className="event-page1-box-title">{event.title}</h2>
            <p className="event-page1-date">{formatDateTime(event.created_at)}</p>
          </div>
          <div className="event-page1-box-topright">
            <p className="event-page1-box-category">{event.category}</p>
            {isExpired && <span className="event-expired-label">Expired</span>}
          </div>
        </div>

        <p className="event-page1-box-description">{event.description}</p>

        {event.image_url && (
          <img
            src={`http://127.0.0.1:8000/${event.image_url}`}
            alt={event.title}
            className="event-page1-box-image"
          />
        )}

        <div className="event-page1-box-details grid-2x3">

          <div className="detail-item">
            <img src={LocationLogo} alt="Location" className="icon" />
            <span>{event.location}</span>
          </div>

          <div className="detail-item">
            <img src={OrganizerLogo} alt="Organizer" className="icon" />
            <span>{event.organizer}</span>
          </div>

          <div className="detail-item">
            <img src={StatusLogo} alt="Status" className="icon" />
            <span>{event.status}</span>
          </div>

          <div className="detail-item">
            <img src={RsvpLogo} alt="RSVP" className="icon" />
            <span>{event.rsvp_required ? "Yes" : "No"}</span>
          </div>
        </div>

        <div className="contact-info">
          <img src={ContactLogo} alt="Contact" className="icon contact-icon" />
          <strong>
            Person to contact <span>{event.contact_person}</span>
          </strong>
        </div>

        <div className="event-duration">
          <strong>
            Starts: {formatDateTime(event.date_start)} | Ends: {formatDateTime(event.date_end)}
          </strong>
        </div>
      </AnimatedDiv>
    </>
  );
}

function EventPage1() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/events")
      .then((response) => {
        const eventOnly = response.data.filter((item) => item.type === "Event");
        setEvents(eventOnly);
        setFilteredEvents(eventOnly);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching events");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.contact_person.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterType === "latest") {
      filtered.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
    } else if (filterType === "priority") {
      filtered.sort((a, b) => b.priority - a.priority);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, filterType, events]);

  if (loading) return <div className="event-page1-loading">Loading...</div>;
  if (error) return <div className="event-page1-error">{error}</div>;

  return (
    <div className="event-page1-container">
      <h1 className="event-page1-title">
        Brgy. Sulong Schedules and Upcoming Events!
      </h1>
      <FilteringEvents
        setSearchQuery={setSearchQuery}
        setFilterType={setFilterType}
      />
      <div className="event-page1-list">
        {filteredEvents.map((event) => (
          <EventBox key={event.event_id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventPage1;
