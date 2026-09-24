import React from "react";

const CalculatorChart = ({
  title = "Result Overview",
  data = [],
  dataKey = "value",
  xKey = "name",
  unit = "",
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  const values = data.map((item) => Number(item[dataKey]) || 0);

  const maxValue = Math.max(...values, 1);

  return (
    <div className="calculator-chart-card">
      <div className="calculator-chart-header">
        <div>
          <h3>{title}</h3>
          <p>Visual representation of the calculated result</p>
        </div>
      </div>

      <div className="calculator-chart">
        <div className="chart-y-axis">
          <span>
            {maxValue.toLocaleString("en-IN")}
            {unit ? ` ${unit}` : ""}
          </span>

          <span>
            {Math.round(maxValue * 0.75).toLocaleString("en-IN")}
          </span>

          <span>
            {Math.round(maxValue * 0.5).toLocaleString("en-IN")}
          </span>

          <span>
            {Math.round(maxValue * 0.25).toLocaleString("en-IN")}
          </span>

          <span>0</span>
        </div>

        <div className="chart-main">
          <div className="chart-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="chart-bars">
            {data.map((item, index) => {
              const value = Number(item[dataKey]) || 0;

              const height =
                maxValue > 0
                  ? (value / maxValue) * 100
                  : 0;

              return (
                <div
                  className="chart-bar-column"
                  key={`${item[xKey]}-${index}`}
                >
                  <div className="chart-bar-value">
                    {value.toLocaleString("en-IN")}
                    {unit ? ` ${unit}` : ""}
                  </div>

                  <div className="chart-bar-wrapper">
                    <div
                      className="chart-bar"
                      style={{
                        height: `${Math.max(height, 3)}%`,
                      }}
                    ></div>
                  </div>

                  <div className="chart-bar-label">
                    {item[xKey]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorChart;