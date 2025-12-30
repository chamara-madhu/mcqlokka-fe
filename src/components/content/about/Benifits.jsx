import {
  TrendingUp,
  Heart,
  CheckCircle,
  Sparkles,
  Trophy,
  Repeat,
  BarChart,
  PieChart,
  Smartphone,
} from "lucide-react";

const Benifits = () => {
  const features = [
    {
      title: "Lifetime Access",
      desc: "Pay once and enjoy unlimited access forever. No subscriptions, no renewals, no hidden fees — ever.",
      icon: Trophy,
    },
    {
      title: "Unlimited Attempts",
      desc: "Retry papers as many times as you want until you master every concept with confidence.",
      icon: Repeat,
    },
    {
      title: "Learning Mode & Exam Mode",
      desc: "Learn step-by-step with explanations or switch to exam mode for a real exam-like experience.",
      icon: Sparkles,
    },
    {
      title: "Instant Results with Detailed Explanations",
      desc: "See your results instantly and understand why each answer is correct — learn faster, remember better.",
      icon: CheckCircle,
    },
    {
      title: "Lesson-Wise MCQ Practice",
      desc: "Practice chapter by chapter and strengthen weak areas with focused MCQ sets.",
      icon: TrendingUp,
    },
    {
      title: "Smart Progress Tracking & Advanced Analytics",
      desc: "Track accuracy, improvements, strengths, and weak points with easy-to-understand analytics.",
      icon: BarChart,
    },
    {
      title: "Valuable Past Paper Statistics",
      desc: "Discover frequently asked questions, important lessons, and exam trends to study smarter.",
      icon: PieChart,
    },
    {
      title: "Free Sample Papers Included",
      desc: "Try free MCQ papers for every subject before purchasing — zero risk, full confidence.",
      icon: Heart,
    },
    {
      title: "Study Anytime, Anywhere",
      desc: "Fully mobile-friendly platform. Practice on your phone, tablet, or desktop — anytime you want.",
      icon: Smartphone,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-purple-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Why Students Choose MCQ Lokka
        </h2>
        <p className="text-lg text-gray-600">Pay once. Practice forever.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benifits;
