
import React from "react";
import { useTranslation } from "react-i18next";

const calculatorIcons = {
  pondVolume: "💧",
  fishStocking: "🐟",
  feedRequirement: "🌾",
  fcr: "📊",
  pondLime: "🪨",
  // probiotic: "🧪",
  profitability: "💰",
  waterExchange: "🔄",
};

const Sidebar = ({
  calculators = [],
  activeCalculator,
  onSelect,
}) => {
  const { t } = useTranslation();

  return (
    <aside className="calculator-sidebar">

      <div className="sidebar-header">
        <span className="sidebar-header-icon">
          📋
        </span>

        <div>
          <h2>
            {t(
              "calculator.sidebarTitle",
              "Calculators"
            )}
          </h2>

          <p>
            {t(
              "calculator.sidebarSubtitle",
              "Select a calculator"
            )}
          </p>
        </div>
      </div>

      <div className="calculator-menu">

        {calculators.map((calculator) => {
          const isActive =
            activeCalculator === calculator.id;

          return (
            <button
              key={calculator.id}
              type="button"
              className={`calculator-menu-item ${
                isActive ? "active" : ""
              }`}
              onClick={() =>
                onSelect(calculator.id)
              }
            >
              <span className="calculator-menu-icon">
                {calculatorIcons[calculator.id] || "🧮"}
              </span>

              <span className="calculator-menu-text">
                {t(
                  calculator.titleKey,
                  calculator.title
                )}
              </span>

              <span className="calculator-menu-arrow">
                ›
              </span>
            </button>
          );
        })}

      </div>
    </aside>
  );
};

export default Sidebar;
