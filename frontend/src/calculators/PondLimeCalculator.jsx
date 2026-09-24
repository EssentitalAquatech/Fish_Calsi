// import { useMemo, useState } from "react";
// import limeData from "../data/limeData";

// function getPHRange(ph) {
//   const value = Number(ph);

//   if (value >= 4.5 && value < 5.0)
//     return "4.5-5.0";

//   if (value >= 5.0 && value < 6.0)
//     return "5.0-6.0";

//   if (value >= 6.0 && value < 6.5)
//     return "6.0-6.5";

//   if (value >= 6.5 && value <= 7.5)
//     return "6.5-7.5";

//   return null;
// }

// export default function PondLimeCalculator() {
//   const [area, setArea] =
//     useState(1);

//   const [soilPH, setSoilPH] =
//     useState(6);

//   const [texture, setTexture] =
//     useState("medium");

//   const result = useMemo(() => {
//     const range =
//       getPHRange(soilPH);

//     if (!range) {
//       return {
//         range: null,
//         rate: 0,
//         total: 0,
//       };
//     }

//     const rate =
//       limeData[range][texture];

//     return {
//       range,
//       rate,
//       total:
//         Number(area || 0) *
//         rate,
//     };
//   }, [
//     area,
//     soilPH,
//     texture,
//   ]);

//   return (
//     <div className="calculator-card">
//       <h2>
//         Pond Lime Calculator
//       </h2>

//       <div className="row g-3">
//         <div className="col-md-4">
//           <label className="form-label">
//             Pond Area (ha)
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={area}
//             min="0"
//             onChange={(e) =>
//               setArea(e.target.value)
//             }
//           />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">
//             Soil pH
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={soilPH}
//             step="0.1"
//             onChange={(e) =>
//               setSoilPH(
//                 e.target.value
//               )
//             }
//           />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label">
//             Soil Texture
//           </label>

//           <select
//             className="form-select"
//             value={texture}
//             onChange={(e) =>
//               setTexture(
//                 e.target.value
//               )
//             }
//           >
//             <option value="sandy">
//               Sandy
//             </option>

//             <option value="medium">
//               Medium
//             </option>

//             <option value="clayey">
//               Clayey
//             </option>
//           </select>
//         </div>
//       </div>

//       {!result.range && (
//         <div className="alert alert-warning mt-3">
//           The current pH is outside the
//           calculator's configured
//           4.5–7.5 range.
//         </div>
//       )}

//       {result.range && (
//         <div className="row g-3 mt-3">
//           <div className="col-md-6">
//             <div className="result-box">
//               <small>
//                 Recommended Rate
//               </small>

//               <strong>
//                 {result.rate.toLocaleString(
//                   "en-IN"
//                 )}{" "}
//                 kg/ha
//               </strong>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="result-box">
//               <small>
//                 Estimated Total Lime
//               </small>

//               <strong>
//                 {result.total.toLocaleString(
//                   "en-IN"
//                 )}{" "}
//                 kg
//               </strong>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="alert alert-info mt-3">
//         Lime requirement should be validated
//         against actual soil and water
//         conditions and the applicable
//         aquaculture SOP.
//       </div>
//     </div>
//   );
// }














import { useMemo, useState } from "react";
import limeData from "../data/limeData";

function getPHRange(ph) {
  const value = Number(ph);

  if (value >= 4.5 && value < 5.0) return "4.5-5.0";

  if (value >= 5.0 && value < 6.0) return "5.0-6.0";

  if (value >= 6.0 && value < 6.5) return "6.0-6.5";

  if (value >= 6.5 && value <= 7.5) return "6.5-7.5";

  return null;
}

function formatNumber(value, digits = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(number);
}

