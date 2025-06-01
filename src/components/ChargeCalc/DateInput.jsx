import React from "react";
import { format } from "date-fns";

export default function DateInput({ label, value, onChange, onSetToday }) {
  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <label className="label-block">
      {label}
      <div className="date-input-container">
        <input
          type="date"
          value={value}
          onChange={onChange}
          className="date-input"
        />
        <button
          type="button"
          onClick={() => onSetToday(today)}
          className="today-button"
        >
          Today
        </button>
      </div>
    </label>
  );
}
