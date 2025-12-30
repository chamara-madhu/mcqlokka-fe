import React, { useState } from "react";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  CheckCircle,
  Tag,
  BookOpen,
} from "feather-icons-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CHECKOUT_PATH, HOME_PATH } from "../../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../redux/features/cartSlice";
import { EXAMS } from "../../../constants/base";
import { calculateTotalAmount } from "../../../utils/general";
import BackButton from "../../shared/buttons/BackButton";
import Benifits from "../about/Benifits";

export default function CartMain() {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Combined Mathematics",
  //     level: "G.C.E Advanced Level",
  //     medium: "English",
  //     papers: 2,
  //     years: "2017-2025",
  //     price: 990,
  //     type: "Subject Package",
  //   },
  //   {
  //     id: 2,
  //     name: "Physics",
  //     level: "G.C.E Advanced Level",
  //     medium: "English",
  //     papers: 3,
  //     years: "2017-2025",
  //     price: 1690,
  //     type: "Subject Package",
  //   },
  //   {
  //     id: 3,
  //     name: "Chemistry",
  //     level: "G.C.E Advanced Level",
  //     medium: "Sinhala",
  //     papers: 3,
  //     years: "2017-2025",
  //     price: 990,
  //     type: "Subject Package",
  //   },
  // ]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // const [promoCode, setPromoCode] = useState("");
  // const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  // const removeItem = (id) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  // const applyPromoCode = () => {
  //   // Example promo code logic
  //   if (promoCode.toUpperCase() === "SAVE10") {
  //     setDiscount(10);
  //   } else {
  //     alert("Invalid promo code");
  //   }
  // };

  const subtotal = calculateTotalAmount(cartItems.length);
  const total = subtotal;

  return (
    <div className="min-h-screen">
      {/* Header
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
            <div className="flex items-center space-x-2 text-gray-600">
              <ShoppingBag className="w-5 h-5" />
              <span className="font-medium">{cartItems.length} Items</span>
            </div>
          </div>
        </div>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton page="subjects" />

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            Review your selected subjects before checkout
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="bg-white p-12 text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start adding subjects to your cart to begin your learning journey
            </p>
            <Link to={HOME_PATH}>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
                Browse Subjects
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Item Info */}
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-purple-600 font-medium mb-2">
                              G.C.E{" "}
                              {item.exam === EXAMS.AL
                                ? "Advanced Level"
                                : "Ordinary Level"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-purple-100 text-gray-700 rounded-lg text-xs font-medium">
                            {item.medium} medium
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-gray-700 rounded-lg text-xs font-medium">
                            {item.type} papers
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-gray-700 rounded-lg text-xs font-medium">
                            8 papers
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">
                            Lifetime access included
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="p-2 absolute top-3 right-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-6 right-6">
                        {/* <p className="text-2xl font-bold text-gray-900">Rs. {item.price.toLocaleString()}</p> */}
                        <p className="text-xs text-gray-500">
                          One-time payment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-purple-50 rounded-xl p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                  <p className="text-purple-600">{cartItems.length} items</p>
                </div>

                {/* Promo Code */}
                {/* <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button 
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <div className="mt-2 flex items-center space-x-2 text-green-600 text-sm">
                      <Tag className="w-4 h-4" />
                      <span className="font-medium">{discount}% discount applied!</span>
                    </div>
                  )}
                </div> */}

                <div className="border-gray-200 pt-4 mb-8 space-y-3">
                  {/* Subtotal */}
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => navigate(CHECKOUT_PATH)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </button>

                {/* Benefits */}
                {/* <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Instant access after purchase</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-10">

        <Benifits />
        </div>
      </div>
    </div>
  );
}
