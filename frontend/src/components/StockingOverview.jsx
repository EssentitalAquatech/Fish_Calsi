import React from "react";

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

export default function StockingOverview({
  recommendedSeed = 0,
  survivors = 0,
  harvestKg = 0,
  feedKg = 0,
  survivalRate = 0,
}) {
  const safeSeed = Math.max(0, Number(recommendedSeed) || 0);
  const safeSurvivors = Math.max(0, Number(survivors) || 0);
  const safeHarvest = Math.max(0, Number(harvestKg) || 0);
  const safeFeed = Math.max(0, Number(feedKg) || 0);
  const safeSurvival = Math.min(
    100,
    Math.max(0, Number(survivalRate) || 0)
  );

  const survivorPercent =
    safeSeed > 0
      ? Math.min(100, (safeSurvivors / safeSeed) * 100)
      : 0;

  const maxProduction = Math.max(
    safeHarvest,
    safeFeed,
    1
  );

  return (
    <div className="stocking-overview-card">

      {/* Header */}
      <div className="stocking-overview-header">
        <div>
          <div className="stocking-overview-title">
            Stocking Overview
          </div>

          <div className="stocking-overview-subtitle">
            Fish population, production and feed planning
          </div>
        </div>

        <div className="stocking-survival-badge">
          <span>Survival</span>
          <strong>{formatNumber(safeSurvival)}%</strong>
        </div>
      </div>

      {/* Population Section */}
      <div className="stocking-section">

        <div className="stocking-section-title">
          <span className="stocking-section-icon">
            🐟
          </span>

          Fish Population
        </div>

        <div className="stocking-population-grid">

          {/* Recommended Seed */}
          <div className="stocking-metric-card">

            <div className="stocking-metric-top">
              <span className="stocking-metric-icon seed-icon">
                🐟
              </span>

              <span className="stocking-metric-label">
                Recommended Seed
              </span>
            </div>

            <div className="stocking-metric-value">
              {formatNumber(safeSeed)}
            </div>

            <div className="stocking-metric-unit">
              fish
            </div>

            <div className="stocking-mini-bar">
              <div
                className="stocking-mini-bar-fill seed-fill"
                style={{ width: "100%" }}
              />
            </div>

          </div>

          {/* Expected Survivors */}
          <div className="stocking-metric-card">

            <div className="stocking-metric-top">
              <span className="stocking-metric-icon survivor-icon">
                🐠
              </span>

              <span className="stocking-metric-label">
                Expected Survivors
              </span>
            </div>

            <div className="stocking-metric-value">
              {formatNumber(safeSurvivors)}
            </div>

            <div className="stocking-metric-unit">
              fish
            </div>

            <div className="stocking-mini-bar">
              <div
                className="stocking-mini-bar-fill survivor-fill"
                style={{
                  width: `${survivorPercent}%`,
                }}
              />
            </div>

            <div className="stocking-bar-note">
              {formatNumber(survivorPercent, 1)}% of stocked fish
            </div>

          </div>

        </div>
      </div>

      {/* Production Section */}
      <div className="stocking-section">

        <div className="stocking-section-title">
          <span className="stocking-section-icon">
            📦
          </span>

          Production & Feed
        </div>

        <div className="stocking-production-grid">

          {/* Harvest */}
          <div className="stocking-production-card">

            <div className="stocking-production-header">
              <span className="stocking-production-icon harvest-icon">
                📦
              </span>

              <span>
                Expected Harvest
              </span>
            </div>

            <div className="stocking-production-value">
              {formatNumber(safeHarvest, 1)}
              <small> kg</small>
            </div>

            <div className="stocking-production-bar">
              <div
                className="stocking-production-fill harvest-fill"
                style={{
                  width: `${Math.max(
                    8,
                    (safeHarvest / maxProduction) * 100
                  )}%`,
                }}
              />
            </div>

          </div>

          {/* Feed */}
          <div className="stocking-production-card">

            <div className="stocking-production-header">
              <span className="stocking-production-icon feed-icon">
                🌾
              </span>

              <span>
                Feed Requirement
              </span>
            </div>

            <div className="stocking-production-value">
              {formatNumber(safeFeed, 1)}
              <small> kg</small>
            </div>

            <div className="stocking-production-bar">
              <div
                className="stocking-production-fill feed-fill"
                style={{
                  width: `${Math.max(
                    8,
                    (safeFeed / maxProduction) * 100
                  )}%`,
                }}
              />
            </div>

          </div>

        </div>
      </div>

      {/* Survival Rate */}
      <div className="stocking-survival-section">

        <div className="stocking-survival-info">

          <div>
            <span className="stocking-survival-label">
              Survival Rate
            </span>

            <span className="stocking-survival-description">
              Expected fish surviving until harvest
            </span>
          </div>

          <strong>
            {formatNumber(safeSurvival)}%
          </strong>

        </div>

        <div className="stocking-survival-track">
          <div
            className="stocking-survival-progress"
            style={{
              width: `${safeSurvival}%`,
            }}
          />
        </div>

        <div className="stocking-survival-scale">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>

      </div>

    </div>
  );
}