import React, { useEffect, useRef, useState } from 'react'

const OtpInput = ({ value, onChange, error }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (value && value.length === 4) {
      setOtp(value.split(''));
    }
  }, [value]);

  const handleChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    onChange(newOtp.join(''));

    if (val && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
    setOtp(newOtp);
    onChange(newOtp.join(''));

    const nextEmpty = newOtp.findIndex(val => !val);
    const focusIndex = nextEmpty === -1 ? 3 : nextEmpty;
    inputRefs[focusIndex].current?.focus();
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={`w-14 h-14 text-center text-2xl font-semibold border-2 rounded-lg transition-all outline-none ${
              error
                ? 'border-red-500 focus:border-red-600'
                : digit
                ? 'border-purple-500 focus:border-purple-600'
                : 'border-gray-300 focus:border-purple-500'
            } focus:ring-2 focus:ring-purple-200`}
            autoComplete="off"
          />
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
};

export default OtpInput








