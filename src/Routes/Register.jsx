import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const getToken = (body) =>
  fetch("http://localhost:5500/api/get-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [button, setButton] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const mutation = useMutation((req) => getToken(req.body), {
    async onSuccess(data) {
      const tokenObject = await data.json();
      const token = tokenObject.payload;
      console.log("token successfully generated", token);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        await setDoc(doc(db, "users", email), {
          email: email,
          uid: user.uid,
          chatToken: token,
        });
      } catch (error) {
        console.log("error", error);
        setError(true);
        setLoading(false);
      }
    },
    onError(error) {
      console.log("there was an error", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton(true);
    await mutation.mutateAsync({ body: { user_id: email } });

    //navigate to profile page
    navigate(`/insync/profile`);
  };

  return (
    <div className="register">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl text-primary font-bold">inSync</h1>
            <p className="py-6">
              Register your account and meet with the most compatible people
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="label">
                    <Link
                      to={`/insync/login`}
                      className="label-text-alt link link-hover"
                    >
                      Already have an account? Login
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary" disabled={button}>
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
