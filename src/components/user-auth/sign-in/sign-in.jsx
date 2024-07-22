// React Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Mui Imports
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Yup Validation imports

import { Controller } from "react-hook-form";

// Custom Imports
import { inputBorder, inputBorderDefault } from "./styles/sign-in-style";
import useSignIn from "./useSignIn";
import Logo from "../../../assets/header-logo.svg";

const SignIn = () => {
  const {
    handleSubmit,
    control,
    errors,
    isDirty,
    onSubmit,
    setOpenSnackbar,
    openSnackBar,
    showPassword,
    setShowPassword,
  } = useSignIn();

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => setOpenSnackbar(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Box className="px-10 pt-10">
        <Snackbar
          open={openSnackBar}
          action={action}
          onClose={() => setOpenSnackbar(false)}
          autoHideDuration={3000}
          message="Form Submitted Successfully"
          ContentProps={{
            sx: {
              background: "#099309",
            },
          }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />

        <Grid
          container
          gap={{ xs: 2, sm: 3, md: 4 }}
          className="flex justify-center"
        >
          <Grid
            item
            xs={12}
            md={5.7}
            lg={4}
            className="lg:order-2 order-1 flex justify-center"
          >
            <div className="text-center">
              <div className="flex justify-center">
                <img src={Logo} alt="" />
              </div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>

              <form
                onSubmit={handleSubmit((data) => {
                  onSubmit(data);
                })}
              >
                <div className="mt-10">
                  <FormControl fullWidth>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <TextField
                            label="Email"
                            placeholder="Enter Your Email"
                            size="small"
                            value={value}
                            onChange={onChange}
                            sx={
                              !errors?.email?.message
                                ? inputBorderDefault
                                : inputBorder
                            }
                          />
                        );
                      }}
                    />
                    <div className="text-red-500 my-2 text-sm">
                      {errors?.email?.message}
                    </div>
                  </FormControl>
                </div>

                <div className="mt-3">
                  <FormControl fullWidth>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <TextField
                            label="Password"
                            placeholder="*****"
                            size="small"
                            value={value}
                            onChange={onChange}
                            sx={
                              !errors?.password?.message
                                ? inputBorderDefault
                                : inputBorder
                            }
                            type={`${
                              showPassword?.password ? "text" : "password"
                            }`}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  sx={{
                                    "&:hover": {
                                      cursor: "pointer",
                                    },
                                  }}
                                >
                                  <div
                                    className="cursor-pointer"
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                      setShowPassword({
                                        ...showPassword,
                                        password: !showPassword?.password,
                                      });
                                    }}
                                    edge="end"
                                  >
                                    {showPassword?.password ? (
                                      <VisibilityOff color="disabled" />
                                    ) : (
                                      <Visibility color="disabled" />
                                    )}
                                  </div>
                                </InputAdornment>
                              ),
                            }}
                          />
                        );
                      }}
                    />
                    <div className="text-red-500 my-2 text-sm">
                      {errors?.password?.message}
                    </div>
                  </FormControl>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <Checkbox
                            value={value}
                            onChange={onChange}
                            type="checkbox"
                            size="small"
                            sx={{
                              "&.Mui-checked": {
                                color: "#099309",
                              },
                            }}
                          />
                        );
                      }}
                    />
                    <span className="text-sm">Remember me</span>
                  </div>
                  <div>
                    <span className="text-sm">
                      Forget password?
                      <span className="text-green font-bold cursor-pointer ml-1">
                        <Link to="/auth/forget-password"> Reset it </Link>
                      </span>
                    </span>
                  </div>
                </div>
                <Button
                  disabled={!isDirty}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#099309",
                    "&:hover": {
                      backgroundColor: "#099309",
                    },
                    textTransform: "capitalize",
                    cursor: "pointer",
                    fontWeight: "bold",
                    // padding: "10px 16px",
                    // borderRadius: "8px",
                  }}
                  type="submit"
                >
                  Sign In
                </Button>
                <div className="my-3">
                  <p className="text-sm">
                    Don’t have an account?
                    <span className="text-green font-bold cursor-pointer ml-1">
                      <Link to="/sign-up"> Sign Up </Link>
                    </span>
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
