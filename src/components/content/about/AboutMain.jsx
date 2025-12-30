import {
  Target,
  Users,
  Heart,
  Sparkles,
  Book,
  FileQuestion,
  Languages,
  Paperclip,
} from "lucide-react";
import { Link } from "react-router-dom";
import { HOME_PATH, REGISTER_PATH } from "../../../constants/routes";
import Benifits from "./Benifits";

export default function AboutUsPage() {
  const stats = [
    // { number: "25,000+", label: "Active Students", icon: Users },
    { number: "20+", label: "Subjects", icon: Book },
    { number: "150+", label: "Past Papers", icon: Paperclip },
    { number: "10,000+", label: "MCQ Questions", icon: FileQuestion },
    { number: "Sin/Eng", label: "Mediums", icon: Languages },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence in Education",
      description:
        "Providing the highest quality MCQ practice materials for O/L and A/L students across Sri Lanka.",
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description:
        "Every decision we make prioritizes student success and their learning experience.",
    },
    {
      icon: Sparkles,
      title: "Innovation & Technology",
      description:
        "Leveraging cutting-edge technology to make exam preparation accessible and effective.",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Building a supportive community where students can learn, grow, and succeed together.",
    },
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About MCQ Lokka
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 mb-8">
              #1 Online MCQ Practice Platform for Sri Lankan Students
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Founded 2025",
                "100% Online",
                "Lifetime Access",
                "Unlimited Attempts",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mt-20 mb-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start text-justify">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Our Story
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                MCQ Lokka was founded in 2025 by{" "}
                <span className="font-semibold text-gray-900">
                  Chamara Madhushanka
                </span>
                , a passionate software engineer and former A/L student who
                experienced firsthand the struggles of preparing for O/L and A/L
                exams in Sri Lanka.
              </p>

              <p className="text-gray-700 leading-relaxed">
                While studying and later helping others prepare, Chamara noticed
                a critical gap: there was no dedicated online platform for MCQ
                practice. Past papers existed only as hardcopies, were extremely
                difficult to find online, and when available, lacked answer
                explanations and chapter-wise organization.
              </p>

              <div className="relative pl-6 border-l-4 border-purple-500 py-2 my-8">
                <p className="text-xl font-medium text-gray-900 italic">
                  "No student should have to struggle this much just to get good
                  practice."
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  — Chamara Madhushanka, Founder
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Students in rural areas and those without access to expensive
                tuition faced significant disadvantages. Quality preparation
                materials remained out of reach for most, creating an unequal
                playing field.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding that mastering MCQs is crucial for achieving high
                marks in O/L and A/L exams, Chamara built MCQ Lokka—a
                streamlined, accessible platform designed for{" "}
                <span className="font-semibold text-gray-900">
                  every Sri Lankan student
                </span>
                .
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Today, MCQ Lokka provides thousands of exam-style questions,
                chapter-by-chapter practice, detailed explanations, progress
                tracking, and lifetime access—all with a single affordable
                payment.
              </p>
            </div>
          </div>

          {/* Right Column - Mission & Vision Cards */}
          <div className="space-y-6 lg:sticky lg:top-8">
            {/* Vision Card */}
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-blue-400"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To be Sri Lanka's most trusted MCQ practice platform, where
                  every student prepares with confidence and joyfully says:{" "}
                  <span className="font-semibold text-gray-900 italic">
                    "I passed because of MCQ Lokka."
                  </span>
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-600 to-purple-400"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  To empower every O/L and A/L student in Sri Lanka with equal
                  access to high-quality MCQ practice through an affordable,
                  easy-to-use platform that delivers chapter-wise questions,
                  clear explanations, past papers, unlimited practice, and
                  lifetime access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Students Love Us */}
      <Benifits />

      {/* Testimonial */}
      {/* <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Built by Students & Teachers — For Students
          </h2>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Every question on MCQ Lokka is carefully reviewed by experienced O/L and A/L teachers. We know the syllabus inside out — because we've been there.
          </p>
          <div className="bg-white rounded-2xl border-2 border-purple-200 p-8 sm:p-12 shadow-lg">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              "MCQ Lokka helped me score 3As — I practiced every day!"
            </p>
            <p className="text-lg text-purple-600 font-medium">
              — Nethmi, 2024 A/L (Bio Stream)
            </p>
          </div>
        </div>
      </div> */}

      {/* Final CTA */}
      <div className="bg-gradient-to-r rounded-xl from-purple-600 to-purple-800 text-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Start Practicing?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Pay once. Practice forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={REGISTER_PATH}>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg">
                Start Free Practice Now
              </button>
            </Link>
            <Link to={HOME_PATH}>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
                Browse Subjects
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
