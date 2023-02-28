import React from "react";
import { NavLink } from "react-router-dom";
import { FaDiscourse, FaSearch, FaSignOutAlt, FaUserCog } from "react-icons/fa";

export default function Menu({ onSignOut }) {
  const style = { color: "#d6d4d1", fontSize: "2em" };
  const styleActive = { color: "#e24f50", fontSize: "2em" };
  return (
    <>
      <div className="navigation-bar mt-16 flex justify-center sm:rotate-90 sm:origin-top-right sm:w-96 sm:m-0 sm:p-0 sm:fixed sm:right-1 sm:top-96">
        <nav className="p-2 fixed bg-white z-[100] bottom-1 min-w-[99%] border-t sm:static sm:m-0 sm:border-t-0 sm:border-b sm:border-r">
          <ul className="flex justify-between sm:m-0">
            <li>
              <NavLink className="text-red-300" to={"/profile"}>
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <FaUserCog
                        style={styleActive}
                        className="sm:rotate-[270deg]"
                      />
                    ) : (
                      <FaUserCog style={style} className="sm:rotate-[270deg]" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/find"}>
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <FaSearch
                        style={styleActive}
                        className="sm:rotate-[270deg]"
                      />
                    ) : (
                      <FaSearch style={style} className="sm:rotate-[270deg]" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/matches"}>
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <FaDiscourse
                        style={styleActive}
                        className="sm:rotate-[270deg]"
                      />
                    ) : (
                      <FaDiscourse
                        style={style}
                        className="sm:rotate-[270deg]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <button onClick={onSignOut}>
                {" "}
                <FaSignOutAlt
                  style={style}
                  className="sm:rotate-[270deg]"
                />{" "}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
