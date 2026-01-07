import { useState } from "react";
import {
  Upload,
  X,
  CheckCircle,
  CreditCard,
  Shield,
} from "feather-icons-react";
import { calculateTotalAmount } from "../../../utils/general";
import { useDispatch, useSelector } from "react-redux";
import BankTransferDetails from "./BankTransferDetails";
import paymentService from "../../../services/payment.service";
import { clearCart } from "../../../redux/features/cartSlice";
import BackButton from "../../shared/buttons/BackButton";
import HelmetComp from "../../shared/seo/HelmetComp";

export default function CheckoutPage() {
  const [bankSlip, setBankSlip] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { addPaymentRecord } = paymentService();
  const dispatch = useDispatch();

  const total = calculateTotalAmount(cartItems?.length);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      setBankSlip(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file");
    }
  };

  const removeFile = () => {
    setBankSlip(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async () => {
    if (!bankSlip) {
      alert("Please upload your bank slip");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.set("subjects", JSON.stringify(cartItems));
    formData.append("slip", bankSlip);

    try {
      await addPaymentRecord(formData);
      setSubmitSuccess(true);
      dispatch(clearCart());
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
    } finally {
      setLoading(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-12 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Submitted Successfully!
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Thank you for your purchase. Your payment is being verified by our
            team.
          </p>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              What Happens Next?
            </h3>
            <ul className="text-sm text-gray-700 space-y-3 text-left">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>Our team will verify your bank slip within 24 hours</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  You'll receive a confirmation email once payment is verified
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                <span>
                  Your subjects will be activated immediately after verification
                </span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HelmetComp
        title="MCQ Lokka | Checkout - Complete Your Payment & Unlock Lifetime MCQ Access"
        description="Complete your payment on MCQ Lokka to get lifetime access to O/L & A/L MCQs. Unlock past papers, lesson-wise questions, learning & exam modes, and detailed explanations."
        url={window.location.href}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton page="cart" />

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-900 mb-3">
            Complete Your Purchase
          </h1>
          <p className="text-gray-600">
            Transfer the payment and upload your bank slip for verification
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full mx-auto">
          {/* Left Column - Bank Details & Upload (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            <BankTransferDetails total={total} />
          </div>

          {/* Right Column - Checkout Summary (2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
              {/* Bank Slip Upload */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Upload Payment Proof
                  </h2>
                  <p className="text-sm text-gray-600">
                    Upload a clear image of your bank slip
                  </p>
                </div>
              </div>

              {!previewUrl ? (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                    dragActive
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-purple-600" />
                  </div>
                  <p className="text-gray-700 font-semibold mb-2 text-lg">
                    Drag & drop your bank slip here
                  </p>
                  <p className="text-sm text-gray-500 mb-6">or</p>
                  <label className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold cursor-pointer transition-colors shadow-md">
                    Browse Files
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-6">
                    Supported formats: JPG, PNG • Maximum file size: 5MB
                  </p>
                </div>
              ) : (
                <div>
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-200">
                    <img
                      src={previewUrl}
                      alt="Bank slip preview"
                      className="w-full"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={removeFile}
                      className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-lg transition-colors shadow-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Total Display */}
              <div className="bg-gray-50 rounded-xl p-5 mt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!bankSlip}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-4 ${
                  bankSlip
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading
                  ? "Loading..."
                  : bankSlip
                  ? "Submit for Verification"
                  : "Upload Bank Slip First"}
              </button>

              {/* Trust Badges */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-600">
                    24-hour verification process
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">
                    Secure payment verification
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-gray-600">
                    Instant access after approval
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
