import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Logo from "../../../assets/header-logo.svg";
import useOtpVerification from "./useOtpVerification";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import HeadImg from "../../../assets/Login/image.png";

const OtpVerification = () => {
  const { otp, handleChange, handleSubmit, handleResend, isLoading } = useOtpVerification();

  return (
    <Box className="flex items-center justify-center min-h-screen bg-white">
      <ToastContainer autoClose={4000} />
      <Grid container className="w-full h-full max-w-screen-lg mx-auto">
        {/* Left Side Image Section */}
        <Grid
          item
          xs={12}
          lg={6}
          className="hidden lg:flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url(${HeadImg})`,
            width: "100%",
            height: "80vh",
            borderRadius: "16px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Right Side Form Section */}
        <Grid
          item
          xs={12}
          lg={6}
          className="flex items-center justify-center"
          style={{
            padding: '1rem', 
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            textAlign: 'center',
            marginTop: '-5px', 
          }}
        >
          <div className="text-center w-full max-w-xs mx-auto">
            <div className="flex justify-between items-center mb-4">
              <Link to="/forget-password" className="text-gray-600">
                <ArrowBackIcon />
              </Link>
              <img src={Logo || "/placeholder.svg"} alt="Wave Logo" className="h-10 mx-auto" /> 
              <div className="w-4"></div>
            </div>
            <h1 className="text-xl font-bold mb-2">Enter OTP</h1>
            <p className="text-sm text-gray-600 mb-6">
              Please enter the 6 digit OTP sent to your email
            </p>

            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-6">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                    className="w-12 h-12 text-center border  rounded-lg mx-1 text-lg focus:border-[#2E026D] focus:ring-1 focus:ring-[#2E026D] outline-none bg-white"
                  />
                ))}
              </div>

              <Button
                disabled={isLoading}
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  bgcolor: '#2E026D',
                  color: 'white',
                  '&:hover': { bgcolor: '#2E026D' },
                  borderRadius: '6px',
                  py: 1, 
                  textTransform: 'none',
                  fontSize: '0.8rem', 
                  height: '2.8rem', 
                  width: '105%',
                }}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>

              <div className="mt-4 text-sm text-gray-600">
                Did not receive OTP?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#2E026D] font-semibold hover:underline"
                >
                  Resend
                </button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OtpVerification;
