// import { useMemo, useState } from "react";
// import fishData from "../data/fishData";

// import {
//   areaToM2,
//   areaToHa,
//   getRangeMid,
//   calculateBiomass,
//   calculateFeedFromFCR,
//   CARP_VOLUME_CAP_M3_PER_FISH,
// } from "../utils/calculations";

// // ============================================================
// // CULTURE PLANS
// // ============================================================

// const plans = {
//   composite3: {
//     name: "Composite Carp — Catla + Rohu + Mrigal (4:3:3)",

//     ratio: {
//       Catla: 4,
//       Rohu: 3,
//       Mrigal: 3,
//     },

//     density: {
//       standard: [4000, 6000],
//       managed: [5000, 8000],
//       intensive: [8000, 10000],
//     },
//   },

//   composite6: {
//     name: "Composite Carp — 6 Species",

//     ratio: {
//       Catla: 1.5,
//       Rohu: 2,
//       Mrigal: 1.5,
//       "Silver Carp": 1.5,
//       "Grass Carp": 1.5,
//       "Common Carp": 2,
//     },

//     density: {
//       standard: [4000, 6000],
//       managed: [5000, 8000],
//       intensive: [8000, 10000],
//     },
//   },
// };

// // ============================================================
// // NUMBER FORMATTER
// // ============================================================

// function formatNumber(value, digits = 0) {
//   const number = Number(value);

//   if (!Number.isFinite(number)) {
//     return "0";
//   }

//   return new Intl.NumberFormat("en-IN", {
//     minimumFractionDigits: digits,
//     maximumFractionDigits: digits,
//   }).format(Math.max(0, number));
// }

// // ============================================================
// // COMPONENT
// // ============================================================

// export default function FishStockingCalculator() {
//   const [area, setArea] = useState(1);
//   const [areaUnit, setAreaUnit] = useState("acre");

//   const [depth, setDepth] = useState(1.5);

//   const [system, setSystem] = useState("standard");

//   const [plan, setPlan] = useState("composite3");

//   const [survival, setSurvival] = useState(80);

//   const [fcr, setFcr] = useState(1.3);

//   const [aeration, setAeration] = useState(false);

//   const [waterExchange, setWaterExchange] =
//     useState(false);

//   const [volumeCap, setVolumeCap] =
//     useState(true);

//   // ==========================================================
//   // CALCULATION
//   // ==========================================================

//   const result = useMemo(() => {
//     const numericArea = Number(area) || 0;
//     const numericDepth = Number(depth) || 0;
//     const numericSurvival = Number(survival) || 0;
//     const numericFcr = Number(fcr) || 0;

//     // --------------------------------------------------------
//     // AREA
//     // --------------------------------------------------------

//     const areaM2 = areaToM2(
//       numericArea,
//       areaUnit
//     );

//     const areaHa = areaToHa(
//       numericArea,
//       areaUnit
//     );

//     const areaAcre =
//       areaUnit === "acre"
//         ? numericArea
//         : areaM2 / 4046.8564224;

//     // --------------------------------------------------------
//     // WATER VOLUME
//     // --------------------------------------------------------

//     const volumeM3 =
//       areaM2 * numericDepth;

//     const volumeLitres =
//       volumeM3 * 1000;

//     // --------------------------------------------------------
//     // SELECT PLAN
//     // --------------------------------------------------------

//     const selectedPlan =
//       plans[plan] || plans.composite3;

//     const densityRange =
//       selectedPlan.density[system] ||
//       selectedPlan.density.standard;

//     const density =
//       getRangeMid(densityRange);

//     // --------------------------------------------------------
//     // TOTAL STOCK
//     // --------------------------------------------------------

//     let totalStock =
//       density * areaHa;

//     const originalStock =
//       totalStock;

//     let capped = false;

//     // --------------------------------------------------------
//     // CONSERVATIVE VOLUME CAP
//     // --------------------------------------------------------

//     if (
//       volumeCap &&
//       volumeM3 > 0 &&
//       totalStock > 0
//     ) {
//       const volumeCapFish =
//         volumeM3 /
//         CARP_VOLUME_CAP_M3_PER_FISH;

//       if (
//         volumeCapFish < totalStock
//       ) {
//         totalStock =
//           volumeCapFish;

//         capped = true;
//       }
//     }

//     // --------------------------------------------------------
//     // SPECIES RATIO
//     // --------------------------------------------------------

//     const ratioTotal =
//       Object.values(
//         selectedPlan.ratio
//       ).reduce(
//         (sum, value) =>
//           sum + Number(value || 0),
//         0
//       );

//     // --------------------------------------------------------
//     // SPECIES ROWS
//     // --------------------------------------------------------

//     const rows = Object.entries(
//       selectedPlan.ratio
//     ).map(
//       ([species, ratio]) => {
//         const fish =
//           fishData[species];

//         // Support both naming conventions
//         const seedWeight =
//           Number(
//             fish?.seedG ??
//             fish?.seedWeight ??
//             0
//           );

//         const harvestWeight =
//           Number(
//             fish?.harvestG ??
//             fish?.harvestWeight ??
//             0
//           );

