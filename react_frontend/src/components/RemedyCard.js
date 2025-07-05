import React from "react";

// PUBLIC_INTERFACE
function RemedyCard({ remedy }) {
  return (
    <div className="ayu-remedy-card">
      <img className="ayu-remedy-img" src={remedy.image || "/herb-placeholder.jpg"} alt={remedy.name} />
      <h3>{remedy.name}</h3>
      <span className="ayu-remedy-cat">{remedy.category}</span>
      <p>{remedy.shortDesc}</p>
      <ul>
        {remedy.keyUses.map((u, i) => <li key={i}>{u}</li>)}
      </ul>
    </div>
  );
}
export default RemedyCard;
