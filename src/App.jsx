import React from "react";
import ThemeToggle from "./components/ThemeToggle";
import ChargeCalc from "./components/ChargeCalc"; // update import

export default function App() {
  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <ThemeToggle />
      <ChargeCalc />
    </div>
  );
}


