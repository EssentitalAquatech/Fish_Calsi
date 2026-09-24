
import React, { useState } from "react";
import ProfitabilityCalculator from "../calculators/ProfitabilityCalculator";  
import CalculatorLayout from "../components/CalculatorLayout";

import PondVolumeCalculator from "../calculators/PondVolumeCalculator";
import FishStockingCalculator from "../calculators/FishStockingCalculator";
import FeedRequirementCalculator from "../calculators/FeedRequirementCalculator";
import FCRCalculator from "../calculators/FCRCalculator";
import PondLimeCalculator from "../calculators/PondLimeCalculator";
// import ProbioticCalculator from "../calculators/ProbioticCalculator";

import WaterExchangeCalculator from "../calculators/WaterExchangeCalculator";

const calculators = [
  {
    id: "pondVolume",
    title: "Pond Volume Calculator",
    titleKey: "calculators.pondVolume.title",
    description:
      "Calculate pond water volume using pond dimensions and average depth.",
    component: PondVolumeCalculator,
  },
  {
    id: "fishStocking",
    title: "Fish Stocking Calculator",
    titleKey: "calculators.fishStocking.title",
    description:
      "Estimate suitable fish stocking quantity based on pond area and farming system.",
    component: FishStockingCalculator,
  },
  {
    id: "feedRequirement",
    title: "Feed Requirement Calculator",
    titleKey: "calculators.feedRequirement.title",
    description:
      "Calculate approximate daily feed requirement from fish biomass and feeding rate.",
    component: FeedRequirementCalculator,
  },
  {
    id: "fcr",
    title: "FCR Calculator",
    titleKey: "calculators.fcr.title",
    description:
      "Calculate Feed Conversion Ratio from feed consumed and biomass gain.",
    component: FCRCalculator,
  },
  {
    id: "pondLime",
    title: "Pond Lime Calculator",
    titleKey: "calculators.pondLime.title",
    description:
      "Estimate pond lime requirement based on pond area, soil pH and soil type.",
    component: PondLimeCalculator,
  },
  // {
  //   id: "probiotic",
  //   title: "Probiotic / Dosage Calculator",
  //   titleKey: "calculators.probiotic.title",
  //   description:
  //     "Calculate product dosage according to the selected product instructions.",
  //   component: ProbioticCalculator,
  // },
  {
    id: "profitability",
    title: "Profitability Calculator",
    titleKey: "calculators.profitability.title",
    description:
      "Estimate revenue, total cost, profit and basic farming profitability.",
    component: ProfitabilityCalculator,
  },
  {
    id: "waterExchange",
    title: "Water Exchange Calculator",
    titleKey: "calculators.waterExchange.title",
    description:
      "Estimate water quantity required for a selected water exchange percentage.",
    component: WaterExchangeCalculator,
  },
];

const CalculatorPage = () => {
  const [activeCalculator, setActiveCalculator] = useState(
    calculators[0].id
  );

  const selectedCalculator = calculators.find(
    (calculator) => calculator.id === activeCalculator
  );

  const CalculatorComponent = selectedCalculator?.component;

  return (
    <CalculatorLayout
      calculators={calculators}
      activeCalculator={activeCalculator}
      onSelect={setActiveCalculator}
    >
      <div className="calculator-container">

        {/* Calculator Header */}
        <div className="calculator-header">
          <div className="calculator-header-icon">
            🧮
          </div>

          <div>
            <div className="calculator-breadcrumb">
              Fish Farming Calculator
            </div>

            <h2 className="calculator-title">
              {selectedCalculator?.title}
            </h2>

            <p className="calculator-description">
              {selectedCalculator?.description}
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="calculator-content-card">
          {CalculatorComponent && <CalculatorComponent />}
        </div>

      </div>
    </CalculatorLayout>
  );
};

export default CalculatorPage;

