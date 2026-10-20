import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerAction, loginAction } from "../feature/auth/authAction";
import { useNavigate } from "react-router";
import api from "../app/axios";

export const useAuthHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginForm = (data) => {
    dispatch(loginAction(data));
    reset();
    // navigate("/main/dashboard");
  };

  const handleRegisterForm = (data) => {
    dispatch(registerAction(data));
    reset();
    // navigate("/main/dashboard");

  };

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  }

  return {
    register,
    handleSubmit,
    errors,
    handleLoginForm,
    handleRegisterForm,
    handleGoogleLogin,
  };
};
