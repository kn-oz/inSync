import React from "react";
import { Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Menu from "../Components/Menu";
import background from "../assets/logo.svg";

export default function Home() {
  

  return (
    <div className="root-div min-h-screen sm:m-0 sm:p-0">
      <div className="parent md:flex md:justify-center">
      <div className="sm:max-w-max md:rounded-lg md:shadow-md md:border md:border-gray md:my-2">
        <Outlet />
      </div>
      </div>
      <Menu onSignOut={() => signOut(auth)} />
    </div>
  );
}
