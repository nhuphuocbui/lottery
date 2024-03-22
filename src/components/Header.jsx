import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/AuthProvider";
import ApiService from "../services/api-service";
import { useLocalStorage } from "../hooks/useLocalStorage";
export default function Header() {
  const {getItem, removeItem} = useLocalStorage();
	const [token, setToken] = useState(null);
	const { auth, user } = useContext(AuthContext);
  const userEmail = localStorage.getItem("user") || null;

  useEffect(() => {
		setToken(getItem("token"));
    // setUser(JSON.parse(getItem("user")));
  });
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <div className="container">
      <nav className="navbar navbar-light bg-light d-flex align-content-center">
        <a className="navbar-brand" href="/src/pages/Content">
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Renesas_Electronics_logo.svg/2560px-Renesas_Electronics_logo.svg.png"
            height={30}
            className="d-inline-block align-top px-3"
            alt="logo"
          /> */}
          <b className="mx-3">LOTTERY SUMMARY</b>
        </a>
        {/* <div>{userLoggedIn && (<div>Welcome {auth?.email}</div>)}</div> */}
        { (token || auth.email !== undefined) && (
          <div className="d-flex">
            <div className="mx-3 align-self-center" style={{height:"100%"}}>Welcome {localStorage.getItem("role")}: {JSON.parse(userEmail)?.email}</div>
            <a
              onClick={handleLogout}
              href="/login"
              className="btn btn-primary px-3 collapse d-lg-block"
            >
              {" "}
              Log out
            </a>
          </div>

        )}
      </nav>
    </div>
  );
}
