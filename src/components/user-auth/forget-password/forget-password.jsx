// React Imports
import React, { useState } from "react";

// Mui Imports
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// React Router Dom Imports
import { Link } from "react-router-dom";

// yup Validation imports
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Custom Imports
import ForgetPasswordImg from "../../../assets/images/auth/fp-g.svg";
import {
  inputBorder,
  inputBorderDefault,
} from "../sign-up/styles/sign-up-style";

const ForgetPassword = () => {
  const forgetPasswordSchema = yup
    .object()
    .shape({
      email: yup.string().required("Email is required").email("Invalid email"),
    })
    .required();
  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [openSnackBar, setOpenSnackbar] = useState(false);

  const onSubmit = (data) => {
    console.log(data);

    setOpenSnackbar(true);
    if (!errors) {
    }
  };

  console.log(errors, "errors");

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
          message="Reset password email has been sent to your account"
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
          className="flex items-center justify-center"
        >
          <Grid
            item
            xs={12}
            md={5.7}
            lg={4}
            className="flex justify-center lg:justify-end lg:order-1 order-2"
          >
            <img className="" src={ForgetPasswordImg} alt="Forget Password" />
          </Grid>

          <Grid item xs={12} md={5.7} lg={4} className="lg:order-2 order-1">
            <div>
              <h1 className="text-2xl font-bold">Forgot your password?</h1>
              <p className="text-sm mt-1">
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </p>

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
                <Button
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
                    margin: "10px 0px",
                  }}
                  type="submit"
                  value="reset"
                >
                  Reset Password
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#CCCFCE",
                    color: "#000000",
                    "&:hover": {
                      backgroundColor: "#72db72",
                      color: "#ffffff",
                    },
                    textTransform: "capitalize",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  type="button"
                >
                  <Link to="/auth/sign-in"> Back </Link>
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgetPassword;