//         const minDepth =
//           Number(
//             fish?.minDepth ?? 0
//           );

//         // ------------------------------------------------------
//         // STOCK
//         // ------------------------------------------------------

//         const stock =
//           totalStock *
//           (Number(ratio) /
//             ratioTotal);

//         // ------------------------------------------------------
//         // SURVIVORS
//         // ------------------------------------------------------

//         const survivors =
//           stock *
//           (numericSurvival / 100);

//         // ------------------------------------------------------
//         // INITIAL BIOMASS
//         // ------------------------------------------------------

//         const initialBiomass =
//           calculateBiomass(
//             stock,
//             seedWeight
//           );

//         // ------------------------------------------------------
//         // HARVEST BIOMASS
//         // ------------------------------------------------------

//         const harvestBiomass =
//           calculateBiomass(
//             survivors,
//             harvestWeight
//           );

//         // ------------------------------------------------------
//         // BIOMASS GAIN
//         // ------------------------------------------------------

//         const biomassGain =
//           Math.max(
//             0,
//             harvestBiomass -
//               initialBiomass
//           );

//         // ------------------------------------------------------
//         // FEED
//         // ------------------------------------------------------

//         const feed =
//           calculateFeedFromFCR(
//             biomassGain,
//             numericFcr
//           );

//         // ------------------------------------------------------
//         // WATER VOLUME / FISH
//         // ------------------------------------------------------

//         const volumePerFish =
//           stock > 0
//             ? volumeM3 / stock
//             : 0;

//         return {
//           species,

//           stock,

//           survivors,

//           seedWeight,

//           harvestWeight,

//           initialBiomass,

//           harvestBiomass,

//           biomassGain,

//           feed,

//           minDepth,

//           volumePerFish,
//         };
//       }
//     );

//     // --------------------------------------------------------
//     // TOTALS
//     // --------------------------------------------------------

//     const harvestKg =
//       rows.reduce(
//         (sum, row) =>
//           sum +
//           row.harvestBiomass,
//         0
//       );

//     const initialKg =
//       rows.reduce(
//         (sum, row) =>
//           sum +
//           row.initialBiomass,
//         0
//       );

//     const feedKg =
//       rows.reduce(
//         (sum, row) =>
//           sum + row.feed,
//         0
//       );

//     const survivors =
//       rows.reduce(
//         (sum, row) =>
//           sum + row.survivors,
//         0
//       );

//     const biomassGain =
//       Math.max(
//         0,
//         harvestKg - initialKg
//       );

//     // --------------------------------------------------------
//     // DEPTH WARNING
//     // --------------------------------------------------------

//     const shallowSpecies =
//       rows.filter(
//         (row) =>
//           row.minDepth > 0 &&
//           numericDepth <
//             row.minDepth
//       );

//     // --------------------------------------------------------
//     // RETURN RESULT
//     // --------------------------------------------------------

//     return {
//       areaM2,
//       areaHa,
//       areaAcre,

//       volumeM3,
//       volumeLitres,

//       densityRange,
//       density,

//       originalStock,
//       totalStock,

//       capped,

//       rows,

//       harvestKg,
//       initialKg,
//       biomassGain,
//       feedKg,

//       survivors,

//       shallowSpecies,

//       planName:
//         selectedPlan.name,
//     };
//   }, [
//     area,
//     areaUnit,
//     depth,
//     system,
//     plan,
//     survival,
//     fcr,
//     volumeCap,
//   ]);

//   // ==========================================================
//   // UI
//   // ==========================================================

//   return (
//     <div className="calculator-card">

//       <h2>
//         Fish Stocking Calculator
//       </h2>

//       <p className="text-muted">
//         Estimate stocking quantity,
//         survivors, harvest biomass and
//         planning feed requirement.
//       </p>

//       {/* ======================================================
//           INPUTS
//       ====================================================== */}

//       <div className="row g-3">

//         {/* AREA */}

//         <div className="col-md-6">

//           <label className="form-label">
//             Pond Area
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={area}
//             min="0.01"
//             step="0.01"
//             onChange={(e) =>
//               setArea(e.target.value)
//             }
//           />

//         </div>

//         {/* AREA UNIT */}

//         <div className="col-md-6">

//           <label className="form-label">
//             Area Unit
//           </label>

//           <select
//             className="form-select"
//             value={areaUnit}
//             onChange={(e) =>
//               setAreaUnit(e.target.value)
//             }
//           >

//             <option value="acre">
//               Acre
//             </option>

//             <option value="hectare">
//               Hectare
//             </option>

//             <option value="m2">
//               m²
//             </option>

//           </select>

//         </div>

//         {/* DEPTH */}

//         <div className="col-md-6">

//           <label className="form-label">
//             Average Water Depth (m)
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={depth}
//             min="0.2"
//             step="0.05"
//             onChange={(e) =>
//               setDepth(e.target.value)
//             }
//           />

//         </div>

//         {/* SYSTEM */}

//         <div className="col-md-6">

//           <label className="form-label">
//             Culture System
//           </label>

