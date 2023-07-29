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
import { useRouter } from "next/navigation";

const PhotoFeed = () => {
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

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
    <div className={styles.Container}>
      <div className={styles.ListContainer}>
        {photos.map((photo) => (
          <div className={styles.PhotoContainer} key={photo.id}>
            <div className={styles.ListPhoto}>
              <div className={styles.ProfileContainer}>
                {/* Use the Link component to navigate to the profile page */}
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
                      <span className={styles.AiFillHeart}> {photo.likes}</span>
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
                      <span className={styles.location}>
                        {photo.user.location}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoFeed;
