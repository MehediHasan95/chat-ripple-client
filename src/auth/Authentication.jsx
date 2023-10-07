import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { google } from "../utilities/image";
import useTitle from "../hooks/useTtile";

const Authentication = () => {
  const { createUser, signInUser, create, signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isNew, setIsNew] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  useTitle(isNew ? "Sign Up" : "Sign In");

  const onSubmit = (data) => {
    const { fullName, gender, email, password } = data;
    setLoader(true);
    if (isNew) {
      createUser(email, password)
        .then(({ user: { uid } }) => {
          axios
            .post("https://chat-ripple-server.vercel.app/users", {
              fullName,
              email,
              gender,
              uid,
              create,
              my_friends: [],
              send_request: [],
            })
            .then(({ data }) => {
              if (data.success) {
                setLoader(false);
                navigate("/home");
              }
            });
        })
        .catch((err) => {
          setLoader(false);
          setErrMsg(err.code);
        });
    } else {
      signInUser(email, password)
        .then(() => {
          navigate("/home");
        })
        .catch((err) => {
          setLoader(false);
          setErrMsg(err.code);
        });
    }
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle().then(
      ({ user: { uid, email, displayName, photoURL } }) => {
        axios
          .post("https://chat-ripple-server.vercel.app/users", {
            fullName: displayName,
            email,
            gender: null,
            uid,
            create,
            dp: photoURL,
            my_friends: [],
            send_request: [],
          })
          .then(({ data }) => {
            if (data.success) {
              setLoader(false);
              navigate("/home");
            }
          });
      }
    );
  };

  return (
    <div className="min-h-screen grid place-items-center bg-base-300">
      <div className="w-11/12 md:w-3/6 lg:w-3/12 bg-base-100 p-5 shadow-2xl rounded-lg">
        <div className="text-center my-5">
          <h1 className="text-bluePigment text-2xl font-bold font-signika">
            {isNew ? "Sign Up" : "Welcome"} to{" "}
            <FontAwesomeIcon icon={faComments} className="me-2" />
            Chat <span className="underline">Ripple</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {isNew && (
            <input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
                pattern: {
                  value: /^[a-z A-Z]{0,}$/i,
                  message:
                    "Full name should contain only alphanumeric characters",
                },
              })}
              className="w-full p-3 outline-none border"
              placeholder="Full name"
            />
          )}
          <p className="text-red-600 text-xs mb-3">
            {errors.fullName && <span>{errors?.fullName?.message}</span>}
          </p>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full p-3 outline-none border"
            placeholder="Email"
          />
          <p className="text-red-600 text-xs mb-3">
            {errors.email && <span>{errors?.email?.message}</span>}
          </p>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
                },
              })}
              className="w-full p-3 outline-none border"
              placeholder="Password"
            />
            <FontAwesomeIcon
              onClick={() => setShowPass(!showPass)}
              icon={showPass ? faEye : faEyeSlash}
              className="absolute top-4 right-3 cursor-pointer text-gray-400"
            />
          </div>
          <p className="text-red-600 text-xs mb-3">
            {errors.password && <span>{errors?.password?.message}</span>}
          </p>
          {/* {isNew && (
            <input
              type="text"
              {...register("dp", {
                required: "Photo url is required",
                pattern: {
                  value:
                    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/i,
                  message: "Invalid photo url",
                },
              })}
              className="w-full p-3 outline-none border"
              placeholder="Photo url"
            />
          )} */}
          <p className="text-red-600 text-xs mb-3">
            {errors.dp && <span>{errors?.dp?.message}</span>}
          </p>

          {isNew && (
            <select
              {...register("gender", { required: true })}
              className="w-full p-3 mb-3 outline-none border"
            >
              <option selected disabled>
                Pick one
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          )}

          <button className="w-full p-3 bg-bluePigment text-white border-none">
            {isNew ? (
              <>
                {loader ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Sign Up"
                )}
              </>
            ) : (
              <>
                {loader ? (
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                ) : (
                  "Sign In"
                )}
              </>
            )}
          </button>
        </form>
        <p className="text-desire text-center my-5">{errMsg}</p>

        <p className="text-center my-5">
          {isNew ? "Already a user?" : "Need an account?"}{" "}
          <button
            onClick={() => setIsNew(!isNew)}
            className="border-none underline hover:text-bluePigment hover:font-bold uppercase"
          >
            {isNew ? "Sign In" : "Sign Up"}
          </button>
        </p>
        {isNew || <div className="divider">OR</div>}
        {isNew || (
          <div className="my-5">
            <button
              onClick={handleGoogleSignIn}
              className="w-full border-none p-3 rounded-full google_shadow_box flex justify-center items-center space-x-2"
            >
              <img src={google} alt="google_icon" className="w-5" />
              <span>Sign in with Google</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Authentication;
