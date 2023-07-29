"use client";
import React, { useState, useEffect } from "react";
import Styles from "./Header.module.css";
import { useRouter } from "next/navigation";
const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const isDarkModeLocalStorage = JSON.parse(
      localStorage.getItem("isDarkMode")
    );
    setIsDarkMode(isDarkModeLocalStorage);
    if (isDarkModeLocalStorage) {
      document.documentElement.classList.add("dark-mode");
    }
  }, []);

  const handleDarkModeToggle = () => {
    setIsDarkMode((prev) => !prev);

    localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode));
    document.documentElement.classList.toggle("dark-mode");
  };

  const handleGoToHomePage = () => {
    router.push("/");
  };

  return (
    <div
      className={`${Styles.Container} ${isDarkMode ? Styles["dark-mode"] : ""}`}
    >
      <div className={Styles.growwcontainer}>
        <span className={Styles.Logo} onClick={handleGoToHomePage}>
          Growwgram
        </span>
      </div>
    </div>
  );
};

export default Header;
