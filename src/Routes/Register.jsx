import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { StreamChat } from "stream-chat";
import { auth, db } from "../firebase";
import Input from "../Components/Input";
import ButtonWide from "../Components/ButtonWide";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [buttonState, setButtonState] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const newClient = new StreamChat(import.meta.env.VITE_STREAMAPPKEY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonState(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const tokenResponse = await fetch(
        "http://localhost:5500/api/get-token",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.uid }),
        }
      );

      const tokenObject = await tokenResponse.json();
      const token = tokenObject.payload;

      //console.log(token);

      newClient.connectUser(
        {
          id: user.uid,
        },
        token
      );

      await setDoc(doc(db, "users", user.email), {
        email: email,
        uid: user.uid,
        chatToken: token,
        matches: [],
      });

      alert("Account created successfully");
      navigate(`/insync/onboarding`);
    } catch (err) {
      console.log("error", err.message);
      setError(err.message);
      setButtonState(false);
    }
  };

  useEffect(() => {
    return () => {
      newClient.disconnectUser().then(() => console.log("connection closed"));
    };
  });

  return (
    <div className="Register min-h-screen mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="mt-4 mb-4 space-y-4 rounded-lg p-8 shadow-2xl">
          <div className="mb-16 text-center text-2xl font-bold text-primary sm:text-3xl">
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

            <p className="mx-auto mt-8 max-w-md text-center text-primary">
              Join new era of compatibility
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
              value={"Create my account"}
              isDisabled={buttonState}
            />
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to={"/insync/login"} className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
