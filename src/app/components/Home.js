/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./Home.module.css";
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineDownload,
} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { fetchRandomPhotos, fetchUserData } from "../../../utils/data";
import Link from "next/link";
import Styles from "./Header.module.css";
import { useRouter } from "next/navigation";

const PhotoFeed = () => {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  useEffect(() => {
    fetchRandomPhotos()
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, []);

  const fetchAndDisplayUserData = async (username) => {
    try {
      const userData = await fetchUserData(username);

      console.log(userData);
      router.push(`/profile=${username}`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <div
        className={`${Styles.Container} ${
          isDarkMode ? Styles["dark-mode"] : ""
        }`}
      >
        <div className={Styles.growwcontainer}>
          <span className={Styles.Logo} onClick={handleGoToHomePage}>
            Growwgram
          </span>
          <div className={Styles.DarkMode} onClick={handleDarkModeToggle}>
            <div
              className={`${Styles.toggle} ${isDarkMode ? Styles.active : ""}`}
            >
              <div className={Styles.indicator}></div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className={styles.Container}>
        <div className={styles.ListContainer}>
          {photos.map((photo) => (
            <div
              className={`${styles.PhotoContainer} ${
                isDarkMode ? styles["dark-mode"] : ""
              }`}
              key={photo.id}
            >
              <div className={styles.ListPhoto}>
                <div className={styles.ProfileContainer}>
                  <Link href={`/profile/${photo.user.username}`}>
                    <div className={styles.ProfileLink}>
                      <img
                        src={photo.user.profile_image.small}
                        alt={photo.user.name}
                        className={styles.ProfilePhoto}
                      />
                      <div className={styles.ProfileName}>
                        {photo.user.username}
                      </div>
                    </div>
                  </Link>
                </div>

                <div>
                  <span>
                    <img
                      src={photo.urls.regular}
                      alt={photo.description || ""}
                      className={styles.Photo}
                    />
                  </span>

                  <div>
                    <div className={styles.Stats}>
                      <div className={styles.StatItem}>
                        <span className={styles.eye}>
                          <AiOutlineEye />
                        </span>
                        <span className={styles.views}>{photo.views}</span>
                      </div>
                      <div className={styles.StatItem}>
                        <span className={styles.FillHeart}>
                          <AiOutlineHeart />
                        </span>
                        <span className={styles.AiFillHeart}>
                          {" "}
                          {photo.likes}
                        </span>
                      </div>
                      <div className={styles.StatItem}>
                        <span className={styles.downloadicon}>
                          <AiOutlineDownload />
                        </span>
                        <span className={styles.downloads}>
                          {photo.downloads}
                        </span>
                      </div>
                    </div>
                    <div className={styles.user}>
                      <span className={styles.Username}>
                        {photo.user.username}{" "}
                      </span>
                    </div>
                    <span className={styles.location}>
                      {photo.user.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoFeed;
