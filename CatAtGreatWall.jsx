
import React, { useState } from "react";

export default function CatAtGreatWall() {
  const samples = [
    "/cat_wall_1.png",
    "/cat_wall_2.png",
    "/cat_wall_3.png"
  ];

  const [imageUrl, setImageUrl] = useState(() => samples[Math.floor(Math.random() * samples.length)]);

  const generateNewImage = () => {
    const newUrl = samples[Math.floor(Math.random() * samples.length)];
    setImageUrl(newUrl);
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Cat at the Great Wall of China 🐱🏯</h1>
      <button onClick={generateNewImage} style={{ marginBottom: "1rem", padding: "0.5rem 1rem", fontSize: "1rem" }}>
        Generate New Cat Image
      </button>
      {imageUrl && <img src={imageUrl} alt="Cat at the Great Wall" style={{ maxWidth: "100%", borderRadius: "8px" }} />}
    </div>
  );
}
