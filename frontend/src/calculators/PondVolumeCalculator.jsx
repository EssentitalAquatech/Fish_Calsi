

// import { useMemo, useState } from "react";
// import CalculatorChart from "../components/CalculatorChart";

// export default function PondVolumeCalculator() {
//   const [shape, setShape] = useState("rectangular");
//   const [unit, setUnit] = useState("meter");

//   const [length, setLength] = useState(100);
//   const [width, setWidth] = useState(50);
//   const [radius, setRadius] = useState(20);
//   const [depth, setDepth] = useState(1.5);

//   const result = useMemo(() => {
//     let areaM2 = 0;

//     if (shape === "rectangular") {
//       const l =
//         unit === "feet"
//           ? Number(length) * 0.3048
//           : Number(length);

//       const w =
//         unit === "feet"
//           ? Number(width) * 0.3048
//           : Number(width);

//       areaM2 = l * w;
//     } else {
//       const r =
//         unit === "feet"
//           ? Number(radius) * 0.3048
//           : Number(radius);

//       areaM2 = Math.PI * r * r;
//     }

//     const d =
//       unit === "feet"
//         ? Number(depth) * 0.3048
//         : Number(depth);

//     const volumeM3 = areaM2 * d;

//     return {
//       areaM2,
//       volumeM3,
//       litres: volumeM3 * 1000,
//     };
//   }, [
//     shape,
//     unit,
//     length,
//     width,
//     radius,
//     depth,
//   ]);

//   const chartData = [
//     {
//       name: "Surface Area",
//       value: Number(result.areaM2.toFixed(2)),
//     },
//     {
//       name: "Water Volume",
//       value: Number(result.volumeM3.toFixed(2)),
//     },
//   ];

//   return (
//     <div className="calculator-card">
//       <h2>Pond Volume Calculator</h2>

//       <div className="row g-3">
//         <div className="col-md-6">
//           <label className="form-label">
//             Pond Shape
//           </label>

//           <select
//             className="form-select"
//             value={shape}
//             onChange={(e) => setShape(e.target.value)}
//           >
//             <option value="rectangular">
//               Rectangular
//             </option>

//             <option value="circular">
//               Circular
//             </option>
//           </select>
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">
//             Unit
//           </label>

//           <select
//             className="form-select"
//             value={unit}
//             onChange={(e) => setUnit(e.target.value)}
//           >
//             <option value="meter">
//               Meter
//             </option>

//             <option value="feet">
//               Feet
//             </option>
//           </select>
//         </div>

//         {shape === "rectangular" ? (
//           <>
//             <div className="col-md-6">
//               <label className="form-label">
//                 Length
//               </label>

//               <input
//                 type="number"
//                 className="form-control"
//                 value={length}
//                 onChange={(e) =>
//                   setLength(e.target.value)
//                 }
//               />
//             </div>

//             <div className="col-md-6">
//               <label className="form-label">
//                 Width
//               </label>

//               <input
//                 type="number"
//                 className="form-control"
//                 value={width}
//                 onChange={(e) =>
//                   setWidth(e.target.value)
//                 }
//               />
//             </div>
//           </>
//         ) : (
//           <div className="col-md-6">
//             <label className="form-label">
//               Radius
//             </label>

//             <input
//               type="number"
//               className="form-control"
//               value={radius}
//               onChange={(e) =>
//                 setRadius(e.target.value)
//               }
//             />
//           </div>
//         )}

//         <div className="col-md-6">
//           <label className="form-label">
//             Average Depth
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={depth}
//             onChange={(e) =>
//               setDepth(e.target.value)
//             }
//           />
//         </div>
//       </div>

//       <div className="row g-3 mt-3">
//         <div className="col-md-4">
//           <div className="result-box">
//             <small>Surface Area</small>

//             <strong>
//               {result.areaM2.toFixed(2)} m²
//             </strong>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="result-box">
//             <small>Water Volume</small>

//             <strong>
//               {result.volumeM3.toFixed(2)} m³
//             </strong>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="result-box">
//             <small>Water Volume</small>

//             <strong>
//               {result.litres.toLocaleString("en-IN")} L
//             </strong>
//           </div>
//         </div>
//       </div>

//       {/* GRAPH */}
//       <CalculatorChart
//         title="Pond Volume Overview"
//         data={chartData}
//         dataKey="value"
//         xKey="name"
//         unit=""
//       />
//     </div>
//   );
// }























