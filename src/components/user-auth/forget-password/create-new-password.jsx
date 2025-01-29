import React from "react";
import { Box, Button, FormControl, Grid, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer } from "react-toastify";
import Logo from "../../../assets/header-logo.svg";
import useCreateNewPassword from "./useCreateNewPassword";
import { Link } from "react-router-dom";
import HeadImg from "../../../assets/Login/image.png";
import { Controller } from "react-hook-form";
import LockIcon from "@mui/icons-material/Lock";

const CreateNewPassword = () => {
  const { control, handleSubmit, errors, isDirty, onSubmit, showPassword, setShowPassword, isLoading } = useCreateNewPassword();

  return (
    <Box className="flex items-center justify-center min-h-screen bg-white">
      <ToastContainer autoClose={4000} />
      <Grid container className="w-full h-full max-w-screen-lg mx-auto">
        
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
              <Link to="/verify-otp" className="text-gray-600">
                <ArrowBackIcon />
              </Link>
              <img src={Logo || "/placeholder.svg"} alt="Wave Logo" className="h-10 mx-auto" /> 
              <div className="w-4"></div>
            </div>
            <h1 className="text-xl font-bold mb-2">Create New Password</h1>
            <p className="text-sm text-gray-600 mb-6">
              Please enter your new password.
            </p>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
             
              <FormControl fullWidth>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Password*"
                      type={showPassword.password ? "text" : "password"}
                      error={!!errors?.password}
                      helperText={errors?.password?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                          height: "42px",
                          fontSize: "14px",
                          "&:hover": {
                            "& > fieldset": {
                              borderColor: "#D0D5DD",
                            }
                          },
                          "&.Mui-focused": {
                            "& > fieldset": {
                              borderColor: "#D0D5DD",
                            }
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "10px",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: "#808080", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}>
                              {showPassword.password ? (
                                <VisibilityOff sx={{ color: "#808080", fontSize: 20 }} />
                              ) : (
                                <Visibility sx={{ color: "#808080", fontSize: 20 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>

           
              <FormControl fullWidth>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder="Confirm Password*"
                      type={showPassword.confirmPassword ? "text" : "password"}
                      error={!!errors?.confirmPassword}
                      helperText={errors?.confirmPassword?.message}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#fff",
                          height: "42px",
                          fontSize: "14px",
                          "&:hover": {
                            "& > fieldset": {
                              borderColor: "#D0D5DD",
                            }
                          },
                          "&.Mui-focused": {
                            "& > fieldset": {
                              borderColor: "#D0D5DD",
                            }
                          },
                        },
                        "& .MuiInputBase-input": {
                          padding: "10px",
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon sx={{ color: "#808080", fontSize: 20 }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>
                              {showPassword.confirmPassword ? (
                                <VisibilityOff sx={{ color: "#808080", fontSize: 20 }} />
                              ) : (
                                <Visibility sx={{ color: "#808080", fontSize: 20 }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>

              <Button
                disabled={!isDirty || isLoading}
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#2E026D',
                  color: 'white',
                  '&:hover': { bgcolor: '#2E026D' },
                  borderRadius: '6px',
                  py: 1,
                  textTransform: 'none',
                  fontSize: '0.8rem',
                  height: '2.8rem',
                  width: '100%',
                  mt: 2
                }}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateNewPassword;
