// src/pages/home/Home.jsx
import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import RedirectCollection from "../../UI/buttons/redirect/RedirectCollection"; // Adjust the import path as needed
import Main from '../home/main/Main'; // Import the new component
import Card from "../home/aside/Aside"; // Import the Card component
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "junk"));
        const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Display the last 3 items
        setItems(itemsList.slice(-3));
      } catch (error) {
        console.error("Error fetching junk items: ", error);
        setError("Failed to load items.");
      }
    };

    fetchItems();
  }, []);

  return (
    <main className="main">
      <div className="content-wrapper">
        <div className="main-section">
          <Main items={items} />
          <RedirectCollection
            text="Liked something? Head to the Junk Collection!"
            targetPath="/junk-collection"
          />
        </div>
        <div className="aside-section">
          <Card 
            title="Protect Our Nature"
            content="Proper disposal of waste is crucial for protecting our environment. Avoid littering and always use designated waste disposal methods. Remember, nature is our responsibility!"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
