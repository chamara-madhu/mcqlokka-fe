import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MY_PURCHASING_HISTORY_PATH } from "../../../../constants/routes";
import paymentService from "../../../../services/payment.service";
import PreLoading from "../../../shared/loading/PreLoading";

const PaymentSuccessMain = () => {
  const [preLoading, setPreLoading] = useState(true);
  const { paperId } = useParams();
  const navigate = useNavigate();
  const { addPaymentRecord } = paymentService();

  useEffect(() => {
    addPaymentRecord({ paperId })
      .then(() => {
        setPreLoading(false);
        navigate(MY_PURCHASING_HISTORY_PATH);
        toast.success("Successful payment.");
      })
      .catch(() => {
        setPreLoading(false);
      });
  }, [paperId, navigate]);

  return (
    <>{preLoading ? <PreLoading /> : <div className="w-full mb-6"></div>}</>
  );
};

export default PaymentSuccessMain;
