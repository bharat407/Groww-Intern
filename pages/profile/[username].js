/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { fetchUserData, fetchUserPhotos } from "../../utils/data";
import styles from "./UserProfile.module.css";
import Header from "../../src/app/components/Header";
import { FiCamera, FiUsers, FiUserPlus, FiList, FiGrid } from "react-icons/fi";

import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineDownload,
} from "react-icons/ai";

const UserProfile = ({ user, photos }) => {
  const [viewMode, setViewMode] = useState("grid");

  const handleGridButtonClick = () => {
    setViewMode("grid");
  };

  const handleListButtonClick = () => {
    setViewMode("list");
  };

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.Container}>
        <div>
          <img
            src={user.profile_image.large}
            alt={user.name}
            className={styles.ProfilePhoto}
          />
        </div>
        <div className={styles.UserInfo}>
          <div className={styles.Username}>{user.username}</div>
          <div className={styles.UserStats}>
            <div className={styles.UserStatItem}>
              <FiCamera className={styles.UserStatIcon} />
              <span className={styles.UserStatFigure}>
                {user.total_photos} Photos
              </span>
            </div>
            <div className={styles.UserStatItem}>
              <FiUserPlus className={styles.UserStatIcon} />
              <span className={styles.UserStatFigure}>
                {user.followers_count} Followers
              </span>
            </div>
            <div className={styles.UserStatItem}>
              <FiUsers className={styles.UserStatIcon} />
              <span className={styles.UserStatFigure}>
                {user.following_count} Following
              </span>
            </div>
          </div>
          <div>
            <div className={styles.UserFullName}>{user.name}</div>
            <div>
              <i className={styles.UserFollowMe}>
                Follow me on @{user.social.instagram_username}
              </i>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.ViewModeButtons}>
        <button
          className={`${styles.ViewModeButton} ${
            viewMode === "grid" ? styles.ActiveButton : ""
          }`}
          onClick={handleGridButtonClick}
        >
          <FiGrid />
        </button>
        <button
          className={`${styles.ViewModeButton} ${
            viewMode === "list" ? styles.ActiveButton : ""
          }`}
          onClick={handleListButtonClick}
        >
          <FiList />
        </button>
      </div>
      {viewMode === "grid" && (
        <div className={styles.GridPhotos}>
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.urls.small}
              alt={photo.slug}
              className={styles.GridPhoto}
            />
          ))}
        </div>
      )}
      {viewMode === "list" && (
        <div className={styles.ListPhotos}>
          {photos.map((photo) => (
            <div key={photo.id} className={styles.ListPhoto}>
              <img src={photo.urls.small} alt={photo.slug} />
              <div>
                <div className={styles.icons}>
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
                    <span className={styles.downloads}>{photo.downloads}</span>
                  </div>
                </div>
                <div className={styles.user}>
                  <span className={styles.Usernamelist}>
                    {photo.user.username}{" "}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { username } = context.query;

  try {
    const user = await fetchUserData(username);
    const photos = await fetchUserPhotos(username);

    return {
      props: {
        user,
        photos,
      },
    };
  } catch (error) {
    console.error("Error fetching user details:", error);
    return {
      props: {
        user: null,
        photos: [],
      },
    };
  }
}

export default UserProfile;
