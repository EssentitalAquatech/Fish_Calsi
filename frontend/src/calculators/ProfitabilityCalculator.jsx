// import { useState } from "react";

// import InputField from "../components/InputField";
// import ResultCard from "../components/ResultCard";

// import {
//   calculateProfit,
// } from "../utils/calculations";

// import {
//   formatCurrency,
//   formatNumber,
// } from "../utils/formatters";

// function ProfitabilityCalculator() {
//   const [harvestQuantity, setHarvestQuantity] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");

//   const [seedCost, setSeedCost] = useState("");
//   const [feedCost, setFeedCost] = useState("");
//   const [limeCost, setLimeCost] = useState("");
//   const [probioticCost, setProbioticCost] = useState("");
//   const [labourCost, setLabourCost] = useState("");
//   const [electricityCost, setElectricityCost] = useState("");
//   const [otherCost, setOtherCost] = useState("");

//   const [result, setResult] = useState(null);

//   const calculate = (e) => {
//     e.preventDefault();

//     const revenue =
//       Number(harvestQuantity) *
//       Number(sellingPrice);

//     if (revenue <= 0) {
//       setResult(null);
//       return;
//     }

//     const calculated = calculateProfit({
//       revenue,
//       seedCost,
//       feedCost,
//       limeCost,
//       probioticCost,
//       labourCost,
//       electricityCost,
//       otherCost,
//     });

//     const profitMargin =
//       revenue > 0
//         ? (calculated.profit / revenue) * 100
//         : 0;

//     const costPerKg =
//       Number(harvestQuantity) > 0
//         ? calculated.totalCost /
//           Number(harvestQuantity)
//         : 0;

//     setResult({
//       revenue,
//       ...calculated,
//       profitMargin,
//       costPerKg,
//     });
//   };

//   return (
//     <div className="calculator-inner">

//       <form
//         onSubmit={calculate}
//         className="calculator-form"
//       >

//         <div className="form-section">
//           <h3 className="form-section-title">
//             Revenue
//           </h3>

//           <div className="form-section-grid">
//             <InputField
//               label="Expected Harvest"
//               value={harvestQuantity}
//               onChange={setHarvestQuantity}
//               suffix="kg"
//             />

//             <InputField
//               label="Selling Price"
//               value={sellingPrice}
//               onChange={setSellingPrice}
//               suffix="₹/kg"
//             />
//           </div>
//         </div>

//         <div className="form-section">
//           <h3 className="form-section-title">
//             Production Costs
//           </h3>

//           <div className="form-section-grid">

//             <InputField
//               label="Seed / Fingerling Cost"
//               value={seedCost}
//               onChange={setSeedCost}
//               suffix="₹"
//             />

//             <InputField
//               label="Feed Cost"
//               value={feedCost}
//               onChange={setFeedCost}
//               suffix="₹"
//             />

//             <InputField
//               label="Lime Cost"
//               value={limeCost}
//               onChange={setLimeCost}
//               suffix="₹"
//             />

//             <InputField
//               label="Probiotic Cost"
//               value={probioticCost}
//               onChange={setProbioticCost}
//               suffix="₹"
//             />

//             <InputField
//               label="Labour Cost"
//               value={labourCost}
//               onChange={setLabourCost}
//               suffix="₹"
//             />

//             <InputField
//               label="Electricity / Fuel Cost"
//               value={electricityCost}
//               onChange={setElectricityCost}
//               suffix="₹"
//             />

//             <InputField
//               label="Other Cost"
//               value={otherCost}
//               onChange={setOtherCost}
//               suffix="₹"
//             />

//           </div>
//         </div>

//         <button
//           type="submit"
//           className="calculate-button"
//         >
//           Calculate Profitability
//         </button>

//       </form>

//       {result && (
//         <ResultCard
//           title="Estimated Profit"
//           value={formatCurrency(result.profit)}
//           items={[
//             {
//               label: "Revenue",
//               value: formatCurrency(result.revenue),
//             },
//             {
//               label: "Total Cost",
//               value: formatCurrency(
//                 result.totalCost
//               ),
//             },
//             {
//               label: "Cost per kg",
//               value: formatCurrency(
//                 result.costPerKg
//               ),
//             },
//             {
//               label: "Profit Margin",
//               value: formatNumber(
//                 result.profitMargin
//               ),
//               unit: "%",
//             },
//           ]}
//         />
//       )}

//       <div className="formula-info">
//         <h3 className="formula-info-title">
//           Calculation
//         </h3>

