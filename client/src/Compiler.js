import "./Signup.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Compiler() {
  const navigate = useNavigate();

  const onLogoutClicked = async () => {
    try {
      await axios.post(
        "http://localhost:8000/logout",
        {},
        { withCredentials: true }
      );
      navigate("/");
    } catch (error) {
      console.error("Error while logging out", error);
    }
  };
  const checkIfLoggedIn = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/verify", {
        withCredentials: true,
      });
      if (response.data.status === "success") {
        console.log("User authenticated", response.data.username);
        navigate("/compiler");
      }
    } catch (error) {
      console.error("Error occured", error.response?.data?.message);
      navigate("/");
    }
  };
  useEffect(() => checkIfLoggedIn, [navigate]);

  return (
    <div>
      <p>Daylight</p>
      <button onClick={onLogoutClicked}>Logout</button>
    </div>
  );
}

export default Compiler;
