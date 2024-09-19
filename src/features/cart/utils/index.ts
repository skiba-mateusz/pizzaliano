import { CartItem } from "../contexts/CartContext";

const calculateCartTotals = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0
  );

  const savings = items.reduce(
    (savings, { quantity, promotion }) =>
      promotion ? savings + quantity * promotion.discountValue : savings,
    0
  );

  const totalPriceAfterSavings = totalPrice - savings;

  return { totalPrice, savings, totalPriceAfterSavings };
};

export { calculateCartTotals };
