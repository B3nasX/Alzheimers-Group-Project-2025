import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";
import "./Dashboard.css";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = ({ user, onLogout }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsDoc = doc(db, "news_web", "news");
        const newsSnap = await getDoc(newsDoc);

        if (newsSnap.exists()) {
          const newsData = newsSnap.data();
          setNews(Array.isArray(newsData.news) ? newsData.news : []);
        } else {
          console.log("No news data found");
        }
      } catch (error) {
        console.error("Error loading news: ", error);
      }
    };

    loadNews();
  }, []);

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />

      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>
            Welcome, {user.firstName} {user.lastName}
          </h1>
          <p>Role: {user.role.toUpperCase()}</p>
        </header>

        <div className="dashboard-grid">
          <Link to="/patients" className="dashboard-card">
            <h3>Patient Profiles</h3>
            <p>View and manage patient information</p>
          </Link>

          <Link to="/test-results" className="dashboard-card">
            <h3>Quiz Results</h3>
            <p>View patients Quiz results</p>
          </Link>

          {user.role === "admin" && (
            <Link to="/manage-users" className="dashboard-card">
              <h3>User Management</h3>
              <p>Manage staff accounts</p>
            </Link>
          )}
        </div>

        <div className="recent-news">
          <h2>Recent News</h2>
          <div className="news-list">
            {news.length === 0 && <p>No news available.</p>}
            <ul>
            {news.map((item, index) => (
              <div key={index} className="news-item">
              <li>{item}</li>
              </div>     
            ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
