import React from "react";
import { Box, Button, FormControl, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToastContainer } from "react-toastify";
import { Controller } from "react-hook-form";
import Logo from "../../../assets/header-logo.svg";
import useForgetPassword from "./useForgetPassword";
import HeadImg from '../../../assets/Login/image.png';

const ForgetPassword = () => {
  const { control, handleSubmit, errors, isDirty, onSubmit, isLoading } = useForgetPassword();

  return (
    <Box className="flex items-center justify-center min-h-screen bg-white">
      <ToastContainer autoClose={4000} />
      <Grid container className="w-full h-full max-w-screen-lg mx-auto">
        {/* Image Section */}
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
        
        {/* Form Section */}
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
            <div className="flex justify-center mb-4">
              <img src={Logo || "/placeholder.svg"} alt="Wave Logo" className="h-12" />
            </div>
            <h1 className="text-xl mb-4 font-bold" style={{ color: "#111232" }}>Reset Password</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <FormControl fullWidth>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email address*"
                      placeholder="Enter your email"
                      size="small"
                      error={!!errors?.email}
                      helperText={errors?.email?.message}
                      sx={{
                        marginBottom: "1rem",
                        ".MuiInputBase-root": {
                          fontSize: "1rem", 
                          height: "2.6rem", 
                          width: "100%", 
                        },
                        ".MuiInputLabel-root": {
                          fontSize: "0.9rem", 
                        },
                      }}
                    />
                  )}
                />
              </FormControl>

              <Button
                disabled={!isDirty || isLoading}
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  bgcolor: "#1b1f4b",
                  color: "white",
                  "&:hover": { bgcolor: "#2E026D" },
                  borderRadius: "6px",
                  py: 1.2, 
                  mt: 1,
                  textTransform: "none",
                  fontSize: "1rem", 
                  height: "2.6rem", 
                  width: "100%", 
                }}
              >
                {isLoading ? "Sending..." : "Continue"}
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ForgetPassword;
