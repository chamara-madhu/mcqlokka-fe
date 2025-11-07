import { useEffect, useState } from "react";
import PageHeader from "../../../shared/headers/PageHeader";
import paymentService from "../../../../services/payment.service";
import { CURRENCY } from "../../../../constants/base";

const AllPaymentsMain = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getAllPayments } = paymentService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllPayments();
        setPayments(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="All Payments" />

      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[400px]">Name</th>
              <th className="w-[300px]">Email</th>
              <th>Paper</th>
              <th className="w-[100px]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : payments?.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={index} className="text-sm">
                  <td>{payment?.user?.name}</td>
                  <td>{payment?.user?.email}</td>
                  <td>{payment?.paper?.longName}</td>
                  <td>
                    {CURRENCY} {payment?.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center">
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllPaymentsMain;
