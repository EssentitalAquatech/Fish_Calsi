import { useMemo, useState } from "react";

import InputField from "../components/InputField";
import CalculatorChart from "../components/CalculatorChart";

export default function FeedRequirementCalculator() {
  const [biomass, setBiomass] = useState(1000);
  const [feedingRate, setFeedingRate] = useState(2);
  const [mealsPerDay, setMealsPerDay] = useState(2);

  const [calculatedInputs, setCalculatedInputs] = useState(null);

  // ==========================================
  // CALCULATE
  // ==========================================
  const handleCalculate = () => {
    setCalculatedInputs({
      biomass: Number(biomass) || 0,
      feedingRate: Number(feedingRate) || 0,
      mealsPerDay: Number(mealsPerDay) || 1,
    });
  };

  // ==========================================
  // RESULT
  // ==========================================
  const result = useMemo(() => {
    if (!calculatedInputs) {
      return null;
    }

    const fishBiomassKg = calculatedInputs.biomass;
    const rate = calculatedInputs.feedingRate;
    const meals = calculatedInputs.mealsPerDay;

    // Daily Feed = Biomass × Feeding Rate / 100
    const dailyFeedKg =
      fishBiomassKg * (rate / 100);

    // Feed per meal
    const feedPerMealKg =
      meals > 0 ? dailyFeedKg / meals : 0;

    return {
      dailyFeedKg,
      feedPerMealKg,
    };
  }, [calculatedInputs]);

  // ==========================================
  // CHART DATA
  // ==========================================
  const chartData = result
    ? [
        {
          name: "Fish Biomass",
          value: calculatedInputs.biomass,
        },
        {
          name: "Daily Feed",
          value: result.dailyFeedKg,
        },
        {
          name: "Feed / Meal",
          value: result.feedPerMealKg,
        },
      ]
    : [];

  return (
    <div className="calculator-card feed-requirement-calculator">

      {/* =====================================
          HEADER
      ====================================== */}
      <div className="feed-header">
        <div>
          <div className="feed-eyebrow">
            Daily Feeding
          </div>

          <h2>
            Feed Requirement Calculator
          </h2>

          <p className="text-muted">
            Calculate approximate daily feed requirement
            based on fish biomass and feeding rate.
          </p>
        </div>
      </div>

      {/* =====================================
          INPUT CARD
      ====================================== */}
      <div className="feed-input-card">

        <div className="feed-section-title">
          Calculation Inputs
        </div>

        <div className="row g-3">

          {/* Biomass */}
          <div className="col-md-4">
            <InputField
              label="Fish Biomass"
              value={biomass}
              onChange={setBiomass}
              suffix="kg"
              min="0"
              step="0.1"
            />
          </div>

          {/* Feeding Rate */}
          <div className="col-md-4">
            <InputField
              label="Feeding Rate"
              value={feedingRate}
              onChange={setFeedingRate}
              suffix="%"
              min="0"
              step="0.1"
            />
          </div>

          {/* Meals */}
          <div className="col-md-4">
            <InputField
              label="Meals Per Day"
              value={mealsPerDay}
              onChange={setMealsPerDay}
              suffix="meals"
              min="1"
              step="1"
            />
          </div>

        </div>

        {/* =================================
            CALCULATE BUTTON
        ================================== */}
        <div className="feed-calculate-wrap">

          <button
            type="button"
            className="feed-calculate-btn"
            onClick={handleCalculate}
          >
            🧮 Calculate Feed Requirement
          </button>

        </div>

      </div>

      {/* =====================================
          RESULTS
      ====================================== */}
      {result && (
        <>
          <div className="feed-results-title">

            <div>
              <h3>
                Calculation Results
              </h3>

              <p>
                Results based on the values you entered.
              </p>
            </div>

          </div>

          {/* =================================
              RESULT CARDS
          ================================== */}
          <div className="row g-3 mt-1">

            {/* Daily Feed */}
            <div className="col-md-6">

              <div className="feed-result-box feed-main-result">

                <div className="feed-result-label">
                  Daily Feed Requirement
                </div>

                <div className="feed-result-value">
                  {result.dailyFeedKg.toFixed(2)}
                  <span> kg/day</span>
                </div>

              </div>

            </div>

            {/* Feed Per Meal */}
            <div className="col-md-6">

              <div className="feed-result-box">

                <div className="feed-result-label">
                  Feed Per Meal
                </div>

                <div className="feed-result-value">
                  {result.feedPerMealKg.toFixed(2)}
                  <span> kg/meal</span>
                </div>

              </div>

            </div>

          </div>

          {/* =================================
              CHART
          ================================== */}
          {result.dailyFeedKg > 0 && (
            <div className="mt-4">

              <CalculatorChart
                title="Feed Requirement Overview"
                data={chartData}
                dataKey="value"
                xKey="name"
              />

            </div>
          )}

          {/* =================================
              FORMULA
          ================================== */}
          {result.dailyFeedKg > 0 && (
            <div className="feed-formula-card">

              <div className="feed-formula-title">
                Feed Requirement Calculation
              </div>

              <div className="feed-formula-main">
                Fish Biomass × Feeding Rate ÷ 100
              </div>

              <div className="feed-formula-calculation">

                {calculatedInputs.biomass.toFixed(2)}
                {" kg × "}

                {calculatedInputs.feedingRate.toFixed(2)}
                {"% ÷ 100 = "}

                <strong>
                  {result.dailyFeedKg.toFixed(2)} kg/day
                </strong>

              </div>

              <div className="feed-meal-calculation">

                Daily Feed ÷ Meals Per Day

                <span>
                  {result.dailyFeedKg.toFixed(2)}
                  {" kg ÷ "}
                  {calculatedInputs.mealsPerDay}
                  {" = "}
                  <strong>
                    {result.feedPerMealKg.toFixed(2)} kg/meal
                  </strong>
                </span>

              </div>

            </div>
          )}

          {/* =================================
              INFORMATION
          ================================== */}
          <div className="feed-info-card">

            <div className="feed-info-icon">
              💡
            </div>

            <div>
              <strong>
                Feeding Note
              </strong>

              <p>
                Feeding rate can vary depending on fish
                species, size, water temperature, water
                quality and culture conditions. Use this
                calculator as an approximate planning tool.
              </p>
            </div>

          </div>

        </>
      )}

    </div>
  );
}