import React from 'react';
import styles from './Aside.module.css'; // Import the CSS module for styling

const Card = ({ title, content }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardContent}>{content}</p>
    </div>
  );
};

export default Card;
