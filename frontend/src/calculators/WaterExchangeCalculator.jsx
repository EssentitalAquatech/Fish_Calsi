// import { useMemo, useState } from "react";
// import {
//   calculateWaterExchange,
// } from "../utils/calculations";
// import waterExchangeData from "../data/waterExchangeData";

// export default function WaterExchangeCalculator() {
//   const [volume, setVolume] =
//     useState(1000);

//   const [system, setSystem] =
//     useState("general");

//   const [percentage, setPercentage] =
//     useState(
//       waterExchangeData.general
//         .defaultPercentage
//     );

//   const result = useMemo(() => {
//     return calculateWaterExchange({
//       volumeM3: volume,
//       exchangePercentage:
//         percentage,
//     });
//   }, [volume, percentage]);

//   function handleSystemChange(value) {
//     setSystem(value);

//     setPercentage(
//       waterExchangeData[value]
//         .defaultPercentage
//     );
//   }

//   return (
//     <div className="calculator-card">
//       <h2>
//         Water Exchange Calculator
//       </h2>

//       <p className="text-muted">
//         Calculate the volume of pond water
//         corresponding to the selected
//         exchange percentage.
//       </p>

//       <div className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label">
//             Pond Volume (m³)
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={volume}
//             onChange={(e) =>
//               setVolume(e.target.value)
//             }
//           />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">
//             System / Species
//           </label>

//           <select
//             className="form-select"
//             value={system}
//             onChange={(e) =>
//               handleSystemChange(
//                 e.target.value
//               )
//             }
//           >
//             <option value="general">
//               General Pond
//             </option>

//             <option value="magur">
//               Magur Grow-out
//             </option>

//             <option value="silverPompano">
//               Silver Pompano
//             </option>
//           </select>
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">
//             Exchange Percentage (%)
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={percentage}
//             min="0"
//             max="100"
//             onChange={(e) =>
//               setPercentage(
//                 e.target.value
//               )
//             }
//           />
//         </div>
//       </div>

//       <div className="row g-3 mt-3">
//         <div className="col-md-6">
//           <div className="result-box">
//             <small>
//               Water Exchange
//             </small>

//             <strong>
//               {result.exchangeVolumeM3.toFixed(
//                 2
//               )}{" "}
//               m³
//             </strong>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="result-box">
//             <small>
//               Water Exchange
//             </small>

//             <strong>
//               {result.exchangeVolumeLitres.toLocaleString(
//                 "en-IN"
//               )}{" "}
//               litres
//             </strong>
//           </div>
//         </div>
//       </div>

//       <div className="alert alert-info mt-3">
//         {waterExchangeData[
//           system
//         ].note}
//       </div>
//     </div>
//   );
// }

















import { useMemo, useState } from "react";
import waterExchangeData from "../data/waterExchangeData";
import CalculatorChart from "../components/CalculatorChart";

