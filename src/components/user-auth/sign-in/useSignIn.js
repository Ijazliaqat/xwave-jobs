import * as yup from "yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useSignIn = () => {
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const navigate = useNavigate();

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
    },
  });

  const onSubmit = async (data) => {
   
    const credentials = { email: data?.email, password: data?.password };

    try {
      const user = await login(credentials).unwrap();
      localStorage.setItem("token", user.token);
      toast.success("Login Successfully !", {
        position: "top-right"
      });

      setTimeout(() => {
        navigate("user/dashboard");
      }, 1000);
      
    } catch (err) {
      console.error("Failed to login:", err);
    }

    
    if (!errors) {
    }
  };

  return {
    handleSubmit,
    control,
    errors,
    isDirty,
    onSubmit,
    setOpenSnackbar,
    openSnackBar,
    showPassword,
    setShowPassword,
  };
};

export default useSignIn;
