import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";


import { Controller } from "react-hook-form";

import useSignIn from "./useSignIn";
import Logo from "../../../assets/header-logo.svg";
import { ToastContainer } from "react-toastify";
import login from "../../../assets/Login/image.png";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    errors,
    isDirty,
    onSubmit,
    setOpenSnackbar,
    showPassword,
    setShowPassword,
    isLoading,
  } = useSignIn();

  return (
    <>
      <Box className="flex items-center font-poppins" style={{ height: "100vh" }}>
        <ToastContainer autoClose={4000} />
        <Grid
          container
          spacing={{ xs: 2, sm: 4, md: 6 }}
          className="flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
          <Grid item xs={12} md={6} lg={5} xl={4} className="hidden md:block">
            <img src={login || "/placeholder.svg"} alt="login image" className="w-full h-auto rounded-3xl" />
          </Grid>
          <Grid item xs={12} sm={10} md={6} lg={5} xl={4} className="flex justify-center">
            <div className="text-center w-full max-w-md px-4 sm:px-6 md:px-8">
              <div className="flex justify-center mb-6">
                <img src={Logo || "/placeholder.svg"} alt="" className="w-24" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#27005D] mb-4 sm:mb-6">Welcome Back</h1>

              <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="mb-4">
                  <FormControl sx={{
                    maxWidth: 320,
                    width: "110%",
                    mx: "auto",
                  }}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label="Email address"
                          placeholder="Enter Your Email"
                          size="small"
                          value={value}
                          onChange={onChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon color="disabled" />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            borderRadius: "8px",
                            ".MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              backgroundColor: "#F8F9FA",
                              "& fieldset": {
                                borderColor: errors?.email ? "#FF0000" : "#CED4DA",
                              },
                              "&:hover fieldset": {
                                borderColor: "#27005D",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#27005D",
                              },
                            },
                            "& .MuiInputBase-root": {
                              height: "43px", 
                            },
                          }}
                        />
                      )}
                    />
                    <div className="text-red-500 mt-1 text-sm text-left">{errors?.email?.message}</div>
                  </FormControl>
                </div>

                <div className="mb-2">
                  <FormControl sx={{
                    maxWidth: 320,
                    width: "110%",
                    mx: "auto",
                  }}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          label="Password"
                          placeholder="*****"
                          size="small"
                          value={value}
                          onChange={onChange}
                          type={showPassword?.password ? "text" : "password"}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon color="disabled" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() =>
                                    setShowPassword({
                                      ...showPassword,
                                      password: !showPassword?.password,
                                    })
                                  }
                                >
                                  {showPassword?.password ? (
                                    <VisibilityOff color="disabled" />
                                  ) : (
                                    <Visibility color="disabled" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            borderRadius: "8px",
                            ".MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              backgroundColor: "#F8F9FA",
                              "& fieldset": {
                                borderColor: errors?.password ? "#FF0000" : "#CED4DA",
                              },
                              "&:hover fieldset": {
                                borderColor: "#27005D",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#27005D",
                              },
                            },
                            "& .MuiInputBase-root": {
                              height: "43px",
                            },
                          }}
                        />
                      )}
                    />
                    <div className="text-red-500 mt-1 text-sm text-left">{errors?.password?.message}</div>
                  </FormControl>
                  <div className="flex justify-end items-center mt-1" style={{ width: '100%', paddingRight: '2rem' }}>
                    <Link to="/forget-password" className="text-xs font-normal sm:text-sm text-[#27005D] hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!isDirty || isLoading}
                  sx={{
                    bgcolor: "#27005D",
                    "&:hover": { bgcolor: "#2E026D" },
                    borderRadius: "6px",
                    py: 1.2,
                    textTransform: "none",
                    mt: 2,
                    maxWidth: 320,
                    width: "110%",
                    mx: "auto",
                    height: "40px",
                    fontSize: "15px",
                  }}
                >
                  {isLoading ? <CircularProgress size="1.5rem" color="inherit" /> : "Continue"}
                </Button>
                <div className="mt-4">
                  <p className="text-xs sm:text-sm">
                    Don&apos;t have an account?{" "}
                    <Link to="/sign-up" className="text-[#27005D] font-semibold cursor-pointer">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignIn;
