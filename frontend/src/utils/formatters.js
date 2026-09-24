export const formatNumber = (
  value,
  maximumFractionDigits = 2
) => {
  if (!Number.isFinite(Number(value))) {
    return "0";
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits
  }).format(Number(value));
};

export const formatCurrency = (value) => {
  if (!Number.isFinite(Number(value))) {
    return "₹0";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value));
};