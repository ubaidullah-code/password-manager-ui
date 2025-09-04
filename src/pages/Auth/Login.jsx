import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommonFrom from "@/components/auth/CommonFrom";
import { loginFromControls } from "@/config";
import { loginUser } from "@/store/auth-slice/AuthSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        setFormData(initialState); // ✅ reset after success
        navigate('/')
      })
      .catch((err) => {
        console.error("Login failed:", err); // ✅ fixed message
      });
  };

  return (
    <div className="w-1/2 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Login
      </h1>

      {/* Common form */}
      <CommonFrom
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        formControl={loginFromControls}
        buttonFrom={loading ? "Logging in..." : "Login"}
      />

      {/* Show error if any */}
      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}

      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <Link
          to="/auth/register"
          className="text-primary font-semibold hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
