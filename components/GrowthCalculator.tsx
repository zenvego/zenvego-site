"use client";

import { useMemo, useState } from "react";
import { openProjectModal } from "./ProjectModal";

const FULL_TIME_HOURS = 40;
const WEEKS = 52;

const FIELDS = [
  {
    key: "team",
    label: "Team size",
    hint: "How many people do manual follow-up or ops work",
    min: 1,
    max: 40,
    step: 1,
    unit: "people",
  },
  {
    key: "hours",
    label: "Hours per week",
    hint: "Hours each person spends on that manual work every week",
    min: 1,
    max: 40,
    step: 1,
    unit: "hrs / week",
  },
  {
    key: "salary",
    label: "Average annual salary",
    hint: "Typical yearly salary (INR) for one person on that team",
    min: 300000,
    max: 2400000,
    step: 50000,
    unit: "per person / year",
  },
] as const;

type Key = (typeof FIELDS)[number]["key"];

const rupee = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});
const grouped = new Intl.NumberFormat("en-IN");

function percent(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100;
}

export default function GrowthCalculator() {
  const [values, setValues] = useState<Record<Key, number>>({
    team: 16,
    hours: 10,
    salary: 600000,
  });

  const result = useMemo(() => {
    const hoursYear = values.team * values.hours * WEEKS;
    const fte = (values.team * values.hours) / FULL_TIME_HOURS;
    const yearly = fte * values.salary;
    return {
      hoursYear,
      fte,
      yearly,
      monthly: yearly / 12,
    };
  }, [values]);

  return (
    <section className="block" id="calculator">
      <div className="wrap">
        <div className="calc-head">
          <h2>
            Growth <span className="grnk">calculator</span>
          </h2>
          <p>
            A full-time year is 40 hours a week. The figure on the right is the
            salary spent on manual work, not on the product.
          </p>
        </div>

        <div className="calc">
          <form className="calc-in" onSubmit={(event) => event.preventDefault()}>
            <p className="calc-kicker">Your inputs</p>
            {FIELDS.map((field) => {
              const value = values[field.key];
              const shown = field.key === "salary" ? rupee.format(value) : grouped.format(value);
              return (
                <label className="calc-field" key={field.key}>
                  <span className="calc-field-top">
                    <span className="calc-label">{field.label}</span>
                    <span className="calc-value">
                      {shown}
                      <span className="calc-unit">{field.unit}</span>
                    </span>
                  </span>
                  <span className="calc-hint">{field.hint}</span>
                  <input
                    className="calc-range"
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={value}
                    aria-valuetext={`${shown} ${field.unit}`}
                    style={{ ["--p" as string]: `${percent(value, field.min, field.max)}%` }}
                    onChange={(event) => {
                      const next = Number(event.target.value);
                      setValues((current) => ({ ...current, [field.key]: next }));
                    }}
                  />
                </label>
              );
            })}
          </form>

          <div className="calc-out">
            <p className="calc-kicker light">What it costs you</p>
            <p className="calc-out-label">Cost of manual work / year</p>
            <p className="calc-year" aria-live="polite">
              {rupee.format(Math.round(result.yearly))}
            </p>
            <p className="calc-out-note">Salary value lost to busywork across the team</p>
            <dl className="calc-stats">
              <div>
                <dt>Per month</dt>
                <dd>{rupee.format(Math.round(result.monthly))}</dd>
                <span>Same burn, monthly</span>
              </div>
              <div>
                <dt>Hours wasted / year</dt>
                <dd>{grouped.format(Math.round(result.hoursYear))}</dd>
                <span>Total team hours</span>
              </div>
              <div>
                <dt>Full-time equivalent</dt>
                <dd>{result.fte.toFixed(1)} FTE</dd>
                <span>People-years of work</span>
              </div>
            </dl>
            <button type="button" className="btn btn-green calc-cta" onClick={openProjectModal}>
              See what we&apos;d automate →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
