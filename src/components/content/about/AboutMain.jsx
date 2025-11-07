import React from 'react';
import { Target, Users, Award, BookOpen, TrendingUp, Heart, CheckCircle, Sparkles } from 'feather-icons-react';

export default function AboutMain() {
  const stats = [
    { number: '10,000+', label: 'Students Enrolled', icon: Users },
    { number: '50+', label: 'Expert Teachers', icon: Award },
    { number: '15+', label: 'Subjects Available', icon: BookOpen },
    { number: '95%', label: 'Success Rate', icon: TrendingUp }
  ];

  const values = [
    {
    //   icon: Target,
      title: 'Excellence in Education',
      description: 'We are committed to providing the highest quality educational content and resources for A/L students.'
    },
    {
    //   icon: Heart,
      title: 'Student-Centered Approach',
      description: 'Every decision we make prioritizes student success and their learning experience.'
    },
    {
    //   icon: Sparkles,
      title: 'Innovation & Technology',
      description: 'We leverage cutting-edge technology to make learning more accessible and effective.'
    },
    {
    //   icon: Users,
      title: 'Community Support',
      description: 'Building a supportive community where students can learn, grow, and succeed together.'
    }
  ];

  const team = [
    {
      name: 'Dr. Kasun Perera',
      role: 'Founder & CEO',
      expertise: 'Mathematics & Physics',
      image: '👨‍🏫'
    },
    {
      name: 'Ms. Nimali Silva',
      role: 'Head of Content',
      expertise: 'Chemistry & Biology',
      image: '👩‍🔬'
    },
    {
      name: 'Mr. Rohan Fernando',
      role: 'Lead ICT Instructor',
      expertise: 'ICT & Technology',
      image: '👨‍💻'
    },
    {
      name: 'Ms. Dilini Jayasinghe',
      role: 'Commerce Faculty Lead',
      expertise: 'Accounting & Economics',
      image: '👩‍💼'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl sm:text-2xl text-purple-100 mb-8">
              Empowering Sri Lankan students to achieve excellence in their Advanced Level examinations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full">
                <span className="font-semibold">Since 2020</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full">
                <span className="font-semibold">Island Wide</span>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full">
                <span className="font-semibold">Online Learning</span>
              </div>
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
                {/* <stat.icon className="w-6 h-6 text-purple-600" /> */}
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
                Founded in 2020, Online A/L Academy was born from a simple yet powerful vision: to make quality A/L education accessible to every student across Sri Lanka, regardless of their location or economic background.
              </p>
              <p>
                We understand the challenges students face in preparing for Advanced Level examinations. The pressure, the competition, and the need for comprehensive study materials can be overwhelming. That's why we created a platform that brings together expert teachers, quality content, and innovative technology.
              </p>
              <p>
                Today, we're proud to serve thousands of students across all streams - Physical Science, Biological Science, Commerce, Arts, and Technology - helping them achieve their academic dreams and secure their future.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl p-8 sm:p-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                <p className="text-gray-700">
                  To provide comprehensive, affordable, and accessible A/L education that empowers students to reach their full potential and achieve academic excellence.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
                <p className="text-gray-700">
                  To be Sri Lanka's leading online education platform, revolutionizing how students prepare for their Advanced Level examinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
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
                  {/* <value.icon className="w-8 h-8 text-purple-600" /> */}
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

      {/* What We Offer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive resources designed for A/L success
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Past Papers Collection',
              description: 'Complete archive of past papers from 2017-2025 with detailed solutions',
            //   icon: BookOpen
            },
            {
              title: 'MCQ Practice',
              description: 'Thousands of multiple choice questions organized by topic and difficulty',
            //   icon: CheckCircle
            },
            {
              title: 'Expert Explanations',
              description: 'Step-by-step solutions and explanations for every question',
            //   icon: Award
            },
            {
              title: 'Progress Tracking',
              description: 'Monitor your performance and identify areas for improvement',
            //   icon: TrendingUp
            },
            {
              title: 'Mock Examinations',
              description: 'Simulate real exam conditions with timed practice tests',
            //   icon: Target
            },
            {
              title: 'Multi-Language Support',
              description: 'Content available in both Sinhala and English mediums',
            //   icon: Users
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                {/* <feature.icon className="w-6 h-6 text-purple-600" /> */}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experienced educators dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-8 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.expertise}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already achieving their A/L dreams with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg">
              Get Started Today
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              Browse Subjects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}