export default function WaterExchangeCalculator() {
  const [volume, setVolume] = useState(1000);
  const [system, setSystem] = useState("general");

  const [percentage, setPercentage] = useState(
    waterExchangeData.general.defaultPercentage
  );

  const [calculatedInputs, setCalculatedInputs] = useState(null);

  const result = useMemo(() => {
    if (!calculatedInputs) return null;

    const volumeM3 = Number(calculatedInputs.volume) || 0;
    const exchangePercentage =
      Number(calculatedInputs.percentage) || 0;

    const exchangeVolumeM3 =
      volumeM3 * (exchangePercentage / 100);

    const exchangeVolumeLitres =
      exchangeVolumeM3 * 1000;

    return {
      volumeM3,
      exchangePercentage,
      exchangeVolumeM3,
      exchangeVolumeLitres,
    };
  }, [calculatedInputs]);

  function handleSystemChange(value) {
    setSystem(value);

    setPercentage(
      waterExchangeData[value].defaultPercentage
    );
  }

  function handleCalculate(e) {
    e.preventDefault();

    setCalculatedInputs({
      volume,
      percentage,
      system,
    });
  }

  const chartData = result
    ? [
        {
          name: "Pond Volume",
          value: result.volumeM3,
        },
        {
          name: "Water Exchange",
          value: result.exchangeVolumeM3,
        },
      ]
    : [];

  return (
    <div className="calculator-card water-exchange-calculator">
      {/* Header */}
      <div className="water-exchange-header">
        <div>
          <div className="water-exchange-eyebrow">
            💧 WATER MANAGEMENT
          </div>

          <h2>Water Exchange Calculator</h2>

          <p>
            Estimate the volume of pond water corresponding
            to the selected exchange percentage.
          </p>
        </div>

        <div className="water-exchange-header-icon">
          💧
        </div>
      </div>

      {/* Input Section */}
      <form onSubmit={handleCalculate}>
        <div className="water-exchange-input-card">
          <div className="water-exchange-section-title">
            <span>⚙️</span>
            Pond & Water Management
          </div>

          <div className="row g-4">
            {/* Pond Volume */}
            <div className="col-md-6">
              <label className="water-exchange-label">
                Pond Volume (m³)
              </label>

              <input
                type="number"
                className="form-control water-exchange-input"
                value={volume}
                min="0"
                step="0.01"
                onChange={(e) =>
                  setVolume(e.target.value)
                }
              />

              <div className="water-exchange-help">
                Enter the total volume of water in the pond.
              </div>
            </div>

            {/* System */}
            <div className="col-md-6">
              <label className="water-exchange-label">
                System / Species
              </label>

              <select
                className="form-select water-exchange-input"
                value={system}
                onChange={(e) =>
                  handleSystemChange(e.target.value)
                }
              >
                <option value="general">
                  General Pond
                </option>

                <option value="magur">
                  Magur Grow-out
                </option>

                <option value="silverPompano">
                  Silver Pompano
                </option>
              </select>

              <div className="water-exchange-help">
                Select the farming system to load its
                recommended exchange percentage.
              </div>
            </div>

            {/* Percentage */}
            <div className="col-md-6">
              <label className="water-exchange-label">
                Exchange Percentage (%)
              </label>

              <input
                type="number"
                className="form-control water-exchange-input"
                value={percentage}
                min="0"
                max="100"
                step="0.1"
                onChange={(e) =>
                  setPercentage(e.target.value)
                }
              />

              <div className="water-exchange-help">
                Percentage of pond water to be exchanged.
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="water-exchange-button-row">
            <button
              type="submit"
              className="water-exchange-calculate-btn"
            >
              🧮 Calculate Water Exchange
            </button>

            {result && (
              <span className="water-exchange-calculated">
                ✓ Calculated
              </span>
            )}
          </div>
        </div>
      </form>

      {/* Results */}
      {result && (
        <>
          <div className="water-exchange-results">
            <div className="water-exchange-results-header">
              <div>
                <h3>Water Exchange Results</h3>

                <p>
                  Required water quantity based on your
                  selected exchange percentage.
                </p>
              </div>

              <div className="water-exchange-percentage-badge">
                {result.exchangePercentage}%
              </div>
            </div>

            <div className="row g-4">
              {/* m3 */}
              <div className="col-md-6">
                <div className="water-exchange-result-card primary">
                  <div className="water-exchange-result-icon">
                    💧
                  </div>

                  <div className="water-exchange-result-label">
                    Water Exchange
                  </div>

                  <div className="water-exchange-result-value">
                    {result.exchangeVolumeM3.toLocaleString(
                      "en-IN",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </div>

                  <div className="water-exchange-result-unit">
                    m³
                  </div>

                  <div className="water-exchange-result-note">
                    Cubic metres of water to exchange
                  </div>
                </div>
              </div>

              {/* Litres */}
              <div className="col-md-6">
                <div className="water-exchange-result-card">
                  <div className="water-exchange-result-icon">
                    🪣
                  </div>

                  <div className="water-exchange-result-label">
                    Water Exchange
                  </div>

                  <div className="water-exchange-result-value">
                    {result.exchangeVolumeLitres.toLocaleString(
                      "en-IN",
                      {
                        maximumFractionDigits: 0,
                      }
                    )}
                  </div>

                  <div className="water-exchange-result-unit">
                    litres
                  </div>

                  <div className="water-exchange-result-note">
                    Equivalent water quantity
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graph */}
          <CalculatorChart
            title="Water Exchange Overview"
            data={chartData}
            dataKey="value"
            xKey="name"
            unit="m³"
          />

          {/* Formula */}
          <div className="water-exchange-formula-card">
            <div className="water-exchange-formula-title">
              <span>∑</span>
              Water Exchange Calculation
            </div>

            <div className="water-exchange-formula">
              Water Exchange = Pond Volume × Exchange Percentage ÷ 100
            </div>

            <div className="water-exchange-formula-example">
              {result.volumeM3.toLocaleString("en-IN")} ×{" "}
              {result.exchangePercentage}% ÷ 100 ={" "}
              <strong>
                {result.exchangeVolumeM3.toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}{" "}
                m³
              </strong>
            </div>
          </div>

          {/* Details */}
          <div className="water-exchange-details-card">
            <div className="water-exchange-details-title">
              Calculation Details
            </div>

            <div className="water-exchange-details-grid">
              <div>
                <span>Pond Volume</span>
                <strong>
                  {result.volumeM3.toLocaleString("en-IN")} m³
                </strong>
              </div>

              <div>
                <span>Exchange Percentage</span>
                <strong>
                  {result.exchangePercentage}%
                </strong>
              </div>

              <div>
                <span>Water Exchange</span>
                <strong>
                  {result.exchangeVolumeM3.toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}{" "}
                  m³
                </strong>
              </div>

              <div>
                <span>Water Quantity</span>
                <strong>
                  {result.exchangeVolumeLitres.toLocaleString(
                    "en-IN"
                  )}{" "}
                  litres
                </strong>
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="water-exchange-note">
            <div className="water-exchange-note-icon">
              💡
            </div>

            <div>
              <strong>Water Management Note</strong>

              <p>
                {waterExchangeData[
                  calculatedInputs.system
                ].note}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}