// src/pages/junk-collection/JunkCollection.jsx

import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Import your firebase configuration
import { collection, getDocs } from "firebase/firestore";
import styles from './JunkCollection.module.css';

const JunkCollection = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "junk"));
        const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsList);
      } catch (error) {
        console.error("Error fetching junk items: ", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Junk Collection</h1>
      <div className={styles.itemsList}>
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className={styles.item}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default JunkCollection;
