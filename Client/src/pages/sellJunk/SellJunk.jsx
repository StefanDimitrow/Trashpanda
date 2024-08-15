// src/pages/sell-junk/SellJunk.jsx
import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import styles from "./SellJunk.module.css";

const SellJunk = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    item: "",
    description: "",
    price: "",
    mobileNumber: "",
    additionalInfo: ""
  });
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(db, "lookingToSell"));
        const postsSnapshot = await getDocs(postsQuery);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPost.item && newPost.description && newPost.price) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("No user is currently authenticated.");
          return;
        }

        const sellPostData = {
          item: newPost.item,
          description: newPost.description,
          price: newPost.price,
          mobileNumber: newPost.mobileNumber,
          additionalInfo: newPost.additionalInfo,
          username: currentUser.displayName || "Anonymous",
        };

        await addDoc(collection(db, "lookingToSell"), sellPostData);
        setPosts([...posts, sellPostData]);
        setNewPost({
          item: "",
          description: "",
          price: "",
          mobileNumber: "",
          additionalInfo: ""
        });
        setShowForm(false);
      } catch (error) {
        console.error("Error adding post: ", error);
      }
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.transparentDiv}>
        <button
          className={styles.showFormButton}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "Post an Item"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className={styles.postForm}>
            <input
              type="text"
              name="item"
              placeholder="Item you're selling"
              value={newPost.item}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Describe the item"
              value={newPost.description}
              onChange={handleInputChange}
              required
            ></textarea>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newPost.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="mobileNumber"
              placeholder="Your contact number"
              value={newPost.mobileNumber}
              onChange={handleInputChange}
            />
            <textarea
              name="additionalInfo"
              placeholder="Additional information (optional)"
              value={newPost.additionalInfo}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        )}

        <div className={styles.postsSection}>
          <h3>All Items for Sale</h3>
          <ul className={styles.postsList}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className={styles.postItem}>
                  <h4>{post.item}</h4>
                  <p>{post.description}</p>
                  <p>Price: ${post.price}</p>
                  <p>Contact: {post.mobileNumber}</p>
                  <p>Additional Info: {post.additionalInfo}</p>
                </li>
              ))
            ) : (
              <p>No items for sale yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellJunk;

