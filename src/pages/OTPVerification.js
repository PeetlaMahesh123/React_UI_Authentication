import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './OTPVerification.module.css';

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const inputRefs = useRef([]);

  useEffect(() => {
    // Start countdown timer
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, canResend]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    setSuccess('');

    // Auto-focus next input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      navigator.clipboard.readText().then(text => {
        const digits = text.replace(/\D/g, '').slice(0, otp.length);
        const newOtp = [...otp];
        digits.split('').forEach((digit, i) => {
          if (index + i < otp.length) {
            newOtp[index + i] = digit;
          }
        });
        setOtp(newOtp);
        const nextEmptyIndex = Math.min(index + digits.length, otp.length - 1);
        inputRefs.current[nextEmptyIndex]?.focus();
      });
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, otp.length);
    const newOtp = [...otp];
    digits.split('').forEach((digit, i) => {
      if (i < otp.length) {
        newOtp[i] = digit;
      }
    });
    setOtp(newOtp);
    const nextEmptyIndex = Math.min(digits.length, otp.length - 1);
    inputRefs.current[nextEmptyIndex]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== otp.length) {
      setError('Please enter the complete OTP');
      return;
    }

    // Dummy verification logic
    console.log('OTP Verification:', otpString);
    
    // Simulate verification
    if (otpString === '123456') {
      setSuccess('OTP verified successfully! Redirecting...');
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        // In real app, navigate to dashboard
      }, 1500);
    } else {
      setError('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    setTimer(30);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess('OTP has been resent to your email/phone');
    inputRefs.current[0]?.focus();
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Verify OTP</h1>
          <p className={styles.subtitle}>
            Enter the 6-digit code sent to your email/phone
          </p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <form onSubmit={handleVerify} className={styles.form}>
          <div className={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`${styles.otpInput} ${error ? styles.otpInputError : ''}`}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button type="submit" className={styles.submitButton}>
            Verify OTP
          </button>
        </form>

        <div className={styles.resendSection}>
          {!canResend ? (
            <p className={styles.timer}>
              Resend OTP in <span className={styles.timerValue}>{timer}s</span>
            </p>
          ) : (
            <button onClick={handleResend} className={styles.resendButton}>
              Resend OTP
            </button>
          )}
        </div>

        <div className={styles.footer}>
          <Link to="/login" className={styles.link}>
            <i className="fas fa-arrow-left"></i> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;

