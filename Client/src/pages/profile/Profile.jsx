// Profile.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../../firebase"; // Ensure correct path
import { onAuthStateChanged } from "firebase/auth";
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h2>Profile</h2>
        <div className={styles.userInfo}>
          <p><strong>Username:</strong> {user.displayName || "No username set"}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

