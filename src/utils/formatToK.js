export const formatToK = (amount) => {
  if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + "K";
  }
  return amount.toString(); // If amount is less than 1000, return the original value
};
