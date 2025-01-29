import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordMutation } from "../../../services/api";


const schema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "Must contain uppercase, lowercase, number, and special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
}).required();

const useCreateNewPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await resetPassword({ 
        email: "dummy@example.com", 
        password: data.password 
      }).unwrap();
      
      toast.success("Password reset successfully!");
      
      navigate("/", { 
        replace: true,
        state: { passwordUpdated: true } 
      });
    } catch (err) {
      toast.error(
        err?.data?.message || 
        "An error occurred. Please try again."
      );
     
      navigate("/", { 
        replace: true,
        state: { passwordUpdated: false } 
      });
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isDirty,
    onSubmit,
    showPassword,
    setShowPassword,
    isLoading,
  };
};

export default useCreateNewPassword;

