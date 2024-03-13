export const formatPrice = (amount: number): string => {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  return formatter.format(amount);
};