//           <select
//             className="form-select"
//             value={system}
//             onChange={(e) =>
//               setSystem(e.target.value)
//             }
//           >

//             <option value="standard">
//               Standard / Low Input
//             </option>

//             <option value="managed">
//               Managed / Higher Input
//             </option>

//             <option value="intensive">
//               Intensive
//             </option>

//           </select>

//         </div>

//         {/* PLAN */}

//         <div className="col-md-12">

//           <label className="form-label">
//             Culture Plan
//           </label>

//           <select
//             className="form-select"
//             value={plan}
//             onChange={(e) =>
//               setPlan(e.target.value)
//             }
//           >

//             {Object.entries(
//               plans
//             ).map(
//               ([key, value]) => (
//                 <option
//                   key={key}
//                   value={key}
//                 >
//                   {value.name}
//                 </option>
//               )
//             )}

//           </select>

//         </div>

//         {/* SURVIVAL */}

//         <div className="col-md-4">

//           <label className="form-label">
//             Survival (%)
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={survival}
//             min="1"
//             max="100"
//             step="1"
//             onChange={(e) =>
//               setSurvival(
//                 e.target.value
//               )
//             }
//           />

//         </div>

//         {/* FCR */}

//         <div className="col-md-4">

//           <label className="form-label">
//             FCR
//           </label>

//           <input
//             type="number"
//             className="form-control"
//             value={fcr}
//             min="0.5"
//             max="5"
//             step="0.05"
//             onChange={(e) =>
//               setFcr(
//                 e.target.value
//               )
//             }
//           />

//         </div>

//         {/* VOLUME CAP */}

//         <div className="col-md-4">

//           <label className="form-label">
//             Volume Cap
//           </label>

//           <select
//             className="form-select"
//             value={
//               volumeCap
//                 ? "on"
//                 : "off"
//             }
//             onChange={(e) =>
//               setVolumeCap(
//                 e.target.value ===
//                   "on"
//               )
//             }
//           >

//             <option value="on">
//               ON — Conservative
//             </option>

//             <option value="off">
//               OFF
//             </option>

//           </select>

//         </div>

//         {/* AERATION */}

//         <div className="col-md-6">

//           <div className="form-check">

//             <input
//               className="form-check-input"
//               type="checkbox"
//               checked={aeration}
//               onChange={(e) =>
//                 setAeration(
//                   e.target.checked
//                 )
//               }
//               id="aeration"
//             />

//             <label
//               className="form-check-label"
//               htmlFor="aeration"
//             >
//               Aeration available
//             </label>

//           </div>

//         </div>

//         {/* WATER EXCHANGE */}

//         <div className="col-md-6">

//           <div className="form-check">

//             <input
//               className="form-check-input"
//               type="checkbox"
//               checked={
//                 waterExchange
//               }
//               onChange={(e) =>
//                 setWaterExchange(
//                   e.target.checked
//                 )
//               }
//               id="waterExchange"
//             />

//             <label
//               className="form-check-label"
//               htmlFor="waterExchange"
//             >
//               Water exchange available
//             </label>

//           </div>

//         </div>

//       </div>

//       <hr />

//       {/* ======================================================
//           SUMMARY
//       ====================================================== */}

//       <div className="row g-3">

//         <div className="col-md-3">

//           <div className="result-box">

//             <small>
//               Pond Area
//             </small>

//             <strong>
//               {formatNumber(
//                 result.areaAcre,
//                 2
//               )}{" "}
//               acre
//             </strong>

//           </div>

//         </div>

//         <div className="col-md-3">

//           <div className="result-box">

//             <small>
//               Water Volume
//             </small>

//             <strong>
//               {formatNumber(
//                 result.volumeM3,
//                 1
//               )}{" "}
//               m³
//             </strong>

//           </div>

//         </div>

//         <div className="col-md-3">

//           <div className="result-box">

//             <small>
//               Recommended Seed
//             </small>

//             <strong>
//               {formatNumber(
//                 result.totalStock
//               )}
//             </strong>

//           </div>

//         </div>

//         <div className="col-md-3">

//           <div className="result-box">

//             <small>
//               Expected Harvest
//             </small>

//             <strong>
//               {formatNumber(
//                 result.harvestKg,
//                 1
//               )}{" "}
//               kg
//             </strong>

//           </div>

//         </div>

//       </div>

//       {/* ======================================================
//           CAP WARNING
//       ====================================================== */}

//       {result.capped && (
//         <div className="alert alert-warning mt-3">

//           <strong>
//             Water-volume cap applied.
//           </strong>{" "}

//           Stocking was reduced from{" "}

//           {formatNumber(
//             result.originalStock
//           )}{" "}

//           to{" "}

//           {formatNumber(
//             result.totalStock
//           )}{" "}

//           under the conservative{" "}

//           {CARP_VOLUME_CAP_M3_PER_FISH}{" "}

//           m³/fish planning ceiling.

//         </div>
//       )}

//       {/* ======================================================
//           DEPTH WARNING
//       ====================================================== */}

//       {result.shallowSpecies.length >
//         0 && (
//         <div className="alert alert-danger mt-3">

