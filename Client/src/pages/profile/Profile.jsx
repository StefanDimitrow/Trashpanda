import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; // Ensure correct paths
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [junkItems, setJunkItems] = useState([]);
  const [buyPosts, setBuyPosts] = useState([]); // State for buy posts
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User logged in: ", currentUser); // Log the current user
    });

    return () => unsubscribe();
  }, []);

  // Fetch junk items
  useEffect(() => {
    const fetchJunkItems = async () => {
      if (user) {
        try {
          console.log("Fetching junk items for user: ", user.displayName || "Anonymous");
          const junkQuery = query(
            collection(db, "junk"),
            where("username", "==", user.displayName || "Anonymous")
          );
          const junkSnapshot = await getDocs(junkQuery);
          const junkList = junkSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Junk items fetched: ", junkList); // Log the fetched junk items
          setJunkItems(junkList);
        } catch (error) {
          console.error("Error fetching junk items: ", error);
        }
      }
    };

    fetchJunkItems();
  }, [user]);

  // Fetch buy posts from 'lookingToBuy' collection
  useEffect(() => {
    const fetchBuyPosts = async () => {
      if (user) {
        try {
          console.log("Fetching buy posts for user: ", user.uid);
          const buyPostsQuery = query(
            collection(db, "lookingToBuy"),
            where("ownerId", "==", user.uid) // Match the ownerId with the user's UID
          );
          const buyPostsSnapshot = await getDocs(buyPostsQuery);
          const buyPostsList = buyPostsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Buy posts fetched: ", buyPostsList); // Log the fetched buy posts
          setBuyPosts(buyPostsList);
        } catch (error) {
          console.error("Error fetching buy posts: ", error);
        }
      }
    };

    fetchBuyPosts();
  }, [user]);

  const handleDeleteJunk = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this junk item?");
  
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "junk", id));
        setJunkItems(junkItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting junk item: ", error);
      }
    }
  };

  const handleDeleteBuyPost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this buy post?");
  
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "lookingToBuy", id)); // Delete buy post
        setBuyPosts(buyPosts.filter((post) => post.id !== id));
      } catch (error) {
        console.error("Error deleting buy post: ", error);
      }
    }
  };

  const handleEditJunk = (item) => {
    navigate('/add-junk', { state: { item } });
  };

  if (!user) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {/* Profile Information Section */}
      <div className={styles.profileSection}>
        <h2 className={styles.profileHeading}>Profile</h2>
        <div className={styles.profileInfo}>
          <p><strong>Username:</strong> {user.displayName || "No username set"}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      {/* Junk Items Section */}
      <div className={styles.section}>
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
                  <button onClick={() => handleEditJunk(junk)} className={styles.editButton}>Edit</button>
                  <button onClick={() => handleDeleteJunk(junk.id)} className={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.noItemsMessage}>You have no junk items listed.</p>
          )}
        </ul>
      </div>

      {/* Buy Posts Section */}
      <div className={styles.section}>
        <h2 className={styles.buyHeading}>Your Buy Posts</h2>
        <ul className={styles.buyPosts}>
          {buyPosts.length > 0 ? (
            buyPosts.map((post) => (
              <li key={post.id} className={styles.buyPost}>
                <div className={styles.buyPostContent}>
                  <h3>{post.item}</h3>
                  <p><strong>Description:</strong> {post.description}</p>
                  <p><strong>Contact:</strong> {post.contact}</p>
                  <button onClick={() => handleDeleteBuyPost(post.id)} className={styles.deleteButton}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p className={styles.noItemsMessage}>You have no buy posts listed.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;

