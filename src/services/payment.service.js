import ApiIndex from "../api";

const paymentService = () => ({
  getAllPayments: (data) => ApiIndex.PaymentApi.getAllPayments(data),
  // onlinePayment: (data) => ApiIndex.PaymentApi.onlinePayment(data),
  addPaymentRecord: (data) => ApiIndex.PaymentApi.addPaymentRecord(data),
  getAllMyPurchasing: (data) => ApiIndex.PaymentApi.getAllMyPurchasing(data),
  approvePayment: (id) => ApiIndex.PaymentApi.approvePayment(id),
  rejectPayment: (id) => ApiIndex.PaymentApi.rejectPayment(id),
});

export default paymentService;
