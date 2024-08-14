// src/components/Details.jsx
import React from "react";
import styles from './Details.module.css';

const Details = ({ item, onClose }) => {
  return (
    <div className={styles.detailsContainer}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
      )}
      <h2>{item.name}</h2>
      <p>Price: ${item.price}</p>
      <p>Description: {item.description}</p>
      <p>Category: {item.category}</p>
      <p>Additional Information: {item.additionalInfo}</p>
      <p>Mobile Number: {item.mobileNumber}</p>
    </div>
  );
};

export default Details;

