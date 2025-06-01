import React, { useState } from "react";
import { differenceInDays, format } from "date-fns";
import DateInput from "./DateInput.jsx";
import ChargeTypeSelector from "./ChargeTypeSelector.jsx";
import RefundSelector from "./RefundSelector.jsx";
import Summary from "./Summary.jsx";
import "../../assets/styles.css";

const GLENN_DINING_WEEKLY_RATE = 160;

export default function ChargeCalc({ ThemeToggle }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [chargeType, setChargeType] = useState("weekly");
  const [rateAmount, setRateAmount] = useState("");
  const [glennDining, setGlennDining] = useState(false);
  const [isRefund, setIsRefund] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const weeksFromDays = (days) => Math.ceil(days / 7);
  const todayString = format(new Date(), "yyyy-MM-dd");

  const calculate = () => {
    setError("");
    setResult(null);

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError("End date cannot be before start date.");
      return;
    }

    const days = differenceInDays(new Date(endDate), new Date(startDate)) + 1;
    if (days <= 0) {
      setError("Billing period must be at least one day.");
      return;
    }

    const rate = parseFloat(rateAmount);
    if (isNaN(rate) || rate <= 0) {
      setError("Please enter a valid positive rate amount.");
      return;
    }

    let rentCharge =
      chargeType === "weekly"
        ? weeksFromDays(days) * rate
        : days * rate;

    let diningCharge = glennDining
      ? weeksFromDays(days) * GLENN_DINING_WEEKLY_RATE
      : 0;

    let total = rentCharge + diningCharge;

    if (isRefund) {
      total = -total;
      rentCharge = -rentCharge;
      diningCharge = -diningCharge;
    }

    setResult({
      days,
      rentCharge: rentCharge.toFixed(2),
      diningCharge: diningCharge.toFixed(2),
      total: total.toFixed(2),
    });
  };

  const clearAll = () => {
    setStartDate("");
    setEndDate("");
    setChargeType("weekly");
    setRateAmount("");
    setGlennDining(false);
    setIsRefund(false);
    setResult(null);
    setError("");
  };

  return (
    <div className="charge-calc-container">
      <h1 className="charge-calc-title">Charge Calculator</h1>

      <DateInput
        label="Billing Period Start Date:"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        onSetToday={(today) => setStartDate(today)}
      />

      <DateInput
        label="Billing Period End Date:"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        onSetToday={(today) => setEndDate(today)}
      />

      <ChargeTypeSelector
        chargeType={chargeType}
        setChargeType={setChargeType}
      />

      <label className="label-block">
        Rate Amount ($):
        <input
          type="number"
          min="0"
          step="0.01"
          value={rateAmount}
          onChange={(e) => setRateAmount(e.target.value)}
          placeholder="Enter rate per week or night"
          className="rate-input"
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={glennDining}
          onChange={() => setGlennDining(!glennDining)}
          className="checkbox-input"
        />
        Add Glenn Dining ($160/week)
      </label>

      <RefundSelector isRefund={isRefund} setIsRefund={setIsRefund} />

      {error && <p className="error-message" role="alert">{error}</p>}

      <div className="button-group">
        <button className="calc-button" onClick={calculate}>Calculate</button>
        <button className="clear-button" onClick={clearAll}>Clear</button>
        {ThemeToggle && (
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
        )}
      </div>

      {result && <Summary result={result} />}
    </div>
  );
}
