import React from "react";

export default function RefundSelector({ isRefund, setIsRefund }) {
  return (
    <fieldset className="fieldset">
      <legend className="legend">Charge or Refund</legend>
      <label className="radio-label">
        <input
          type="radio"
          name="chargeOrRefund"
          value="charge"
          checked={!isRefund}
          onChange={() => setIsRefund(false)}
        />
        Charge
      </label>
      <label className="radio-label">
        <input
          type="radio"
          name="chargeOrRefund"
          value="refund"
          checked={isRefund}
          onChange={() => setIsRefund(true)}
        />
        Refund
      </label>
    </fieldset>
  );
}
