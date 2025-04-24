import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Mic2, UserCircle } from "lucide-react";

export default function ArtBankConcertFinder() {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
      generateRecommendations(data);
    };

    fetchEvents();
  }, []);

  const generateRecommendations = (allEvents) => {
    const preferredTags = ["jazz", "improv", "acoustic"];
    const tagged = allEvents.filter(event =>
      event.tags?.some(tag => preferredTags.includes(tag.toLowerCase()))
    );

    const fallback = [...allEvents].sort(() => 0.5 - Math.random());
    const selected = tagged.length >= 3 ? tagged.slice(0, 3) : fallback.slice(0, 3);
    setRecommended(selected);
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(query.toLowerCase()) ||
    event.location.toLowerCase().includes(query.toLowerCase()) ||
    event.type.toLowerCase().includes(query.toLowerCase()) ||
    event.role.toLowerCase().includes(query.toLowerCase()) ||
    (event.tags && event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())))
  );

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };

  return (
    <div className="concert-search">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Art Bank Concert Finder</h1>
        <UserCircle style={{ cursor: "pointer" }} size={32} onClick={handleProfileClick} />
      </div>
      <input
        type="text"
        placeholder="Search by title, location, type, role, or tag"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <h2>Recommended for You</h2>
      <ul>
        {recommended.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {event.date} — {event.time} — {event.location} — {event.type} — <em>Role: {event.role}</em> — Tags: {event.tags?.join(", ")}
          </li>
        ))}
      </ul>
      <h2>All Events</h2>
      <ul>
        {filteredEvents.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {event.date} — {event.time} — {event.location} — {event.type} — <em>Role: {event.role}</em> — Tags: {event.tags?.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}