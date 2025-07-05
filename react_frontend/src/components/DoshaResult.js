import React from "react";
import Button from "./Button";

// PUBLIC_INTERFACE
function DoshaResult({ dosha }) {
  return (
    <div className="ayu-dosha-result">
      <h2>Your Dosha: {dosha}</h2>
      <img
        className="ayu-dosha-img"
        alt={dosha}
        src={`/dosha-${dosha.toLowerCase()}.jpg`}
        style={{ maxWidth: 120, borderRadius: "50%" }}
      />
      <p>
        {/* Demo description */}
        {dosha === "Vata"
          ? "Creative, lively, quick to think, prone to dryness. Favor warm, grounding routines and foods."
          : dosha === "Pitta"
          ? "Intelligent, focused, passionate. Favor cooling, calming foods and time in nature."
          : "Steady, calm, reliable. Favor light, energetic activities and fresh foods."}
      </p>
      <Button to="/remedies">See Recommended Remedies</Button>
    </div>
  );
}
export default DoshaResult;
