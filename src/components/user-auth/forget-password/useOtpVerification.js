import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyOtpMutation } from "../../../services/api";

const useOtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return; 
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

  
    if (e.target.value && index < 5) {
      const nextInput = e.target.parentElement.nextElementSibling?.querySelector("input");
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits");
      return;
    }

    try {
     
      if (otpString === "000000") {
        toast.success("Dummy OTP verified successfully!");
        navigate("/create-new-password");
        return;
      }

      
      await verifyOtp({ otp: otpString }).unwrap();
      toast.success("OTP verified successfully!");
      navigate("/create-new-password");
    } catch (err) {
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    try {
    
      setOtp(["0", "0", "0", "0", "0", "0"]);
      toast.info("A dummy OTP (000000) has been set for testing.");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to resend OTP.");
    }
  };

  return {
    otp,
    handleChange,
    handleSubmit,
    handleResend,
    isLoading,
  };
};

export default useOtpVerification;