export default function PondLimeCalculator() {
  const [area, setArea] = useState(1);
  const [soilPH, setSoilPH] = useState(6);
  const [texture, setTexture] = useState("medium");

  // Result will remain hidden until Calculate is clicked
  const [calculatedInputs, setCalculatedInputs] = useState(null);

  const result = useMemo(() => {
    if (!calculatedInputs) {
      return null;
    }

    const range = getPHRange(calculatedInputs.soilPH);

    if (!range) {
      return {
        range: null,
        rate: 0,
        total: 0,
      };
    }

    const rate = Number(limeData[range]?.[calculatedInputs.texture]) || 0;

    const total =
      Number(calculatedInputs.area || 0) * rate;

    return {
      range,
      rate,
      total,
    };
  }, [calculatedInputs]);

  const handleCalculate = () => {
    setCalculatedInputs({
      area: Number(area) || 0,
      soilPH: Number(soilPH),
      texture,
    });
  };

  const graphMax = result
    ? Math.max(result.rate, result.total, 1)
    : 1;

  const rateHeight =
    result && result.rate > 0
      ? Math.max((result.rate / graphMax) * 100, 8)
      : 0;

  const totalHeight =
    result && result.total > 0
      ? Math.max((result.total / graphMax) * 100, 8)
      : 0;

  return (
    <div className="calculator-card pond-lime-calculator">
      {/* Header */}
      <div className="pond-lime-header">
        <div className="pond-lime-header-icon">🪨</div>

        <div>
          <h2>Pond Lime Calculator</h2>

          <p>
            Estimate pond lime requirement based on pond area,
            soil pH and soil type.
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="pond-lime-input-card">
        <div className="pond-lime-section-title">
          <span>🌱</span>
          <div>
            <h3>Pond & Soil Details</h3>
            <p>
              Enter your pond area, soil pH and soil texture.
            </p>
          </div>
        </div>

        <div className="row g-4">
          {/* Area */}
          <div className="col-md-4">
            <label className="pond-lime-label">
              Pond Area
            </label>

            <div className="pond-lime-input-wrapper">
              <input
                type="number"
                className="pond-lime-input"
                value={area}
                min="0"
                step="0.01"
                onChange={(e) => setArea(e.target.value)}
              />

              <span>ha</span>
            </div>

            <small className="pond-lime-help">
              Enter pond area in hectares.
            </small>
          </div>

          {/* Soil pH */}
          <div className="col-md-4">
            <label className="pond-lime-label">
              Soil pH
            </label>

            <div className="pond-lime-input-wrapper">
              <input
                type="number"
                className="pond-lime-input"
                value={soilPH}
                min="0"
                max="14"
                step="0.1"
                onChange={(e) => setSoilPH(e.target.value)}
              />

              <span>pH</span>
            </div>

            <small className="pond-lime-help">
              Supported range: 4.5 – 7.5
            </small>
          </div>

          {/* Texture */}
          <div className="col-md-4">
            <label className="pond-lime-label">
              Soil Texture
            </label>

            <select
              className="pond-lime-select"
              value={texture}
              onChange={(e) => setTexture(e.target.value)}
            >
              <option value="sandy">Sandy</option>
              <option value="medium">Medium</option>
              <option value="clayey">Clayey</option>
            </select>

            <small className="pond-lime-help">
              Select the dominant soil texture.
            </small>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="pond-lime-button-wrapper">
          <button
            type="button"
            className="pond-lime-calculate-btn"
            onClick={handleCalculate}
          >
            🧮 Calculate Lime Requirement
          </button>
        </div>

        {!result && (
          <div className="pond-lime-empty-state">
            <div className="pond-lime-empty-icon">🪨</div>

            <div>
              <strong>Ready to calculate</strong>
              <p>
                Enter the values above and click Calculate to
                generate the lime requirement.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <>
          {!result.range ? (
            <div className="pond-lime-warning">
              <div className="pond-lime-warning-icon">⚠️</div>

              <div>
                <strong>pH Outside Configured Range</strong>

                <p>
                  The current pH is outside the calculator's
                  configured 4.5–7.5 range. Please enter a pH
                  within the supported range.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Results Header */}
              <div className="pond-lime-results-header">
                <div>
                  <span className="pond-lime-results-badge">
                    ✓ Calculated
                  </span>

                  <h3>Lime Requirement Results</h3>

                  <p>
                    Recommended lime quantity based on the
                    entered pond and soil conditions.
                  </p>
                </div>

                <div className="pond-lime-ph-badge">
                  <span>Soil pH</span>
                  <strong>{formatNumber(soilPH, 1)}</strong>
                </div>
              </div>

              {/* Result Cards */}
              <div className="row g-4 pond-lime-results-grid">
                <div className="col-md-6">
                  <div className="pond-lime-result-card">
                    <div className="pond-lime-result-icon">
                      📏
                    </div>

                    <div className="pond-lime-result-content">
                      <span>Recommended Rate</span>

                      <strong>
                        {formatNumber(result.rate)}{" "}
                        <small>kg/ha</small>
                      </strong>

                      <p>
                        Lime required per hectare for the
                        selected soil condition.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="pond-lime-result-card total-lime">
                    <div className="pond-lime-result-icon">
                      🪨
                    </div>

                    <div className="pond-lime-result-content">
                      <span>Estimated Total Lime</span>

                      <strong>
                        {formatNumber(result.total, 1)}{" "}
                        <small>kg</small>
                      </strong>

                      <p>
                        Total lime required for the entered
                        pond area.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula */}
              <div className="pond-lime-formula-card">
                <div className="pond-lime-formula-icon">
                  ∑
                </div>

                <div>
                  <span>Lime Requirement Calculation</span>

                  <strong>
                    Pond Area × Recommended Rate
                  </strong>

                  <p>
                    {formatNumber(area, 2)} ha ×{" "}
                    {formatNumber(result.rate)} kg/ha ={" "}
                    <b>{formatNumber(result.total, 1)} kg</b>
                  </p>
                </div>
              </div>

              {/* Graph */}
              <div className="pond-lime-chart-card">
                <div className="pond-lime-chart-header">
                  <div>
                    <h3>Lime Requirement Overview</h3>

                    <p>
                      Comparison between recommended rate and
                      total lime requirement.
                    </p>
                  </div>

                  <div className="pond-lime-chart-ph">
                    pH {formatNumber(soilPH, 1)}
                  </div>
                </div>

                <div className="pond-lime-chart">
                  <div className="pond-lime-y-axis">
                    <span>
                      {formatNumber(graphMax)} kg
                    </span>

                    <span>
                      {formatNumber(graphMax * 0.75)}
                    </span>

                    <span>
                      {formatNumber(graphMax * 0.5)}
                    </span>

                    <span>
                      {formatNumber(graphMax * 0.25)}
                    </span>

                    <span>0</span>
                  </div>

                  <div className="pond-lime-chart-main">
                    <div className="pond-lime-grid-lines">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <div className="pond-lime-bars">
                      {/* Rate */}
                      <div className="pond-lime-bar-column">
                        <div className="pond-lime-bar-value">
                          {formatNumber(result.rate)} kg
                        </div>

                        <div className="pond-lime-bar-wrapper">
                          <div
                            className="pond-lime-bar rate-bar"
                            style={{
                              height: `${rateHeight}%`,
                            }}
                          ></div>
                        </div>

                        <div className="pond-lime-bar-label">
                          <span>📏</span>
                          <strong>Rate</strong>
                          <small>kg/ha</small>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="pond-lime-bar-column">
                        <div className="pond-lime-bar-value">
                          {formatNumber(result.total, 1)} kg
                        </div>

                        <div className="pond-lime-bar-wrapper">
                          <div
                            className="pond-lime-bar total-bar"
                            style={{
                              height: `${totalHeight}%`,
                            }}
                          ></div>
                        </div>

                        <div className="pond-lime-bar-label">
                          <span>🪨</span>
                          <strong>Total Lime</strong>
                          <small>kg</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="pond-lime-info">
                <div className="pond-lime-info-icon">💡</div>

                <div>
                  <strong>Important Note</strong>

                  <p>
                    Lime requirement should be validated
                    against actual soil and water conditions
                    and the applicable aquaculture SOP.
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}