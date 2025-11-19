import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader, Mail, ArrowRight } from "feather-icons-react";
import authService from "../../../services/auth.service";

const VerifyAccountMain = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("Verifying your account...");
  const { verify } = authService()

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        // Replace with your actual API call
        const response = await verify(token);
        
        // Success case
        setStatus("success");
        setMessage(response?.data?.message);
        
      } catch (error) {
        setStatus("error");
        if (error.response) {
          setMessage(error.response.data.message || "Verification failed. The link may be expired or invalid.");
        } else {
          setMessage("Network error. Please try again.");
        }
      }
    };

    if (token) {
      verifyAccount();
    } else {
      setStatus("error");
      setMessage("Invalid verification link.");
    }
  }, [token]);

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleResendEmail = () => {
    // Add resend logic here
    console.log("Resending verification email...");
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        
        {/* Verification Card */}
        <div className="bg-white text-center">
          
          {/* Icon Section */}
          <div className="mb-6">
            {status === "verifying" && (
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Loader className="w-10 h-10 text-purple-600 animate-spin" />
              </div>
            )}
            
            {status === "success" && (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            )}
            
            {status === "error" && (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {status === "verifying" && "Verifying Your Account"}
            {status === "success" && "Verification Successful!"}
            {status === "error" && "Verification Failed"}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-8 text-lg">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === "success" && (
              <>
                <button
                  onClick={handleNavigateToLogin}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>Continue to Login</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-green-900 mb-1">
                          Your email has been verified
                        </p>
                        <p className="text-sm text-green-700">
                          You can now access all features of your account
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {status === "error" && (
              <>
                {/* <button
                  onClick={handleResendEmail}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Resend Verification Email
                </button>
                
                <button
                  onClick={handleNavigateToLogin}
                  className="w-full bg-white border-2 border-gray-300 hover:border-purple-600 text-gray-700 hover:text-purple-600 py-3 px-6 rounded-xl font-semibold text-lg transition-colors"
                >
                  Back to Login
                </button> */}

                <div>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-red-900 mb-1">
                          Common issues:
                        </p>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Verification link may have expired</li>
                          <li>• Link may have been used already</li>
                          <li>• Check your spam folder for the email</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {status === "verifying" && (
              <div className="space-y-2">
                <div className="flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-sm text-gray-500">This may take a few seconds...</p>
              </div>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="/contact" className="text-purple-600 hover:text-purple-700 font-semibold">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountMain;