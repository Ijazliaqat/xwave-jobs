import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForgetPasswordMutation } from "../../../services/api";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
}).required();

const useForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await forgetPassword(data.email).unwrap();
      localStorage.setItem("resetEmail", data.email);
      toast.success("Reset password email sent!");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset email");
    } finally {
      navigate("/verify-otp");
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isDirty,
    onSubmit,
    isLoading,
  };
};

export default useForgetPassword;
