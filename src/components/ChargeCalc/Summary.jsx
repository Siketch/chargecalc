import React from "react";

export default function Summary({ result }) {
  return (
    <section className="result-section" aria-live="polite">
      <h3>Calculation Summary</h3>
      <p>
        Billing Period:{" "}
        <strong>{result.days} day{result.days > 1 ? "s" : ""}</strong>
      </p>
      <p>Rent Charge: <strong>${result.rentCharge}</strong></p>
      <p>Glenn Dining: <strong>${result.diningCharge}</strong></p>
      <hr />
      <p><strong>Total: ${result.total}</strong></p>
    </section>
  );
}