//           <strong>
//             Depth warning:
//           </strong>{" "}

//           Average depth{" "}

//           {formatNumber(
//             depth,
//             2
//           )}{" "}

//           m is below the planning
//           threshold for{" "}

//           {result.shallowSpecies
//             .map(
//               (item) =>
//                 item.species
//             )
//             .join(", ")}{" "}

//           .

//         </div>
//       )}

//       {/* ======================================================
//           INTENSIVE WARNING
//       ====================================================== */}

//       {!aeration &&
//         system ===
//           "intensive" && (
//           <div className="alert alert-warning mt-3">

//             Intensive stocking selected
//             without aeration. Treat this
//             as a planning estimate and
//             verify dissolved oxygen before
//             stocking.

//           </div>
//         )}

//       {/* ======================================================
//           SPECIES TABLE
//       ====================================================== */}

//       <div className="table-responsive mt-3">

//         <table className="table table-bordered">

//           <thead>

//             <tr>

//               <th>
//                 Species
//               </th>

//               <th>
//                 Stock
//               </th>

//               <th>
//                 Survivors
//               </th>

//               <th>
//                 Harvest Biomass
//               </th>

//               <th>
//                 Volume/Fish
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {result.rows.map(
//               (row) => (
//                 <tr
//                   key={
//                     row.species
//                   }
//                 >

//                   <td>
//                     {row.species}
//                   </td>

//                   <td>
//                     {formatNumber(
//                       row.stock
//                     )}
//                   </td>

//                   <td>
//                     {formatNumber(
//                       row.survivors
//                     )}
//                   </td>

//                   <td>
//                     {formatNumber(
//                       row.harvestBiomass,
//                       1
//                     )}{" "}
//                     kg
//                   </td>

//                   <td>
//                     {formatNumber(
//                       row.volumePerFish,
//                       2
//                     )}{" "}
//                     m³
//                   </td>

//                 </tr>
//               )
//             )}

//           </tbody>

//         </table>

//       </div>

//       {/* ======================================================
//           FEED
//       ====================================================== */}

//       <div className="mt-3">

//         <strong>
//           Feed Estimate
//         </strong>

//         <p className="text-muted mb-0">

//           Estimated biomass gain:{" "}

//           {formatNumber(
//             result.biomassGain,
//             1
//           )}{" "}

//           kg.

//           At FCR{" "}

//           {formatNumber(
//             fcr,
//             2
//           )}

//           , estimated feed requirement
//           is{" "}

//           {formatNumber(
//             result.feedKg,
//             1
//           )}{" "}

//           kg.

//         </p>

//       </div>

//       {/* ======================================================
//           OPERATIONAL CHECKS
//       ====================================================== */}

//       <div className="mt-3">

//         <strong>
//           Operational Checks
//         </strong>

//         <p className="text-muted mb-0">

//           Expected surviving fish:{" "}

//           {formatNumber(
//             result.survivors
//           )}

//           {" • "}

//           Aeration:{" "}

//           {aeration
//             ? "Available"
//             : "Not selected"}

//           {" • "}

//           Water exchange:{" "}

//           {waterExchange
//             ? "Available"
//             : "Not selected"}

//         </p>

//       </div>

//       {/* ======================================================
//           FOOTNOTE
//       ====================================================== */}

//       <p className="small text-muted mt-4">

//         Planning tool only. Final stocking
//         should be validated against pond
//         productivity, dissolved oxygen,
//         water quality, feed load, seed
//         quality and local aquaculture SOP.

//       </p>

//     </div>
//   );
// }






















import { useMemo, useState } from "react";
import fishData from "../data/fishData";
import StockingOverview from "../components/StockingOverview";

import {
  areaToM2,
  areaToHa,
  getRangeMid,
  calculateBiomass,
  calculateFeedFromFCR,
  CARP_VOLUME_CAP_M3_PER_FISH,
} from "../utils/calculations";

// ============================================================
// CULTURE PLANS
// ============================================================

const plans = {
  composite3: {
    name: "Composite Carp — Catla + Rohu + Mrigal (4:3:3)",

    ratio: {
      Catla: 4,
      Rohu: 3,
      Mrigal: 3,
    },

    density: {
      standard: [4000, 6000],
      managed: [5000, 8000],
      intensive: [8000, 10000],
    },
  },

  composite6: {
    name: "Composite Carp — 6 Species",

    ratio: {
      Catla: 1.5,
      Rohu: 2,
      Mrigal: 1.5,
      "Silver Carp": 1.5,
      "Grass Carp": 1.5,
      "Common Carp": 2,
    },

    density: {
      standard: [4000, 6000],
      managed: [5000, 8000],
      intensive: [8000, 10000],
    },
  },
};

// ============================================================
// NUMBER FORMATTER
// ============================================================

function formatNumber(value, digits = 0) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "0";
  }

  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Math.max(0, number));
}

// ============================================================
// COMPONENT
// ============================================================

