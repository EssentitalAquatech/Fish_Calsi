// import { useState } from "react";
// import InputField from "../components/InputField";
// import ResultCard from "../components/ResultCard";
// import { calculateFCR } from "../utils/calculations";
// import { formatNumber } from "../utils/formatters";

// function FCRCalculator() {
//   const [feed, setFeed] = useState("");
//   const [initialBiomass, setInitialBiomass] = useState("");
//   const [finalBiomass, setFinalBiomass] = useState("");

//   const [result, setResult] = useState(null);

//   const calculate = (e) => {
//     e.preventDefault();

//     const biomassGain =
//       Number(finalBiomass) - Number(initialBiomass);

//     if (Number(feed) <= 0 || biomassGain <= 0) {
//       setResult(null);
//       return;
//     }

//     const calculatedFCR = calculateFCR(
//       feed,
//       biomassGain
//     );

//     setResult(calculatedFCR);
//   };

//   return (
//     <div className="calculator-inner">

//       <form onSubmit={calculate} className="calculator-form">

//         <InputField
//           label="Total Feed Consumed"
//           value={feed}
//           onChange={setFeed}
//           suffix="kg"
//         />

//         <InputField
//           label="Initial Fish Biomass"
//           value={initialBiomass}
//           onChange={setInitialBiomass}
//           suffix="kg"
//         />

//         <InputField
//           label="Final Fish Biomass"
//           value={finalBiomass}
//           onChange={setFinalBiomass}
//           suffix="kg"
//         />

//         <button
//           type="submit"
//           className="calculate-button"
//         >
//           Calculate FCR
//         </button>

//       </form>

//       {result !== null && (
//         <ResultCard
//           title="FCR Result"
//           value={formatNumber(result, 2)}
//         />
//       )}

//       <div className="formula-info">
//         <h3 className="formula-info-title">
//           Formula
//         </h3>

//         <p className="formula-info-text">
//           Biomass Gain = Final Biomass − Initial Biomass
//         </p>

//         <p className="formula-info-text">
//           FCR = Total Feed Consumed ÷ Biomass Gain
//         </p>
//       </div>

//     </div>
//   );
// }

// export default FCRCalculator;

















import { useMemo, useState } from "react";

import InputField from "../components/InputField";

import { calculateFCR } from "../utils/calculations";

