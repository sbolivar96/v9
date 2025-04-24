
import React, { useEffect, useState } from "react";
import { BarChart2, Users, Clock, Search, Image } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function UserAnalytics() {
  const [analytics, setAnalytics] = useState({
    visits: 0,
    searches: 0,
    avgSessionTime: 0,
    activeUsers: 0,
    visitHistory: [],
    searchTrends: []
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch("/api/analytics");
      const data = await response.json();
      setAnalytics(data);
    };

    fetchAnalytics();
  }, []);

  const handleCatClick = () => {
    window.open("/cat-at-great-wall", "_blank");
  };

  return (
    <div className="user-analytics" style={{ padding: "2rem", position: "relative" }}>
      <h1>User Engagement Analytics</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <BarChart2 size={32} />
          <div>
            <strong>Total Visits:</strong>
            <p>{analytics.visits}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Search size={32} />
          <div>
            <strong>Search Queries:</strong>
            <p>{analytics.searches}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Clock size={32} />
          <div>
            <strong>Avg. Session Time:</strong>
            <p>{analytics.avgSessionTime} min</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Users size={32} />
          <div>
            <strong>Active Users:</strong>
            <p>{analytics.activeUsers}</p>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: "3rem" }}>Visit History</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={analytics.visitHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="visits" />
        </BarChart>
      </ResponsiveContainer>

      <h2 style={{ marginTop: "3rem" }}>Search Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={analytics.searchTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="query" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", cursor: "pointer" }} onClick={handleCatClick}>
        <Image size={40} title="Click to see a cat at the Great Wall of China" />
      </div>
    </div>
  );
}
