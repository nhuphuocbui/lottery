import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthProvider";
import ApiService from "../services/api-service";
import Toast from "../utils/notification";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUser } from "../hooks/useUser";
import UserInforService from "../services/UserInforService";
interface loginAccount {
  email: string,
  password: string
}
export default function LoginPage() {

  const { setAuthValue }  = useContext(AuthContext);
  const { setItem } = useLocalStorage();
  const { addUser } = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, formState: { errors}, } = useForm();
  const navigate = useNavigate();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  const onSubmit = async (data: loginAccount) => {
    try {
      if (data.email === "admin@gmail.com" && data.password === "phuoc123") {
        // Credentials match admin account, navigate to content
        const accessToken = "fake_access_token"; // Dummy token
        const email = "admin@gmail.com";
        const roles = "ADMIN";

        // Save token to localStorage
        setItem("token", accessToken);
        // Save user information
        addUser({ email, role: roles });
        // Auth context
        setAuthValue({ email, roles, accessToken });
        Toast.notifySuccess("Login successfully");
        // Navigate to content page
        navigate("/content");
      } else {
        // Credentials don't match admin account
        Toast.notifyError("Invalid username or password");
        setErrorMessage("*Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      Toast.notifyError("Login failed");
    }
    // reset();
  };
  return (
    <>
      <div className="container">
        <section className="vh-100">
          <div className="container-fluid h-100">
            <div
              className="row d-flex justify-content-center align-items-center"
              style={{ height: "70vh" }}
            >
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="login_image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 pt-5">
                <form onSubmit={handleSubmit(onSubmit as any)}>
                  {/* Email input */}
                  <div className="form-outline mb-3 mt-5">
                    <label className="form-label" style={{fontSize:'1.5rem'}}>Email</label>
                    {errors.email && (
                      <span
                        className="text-danger ml-3"
                        style={{ fontSize: "0.8rem" }}
                      >
                        *Required
                      </span>
                    )}
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your Renesas email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-3">
                    <label className="form-label" style={{fontSize:'1.5rem'}}>Password</label>
                    {errors.password && (
                      <span
                        className="text-danger ml-3"
                        style={{ fontSize: "0.8rem" }}
                      >
                        *Required
                      </span>
                    )}
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      {...register("password", { required: true })}
                    />
                  </div>
                  {errorMessage && <div className="text-danger">{errorMessage}</div>}
                  <div className="text-center text-lg-start mt-2 pt-2">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg mb-5 "
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Login
                    </button>
                    <ToastContainer />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
