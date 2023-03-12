import React from "react";
import Confetti from "react-confetti";

export default function ConfettiComponent() {
  return (
    <Confetti
      width={window.innerWidth || 300}
      height={window.innerHeight || 200}
      className="z-20"
      numberOfPieces={500}
    />
  );
}
