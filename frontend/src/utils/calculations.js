// src/utils/calculations.js

// ============================================================
// CONSTANTS
// ============================================================

export const ACRE_TO_M2 = 4046.8564224;
export const HA_TO_M2 = 10000;
export const M2_TO_HA = 1 / 10000;
export const ACRE_TO_HA = 0.40468564224;

// Original Fish Stocking Calculator logic
export const CARP_VOLUME_CAP_M3_PER_FISH = 2.0;


// ============================================================
// RANGE HELPER
// ============================================================

/**
 * Returns midpoint of a density/range.
 *
 * Examples:
 * getRangeMid([4000, 6000]) -> 5000
 * getRangeMid({ min: 4000, max: 6000 }) -> 5000
 * getRangeMid(4000, 6000) -> 5000
 */
export function getRangeMid(rangeOrMin, maxValue = null) {
  let min;
  let max;

  // getRangeMid([4000, 6000])
  if (Array.isArray(rangeOrMin)) {
    min = Number(rangeOrMin[0]);
    max = Number(rangeOrMin[1]);
  }

  // getRangeMid({ min: 4000, max: 6000 })
  else if (
    rangeOrMin &&
    typeof rangeOrMin === "object"
  ) {
    min = Number(
      rangeOrMin.min ??
      rangeOrMin.low ??
      rangeOrMin[0]
    );

    max = Number(
      rangeOrMin.max ??
      rangeOrMin.high ??
      rangeOrMin[1]
    );
  }

  // getRangeMid(4000, 6000)
  else {
    min = Number(rangeOrMin);
    max = Number(maxValue);
  }

  if (
    !Number.isFinite(min) ||
    !Number.isFinite(max)
  ) {
    return 0;
  }

  return (min + max) / 2;
}


// ============================================================
// AREA CONVERSIONS
// ============================================================

export function areaToM2(
  area,
  unit = "acre"
) {
  const value =
    Number(area) || 0;

  switch (unit) {
    case "acre":
      return value * ACRE_TO_M2;

    case "hectare":
    case "ha":
      return value * HA_TO_M2;

    case "m2":
    case "sqm":
      return value;

    default:
      return value;
  }
}


export function areaToHa(
  area,
  unit = "acre"
) {
  const value =
    Number(area) || 0;

  switch (unit) {
    case "acre":
      return value * ACRE_TO_HA;

    case "hectare":
    case "ha":
      return value;

    case "m2":
    case "sqm":
      return value / HA_TO_M2;

    default:
      return value;
  }
}


// ============================================================
// POND VOLUME
// ============================================================

export function calculatePondVolume({
  shape = "rectangular",
  length = 0,
  width = 0,
  radius = 0,
  depth = 0,
  averageDepth = null,
  unit = "meter",
}) {
  let depthM =
    averageDepth !== null
      ? Number(averageDepth) || 0
      : Number(depth) || 0;

  let lengthM =
    Number(length) || 0;

  let widthM =
    Number(width) || 0;

  let radiusM =
    Number(radius) || 0;

  if (unit === "feet") {
    depthM *= 0.3048;
    lengthM *= 0.3048;
    widthM *= 0.3048;
    radiusM *= 0.3048;
  }

  let volumeM3 = 0;

  if (shape === "circular") {
    volumeM3 =
      Math.PI *
      radiusM *
      radiusM *
      depthM;
  } else {
    volumeM3 =
      lengthM *
      widthM *
      depthM;
  }

  return {
    volumeM3,
    volumeLitres:
      volumeM3 * 1000,
  };
}


// ============================================================
// FISH STOCKING - BASIC
// ============================================================

export function calculateStocking({
  areaHa = 0,
  stockingDensity = 0,
}) {
  const area =
    Number(areaHa) || 0;

  const density =
    Number(stockingDensity) || 0;

  return area * density;
}


// ============================================================
// BIOMASS
// ============================================================

export function calculateBiomass(
  fishCount,
  averageWeightG
) {
  const count =
    Number(fishCount) || 0;

  const weightG =
    Number(averageWeightG) || 0;

  // grams -> kg
  return (
    count *
    weightG /
    1000
  );
}


// ============================================================
// HARVEST BIOMASS
// ============================================================

export function calculateHarvestBiomass(
  fishCount,
  survivalRate,
  harvestWeightG
) {
  const count =
    Number(fishCount) || 0;

  const survival =
    Number(survivalRate) || 0;

  const harvestWeight =
    Number(harvestWeightG) || 0;

  const survivalFraction =
    survival > 1
      ? survival / 100
      : survival;

  const survivors =
    count * survivalFraction;

  return (
    survivors *
    harvestWeight /
    1000
  );
}


// ============================================================
// BIOMASS GAIN
// ============================================================

export function calculateBiomassGain(
  initialBiomass,
  finalBiomass
) {
  const initial =
    Number(initialBiomass) || 0;

  const final =
    Number(finalBiomass) || 0;

  return Math.max(
    0,
    final - initial
  );
}


