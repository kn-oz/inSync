import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, updateDoc} from "firebase/firestore";
import { auth, db } from "../firebase";



export default function Register() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [button, setButton] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setButton(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const tokenResponse = await fetch("https://gwq4t2upsp.ap-northeast-1.awsapprunner.com/api/get-token", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.uid }),
      });
      
      const tokenObject = await tokenResponse.json();
      const token = tokenObject.payload;

      console.log(token);
                 
      await setDoc(doc(db, "users", user.email), {
        email: email,
        uid: user.uid,
        chatToken: token,
      });
  

    } catch (error) {
      console.log("error", error);
      setError(true);
      setLoading(false);
    }

    //navigate to profile page
    navigate(`/insync/onboarding`);
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
