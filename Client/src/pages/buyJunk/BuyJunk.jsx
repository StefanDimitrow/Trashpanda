import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import styles from "./buyJunk.module.css";

const LookingToBuy = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    item: "",
    description: "",
    contact: "",
  });
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("No user is currently authenticated.");
          setLoading(false);
          return;
        }

        const postsQuery = query(
          collection(db, "lookingToBuy"),
          where("ownerId", "==", currentUser.uid)
        );
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
    if (newPost.item && newPost.description && newPost.contact) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("No user is currently authenticated.");
          return;
        }

        const buyPostData = {
          item: newPost.item,
          description: newPost.description,
          contact: newPost.contact,
          ownerId: currentUser.uid,
        };

        await addDoc(collection(db, "lookingToBuy"), buyPostData);
        setPosts([...posts, buyPostData]);
        setNewPost({ item: "", description: "", contact: "" });
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
          {showForm ? "Close" : "Post an Offer"}
        </button>

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
