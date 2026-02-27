export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\d\s\-()]{10,}$/;
  return re.test(phone);
};

export const validateAmount = (amount) => {
  return amount > 0 && !isNaN(amount);
};