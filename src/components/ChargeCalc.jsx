import React, { useState } from "react";
import { differenceInDays, format } from "date-fns";
import "../assets/styles.css";

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

      <label className="label-block">
        Billing Period Start Date:
        <div className="date-input-container">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
            aria-label="Billing period start date"
          />
          <button
            type="button"
            onClick={() => setStartDate(todayString)}
            className="today-button"
            aria-label="Set start date to today"
          >
            Today
          </button>
        </div>
      </label>

      <label className="label-block">
        Billing Period End Date:
        <div className="date-input-container">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="date-input"
            aria-label="Billing period end date"
          />
          <button
            type="button"
            onClick={() => setEndDate(todayString)}
            className="today-button"
            aria-label="Set end date to today"
          >
            Today
          </button>
        </div>
      </label>

      <fieldset className="fieldset">
        <legend className="legend">Charge Type</legend>
        <label className="radio-label">
          <input
            type="radio"
            name="chargeType"
            value="weekly"
            checked={chargeType === "weekly"}
            onChange={() => setChargeType("weekly")}
          />
          Weekly Rate
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="chargeType"
            value="nightly"
            checked={chargeType === "nightly"}
            onChange={() => setChargeType("nightly")}
          />
          Nightly Rate
        </label>
      </fieldset>

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
          aria-label="Rate amount in dollars"
        />
      </label>

      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={glennDining}
          onChange={() => setGlennDining(!glennDining)}
          className="checkbox-input"
          aria-checked={glennDining}
          aria-label="Add Glenn Dining weekly charge"
        />
        Add Glenn Dining ($160/week)
      </label>

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

      {error && <p role="alert" className="error-message">{error}</p>}

      <div className="button-group">
        <button
          onClick={calculate}
          className="calc-button"
          aria-label="Calculate charges"
        >
          Calculate
        </button>
        <button
          onClick={clearAll}
          className="clear-button"
          aria-label="Clear all inputs"
        >
          Clear
        </button>
        {ThemeToggle && (
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
        )}
      </div>

      {result && (
        <section className="result-section" aria-live="polite">
          <h3>Calculation Summary</h3>
          <p>
            Billing Period:{" "}
            <strong>
              {result.days} day{result.days > 1 ? "s" : ""}
            </strong>
          </p>
          <p>
            Rent Charge: <strong>${result.rentCharge}</strong>
          </p>
          <p>
            Glenn Dining: <strong>${result.diningCharge}</strong>
          </p>
          <hr />
          <p>
            <strong>Total: ${result.total}</strong>
          </p>
        </section>
      )}
    </div>
  );
}
