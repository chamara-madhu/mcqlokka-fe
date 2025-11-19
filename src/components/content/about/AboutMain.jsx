import React from "react";
import { Target, Users, Award, BookOpen, TrendingUp, Heart, CheckCircle, Sparkles, Star, Trophy, Book, FileQuestion, Languages, Paperclip } from "lucide-react";
import { Link } from "react-router-dom";
import { HOME_PATH, REGISTER_PATH } from "../../../constants/routes";

export default function AboutUsPage() {
  const stats = [
    // { number: "25,000+", label: "Active Students", icon: Users },
    { number: "20+", label: "Subjects", icon: Book },
    { number: "150+", label: "Past Papers", icon: Paperclip },
    { number: "50,000+", label: "MCQ Questions", icon: FileQuestion },
    { number: "Sin/Eng", label: "Mediums", icon: Languages }
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence in Education",
      description: "Providing the highest quality MCQ practice materials for O/L and A/L students across Sri Lanka."
    },
    {
      icon: Heart,
      title: "Student-Centered",
      description: "Every decision we make prioritizes student success and their learning experience."
    },
    {
      icon: Sparkles,
      title: "Innovation & Technology",
      description: "Leveraging cutting-edge technology to make exam preparation accessible and effective."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Building a supportive community where students can learn, grow, and succeed together."
    }
  ];

  const features = [
    { title: "Lifetime Access", desc: "Pay once. Practice forever. No renewals, no subscriptions.", icon: Trophy },
    { title: "Real Exam Papers", desc: "Exact past papers from 2015–2025 with marking schemes.", icon: BookOpen },
    { title: "Instant Answers", desc: "See correct answers and explanations immediately.", icon: CheckCircle },
    { title: "Free Practice", desc: "Every subject includes free sample papers to try.", icon: Heart },
    { title: "Multiple Attempts", desc: "Practice each paper multiple times for better learning.", icon: TrendingUp },
    { title: "Mobile Friendly", desc: "Practice anytime, anywhere on any device.", icon: Sparkles }
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
              Sri Lanka's #1 Online MCQ Practice Platform for <span className="font-bold">O/L</span> and <span className="font-bold">A/L</span> Students
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["Since 2024", "100% Online", "Island-Wide", "Lifetime Access"].map((tag) => (
                <span key={tag} className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full text-white font-semibold">
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
            <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center">
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

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                MCQ Lokka was founded in 2024 by a group of former A/L students and teachers who understood one simple truth: practicing MCQs is the #1 way to score high in O/L and A/L exams.
              </p>
              <p className="text-lg font-semibold text-purple-700">
                "Finding quality, organized practice papers shouldn't be this hard."
              </p>
              <p>
                We saw students wasting hours searching for past papers, struggling with poor-quality questions, and lacking proper explanations. That's why we built MCQ Lokka.
              </p>
              <p>
                A clean, fast, and affordable platform where every student in Sri Lanka can practice thousands of real exam-style MCQs with instant answers and lifetime access.
              </p>
              <div className="bg-purple-100 border-l-4 border-purple-600 p-4 mt-6">
                <p className="text-purple-900 font-semibold">
                  No subscriptions. No hidden fees. Just pure practice.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-purple-100 leading-relaxed">
                To help every O/L and A/L student in Sri Lanka master MCQs through unlimited practice, clear explanations, and affordable one-time access.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100 leading-relaxed">
                To become Sri Lanka's most trusted MCQ practice platform — where every student says: "I passed because of MCQ Lokka."
              </p>
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
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Students Love Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Students Choose MCQ Lokka
          </h2>
          <p className="text-lg text-gray-600">Real features. Real results.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

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
            Join 25,000+ students who are already preparing smarter with MCQ Lokka
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