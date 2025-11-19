import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Loader
} from "feather-icons-react";
import moment from "moment";
import paymentService from "../../../../services/payment.service";
import config from "../../../../config/aws";

const PurchasingHistoryMain = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllMyPurchasing } = paymentService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllMyPurchasing();
        setHistory(res.data);
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      Approved: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
        label: "Approved",
      },
      Pending: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        icon: Clock,
        label: "Pending",
      },
      Rejected: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: XCircle,
        label: "Rejected",
      },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}
      >
        <Icon className="w-4 h-4" />
        <span>{config.label}</span>
      </span>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="w-full">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Purchase History
              </h1>
              <p className="text-gray-600">
                View all your transactions and downloads
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Purchases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {history.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {history.filter((h) => h.isApproved === "Approved").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-purple-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-amber-600">
                  {history.filter((h) => h.isApproved === "Pending").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* History Cards - Mobile Friendly */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
            </div>
          ) : history.length > 0 ? (
            history.map((payment, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center space-x-3">
                      {/* <Calendar className="w-5 h-5 text-purple-600" /> */}
                      <span className="text-sm font-medium text-gray-900">
                        {moment
                          .utc(payment.createdAt)
                          .local()
                          .format("DD-MM-YYYY HH:MM A")}
                      </span>
                    </div>
                    {getStatusBadge(payment.isApproved)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Bank Slip */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Payment Slip
                      </p>
                      <div className="group">
                        <img
                          src={`${config.S3_PUBLIC_URL}/${payment.slip}`}
                          alt="Payment slip"
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="md:col-span-2">
                      <p className="text-sm font-semibold text-gray-700 mb-3">
                        Subjects
                      </p>
                      <div className="space-y-2">
                        {payment.subjects.map((subj, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span className="text-sm text-gray-900 font-medium">
                              {subj.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amount & Action */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                          Amount
                        </p>
                        <p className="text-2xl font-bold text-purple-600 mb-4">
                          Rs. {payment.amount.toLocaleString()}
                        </p>
                      </div>

                      {payment.isApproved === "Pending" && (
                        <button
                          disabled
                          className="w-full bg-gray-200 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
                        >
                          Verifying...
                        </button>
                      )}

                      {payment.isApproved === "Rejected" && (
                        <button className="w-full bg-red-100 text-red-600 py-3 px-4 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                          Contact Support
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Purchase History
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't made any purchases yet
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Browse Subjects
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasingHistoryMain;
