import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RedirectCollection.module.css'; // Import the CSS module

const RedirectButton = ({ text, targetPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(targetPath);
  };

  return (
    <div className={styles.buttonContainer}>
      <button className={styles.redirectButton} onClick={handleClick}>
        {text}
      </button>
    </div>
  );
};

export default RedirectButton;

