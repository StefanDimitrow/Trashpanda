import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; // Ensure correct paths
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [junkItems, setJunkItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchJunkItems = async () => {
      if (user) {
        const junkQuery = query(
          collection(db, "junk"),
          where("username", "==", user.displayName || "Anonymous")
        );
        const junkSnapshot = await getDocs(junkQuery);
        const junkList = junkSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJunkItems(junkList);
      }
    };

    fetchJunkItems();
  }, [user]);

  const handleDelete = async (id) => {
    // Show a confirmation dialog before deleting the item
    const confirmDelete = window.confirm("Are you sure you want to delete this junk item?");
  
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "junk", id)); // Delete the item from the database
        setJunkItems(junkItems.filter((item) => item.id !== id)); // Remove it from the state
      } catch (error) {
        console.error("Error deleting junk item: ", error);
      }
    }
  };

  const handleEdit = (item) => {
    navigate('/add-junk', { state: { item } }); // Navigate to AddJunk with item data
  };

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

      <h2 className={styles.junkHeading}>Your Junk Items</h2>

      <ul className={styles.junkItems}>
        {junkItems.length > 0 ? (
          junkItems.map((junk) => (
            <li key={junk.id} className={styles.junkItem}>
              {junk.imageUrl && (
                <img src={junk.imageUrl} alt={junk.name} className={styles.junkImage} />
              )}
              <div className={styles.junkItemContent}>
                <h3>{junk.name}</h3>
                <p><strong>Description:</strong> {junk.description}</p>
                <p><strong>Category:</strong> {junk.category}</p>
                <p><strong>Price:</strong> ${junk.price}</p>
                <p><strong>Mobile Number:</strong> {junk.mobileNumber}</p>
                <p><strong>Additional Info:</strong> {junk.additionalInfo}</p>
                <button onClick={() => handleEdit(junk)} className={styles.editButton}>Edit</button>
                <button onClick={() => handleDelete(junk.id)} className={styles.deleteButton}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p className={styles.noItemsMessage}>You have no junk items listed.</p>
        )}
      </ul>
    </div>
  );
};

export default Profile;
