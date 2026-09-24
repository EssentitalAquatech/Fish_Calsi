const waterExchangeData = {
  general: {
    name: "General Pond System",
    defaultPercentage: 20,
    range: [0, 100],
    note:
      "Water exchange percentage should be adjusted according to pond condition, water quality and management system.",
  },

  magur: {
    name: "Magur Grow-out",
    defaultPercentage: 25,
    range: [20, 30],
    note:
      "Planning range: 20–30% water exchange as required by pond condition and management.",
  },

  silverPompano: {
    name: "Silver Pompano",
    defaultPercentage: 10,
    range: [10, 30],
    note:
      "Planning benchmark: 10% weekly in early stage, 20% after 3 months and 30% after 6 months.",
  },
};

export default waterExchangeData;