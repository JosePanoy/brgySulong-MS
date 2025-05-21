import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import "../assets/css/events-page1.css";
import FilteringEvents from '../sub-components/filtering-events';

function EventBox({ event }) {
    const AnimatedDiv = animated.div;
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    const fadeIn = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        config: { duration: 600 },
        reset: true,
    });

    const isExpired = new Date(event.date_end) < new Date();

    return (
        <animated.div ref={ref} style={fadeIn} className="event-page1-box">
            <div className="event-page1-header">
                <h2 className="event-page1-box-title">{event.title}</h2>
                <div className="event-page1-box-topright">
                    <p className="event-page1-box-category">{event.category}</p>
                    {isExpired && <span className="event-expired-label">Expired</span>}
                </div>
            </div>
            <p className="event-page1-box-description">{event.description}</p>
            <div className="event-page1-box-details">
                <p><strong>Start Date:</strong> {new Date(event.date_start).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>End Date:</strong> {new Date(event.date_end).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Organizer:</strong> {event.organizer}</p>
                <p><strong>Status:</strong> {event.status}</p>
            </div>
            <div className="event-page1-footer">
                <p><strong>RSVP:</strong> {event.rsvp_required ? "Yes" : "No"}</p>
                <p><strong>Contact:</strong> {event.contact_person}</p>
            </div>
        </animated.div>
    );
}

function EventPage1() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/events')
            .then(response => {
                setEvents(response.data);
                setFilteredEvents(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching events');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = [...events];

        if (searchQuery) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.contact_person.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterType === 'latest') {
            filtered.sort((a, b) => new Date(b.date_start) - new Date(a.date_start));
        } else if (filterType === 'priority') {
            filtered.sort((a, b) => b.priority - a.priority);
        }

        setFilteredEvents(filtered);
    }, [searchQuery, filterType, events]);

    if (loading) return <div className="event-page1-loading">Loading...</div>;
    if (error) return <div className="event-page1-error">{error}</div>;

    return (
        <div className="event-page1-container">
            <h1 className="event-page1-title">Brgy. Sulong Schedules and Upcoming Events!</h1>
            <FilteringEvents
                setSearchQuery={setSearchQuery}
                setFilterType={setFilterType}
            />
            <div className="event-page1-list">
                {filteredEvents.map(event => (
                    <EventBox key={event.event_id} event={event} />
                ))}
            </div>
        </div>
    );
}

export default EventPage1;
