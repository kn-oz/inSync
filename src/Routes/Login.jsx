import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Input from "../Components/Input";
import ButtonWide from "../Components/ButtonWide";

export default function Login() {
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState(true);
    //console.log("login function called")

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/find");
    } catch (err) {
      setError(err.message);
      setButtonState(false);
    }
  };

  return (
    <div className="login min-h-screen mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="mt-4 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
          <div className="text-center mb-16 text-2xl font-bold text-primary sm:text-3xl">
            <h1
              className="text"
              style={{
                fontSize: 48,
                fontFamily: '"Titillium Web"',
                fontWeight: "bold",
                fontStyle: "normal",
                textDecoration: "none",
                textTransform: "none",
                letterSpacing: 0,
                color: "rgb(21, 162, 156)",
              }}
            >
              inSync
            </h1>

            <p className="mx-auto mt-4 max-w-md text-center text-primary">
              Meet compatible people
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <Input
                type={"email"}
                id={"email"}
                name={"Email"}
                placeholder={"Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
              />
            </div>
            <div className="mb-12">
              <Input
                type={"password"}
                id={"password"}
                name={"Password"}
                placeholder={"Enter your password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired={false}
              />
            </div>
            {error && (
              <p className="mt-2 text-primary text-sm">
                {error}
              </p>
            )}
            <ButtonWide
              type={"submit"}
              isDisabled={buttonState}
              value={"Sign in"}
            />
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            No account?{" "}
            <Link to={"/register"} className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