import { useMemo, useState } from "react";
import CalculatorChart from "../components/CalculatorChart";

export default function PondVolumeCalculator() {
  const [shape, setShape] = useState("rectangular");
  const [unit, setUnit] = useState("meter");

  const [length, setLength] = useState(100);
  const [width, setWidth] = useState(50);
  const [radius, setRadius] = useState(20);
  const [depth, setDepth] = useState(1.5);

  // ==========================================================
  // CALCULATED INPUT SNAPSHOT
  // ==========================================================

  const [calculatedInputs, setCalculatedInputs] = useState(null);

  // ==========================================================
  // CALCULATION
  // ==========================================================

  const result = useMemo(() => {
    if (!calculatedInputs) {
      return null;
    }

    const {
      shape: calculatedShape,
      unit: calculatedUnit,
      length: calculatedLength,
      width: calculatedWidth,
      radius: calculatedRadius,
      depth: calculatedDepth,
    } = calculatedInputs;

    let areaM2 = 0;

    if (calculatedShape === "rectangular") {
      const l =
        calculatedUnit === "feet"
          ? Number(calculatedLength) * 0.3048
          : Number(calculatedLength);

      const w =
        calculatedUnit === "feet"
          ? Number(calculatedWidth) * 0.3048
          : Number(calculatedWidth);

      areaM2 = l * w;
    } else {
      const r =
        calculatedUnit === "feet"
          ? Number(calculatedRadius) * 0.3048
          : Number(calculatedRadius);

      areaM2 = Math.PI * r * r;
    }

    const d =
      calculatedUnit === "feet"
        ? Number(calculatedDepth) * 0.3048
        : Number(calculatedDepth);

    const volumeM3 = areaM2 * d;

    return {
      areaM2,
      volumeM3,
      litres: volumeM3 * 1000,
    };
  }, [calculatedInputs]);

  // ==========================================================
  // CALCULATE BUTTON
  // ==========================================================

  const handleCalculate = () => {
    setCalculatedInputs({
      shape,
      unit,
      length,
      width,
      radius,
      depth,
    });
  };

  // ==========================================================
  // GRAPH DATA
  // ==========================================================

  const chartData = result
    ? [
        {
          name: "Surface Area",
          value: Number(result.areaM2.toFixed(2)),
        },
        {
          name: "Water Volume",
          value: Number(result.volumeM3.toFixed(2)),
        },
      ]
    : [];

  return (
    <div className="calculator-card pond-volume-calculator">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="pond-volume-header">
        <div className="pond-volume-header-icon">
          🌊
        </div>

        <div>
          <h2>Pond Volume Calculator</h2>

          <p>
            Calculate pond water volume using pond dimensions
            and average depth.
          </p>
        </div>
      </div>

      {/* ======================================================
          INPUT SECTION
      ====================================================== */}

      <div className="pond-volume-input-section">

        <div className="pond-volume-section-header">
          <div className="pond-volume-section-icon">
            📐
          </div>

          <div>
            <h3>Pond Details</h3>

            <p>
              Enter your pond dimensions and select the appropriate unit.
            </p>
          </div>
        </div>

        <div className="row g-3">

          {/* POND SHAPE */}

          <div className="col-md-6">

            <div className="pond-volume-field">

              <label>
                Pond Shape
                <span className="pond-required">*</span>
              </label>

              <select
                className="form-select"
                value={shape}
                onChange={(e) =>
                  setShape(e.target.value)
                }
              >
                <option value="rectangular">
                  Rectangular
                </option>

                <option value="circular">
                  Circular
                </option>
              </select>

            </div>

          </div>

          {/* UNIT */}

          <div className="col-md-6">

            <div className="pond-volume-field">

              <label>
                Measurement Unit
                <span className="pond-required">*</span>
              </label>

              <select
                className="form-select"
                value={unit}
                onChange={(e) =>
                  setUnit(e.target.value)
                }
              >
                <option value="meter">
                  Meter
                </option>

                <option value="feet">
                  Feet
                </option>
              </select>

            </div>

          </div>

          {/* RECTANGULAR LENGTH */}

          {shape === "rectangular" ? (
            <>
              <div className="col-md-6">

                <div className="pond-volume-field">

                  <label>
                    Length
                    <span className="pond-required">*</span>
                  </label>

                  <div className="pond-volume-input-wrapper">

                    <input
                      type="number"
                      className="form-control"
                      value={length}
                      min="0"
                      step="0.01"
                      onChange={(e) =>
                        setLength(e.target.value)
                      }
                      placeholder="Enter length"
                    />

                    <span className="pond-volume-unit">
                      {unit === "feet" ? "ft" : "m"}
                    </span>

                  </div>

                </div>

              </div>

              {/* WIDTH */}

              <div className="col-md-6">

                <div className="pond-volume-field">

                  <label>
                    Width
                    <span className="pond-required">*</span>
                  </label>

                  <div className="pond-volume-input-wrapper">

                    <input
                      type="number"
                      className="form-control"
                      value={width}
                      min="0"
                      step="0.01"
                      onChange={(e) =>
                        setWidth(e.target.value)
                      }
                      placeholder="Enter width"
                    />

                    <span className="pond-volume-unit">
                      {unit === "feet" ? "ft" : "m"}
                    </span>

                  </div>

                </div>

              </div>
            </>
          ) : (
            /* CIRCULAR RADIUS */

            <div className="col-md-6">

              <div className="pond-volume-field">

                <label>
                  Radius
                  <span className="pond-required">*</span>
                </label>

                <div className="pond-volume-input-wrapper">

                  <input
                    type="number"
                    className="form-control"
                    value={radius}
                    min="0"
                    step="0.01"
                    onChange={(e) =>
                      setRadius(e.target.value)
                    }
                    placeholder="Enter radius"
                  />

                  <span className="pond-volume-unit">
                    {unit === "feet" ? "ft" : "m"}
                  </span>

                </div>

              </div>

            </div>
          )}

          {/* DEPTH */}

          <div className="col-md-6">

            <div className="pond-volume-field">

              <label>
                Average Water Depth
                <span className="pond-required">*</span>
              </label>

              <div className="pond-volume-input-wrapper">

                <input
                  type="number"
                  className="form-control"
                  value={depth}
                  min="0"
                  step="0.01"
                  onChange={(e) =>
                    setDepth(e.target.value)
                  }
                  placeholder="Enter average depth"
                />

                <span className="pond-volume-unit">
                  {unit === "feet" ? "ft" : "m"}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================
          CALCULATE BUTTON
      ====================================================== */}

      <div className="pond-volume-calculate-section">

        <button
          type="button"
          className="pond-volume-calculate-btn"
          onClick={handleCalculate}
        >
          <span className="pond-volume-calculate-icon">
            🧮
          </span>

          <span>
            Calculate Pond Volume
          </span>
        </button>

        <p>
          Enter the pond details and click Calculate to generate
          the water volume estimate.
        </p>

      </div>

      {/* ======================================================
          RESULTS
      ====================================================== */}

      {result && (
        <>

          <div className="pond-volume-results">

            <div className="pond-volume-result-header">

              <div>
                <h3>Calculation Results</h3>

                <p>
                  Estimated pond area and water volume based on
                  your entered dimensions.
                </p>
              </div>

              <div className="pond-result-badge">
                ✓ Calculated
              </div>

            </div>

            <div className="row g-3">

              {/* SURFACE AREA */}

              <div className="col-md-4">

                <div className="pond-result-card">

                  <div className="pond-result-icon">
                    📐
                  </div>

                  <div className="pond-result-content">

                    <small>
                      Surface Area
                    </small>

                    <strong>
                      {result.areaM2.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}{" "}
                      m²
                    </strong>

                  </div>

                </div>

              </div>

              {/* WATER VOLUME */}

              <div className="col-md-4">

                <div className="pond-result-card pond-result-primary">

                  <div className="pond-result-icon">
                    💧
                  </div>

                  <div className="pond-result-content">

                    <small>
                      Water Volume
                    </small>

                    <strong>
                      {result.volumeM3.toLocaleString(
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

              </div>

              {/* LITRES */}

              <div className="col-md-4">

                <div className="pond-result-card">

                  <div className="pond-result-icon">
                    🪣
                  </div>

                  <div className="pond-result-content">

                    <small>
                      Water Volume
                    </small>

                    <strong>
                      {result.litres.toLocaleString(
                        "en-IN",
                        {
                          maximumFractionDigits: 0,
                        }
                      )}{" "}
                      L
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              GRAPH
          ================================================== */}

          <CalculatorChart
            title="Pond Volume Overview"
            data={chartData}
            dataKey="value"
            xKey="name"
            unit=""
          />

        </>
      )}

    </div>
  );
}