export default function FishStockingCalculator() {
  const [area, setArea] = useState(1);
  const [areaUnit, setAreaUnit] = useState("acre");

  const [depth, setDepth] = useState(1.5);

  const [system, setSystem] = useState("standard");

  const [plan, setPlan] = useState("composite3");

  const [survival, setSurvival] = useState(80);

  const [fcr, setFcr] = useState(1.3);

  const [aeration, setAeration] = useState(false);

  const [waterExchange, setWaterExchange] =
    useState(false);

  const [volumeCap, setVolumeCap] =
    useState(true);

  // ==========================================================
  // CALCULATED VALUES
  // ==========================================================

  const [calculatedValues, setCalculatedValues] = useState({
    survival: 80,
    fcr: 1.3,
    aeration: false,
    waterExchange: false,
  });

  const [calculateKey, setCalculateKey] = useState(0);

  // ==========================================================
  // CALCULATION
  // ==========================================================

  const result = useMemo(() => {
    const numericArea = Number(area) || 0;
    const numericDepth = Number(depth) || 0;
    const numericSurvival = Number(survival) || 0;
    const numericFcr = Number(fcr) || 0;

    // --------------------------------------------------------
    // AREA
    // --------------------------------------------------------

    const areaM2 = areaToM2(
      numericArea,
      areaUnit
    );

    const areaHa = areaToHa(
      numericArea,
      areaUnit
    );

    const areaAcre =
      areaUnit === "acre"
        ? numericArea
        : areaM2 / 4046.8564224;

    // --------------------------------------------------------
    // WATER VOLUME
    // --------------------------------------------------------

    const volumeM3 =
      areaM2 * numericDepth;

    const volumeLitres =
      volumeM3 * 1000;

    // --------------------------------------------------------
    // SELECT PLAN
    // --------------------------------------------------------

    const selectedPlan =
      plans[plan] || plans.composite3;

    const densityRange =
      selectedPlan.density[system] ||
      selectedPlan.density.standard;

    const density =
      getRangeMid(densityRange);

    // --------------------------------------------------------
    // TOTAL STOCK
    // --------------------------------------------------------

    let totalStock =
      density * areaHa;

    const originalStock =
      totalStock;

    let capped = false;

    // --------------------------------------------------------
    // CONSERVATIVE VOLUME CAP
    // --------------------------------------------------------

    if (
      volumeCap &&
      volumeM3 > 0 &&
      totalStock > 0
    ) {
      const volumeCapFish =
        volumeM3 /
        CARP_VOLUME_CAP_M3_PER_FISH;

      if (
        volumeCapFish < totalStock
      ) {
        totalStock =
          volumeCapFish;

        capped = true;
      }
    }

    // --------------------------------------------------------
    // SPECIES RATIO
    // --------------------------------------------------------

    const ratioTotal =
      Object.values(
        selectedPlan.ratio
      ).reduce(
        (sum, value) =>
          sum + Number(value || 0),
        0
      );

    // --------------------------------------------------------
    // SPECIES ROWS
    // --------------------------------------------------------

    const rows = Object.entries(
      selectedPlan.ratio
    ).map(
      ([species, ratio]) => {
        const fish =
          fishData[species];

        // Support both naming conventions
        const seedWeight =
          Number(
            fish?.seedG ??
            fish?.seedWeight ??
            0
          );

        const harvestWeight =
          Number(
            fish?.harvestG ??
            fish?.harvestWeight ??
            0
          );

        const minDepth =
          Number(
            fish?.minDepth ?? 0
          );

        // ------------------------------------------------------
        // STOCK
        // ------------------------------------------------------

        const stock =
          totalStock *
          (Number(ratio) /
            ratioTotal);

        // ------------------------------------------------------
        // SURVIVORS
        // ------------------------------------------------------

        const survivors =
          stock *
          (numericSurvival / 100);

        // ------------------------------------------------------
        // INITIAL BIOMASS
        // ------------------------------------------------------

        const initialBiomass =
          calculateBiomass(
            stock,
            seedWeight
          );

        // ------------------------------------------------------
        // HARVEST BIOMASS
        // ------------------------------------------------------

        const harvestBiomass =
          calculateBiomass(
            survivors,
            harvestWeight
          );

        // ------------------------------------------------------
        // BIOMASS GAIN
        // ------------------------------------------------------

        const biomassGain =
          Math.max(
            0,
            harvestBiomass -
              initialBiomass
          );

        // ------------------------------------------------------
        // FEED
        // ------------------------------------------------------

        const feed =
          calculateFeedFromFCR(
            biomassGain,
            numericFcr
          );

        // ------------------------------------------------------
        // WATER VOLUME / FISH
        // ------------------------------------------------------

        const volumePerFish =
          stock > 0
            ? volumeM3 / stock
            : 0;

        return {
          species,

          stock,

          survivors,

          seedWeight,

          harvestWeight,

          initialBiomass,

          harvestBiomass,

          biomassGain,

          feed,

          minDepth,

          volumePerFish,
        };
      }
    );

    // --------------------------------------------------------
    // TOTALS
    // --------------------------------------------------------

    const harvestKg =
      rows.reduce(
        (sum, row) =>
          sum +
          row.harvestBiomass,
        0
      );

    const initialKg =
      rows.reduce(
        (sum, row) =>
          sum +
          row.initialBiomass,
        0
      );

    const feedKg =
      rows.reduce(
        (sum, row) =>
          sum + row.feed,
        0
      );

    const survivors =
      rows.reduce(
        (sum, row) =>
          sum + row.survivors,
        0
      );

    const biomassGain =
      Math.max(
        0,
        harvestKg - initialKg
      );

    // --------------------------------------------------------
    // DEPTH WARNING
    // --------------------------------------------------------

    const shallowSpecies =
      rows.filter(
        (row) =>
          row.minDepth > 0 &&
          numericDepth <
            row.minDepth
      );

    // --------------------------------------------------------
    // RETURN RESULT
    // --------------------------------------------------------

    return {
      areaM2,
      areaHa,
      areaAcre,

      volumeM3,
      volumeLitres,

      densityRange,
      density,

      originalStock,
      totalStock,

      capped,

      rows,

      harvestKg,
      initialKg,
      biomassGain,
      feedKg,

      survivors,

      shallowSpecies,

      planName:
        selectedPlan.name,
    };
  }, [calculateKey]);

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="calculator-card">

      <h2>
        Fish Stocking Calculator
      </h2>

      <p className="text-muted">
        Estimate stocking quantity,
        survivors, harvest biomass and
        planning feed requirement.
      </p>

      {/* ======================================================
          INPUTS
      ====================================================== */}

      <div className="stocking-input-section">

        {/* POND DETAILS */}

        <div className="stocking-input-group">

          <div className="stocking-input-group-header">
            <div className="input-group-icon">🌊</div>

            <div>
              <h3>Pond Details</h3>
              <p>Enter the basic pond dimensions and culture system.</p>
            </div>
          </div>


          <div className="row g-3">

            {/* POND AREA */}

            <div className="col-md-6">

              <div className="stocking-field">

                <label>
                  Pond Area
                  <span className="required-mark">*</span>
                </label>

                <div className="input-with-unit">

                  <input
                    type="number"
                    className="form-control"
                    value={area}
                    min="0.01"
                    step="0.01"
                    onChange={(e) =>
                      setArea(e.target.value)
                    }
                    placeholder="Enter pond area"
                  />

                  <span className="input-unit">
                    {areaUnit === "acre"
                      ? "acre"
                      : areaUnit === "hectare"
                      ? "ha"
                      : "m²"}
                  </span>

                </div>

              </div>

            </div>


            {/* AREA UNIT */}

            <div className="col-md-6">

              <div className="stocking-field">

                <label>Area Unit</label>

                <select
                  className="form-select"
                  value={areaUnit}
                  onChange={(e) =>
                    setAreaUnit(e.target.value)
                  }
                >
                  <option value="acre">
                    Acre
                  </option>

                  <option value="hectare">
                    Hectare
                  </option>

                  <option value="m2">
                    m²
                  </option>
                </select>

              </div>

            </div>


            {/* DEPTH */}

            <div className="col-md-6">

              <div className="stocking-field">

                <label>
                  Average Water Depth
                </label>

                <div className="input-with-unit">

                  <input
                    type="number"
                    className="form-control"
                    value={depth}
                    min="0.2"
                    step="0.05"
                    onChange={(e) =>
                      setDepth(e.target.value)
                    }
                    placeholder="e.g. 1.5"
                  />

                  <span className="input-unit">
                    m
                  </span>

                </div>

              </div>

            </div>


            {/* CULTURE SYSTEM */}

            <div className="col-md-6">

              <div className="stocking-field">

                <label>Culture System</label>

                <select
                  className="form-select"
                  value={system}
                  onChange={(e) =>
                    setSystem(e.target.value)
                  }
                >

                  <option value="standard">
                    Standard / Low Input
                  </option>

                  <option value="managed">
                    Managed / Higher Input
                  </option>

                  <option value="intensive">
                    Intensive
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* CULTURE PLANNING */}

        <div className="stocking-input-group">

          <div className="stocking-input-group-header">
            <div className="input-group-icon">🐟</div>

            <div>
              <h3>Culture Planning</h3>
              <p>Choose your fish combination and planning parameters.</p>
            </div>
          </div>


          <div className="row g-3">

            {/* CULTURE PLAN */}

            <div className="col-md-12">

              <div className="stocking-field">

                <label>Culture Plan</label>

                <select
                  className="form-select"
                  value={plan}
                  onChange={(e) =>
                    setPlan(e.target.value)
                  }
                >

                  {Object.entries(plans).map(
                    ([key, value]) => (
                      <option
                        key={key}
                        value={key}
                      >
                        {value.name}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>


            {/* SURVIVAL */}

            <div className="col-md-4">

              <div className="stocking-field">

                <label>
                  Survival
                  <span className="field-unit">
                    %
                  </span>
                </label>

                <div className="input-with-unit">

                  <input
                    type="number"
                    className="form-control"
                    value={survival}
                    min="1"
                    max="100"
                    step="1"
                    onChange={(e) =>
                      setSurvival(e.target.value)
                    }
                  />

                  <span className="input-unit">
                    %
                  </span>

                </div>

              </div>

            </div>


            {/* FCR */}

            <div className="col-md-4">

              <div className="stocking-field">

                <label>
                  FCR
                  <span className="field-help">
                    Planning value
                  </span>
                </label>

                <input
                  type="number"
                  className="form-control"
                  value={fcr}
                  min="0.5"
                  max="5"
                  step="0.05"
                  onChange={(e) =>
                    setFcr(e.target.value)
                  }
                />

              </div>

            </div>


            {/* VOLUME CAP */}

            <div className="col-md-4">

              <div className="stocking-field">

                <label>Volume Cap</label>

                <select
                  className="form-select"
                  value={
                    volumeCap
                      ? "on"
                      : "off"
                  }
                  onChange={(e) =>
                    setVolumeCap(
                      e.target.value === "on"
                    )
                  }
                >

                  <option value="on">
                    ON — Conservative
                  </option>

                  <option value="off">
                    OFF
                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>


        {/* POND MANAGEMENT */}

        <div className="stocking-input-group">

          <div className="stocking-input-group-header">
            <div className="input-group-icon">⚙️</div>

            <div>
              <h3>Pond Management</h3>
              <p>Select the facilities currently available in the pond.</p>
            </div>
          </div>


          <div className="management-options">

            {/* AERATION */}

            <label
              className={`management-option ${
                aeration ? "management-option-active" : ""
              }`}
            >

              <input
                type="checkbox"
                checked={aeration}
                onChange={(e) =>
                  setAeration(e.target.checked)
                }
              />

              <span className="management-check">
                ✓
              </span>

              <span className="management-content">

                <strong>
                  Aeration available
                </strong>

                <small>
                  Helps maintain dissolved oxygen
                </small>

              </span>

            </label>


            {/* WATER EXCHANGE */}

            <label
              className={`management-option ${
                waterExchange
                  ? "management-option-active"
                  : ""
              }`}
            >

              <input
                type="checkbox"
                checked={waterExchange}
                onChange={(e) =>
                  setWaterExchange(
                    e.target.checked
                  )
                }
              />

              <span className="management-check">
                ✓
              </span>

              <span className="management-content">

                <strong>
                  Water exchange available
                </strong>

                <small>
                  Supports pond water management
                </small>

              </span>

            </label>

          </div>

        </div>

      </div>

      {/* ======================================================
          CALCULATE BUTTON
      ====================================================== */}

      <div className="stocking-calculate-section">

        <button
          type="button"
          className="stocking-calculate-btn"
          onClick={() => {
            setCalculatedValues({
              survival: Number(survival) || 0,
              fcr: Number(fcr) || 0,
              aeration,
              waterExchange,
            });

            setCalculateKey((prev) => prev + 1);
          }}
        >
          <span className="calculate-btn-icon">🧮</span>

          <span>
            Calculate Stocking Plan
          </span>
        </button>

        <p className="calculate-help-text">
          Enter your pond details and click Calculate to generate the
          stocking plan.
        </p>

      </div>

      <hr />

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="row g-3">

        <div className="col-md-3">

          <div className="result-box">

            <small>
              Pond Area
            </small>

            <strong>
              {formatNumber(
                result.areaAcre,
                2
              )}{" "}
              acre
            </strong>

          </div>

        </div>

        <div className="col-md-3">

          <div className="result-box">

            <small>
              Water Volume
            </small>

            <strong>
              {formatNumber(
                result.volumeM3,
                1
              )}{" "}
              m³
            </strong>

          </div>

        </div>

        <div className="col-md-3">

          <div className="result-box">

            <small>
              Recommended Seed
            </small>

            <strong>
              {formatNumber(
                result.totalStock
              )}
            </strong>

          </div>

        </div>

        <div className="col-md-3">

          <div className="result-box">

            <small>
              Expected Harvest
            </small>

            <strong>
              {formatNumber(
                result.harvestKg,
                1
              )}{" "}
              kg
            </strong>

          </div>

        </div>

      </div>

      {/* ======================================================
          STOCKING OVERVIEW
      ====================================================== */}

      <StockingOverview
        recommendedSeed={result.totalStock}
        survivors={result.survivors}
        harvestKg={result.harvestKg}
        feedKg={result.feedKg}
        survivalRate={calculatedValues.survival}
      />

      {/* ======================================================
          CAP WARNING
      ====================================================== */}

      {result.capped && (
        <div className="alert alert-warning mt-3">

          <strong>
            Water-volume cap applied.
          </strong>{" "}

          Stocking was reduced from{" "}

          {formatNumber(
            result.originalStock
          )}{" "}

          to{" "}

          {formatNumber(
            result.totalStock
          )}{" "}

          under the conservative{" "}

          {CARP_VOLUME_CAP_M3_PER_FISH}{" "}

          m³/fish planning ceiling.

        </div>
      )}

      {/* ======================================================
          DEPTH WARNING
      ====================================================== */}

      {result.shallowSpecies.length >
        0 && (
        <div className="alert alert-danger mt-3">

          <strong>
            Depth warning:
          </strong>{" "}

          Average depth{" "}

          {formatNumber(
            depth,
            2
          )}{" "}

          m is below the planning
          threshold for{" "}

          {result.shallowSpecies
            .map(
              (item) =>
                item.species
            )
            .join(", ")}{" "}

          .

        </div>
      )}

      {/* ======================================================
          INTENSIVE WARNING
      ====================================================== */}

      {!calculatedValues.aeration &&
        system ===
          "intensive" && (
          <div className="alert alert-warning mt-3">

            Intensive stocking selected
            without aeration. Treat this
            as a planning estimate and
            verify dissolved oxygen before
            stocking.

          </div>
        )}

      {/* ======================================================
          SPECIES-WISE STOCKING TABLE
      ====================================================== */}

      <div className="species-table-card">

        <div className="species-table-header">
          <div>
            <h3>Species-wise Stocking Plan</h3>
            <p>
              Stocking, survival, harvest biomass and space requirement
              by species.
            </p>
          </div>
        </div>

        <div className="species-table-wrapper">

          <table className="species-table">

            <thead>
              <tr>
                <th>Species</th>
                <th>Stock</th>
                <th>Survivors</th>
                <th>Harvest Biomass</th>
                <th>Volume / Fish</th>
              </tr>
            </thead>

            <tbody>
              {result.rows.map((row, index) => (
                <tr key={row.species || index}>

                  <td>
                    <div className="species-name-cell">
                      <span className="species-fish-icon">
                        🐟
                      </span>

                      <strong>
                        {row.species}
                      </strong>
                    </div>
                  </td>

                  <td>
                    <span className="species-number">
                      {Number(row.stock || 0).toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td>
                    <span className="species-number">
                      {Number(row.survivors || 0).toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td>
                    <span className="species-harvest">
                      {Number(row.harvestBiomass || 0).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 1,
                          maximumFractionDigits: 1,
                        }
                      )}{" "}
                      kg
                    </span>
                  </td>

                  <td>
                    <span className="species-volume">
                      {Number(row.volumePerFish || 0).toFixed(2)}{" "}
                      m³
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* ======================================================
          FEED ESTIMATE
      ====================================================== */}

      <div className="stocking-info-grid">

        <div className="stocking-info-card feed-estimate-card">

          <div className="stocking-info-card-header">
            <div className="stocking-info-icon">🌾</div>

            <div>
              <h3>Feed Estimate</h3>
              <p>Planning-based feed requirement</p>
            </div>
          </div>

          <div className="feed-estimate-content">

            <div className="feed-stat">
              <span>Biomass Gain</span>
              <strong>
                {formatNumber(result.biomassGain, 1)} kg
              </strong>
            </div>

            <div className="feed-divider"></div>

            <div className="feed-stat">
              <span>FCR</span>
              <strong>
                {formatNumber(calculatedValues.fcr, 2)}
              </strong>
            </div>

            <div className="feed-divider"></div>

            <div className="feed-stat highlight">
              <span>Estimated Feed</span>
              <strong>
                {formatNumber(result.feedKg, 1)} kg
              </strong>
            </div>

          </div>

          <div className="stocking-info-note">
            Based on estimated biomass gain and the selected planning FCR.
          </div>

        </div>


        {/* ======================================================
            OPERATIONAL CHECKS
        ====================================================== */}

        <div className="stocking-info-card operational-card">

          <div className="stocking-info-card-header">
            <div className="stocking-info-icon">⚙️</div>

            <div>
              <h3>Operational Checks</h3>
              <p>Current pond planning conditions</p>
            </div>
          </div>

          <div className="operational-list">

            <div className="operational-item">
              <div className="operational-item-left">
                <span className="operational-icon">🐟</span>
                <span>Expected Surviving Fish</span>
              </div>

              <strong>
                {formatNumber(result.survivors)}
              </strong>
            </div>


            <div className="operational-item">

              <div className="operational-item-left">
                <span className="operational-icon">💨</span>
                <span>Aeration</span>
              </div>

              <span
                className={`operational-status ${
                  calculatedValues.aeration
                    ? "status-available"
                    : "status-not-selected"
                }`}
              >
                <span className="status-dot"></span>

                {calculatedValues.aeration
                  ? "Available"
                  : "Not selected"}
              </span>

            </div>


            <div className="operational-item">

              <div className="operational-item-left">
                <span className="operational-icon">💧</span>
                <span>Water Exchange</span>
              </div>

              <span
                className={`operational-status ${
                  calculatedValues.waterExchange
                    ? "status-available"
                    : "status-not-selected"
                }`}
              >
                <span className="status-dot"></span>

                {calculatedValues.waterExchange
                  ? "Available"
                  : "Not selected"}
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* ======================================================
          PLANNING DISCLAIMER
      ====================================================== */}

      <div className="stocking-disclaimer">

        <div className="stocking-disclaimer-icon">
          ℹ️
        </div>

        <div>

          <strong>Planning tool only</strong>

          <p>
            Final stocking should be validated against pond
            productivity, dissolved oxygen, water quality,
            feed load, seed quality and local aquaculture SOP.
          </p>

        </div>

      </div>

    </div>
  );
}