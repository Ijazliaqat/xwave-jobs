// React Imports
import React, { useState } from "react";

// Mui Imports
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// Yup Validation imports
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Custom Imports
import Logo from "../../../assets/header-logo.svg";
import { inputBorder, inputBorderDefault } from "./styles/sign-up-style";
import { v4 as uuidv4 } from "uuid";
import { useSignupMutation } from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import login from "../../../assets/Login/image.png";

const SignUp = () => {
  const [signup,{ isLoading, isError, error }] = useSignupMutation();
  const navigate = useNavigate();

  const user = localStorage.getItem("token");
  const userDetails = JSON.parse(user);
  console.log(userDetails, "userdetails");

  const signUpSchema = yup
    .object()
    .shape({
      firstName: yup
        .string()
        .min(2, "Too Short!")
        .max(10, "Too Long!")
        .required("Required"),
      lastName: yup
        .string()
        .min(2, "Too Short!")
        .max(10, "Too Long!")
        .required("Required"),
      email: yup
        .string("Enter your email")
        .email("Invalid email")
        .required("Email is required"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        // .matches(/^\S*$/, "White Spaces are not allowed")
        .required("Password is required"),
    })
    .required();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [openSnackBar, setOpenSnackbar] = useState(false);

  const randomId = uuidv4();

  console.log(randomId, "randomId");

  const onSubmit = async (data) => {
    const credentials = {
      name: `${data?.firstName} ${data?.lastName}`,
      email: data?.email,
      password: data?.password,
      wishList: [],
      myJobs: [],
      isAdmin: false,
    };

    try {
      const user = await signup(credentials).unwrap();

      toast.success("User Created Successfully!", {
        position: "top-right",
      });
      reset();
    } catch (err) {
      toast.error(err?.data?.message, {
        position: "top-right",
      });
      console.error("Failed to login:", err);
    }

    setOpenSnackbar(true);
    if (!errors) {
    }
  };

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
      <ToastContainer autoClose={5000} />
      <Box className=" flex items-center" style={{ height: "100vh" }}>
        <Grid
          container
          gap={{ xs: 2, sm: 3, md: 2 }}
          className="flex items-center justify-center"
        >
          {/* <Grid item xs={12} md={5.8} lg={4} className="lg:order-2 order-1">
            <img src={login} alt="login image" />
          </Grid> */}
          <Grid item xs={8} className="lg:order-2 order-1">
            <div className="text-center">
              <form
                onSubmit={handleSubmit((data) => {
                  onSubmit(data);
                })}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          return (
                            <TextField
                            fullWidth
                              label="First Name"
                              placeholder="First Name"
                              size="small"
                              value={value}
                              onChange={onChange}
                              sx={
                                !errors?.firstName?.message
                                  ? inputBorderDefault
                                  : inputBorder
                              }
                            />
                          );
                        }}
                      />
                      <div className="text-red-500 my-2 text-sm">
                        {errors?.firstName?.message}
                      </div>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          return (
                            <TextField
                              label="Last Name"
                              placeholder="Last Name"
                              size="small"
                              value={value}
                              onChange={onChange}
                              sx={
                                !errors?.lastName?.message
                                  ? inputBorderDefault
                                  : inputBorder
                              }
                            />
                          );
                        }}
                      />
                      <div className="text-red-500 my-2 text-sm">
                        {errors?.lastName?.message}
                      </div>
                    </FormControl>
                  </Grid>
                </Grid>

                <div>
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

                <div>
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
                <Button
                  disabled={!isDirty || isLoading}
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#08008F",
                    "&:hover": {
                      backgroundColor: "#08008F",
                    },
                    textTransform: "capitalize",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress size="1.5rem" color="inherit" />
                  ) : (
                    "Create User"
                  )}
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUp;
