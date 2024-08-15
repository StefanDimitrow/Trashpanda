// src/pages/home/main/Main.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css'; // Import CSS module for styling

const Main = ({ items }) => {
  const navigate = useNavigate();

  

  return (
    <div className={styles.latestJunkItems}>
      <h1>Latest Junk Items</h1>
      <div className={styles.itemsList}>
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
              <h2 className={styles.itemTitle}>{item.name}</h2>
              <p className={styles.itemPrice}>Price: ${item.price}</p>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
