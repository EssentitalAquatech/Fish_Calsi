import { useMemo, useState } from "react";

import InputField from "../components/InputField";

import { calculateFCR } from "../utils/calculations";

export default function FCRCalculator() {
  const [feed, setFeed] = useState(1000);

  const [initialBiomass, setInitialBiomass] =
    useState(500);

  const [finalBiomass, setFinalBiomass] =
    useState(1200);

  const result = useMemo(() => {
    const totalFeedKg = Number(feed) || 0;
    const initialBiomassKg =
      Number(initialBiomass) || 0;
    const finalBiomassKg =
      Number(finalBiomass) || 0;

    const biomassGainKg =
      finalBiomassKg - initialBiomassKg;

    if (
      totalFeedKg <= 0 ||
      biomassGainKg <= 0
    ) {
      return {
        biomassGainKg,
        fcr: 0,
      };
    }

    const fcr = calculateFCR(
      totalFeedKg,
      biomassGainKg
    );

    return {
      biomassGainKg,
      fcr: Number(fcr) || 0,
    };
  }, [
    feed,
    initialBiomass,
    finalBiomass,
  ]);

  return (
    <div className="calculator-card">

      <h2>FCR Calculator</h2>

      <p className="text-muted">
        Calculate Feed Conversion Ratio from
        total feed consumed and biomass gain.
      </p>

      <div className="row g-3">

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

      {/* RESULTS */}

      <div className="row g-3 mt-3">

        <div className="col-md-6">
          <div className="result-box">

            <small>
              Biomass Gain
            </small>

            <strong>
              {Number(
                result.biomassGainKg
              ).toFixed(2)}{" "}
              kg
            </strong>

          </div>
        </div>

        <div className="col-md-6">
          <div className="result-box">

            <small>
              Feed Conversion Ratio
            </small>

            <strong>
              {Number(result.fcr).toFixed(2)}
            </strong>

          </div>
        </div>

      </div>

      {/* WARNING */}

      {result.biomassGainKg <= 0 && (
        <div className="alert alert-warning mt-3">
          Final biomass must be greater than
          initial biomass to calculate FCR.
        </div>
      )}

      {/* FORMULA */}

      {result.biomassGainKg > 0 && (
        <div className="alert alert-success mt-3">

          <strong>
            FCR Calculation
          </strong>

          <br />

          Total Feed Consumed ÷ Biomass Gain

          <br />

          {Number(feed).toFixed(2)} kg ÷{" "}

          {Number(
            result.biomassGainKg
          ).toFixed(2)}{" "}
          kg ={" "}

          <strong>
            {Number(result.fcr).toFixed(2)}
          </strong>

        </div>
      )}

    </div>
  );
}