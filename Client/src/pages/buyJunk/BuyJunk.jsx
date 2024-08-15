import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Assuming you're using Firebase
import { collection, addDoc, getDocs } from "firebase/firestore";
import styles from "./buyJunk.module.css"; // Your custom CSS

const LookingToBuy = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    item: "",
    description: "",
    contact: "",
  });
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Fetch all posts from the "lookingToBuy" collection
  useEffect(() => {
    const fetchPosts = async () => {
      const postsSnapshot = await getDocs(collection(db, "lookingToBuy"));
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    };
    fetchPosts();
  }, []);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to create a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPost.item && newPost.description && newPost.contact) {
      try {
        await addDoc(collection(db, "lookingToBuy"), newPost);
        setPosts([...posts, newPost]); // Update state to show new post
        setNewPost({ item: "", description: "", contact: "" }); // Clear form
        setShowForm(false); // Hide form after submission
      } catch (error) {
        console.error("Error adding post: ", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Transparent white div with black border */}
      <div className={styles.transparentDiv}>
        
        {/* Button to show the form (Placed on top now) */}
        <button
          className={styles.showFormButton}
          onClick={() => setShowForm(!showForm)} // Toggle form visibility
        >
          {showForm ? "Close" : "Post an Offer"}
        </button>

        {/* Conditionally render the form based on showForm state */}
        {showForm && (
          <form onSubmit={handleSubmit} className={styles.postForm}>
            <input
              type="text"
              name="item"
              placeholder="Item you're looking to buy"
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
              type="text"
              name="contact"
              placeholder="Your contact information"
              value={newPost.contact}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        )}

        {/* Display the "All Requests" below the button */}
        <div className={styles.postsSection}>
          <h3>All Requests</h3>
          <ul className={styles.postsList}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <li key={post.id} className={styles.postItem}>
                  <h4>{post.item}</h4>
                  <p>{post.description}</p>
                  <p>Contact: {post.contact}</p>
                </li>
              ))
            ) : (
              <p>No requests have been made yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LookingToBuy;
