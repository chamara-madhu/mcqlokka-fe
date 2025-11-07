import React from 'react';
import Sampath from "../../../assets/images/sampath_bank_logo.png"

const BankTransferDetails = ({ total }) => {
  const bankDetails = {
    bankName: "Sampath Bank PLC",
    accountName: "MCQ Lokka",
    accountNumber: "1234567890",
    branch: "Maharagama Branch",
  };

  return (
    <div className="w-full bg-purple-50 shadow-sm rounded-2xl p-8">
      {/* Simple Header with Logo */}
      <div className="text-center mb-8">
        <img 
          src={Sampath} 
          alt="Sampath Bank Logo" 
          className="h-16 mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">Bank Transfer Details</h2>
      </div>

      {/* Amount */}
      {/* <div className="text-center mb-8 bg-purple-50 py-4 rounded-xl">
        <p className="text-gray-700">Please transfer</p>
        <p className="text-3xl font-bold text-purple-700">Rs. {total.toLocaleString()}</p>
      </div> */}

      {/* Details */}
      <div className="space-y-6 bg-white p-6 rounded-xl">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Bank Name</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">{bankDetails.bankName}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Account Name</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-900">{bankDetails.accountName}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Account Number</span>
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-lg text-gray-900">{bankDetails.accountNumber}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Branch</span>
          <span className="font-semibold text-gray-900">{bankDetails.branch}</span>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Payment will be confirmed within 24 hour after transfer.</p>
      </div>
    </div>
  );
};

export default BankTransferDetails;