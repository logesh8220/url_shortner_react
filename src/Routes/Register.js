import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { env } from "../Config";
import { validateSchema } from "./SigninSchema";

function Register() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword:""
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
        await axios.post(`${env.api}/signup`, values);
        navigate("/login");
        toast.info("Signin Successfull",{
          position: "bottom-center",
         className:"tost-class"
        })
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container text">
      <form className="login_div col-6 offset-3" onSubmit={formik.handleSubmit}>
        <lable className="form-label">Name</lable>
        <input
          type="text"
          name="Name"
          onChange={formik.handleChange}
          value={formik.values.Name}
          className={
            formik.errors.Name && formik.touched
              ? "form-control login_i input_error"
              : "form-control login_i"
          }
        ></input>
        {formik.errors.Name && formik.touched && (
          <p className="error">
            <i class="bi bi-shield-fill-exclamation me-1 p-1"></i>
            {formik.errors.Name}
          </p>
        )}
        <lable className="form-label">Email</lable>
        <input
          type="email"
          name="Email"
          className={
            formik.errors.Email && formik.touched
              ? "form-control login_i input_error"
              : "form-control login_i"
          }
          onChange={formik.handleChange}
          value={formik.values.Email}
        ></input>
                {formik.errors.Email && formik.touched && (
          <p className="error">
            <i class="bi bi-shield-fill-exclamation me-1 p-1"></i>
            {formik.errors.Email}
          </p>
        )}
        <lable className="form-label">Password</lable>
        <input
          type="password"
          name="Password"
          className={
            formik.errors.Password && formik.touched
              ? "form-control login_i input_error"
              : "form-control login_i"
          }
          onChange={formik.handleChange}
          value={formik.values.Password}
        ></input>
          {formik.errors.Password && formik.touched && (
          <p className="error">
            <i class="bi bi-shield-fill-exclamation me-1 p-1"></i>
            {formik.errors.Password}
          </p>
        )}
        <lable className="form-label">ConfirmPassword</lable>
        <input
          type="string"
          name="ConfirmPassword"
          className={
            formik.errors.ConfirmPassword && formik.touched
              ? "form-control login_i input_error"
              : "form-control login_i"
          }
          onChange={formik.handleChange}
            value={formik.values.ConfirmPassword}
        ></input>
          {formik.errors.ConfirmPassword && formik.touched && (
          <p className="error">
            <i class="bi bi-shield-fill-exclamation me-1 p-1"></i>
            {formik.errors.ConfirmPassword}
          </p>
        )}
        <button type="submit" className=" col-12 login_i mt-5">
          SignUp
        </button>
        <div className="text-center">
          <Link to={"/Login"}>Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