// ============================================================
// FEED REQUIREMENT
// ============================================================

export function calculateFeedRequirement({
  fishCount = 0,
  averageWeight = 0,
  feedingRate = 0,
}) {
  const biomassKg =
    calculateBiomass(
      fishCount,
      averageWeight
    );

  const rate =
    Number(feedingRate) || 0;

  const dailyFeedKg =
    biomassKg *
    (rate / 100);

  return {
    biomassKg,
    dailyFeedKg,
  };
}


// ============================================================
// FCR
// ============================================================

export function calculateFCR({
  totalFeed = 0,
  initialBiomass = 0,
  finalBiomass = 0,
}) {
  const feed =
    Number(totalFeed) || 0;

  const initial =
    Number(initialBiomass) || 0;

  const final =
    Number(finalBiomass) || 0;

  const biomassGain =
    calculateBiomassGain(
      initial,
      final
    );

  if (biomassGain <= 0) {
    return {
      fcr: 0,
      biomassGain,
    };
  }

  const fcr =
    feed / biomassGain;

  return {
    fcr,
    biomassGain,
  };
}


// ============================================================
// FEED FROM BIOMASS GAIN + FCR
// ============================================================

export function calculateFeedFromGain(
  biomassGain,
  fcr
) {
  const gain =
    Number(biomassGain) || 0;

  const fcrValue =
    Number(fcr) || 0;

  return (
    gain *
    fcrValue
  );
}


// ============================================================
// FEED FROM FCR
// ============================================================

export function calculateFeedFromFCR(
  biomassGain,
  fcr
) {
  const gain =
    Number(biomassGain) || 0;

  const fcrValue =
    Number(fcr) || 0;

  return (
    gain *
    fcrValue
  );
}


// ============================================================
// POND LIME
// ============================================================

export function calculateLime({
  pondAreaHa = 0,
  limeRateKgHa = 0,
}) {
  const area =
    Number(pondAreaHa) || 0;

  const rate =
    Number(limeRateKgHa) || 0;

  const totalLimeKg =
    area *
    rate;

  return {
    totalLimeKg,
  };
}


// ============================================================
// PROBIOTIC / DOSAGE
// ============================================================

export function calculateDosage({
  area = 0,
  dosage = 0,
  basis = "acre",
  waterVolumeLitres = 0,
}) {
  const areaValue =
    Number(area) || 0;

  const dosageValue =
    Number(dosage) || 0;

  const volume =
    Number(waterVolumeLitres) || 0;

  let totalDosage = 0;

  if (
    basis === "1000-litres" ||
    basis === "1000-liters"
  ) {
    totalDosage =
      (volume / 1000) *
      dosageValue;
  } else {
    totalDosage =
      areaValue *
      dosageValue;
  }

  return {
    totalDosage,
  };
}


// ============================================================
// PROBIOTIC ALIAS
// ============================================================

export function calculateProbioticDosage({
  area = 0,
  dosage = 0,
  basis = "acre",
  waterVolumeLitres = 0,
}) {
  return calculateDosage({
    area,
    dosage,
    basis,
    waterVolumeLitres,
  });
}


// ============================================================
// WATER EXCHANGE
// ============================================================

export function calculateWaterExchange({
  pondVolumeM3 = 0,
  exchangePercentage = 0,
}) {
  const volume =
    Number(pondVolumeM3) || 0;

  const percentage =
    Number(exchangePercentage) || 0;

  const exchangeVolumeM3 =
    volume *
    (percentage / 100);

  return {
    exchangeVolumeM3,

    exchangeVolumeLitres:
      exchangeVolumeM3 * 1000,
  };
}


// ============================================================
// PROFITABILITY
// ============================================================

export function calculateProfit({
  harvestQuantity = 0,
  sellingPrice = 0,
  seedCost = 0,
  feedCost = 0,
  limeCost = 0,
  probioticCost = 0,
  labourCost = 0,
  electricityCost = 0,
  otherCost = 0,
}) {
  const harvest =
    Number(harvestQuantity) || 0;

  const price =
    Number(sellingPrice) || 0;

  const seed =
    Number(seedCost) || 0;

  const feed =
    Number(feedCost) || 0;

  const lime =
    Number(limeCost) || 0;

  const probiotic =
    Number(probioticCost) || 0;

  const labour =
    Number(labourCost) || 0;

  const electricity =
    Number(electricityCost) || 0;

  const other =
    Number(otherCost) || 0;

  const revenue =
    harvest *
    price;

  const totalCost =
    seed +
    feed +
    lime +
    probiotic +
    labour +
    electricity +
    other;

  const profit =
    revenue -
    totalCost;

  const costPerKg =
    harvest > 0
      ? totalCost / harvest
      : 0;

  const profitMargin =
    revenue > 0
      ? (profit / revenue) * 100
      : 0;

  return {
    revenue,
    totalCost,
    profit,
    costPerKg,
    profitMargin,
  };
}