import axios from "./base";

const getAllPayments = async () => {
  return await axios.get("/payments");
};

// const onlinePayment = async (data) => {
//   return await axios.post("/payments/create-checkout-session", { ...data });
// };

const addPaymentRecord = async (data) => {
  return await axios.post("/payments", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getAllMyPurchasing = async () => {
  return await axios.get("/payments/my");
};

export default {
  getAllPayments,
  // onlinePayment,
  addPaymentRecord,
  getAllMyPurchasing,
};
