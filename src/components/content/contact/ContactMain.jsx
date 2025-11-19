import React, { useState } from "react";
import { Mail, Phone, Clock, MessageCircle } from "feather-icons-react";

const faqs = [
  {
    q: "How long does payment verification take?",
    a: "Payment verification usually takes 1-24 hours on business days. Once verified, you'll receive a confirmation email and instant access to your subjects."
  },
  {
    q: "When will I get access to my purchased subjects?",
    a: "Immediately after payment verification! Your subjects will appear in the 'My Subjects' section of your dashboard."
  },
  {
    q: "Are the questions up to date with the latest syllabus?",
    a: "Yes! All questions are regularly updated by experienced teachers to match the current GCE A/L and O/L syllabus in Sri Lanka."
  },
  {
    q: "Are there only MCQ questions?",
    a: "Yes, MCQ Lokka focuses exclusively on high-quality Multiple Choice Questions (MCQs) - perfect for exam preparation."
  },
  {
    q: "Is this a lifetime purchase?",
    a: "Yes! Once purchased, you get lifetime access to your subjects - no renewals, no subscriptions."
  },
  {
    q: "Can I try a paper for free before buying?",
    a: "Absolutely! Every subject includes at least one free practice paper that you can attempt up to 2 times - no payment required."
  },
  {
    q: "How many attempts do I get for purchased papers?",
    a: "You can attempt each purchased paper up to 3 times. This helps you practice effectively and track your improvement."
  },
  {
    q: "Can multiple students share one account?",
    a: "No, each account is meant for individual use only. This ensures accurate progress tracking and personalized performance reports."
  },
  {
    q: "What payment methods do you accept?",
    a: "Currently, we accept bank transfers only. Simply make the transfer and upload the slip - we'll activate your account quickly. Online card payments are coming soon!"
  },
  {
    q: "Do you offer discounts for schools or groups?",
    a: "Yes! We offer special bulk pricing for schools, tuition classes, and study groups. Contact us for a custom quote."
  },
  {
    q: "I didn't receive the verification email. What should I do?",
    a: "First, please check your spam/junk folder. If it's not there, reply to us with your payment reference number - we'll activate your account manually within a few hours."
  }
];

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Our team is here to help
                  </p>
                  <a
                    href="mailto:support@example.com"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    support@mcqlokka.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Whatsapp
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Anytime via Whatsapp
                  </p>
                  <a
                    href="tel:+94112345678"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    +94 11 234 5678
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-900 mb-1">
                    Average Response Time
                  </h4>
                  <p className="text-sm text-purple-700">
                    We typically respond within 24 hours during business days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {/* <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="border-b border-gray-200 px-6 sm:px-8 py-6">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                </div>
              </div>

              {submitSuccess && (
                <div className="mx-6 sm:mx-8 mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-900">Message sent successfully!</p>
                    <p className="text-sm text-green-700">We'll get back to you as soon as possible.</p>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="space-y-6">
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      required
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div> */}

            {/* FAQ Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                {faqs.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.q}
                    </h4>
                    <p className="text-sm text-gray-600">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMain;
