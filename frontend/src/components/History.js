import React, { useEffect, useState } from "react";
import axios from "axios";

const History = ({ darkMode }) => {
  const [gradients, setGradients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your saved gradients.");
        return;
      }

      try {
        const response = await axios.get("https://color-gradient-app.onrender.com/api/gradients",
           {
            withCredentials: true,
          
        });
        setGradients(response.data.gradients);
      } catch (err) {
        console.error("❌ Error fetching gradient history:", err);
        setError("Failed to load gradient history. Please try again.");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
      <h2>📜 Your Gradient History</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginTop: '20px'
        }}
      >
        {gradients.length === 0 && !error && <p>No gradients saved yet!</p>}
        {gradients.map((gradient) => (
          <div
            key={gradient._id}
            style={{
              width: '200px',
              height: '100px',
              borderRadius: '10px',
              background: `linear-gradient(to left, ${gradient.color1}, ${gradient.color2})`,
              boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            }}
            title={gradient.name || "Unnamed Gradient"}
          />
        ))}
      </div>
    </div>
  );
};

export default History;
