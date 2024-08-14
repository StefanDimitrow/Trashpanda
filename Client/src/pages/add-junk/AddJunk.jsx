import React, { useState } from "react";
import { db, storage, auth } from "../../firebase"; // Ensure these are imported correctly
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from './AddJunk.module.css';
import { useNavigate } from 'react-router-dom';

const categories = ["Electronics", "Furniture", "Clothing", "Toys", "Books", "Other"];

const AddJunk = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(""); // New state for price
  const [additionalInfo, setAdditionalInfo] = useState(""); // New state for additional info
  const [mobileNumber, setMobileNumber] = useState(""); // New state for mobile number
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = "";

      if (image) {
        // Upload the image to Firebase Storage
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Get the current user's username
      const username = auth.currentUser.displayName || "Anonymous";

      // Add a new document with the item details
      await addDoc(collection(db, "junk"), {
        name,
        description,
        category,
        price, // Store the price
        additionalInfo, // Store additional info
        mobileNumber, // Store mobile number
        imageUrl,
        username, // Store the username
      });

      navigate('/junk-collection'); // Redirect after successful addition
    } catch (error) {
      console.error("Failed to add item: ", error);
      setError("Failed to add item. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add New Junk Item</h1>
      <Form onSubmit={handleSubmit} className={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of the junk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category:</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAdditionalInfo">
          <Form.Label>Additional Info:</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter any additional information"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicMobileNumber">
          <Form.Label>Mobile Number:</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
    </div>
  );
};

export default AddJunk;