export default function FCRCalculator() {
  const [feed, setFeed] = useState(1000);

  const [initialBiomass, setInitialBiomass] =
    useState(500);

  const [finalBiomass, setFinalBiomass] =
    useState(1200);

  // ==========================================================
  // CALCULATED INPUT SNAPSHOT
  // ==========================================================

  const [calculatedInputs, setCalculatedInputs] =
    useState(null);

  // ==========================================================
  // CALCULATION
  // ==========================================================

  const result = useMemo(() => {
    if (!calculatedInputs) {
      return null;
    }

    const totalFeedKg =
      Number(calculatedInputs.feed) || 0;

    const initialBiomassKg =
      Number(calculatedInputs.initialBiomass) || 0;

    const finalBiomassKg =
      Number(calculatedInputs.finalBiomass) || 0;

    const biomassGainKg = finalBiomassKg - initialBiomassKg;

    const fcr =
      totalFeedKg > 0 && biomassGainKg > 0
        ? totalFeedKg / biomassGainKg
        : 0;

    return {
      totalFeedKg,
      initialBiomassKg,
      finalBiomassKg,
      biomassGainKg,
      fcr: Number(fcr) || 0,
    };
  }, [calculatedInputs]);

  // ==========================================================
  // CALCULATE BUTTON
  // ==========================================================

  const handleCalculate = () => {
    setCalculatedInputs({
      feed,
      initialBiomass,
      finalBiomass,
    });
  };

  // ==========================================================
  // GRAPH DATA
  // ==========================================================

  const chartData = result
    ? [
        {
          name: "Feed Consumed",
          value: Number(
            result.totalFeedKg.toFixed(2)
          ),
        },
        {
          name: "Biomass Gain",
          value: Number(
            result.biomassGainKg.toFixed(2)
          ),
        },
      ]
    : [];

  return (
    <div className="calculator-card fcr-calculator">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="fcr-header">

        <div className="fcr-header-icon">
          🐟
        </div>

        <div>
          <h2>FCR Calculator</h2>

          <p>
            Calculate Feed Conversion Ratio from total
            feed consumed and biomass gain.
          </p>
        </div>

      </div>

      {/* ======================================================
          INPUT SECTION
      ====================================================== */}

      <div className="fcr-input-section">

        <div className="fcr-section-header">

          <div className="fcr-section-icon">
            🌾
          </div>

          <div>
            <h3>Feeding & Biomass Details</h3>

            <p>
              Enter feed consumption and fish biomass values.
            </p>
          </div>

        </div>

        <div className="row g-3">

          {/* TOTAL FEED */}

          <div className="col-md-4">

            <InputField
              label="Total Feed Consumed"
              value={feed}
              onChange={setFeed}
              suffix="kg"
              min="0"
              step="0.1"
            />

          </div>

          {/* INITIAL BIOMASS */}

          <div className="col-md-4">

            <InputField
              label="Initial Biomass"
              value={initialBiomass}
              onChange={setInitialBiomass}
              suffix="kg"
              min="0"
              step="0.1"
            />

          </div>

          {/* FINAL BIOMASS */}

          <div className="col-md-4">

            <InputField
              label="Final Biomass"
              value={finalBiomass}
              onChange={setFinalBiomass}
              suffix="kg"
              min="0"
              step="0.1"
            />

          </div>

        </div>

      </div>

      {/* ======================================================
          CALCULATE BUTTON
      ====================================================== */}

      <div className="fcr-calculate-section">

        <button
          type="button"
          className="fcr-calculate-btn"
          onClick={handleCalculate}
        >
          <span className="fcr-calculate-icon">
            🧮
          </span>

          <span>
            Calculate FCR
          </span>
        </button>

        <p>
          Enter the values and click Calculate to generate
          the FCR result.
        </p>

      </div>

      {/* ======================================================
          RESULTS
      ====================================================== */}

      {result && (
        <>

          <div className="fcr-results-section">

            <div className="fcr-result-header">

              <div>
                <h3>FCR Calculation Results</h3>

                <p>
                  Feed efficiency based on the entered biomass
                  and feed consumption.
                </p>
              </div>

              <div className="fcr-result-badge">
                ✓ Calculated
              </div>

            </div>

            <div className="row g-3">

              {/* BIOMASS GAIN */}

              <div className="col-md-6">

                <div className="fcr-result-card">

                  <div className="fcr-result-icon">
                    🐟
                  </div>

                  <div className="fcr-result-content">

                    <small>
                      Biomass Gain
                    </small>

                    <strong>
                      {Number(
                        result.biomassGainKg
                      ).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}{" "}
                      kg
                    </strong>

                  </div>

                </div>

              </div>

              {/* FCR */}

              <div className="col-md-6">

                <div className="fcr-result-card fcr-primary-result">

                  <div className="fcr-result-icon">
                    📊
                  </div>

                  <div className="fcr-result-content">

                    <small>
                      Feed Conversion Ratio
                    </small>

                    <strong>
                      {Number(
                        result.fcr
                      ).toFixed(2)}
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              INVALID INPUT WARNING
          ================================================== */}

          {result.biomassGainKg <= 0 && (
            <div className="fcr-warning-box">

              <div className="fcr-warning-icon">
                ⚠️
              </div>

              <div>
                <strong>
                  Biomass gain cannot be calculated
                </strong>

                <p>
                  Final biomass must be greater than
                  initial biomass to calculate FCR.
                </p>
              </div>

            </div>
          )}

          {/* ==================================================
              FORMULA
          ================================================== */}

          {result.biomassGainKg > 0 && (
            <div className="fcr-formula-card">

              <div className="fcr-formula-header">

                <div className="fcr-formula-icon">
                  ∑
                </div>

                <div>
                  <h3>FCR Calculation</h3>

                  <p>
                    Total Feed Consumed ÷ Biomass Gain
                  </p>
                </div>

              </div>

              <div className="fcr-formula-content">

                <div className="fcr-formula-value">

                  <span>
                    {Number(
                      result.totalFeedKg
                    ).toFixed(2)} kg
                  </span>

                  <strong>÷</strong>

                  <span>
                    {Number(
                      result.biomassGainKg
                    ).toFixed(2)} kg
                  </span>

                  <strong>=</strong>

                  <b>
                    {Number(
                      result.fcr
                    ).toFixed(2)}
                  </b>

                </div>

              </div>

            </div>
          )}

          {/* ==================================================
              GRAPH
          ================================================== */}

          {result.biomassGainKg > 0 && (
            <div className="fcr-chart-section">

              <div className="fcr-chart-heading">

                <div>
                  <h3>Feed Efficiency Overview</h3>

                  <p>
                    Comparison between total feed consumed
                    and biomass gained.
                  </p>
                </div>

                <div className="fcr-chart-badge">
                  FCR {Number(result.fcr).toFixed(2)}
                </div>

              </div>

              <div className="fcr-custom-chart">

                {(() => {
                  const maxValue = Math.max(
                    result.totalFeedKg,
                    result.biomassGainKg,
                    1
                  );

                  const feedHeight =
                    (result.totalFeedKg /
                      maxValue) *
                    100;

                  const biomassHeight =
                    (result.biomassGainKg /
                      maxValue) *
                    100;

                  return (
                    <>

                      <div className="fcr-chart-y-axis">

                        <span>
                          {maxValue.toLocaleString(
                            "en-IN"
                          )} kg
                        </span>

                        <span>
                          {Math.round(
                            maxValue * 0.75
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span>
                          {Math.round(
                            maxValue * 0.5
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span>
                          {Math.round(
                            maxValue * 0.25
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span>0</span>

                      </div>

                      <div className="fcr-chart-main">

                        <div className="fcr-chart-grid">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>

                        <div className="fcr-chart-bars">

                          {/* FEED */}

                          <div className="fcr-chart-column">

                            <div className="fcr-chart-value">
                              {result.totalFeedKg.toLocaleString(
                                "en-IN",
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              kg
                            </div>

                            <div className="fcr-chart-bar-wrapper">

                              <div
                                className="fcr-chart-bar fcr-feed-bar"
                                style={{
                                  height: `${Math.max(
                                    feedHeight,
                                    4
                                  )}%`,
                                }}
                              ></div>

                            </div>

                            <div className="fcr-chart-label">
                              🌾 Feed Consumed
                            </div>

                          </div>

                          {/* BIOMASS */}

                          <div className="fcr-chart-column">

                            <div className="fcr-chart-value">
                              {result.biomassGainKg.toLocaleString(
                                "en-IN",
                                {
                                  maximumFractionDigits: 2,
                                }
                              )}{" "}
                              kg
                            </div>

                            <div className="fcr-chart-bar-wrapper">

                              <div
                                className="fcr-chart-bar fcr-biomass-bar"
                                style={{
                                  height: `${Math.max(
                                    biomassHeight,
                                    4
                                  )}%`,
                                }}
                              ></div>

                            </div>

                            <div className="fcr-chart-label">
                              🐟 Biomass Gain
                            </div>

                          </div>

                        </div>

                      </div>

                    </>
                  );
                })()}

              </div>

            </div>
          )}

        </>
      )}

    </div>
  );
}