//         <p className="formula-info-text">
//           Revenue = Harvest Quantity × Selling Price
//         </p>

//         <p className="formula-info-text">
//           Total Cost = Seed + Feed + Lime + Probiotic
//           + Labour + Electricity/Fuel + Other Costs
//         </p>

//         <p className="formula-info-text">
//           Profit = Revenue − Total Cost
//         </p>

//         <p className="formula-info-text">
//           Profit Margin = (Profit ÷ Revenue) × 100
//         </p>
//       </div>

//     </div>
//   );
// }

// export default ProfitabilityCalculator;














import { useState } from "react";
import InputField from "../components/InputField";
import { formatCurrency, formatNumber } from "../utils/formatters";

function ProfitabilityCalculator() {
  const [harvestQuantity, setHarvestQuantity] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const [seedCost, setSeedCost] = useState("");
  const [feedCost, setFeedCost] = useState("");
  const [limeCost, setLimeCost] = useState("");
  const [probioticCost, setProbioticCost] = useState("");
  const [labourCost, setLabourCost] = useState("");
  const [electricityCost, setElectricityCost] = useState("");
  const [otherCost, setOtherCost] = useState("");

  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();

    const harvest = Number(harvestQuantity) || 0;
    const price = Number(sellingPrice) || 0;

    const seed = Number(seedCost) || 0;
    const feed = Number(feedCost) || 0;
    const lime = Number(limeCost) || 0;
    const probiotic = Number(probioticCost) || 0;
    const labour = Number(labourCost) || 0;
    const electricity = Number(electricityCost) || 0;
    const other = Number(otherCost) || 0;

    const revenue = harvest * price;

    const totalCost =
      seed +
      feed +
      lime +
      probiotic +
      labour +
      electricity +
      other;

    const profit = revenue - totalCost;

    const profitMargin =
      revenue > 0
        ? (profit / revenue) * 100
        : 0;

    const costPerKg =
      harvest > 0
        ? totalCost / harvest
        : 0;

    setResult({
      harvest,
      price,
      revenue,
      totalCost,
      profit,
      profitMargin,
      costPerKg,
    });
  };

  const graphMax = result
    ? Math.max(
        result.revenue,
        result.totalCost,
        Math.abs(result.profit),
        1
      )
    : 1;

  const revenueHeight = result
    ? Math.max((result.revenue / graphMax) * 100, 4)
    : 0;

  const costHeight = result
    ? Math.max((result.totalCost / graphMax) * 100, 4)
    : 0;

  const profitHeight = result
    ? Math.max((Math.abs(result.profit) / graphMax) * 100, 4)
    : 0;

  return (
    <div className="profitability-calculator">

      {/* Header */}
      <div className="profitability-header">
        <div className="profitability-header-icon">
          ₹
        </div>

        <div>
          <h2>Profitability Calculator</h2>

          <p>
            Estimate revenue, total cost, profit and basic
            farming profitability.
          </p>
        </div>
      </div>

      <form onSubmit={calculate}>

        {/* Revenue */}
        <div className="profitability-section">

          <div className="profitability-section-header">
            <div className="profitability-section-icon">
              💰
            </div>

            <div>
              <h3>Revenue</h3>

              <p>
                Enter expected harvest and selling price.
              </p>
            </div>
          </div>

          <div className="row g-4">

            <div className="col-md-6">
              <InputField
                label="Expected Harvest"
                value={harvestQuantity}
                onChange={setHarvestQuantity}
                unit="kg"
                placeholder="e.g. 1000"
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Selling Price"
                value={sellingPrice}
                onChange={setSellingPrice}
                unit="₹/kg"
                placeholder="e.g. 150"
              />
            </div>

          </div>
        </div>

        {/* Production Costs */}
        <div className="profitability-section">

          <div className="profitability-section-header">
            <div className="profitability-section-icon cost-icon">
              📋
            </div>

            <div>
              <h3>Production Costs</h3>

              <p>
                Enter all farming and operational costs.
              </p>
            </div>
          </div>

          <div className="row g-4">

            <div className="col-md-6">
              <InputField
                label="Seed / Fingerling Cost"
                value={seedCost}
                onChange={setSeedCost}
                unit="₹"
                placeholder="e.g. 10000"
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Feed Cost"
                value={feedCost}
                onChange={setFeedCost}
                unit="₹"
                placeholder="e.g. 25000"
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Lime Cost"
                value={limeCost}
                onChange={setLimeCost}
                unit="₹"
                placeholder="e.g. 3000"
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Probiotic Cost"
                value={probioticCost}
                onChange={setProbioticCost}
                unit="₹"
                placeholder="e.g. 5000"
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Labour Cost"
                value={labourCost}
                onChange={setLabourCost}
                unit="₹"
                placeholder="e.g. 8000"
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Electricity / Fuel Cost"
                value={electricityCost}
                onChange={setElectricityCost}
                unit="₹"
                placeholder="e.g. 4000"
              />
            </div>

            <div className="col-md-6">
              <InputField
                label="Other Cost"
                value={otherCost}
                onChange={setOtherCost}
                unit="₹"
                placeholder="e.g. 2000"
              />
            </div>

          </div>
        </div>

        {/* Calculate */}
        <div className="profitability-button-wrapper">
          <button
            type="submit"
            className="profitability-calculate-btn"
          >
            🧮 Calculate Profitability
          </button>
        </div>

      </form>

      {/* Empty */}
      {!result && (
        <div className="profitability-empty-state">

          <div className="profitability-empty-icon">
            📊
          </div>

          <div>
            <strong>Ready to calculate</strong>

            <p>
              Enter your values and click Calculate
              to generate the profitability result.
            </p>
          </div>

        </div>
      )}

      {/* RESULTS */}
      {result && (
        <div className="profitability-results">

          <div className="profitability-results-header">

            <div>
              <span className="profitability-badge">
                ✓ Calculated
              </span>

              <h3>Profitability Results</h3>

              <p>
                Financial summary based on your entered data.
              </p>
            </div>

            <div
              className={`profitability-status ${
                result.profit >= 0
                  ? "profit-positive"
                  : "profit-negative"
              }`}
            >
              {result.profit >= 0 ? "Profit" : "Loss"}
            </div>

          </div>

          {/* Main Profit */}
          <div
            className={`profitability-main-card ${
              result.profit >= 0
                ? "main-profit"
                : "main-loss"
            }`}
          >

            <div className="profitability-main-icon">
              {result.profit >= 0 ? "📈" : "📉"}
            </div>

            <div>
              <span>
                Estimated{" "}
                {result.profit >= 0 ? "Profit" : "Loss"}
              </span>

              <strong>
                {formatCurrency(
                  Math.abs(result.profit)
                )}
              </strong>

              <small>
                Net result after total production costs
              </small>
            </div>

          </div>

          {/* Summary Cards */}
          <div className="row g-4 profitability-summary-grid">

            <div className="col-md-3">
              <div className="profitability-summary-card">
                <div className="summary-icon revenue-summary">
                  💰
                </div>

                <span>Revenue</span>

                <strong>
                  {formatCurrency(result.revenue)}
                </strong>
              </div>
            </div>

            <div className="col-md-3">
              <div className="profitability-summary-card">
                <div className="summary-icon cost-summary">
                  📋
                </div>

                <span>Total Cost</span>

                <strong>
                  {formatCurrency(result.totalCost)}
                </strong>
              </div>
            </div>

            <div className="col-md-3">
              <div className="profitability-summary-card">
                <div className="summary-icon kg-summary">
                  ⚖️
                </div>

                <span>Cost per kg</span>

                <strong>
                  {formatCurrency(result.costPerKg)}
                </strong>
              </div>
            </div>

            <div className="col-md-3">
              <div className="profitability-summary-card">
                <div className="summary-icon margin-summary">
                  %
                </div>

                <span>Profit Margin</span>

                <strong>
                  {formatNumber(
                    result.profitMargin,
                    2
                  )}
                  %
                </strong>
              </div>
            </div>

          </div>

          {/* Formula */}
          <div className="profitability-formula-card">

            <div className="profitability-formula-icon">
              ∑
            </div>

            <div>
              <span>Profit Calculation</span>

              <strong>
                Revenue − Total Cost
              </strong>

              <p>
                {formatCurrency(result.revenue)}
                {" − "}
                {formatCurrency(result.totalCost)}
                {" = "}
                <b>
                  {formatCurrency(result.profit)}
                </b>
              </p>
            </div>

          </div>

          {/* GRAPH */}
          <div className="profitability-chart-card">

            <div className="profitability-chart-header">

              <div>
                <h3>
                  Financial Overview
                </h3>

                <p>
                  Revenue, total cost and profit comparison.
                </p>
              </div>

              <div className="profitability-margin-badge">
                Margin{" "}
                {formatNumber(
                  result.profitMargin,
                  2
                )}
                %
              </div>

            </div>

            <div className="profitability-chart">

              <div className="profitability-y-axis">

                <span>
                  {formatCurrency(graphMax)}
                </span>

                <span>
                  {formatCurrency(graphMax * 0.75)}
                </span>

                <span>
                  {formatCurrency(graphMax * 0.5)}
                </span>

                <span>
                  {formatCurrency(graphMax * 0.25)}
                </span>

                <span>₹0</span>

              </div>

              <div className="profitability-chart-main">

                <div className="profitability-grid-lines">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="profitability-bars">

                  {/* Revenue */}
                  <div className="profitability-bar-column">

                    <div
                      className="profitability-bar-value"
                      style={{
                        bottom: `calc(52px + ${revenueHeight * 2.45}px)`,
                      }}
                    >
                      {formatCurrency(result.revenue)}
                    </div>

                    <div className="profitability-bar-wrapper">

                      <div
                        className="profitability-bar revenue-bar"
                        style={{
                          height: `${revenueHeight}%`,
                        }}
                      />

                    </div>

                    <div className="profitability-bar-label">
                      <span>💰</span>
                      <strong>Revenue</strong>
                    </div>

                  </div>

                  {/* Total Cost */}
                  <div className="profitability-bar-column">

                    <div
                      className="profitability-bar-value"
                      style={{
                        bottom: `calc(52px + ${costHeight * 2.45}px)`,
                      }}
                    >
                      {formatCurrency(result.totalCost)}
                    </div>

                    <div className="profitability-bar-wrapper">

                      <div
                        className="profitability-bar cost-bar"
                        style={{
                          height: `${costHeight}%`,
                        }}
                      />

                    </div>

                    <div className="profitability-bar-label">
                      <span>📋</span>
                      <strong>Total Cost</strong>
                    </div>

                  </div>

                  {/* Profit */}
                  <div className="profitability-bar-column">

                    <div
                      className="profitability-bar-value"
                      style={{
                        bottom: `calc(52px + ${profitHeight * 2.45}px)`,
                      }}
                    >
                      {formatCurrency(
                        Math.abs(result.profit)
                      )}
                    </div>

                    <div className="profitability-bar-wrapper">

                      <div
                        className={`profitability-bar ${
                          result.profit >= 0
                            ? "profit-bar"
                            : "loss-bar"
                        }`}
                        style={{
                          height: `${profitHeight}%`,
                        }}
                      />

                    </div>

                    <div className="profitability-bar-label">
                      <span>
                        {result.profit >= 0
                          ? "📈"
                          : "📉"}
                      </span>

                      <strong>
                        {result.profit >= 0
                          ? "Profit"
                          : "Loss"}
                      </strong>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Calculation Details */}
          <div className="profitability-details-card">

            <div className="profitability-details-header">
              <h3>Calculation Details</h3>

              <span>
                Farming Economics
              </span>
            </div>

            <div className="profitability-detail-row">
              <span>Expected Harvest</span>

              <strong>
                {formatNumber(result.harvest, 2)} kg
              </strong>
            </div>

            <div className="profitability-detail-row">
              <span>Selling Price</span>

              <strong>
                {formatCurrency(result.price)} / kg
              </strong>
            </div>

            <div className="profitability-detail-row">
              <span>Revenue</span>

              <strong>
                {formatCurrency(result.revenue)}
              </strong>
            </div>

            <div className="profitability-detail-row">
              <span>Total Production Cost</span>

              <strong>
                {formatCurrency(result.totalCost)}
              </strong>
            </div>

            <div className="profitability-detail-row highlight-row">
              <span>
                {result.profit >= 0
                  ? "Net Profit"
                  : "Net Loss"}
              </span>

              <strong>
                {formatCurrency(result.profit)}
              </strong>
            </div>

          </div>

        </div>
      )}

      {/* Formula Info */}
      <div className="profitability-info-card">

        <div className="profitability-info-icon">
          💡
        </div>

        <div>
          <h3>Calculation</h3>

          <p>
            Revenue = Harvest Quantity × Selling Price
          </p>

          <p>
            Total Cost = Seed + Feed + Lime + Probiotic
            + Labour + Electricity/Fuel + Other Costs
          </p>

          <p>
            Profit = Revenue − Total Cost
          </p>

          <p>
            Profit Margin = (Profit ÷ Revenue) × 100
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProfitabilityCalculator;



