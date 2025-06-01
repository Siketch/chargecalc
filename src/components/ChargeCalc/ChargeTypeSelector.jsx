import React from "react";

export default function ChargeTypeSelector({ chargeType, setChargeType }) {
  return (
    <fieldset className="fieldset">
      <legend className="legend">Charge Type</legend>
      <label className="radio-label">
        <input
          type="radio"
          value="weekly"
          checked={chargeType === "weekly"}
          onChange={() => setChargeType("weekly")}
        />
        Weekly Rate
      </label>
      <label className="radio-label">
        <input
          type="radio"
          value="nightly"
          checked={chargeType === "nightly"}
          onChange={() => setChargeType("nightly")}
        />
        Nightly Rate
      </label>
    </fieldset>
  );
}
