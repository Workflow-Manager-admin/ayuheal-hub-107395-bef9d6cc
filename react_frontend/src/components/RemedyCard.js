import React from "react";

// PUBLIC_INTERFACE
function RemedyCard({ remedy }) {
  if (!remedy) return null;
  return (
    <div className="ayu-remedy-card">
      <img
        className="ayu-remedy-img"
        src={remedy.image || "/herb-placeholder.jpg"}
        alt={remedy.name}
        onError={e => { e.target.src = "/herb-placeholder.jpg"; }}
      />
      <h3>{remedy.name}</h3>
      <span className="ayu-remedy-cat">{remedy.category}</span>
      <p>{remedy.shortDesc}</p>
      {remedy.keyUses && remedy.keyUses.length > 0 && (
        <ul>
          {remedy.keyUses.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default RemedyCard;
