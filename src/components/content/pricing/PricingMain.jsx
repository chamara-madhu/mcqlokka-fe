import { Check } from "feather-icons-react";
import { useState } from "react";
import { HOME_PATH } from "../../../constants/routes";
import { Link } from "react-router-dom";
import {
  Award,
  BarChart,
  BookOpen,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import HelmetComp from "../../shared/seo/HelmetComp";

export default function PricingMain() {
  const [selectedSubjects, setSelectedSubjects] = useState(3);

  const plans = [
    {
      name: "Single Pack",
      subjects: "1 subject",
      price: "990",
      perSubject: "990",
      savings: null,
      description: "Great for students focusing on one subject",
      features: [
        "Lifetime access",
        "Unlimited attempts",
        "Full MCQ access",
        "Learning & Exam mode practice",
        "Instant results",
        "Detailed explanations",
        "Progress tracking",
        "Advanced analytics",
      ],
    },
    {
      name: "Double Pack",
      subjects: "2 subjects",
      price: "1,690",
      perSubject: "845",
      savings: "~15%",
      description: "Perfect for two-subject combinations",
      features: [
        "Save ~15% per subject",
        "Lifetime access",
        "Unlimited attempts",
        "Full MCQ access",
        "Learning & Exam mode practice",
        "Instant results",
        "Detailed explanations",
        "Progress tracking",
        "Advanced analytics",
      ],
    },
    {
      name: "Triple Pack",
      subjects: "3 subjects",
      price: "2,190",
      perSubject: "730",
      savings: "~26%",
      description: "Ideal for full A/L subject combinations",
      features: [
        "Save ~26% per subject",
        "Lifetime access",
        "Unlimited attempts",
        "Full MCQ access",
        "Learning & Exam mode practice",
        "Instant results",
        "Detailed explanations",
        "Progress tracking",
        "Advanced analytics",
      ],
      popular: true,
    },
    {
      name: "Multi Pack",
      subjects: "4+ subjects",
      price: "590",
      perSubject: "590",
      savings: null,
      description: "Flexible: pay per subject beyond 3",
      features: [
        "Add unlimited subjects",
        "Rs. 590 per extra subject",
        "Lifetime access",
        "Unlimited attempts",
        "Full MCQ access",
        "Learning & Exam mode practice",
        "Instant results",
        "Detailed explanations",
        "Progress tracking",
        "Advanced analytics",
      ],
      isMulti: true,
    },
  ];

  const calculatePrice = (numSubjects) => {
    if (numSubjects === 1) return 990;
    if (numSubjects === 2) return 1690;
    if (numSubjects === 3) return 2190;
    return 2190 + (numSubjects - 3) * 590;
  };

  const calculateSavings = (numSubjects) => {
    const standardPrice = numSubjects * 990;
    const actualPrice = calculatePrice(numSubjects);
    return standardPrice - actualPrice;
  };

  const priceExamples = [
    { subjects: 1, price: 990 },
    { subjects: 2, price: 1690 },
    { subjects: 3, price: 2190 },
    { subjects: 4, price: 2780 },
    { subjects: 5, price: 3370 },
    { subjects: 6, price: 3960 },
    { subjects: 7, price: 4550 },
  ];

  return (
    <div className="min-h-screen">
      <HelmetComp
        title="MCQ Lokka Pricing | One-Time Payment for Lifetime O/L & A/L MCQ Access"
        description="Pay once, practice forever! Choose single, double, triple, or multi-subject packs on MCQ Lokka for O/L & A/L MCQs. Enjoy lifetime access, unlimited attempts, learning & exam modes, instant results, and detailed explanations."
        url={window.location.href}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-900 mb-3 sm:mb-4 px-4">
            Simple. One-time. Lifetime access.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-purple-700 max-w-3xl mx-auto px-4 mb-4">
            Practice O/L, A/L MCQs for ICT, Accounting, Economics, Chemistry,
            and more... anytime, anywhere.
          </p>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-purple-600">
            Pay once, own it forever. 💰
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 ${
                plan.popular ? "ring-2 sm:ring-4 ring-purple-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-purple-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Icon & Header */}
                <div className="mb-4 sm:mb-6">
                  <div className="text-4xl mb-3">{plan.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-purple-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-purple-600 text-xs sm:text-sm font-medium">
                    {plan.subjects}
                  </p>
                  {plan.savings && (
                    <span className="inline-block mt-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                      Save {plan.savings}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline flex-wrap">
                    <span className="text-2xl sm:text-3xl font-bold text-purple-900">
                      Rs. {plan.price}
                    </span>
                    {!plan.isMulti && (
                      <span className="ml-2 text-sm text-purple-600">
                        / one-time
                      </span>
                    )}
                    {plan.isMulti && (
                      <span className="ml-2 text-sm text-purple-600">
                        / subject
                      </span>
                    )}
                  </div>
                  <p className="text-purple-600 text-xs sm:text-sm mt-1">
                    Rs. {plan.perSubject} per subject
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-4 sm:mb-6 italic">
                  {plan.description}
                </p>

                {/* Divider */}
                <div className="border-t border-purple-100 mb-4 sm:mb-6"></div>

                {/* Features */}
                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${
                    plan.popular
                      ? "bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200 active:bg-purple-300"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price Calculator */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
            Calculate Your Price
          </h2>
          <div className="max-w-md mx-auto">
            <label className="block text-sm sm:text-base mb-3 font-medium">
              How many subjects do you need?
            </label>
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <input
                type="range"
                min="1"
                max="10"
                value={selectedSubjects}
                onChange={(e) => setSelectedSubjects(parseInt(e.target.value))}
                className="flex-1 h-2 bg-purple-400 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-2xl sm:text-3xl font-bold bg-white text-purple-600 px-4 py-2 rounded-lg min-w-16 text-center">
                {selectedSubjects}
              </span>
            </div>
            <div className="bg-white text-purple-900 rounded-lg p-4 sm:p-6 text-center">
              <p className="text-sm sm:text-base mb-2">Total Price</p>
              <p className="text-3xl sm:text-4xl font-bold mb-2">
                Rs. {calculatePrice(selectedSubjects).toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm text-purple-600 mb-4">
                One-time payment • Lifetime access
              </p>
              {selectedSubjects > 1 && (
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-md">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    You save Rs.{" "}
                    {calculateSavings(selectedSubjects).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price Examples Table */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-900 mb-6 sm:mb-8 text-center">
            Example Calculations 💡
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-purple-200">
                  <th className="text-left py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold text-purple-900">
                    Number of Subjects
                  </th>
                  <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold text-purple-900">
                    Total Price (LKR)
                  </th>
                  <th className="text-right py-3 px-2 sm:px-4 text-sm sm:text-base font-semibold text-purple-900">
                    Savings
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceExamples.map((example, idx) => {
                  const savings = example.subjects * 990 - example.price;
                  return (
                    <tr
                      key={idx}
                      className={`border-b border-purple-100 hover:bg-purple-50 transition-colors ${
                        example.subjects === 3 ? "bg-purple-50" : ""
                      }`}
                    >
                      <td className="py-3 px-2 sm:px-4 text-sm sm:text-base text-gray-700">
                        {example.subjects}{" "}
                        {example.subjects === 1 ? "subject" : "subjects"}
                      </td>
                      <td className="py-3 px-2 sm:px-4 text-right text-sm sm:text-base font-semibold text-purple-900">
                        Rs. {example.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        {savings > 0 ? (
                          <span className="text-green-600 font-semibold">
                            Rs. {savings.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-10 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            What's Included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Lifetime access",
                desc: "One payment, forever access",
                icon: Clock,
              },
              {
                title: "Unlimited attempts",
                desc: "Practice as many times as you need",
                icon: TrendingUp,
              },
              {
                title: "Full MCQ access",
                desc: "Complete question library for all subjects",
                icon: BookOpen,
              },
              {
                title: "Learning & Exam mode practice",
                desc: "Two modes to suit your preparation style",
                icon: Target,
              },
              {
                title: "Instant results",
                desc: "Get immediate feedback on your answers",
                icon: Award,
              },
              {
                title: "Detailed explanations",
                desc: "Understand every concept thoroughly",
                icon: Check,
              },
              {
                title: "Progress tracking",
                desc: "Monitor your improvement over time",
                icon: BarChart,
              },
              {
                title: "Advanced analytics",
                desc: "Insights into your performance",
                icon: TrendingUp,
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-purple-600 rounded-xl p-10 mb-6 shadow-lg">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Preparation?
            </h3>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              Join thousands of students who trust our platform for their O/L
              and A/L exam preparation
            </p>
            <Link to={HOME_PATH}>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-base hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg">
                Get Started Today
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-600">
            Need help choosing a plan? Contact our support team for assistance
          </p>
        </div>
      </div>
    </div>
  );
}
