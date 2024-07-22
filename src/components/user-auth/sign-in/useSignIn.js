import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const useSignIn = () => {
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


  const signInSchema = yup
    .object()
    .shape({
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        // .matches(/^\S*$/, "White Spaces are not allowed")
        .required("Password is required"),

      rememberMe: yup.boolean(),
    })
    .required();


    const {
        handleSubmit,
        control,
        formState: { errors, isDirty },
      } = useForm({
        resolver: yupResolver(signInSchema),
        defaultValues: {
          email: "",
          password: "",
          rememberMe: "",
        },
      });


 const onSubmit = (data) => {
    console.log(data);

    setOpenSnackbar(true);
    if (!errors) {
    }
  };


  return {handleSubmit,control,errors,isDirty,onSubmit,setOpenSnackbar,openSnackBar,showPassword, setShowPassword};
};

export default useSignIn;
