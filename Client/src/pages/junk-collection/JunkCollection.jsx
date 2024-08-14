// src/pages/junk-collection/JunkCollection.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Details from "../../pages/details/Details";
import styles from './JunkCollection.module.css';

const JunkCollection = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null); // To store the item to expand
  const location = useLocation();

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

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const itemId = query.get("itemId");
    
    if (itemId) {
      const fetchItem = async () => {
        try {
          const docRef = doc(db, "junk", itemId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setExpandedItem(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching item details: ", error);
        }
      };
      
      fetchItem();
    }
  }, [location.search]);

  const handleDetailsClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Junk Collection</h1>
      </div>
      <div className={styles.itemsList}>
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <button 
                className={styles.detailsButton} 
                onClick={() => handleDetailsClick(item)}
              >
                Show Details
              </button>
              {expandedItem && expandedItem.id === item.id && (
                <div className={styles.expandedDetails}>
                  <p>{expandedItem.description}</p>
                  <p>Category: {expandedItem.category}</p>
                  <p>Additional Info: {expandedItem.additionalInfo}</p>
                  <p>Mobile Number: {expandedItem.mobileNumber}</p>
                  <p>Posted by: {expandedItem.username}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noItemsMessage}>No items available.</p>
        )}
      </div>
      {selectedItem && (
        <Details item={selectedItem} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default JunkCollection;
