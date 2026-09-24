export const feetToMeter = (feet) => {
  return Number(feet) * 0.3048;
};

export const meterToFeet = (meter) => {
  return Number(meter) * 3.28084;
};

export const acreToSqFt = (acre) => {
  return Number(acre) * 43560;
};

export const acreToSqMeter = (acre) => {
  return Number(acre) * 4046.8564224;
};

export const hectareToSqMeter = (hectare) => {
  return Number(hectare) * 10000;
};

export const cubicMeterToLitres = (m3) => {
  return Number(m3) * 1000;
};

export const litresToCubicMeter = (litres) => {
  return Number(litres) / 1000;
};

export const kgToGram = (kg) => {
  return Number(kg) * 1000;
};

export const gramToKg = (gram) => {
  return Number(gram) / 1000;
};