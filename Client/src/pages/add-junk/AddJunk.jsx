import React, { useState, useEffect } from "react";
import { db, storage, auth } from "../../firebase"; // Ensure these are imported correctly
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from './AddJunk.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const categories = ["Electronics", "Furniture", "Clothing", "Toys", "Books", "Other"];

const AddJunk = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to handle current image URL
  const [price, setPrice] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null); // State for editing item ID
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize the state with data from location if editing
  useEffect(() => {
    const { state } = location;
    if (state && state.item) {
      const { item } = state;
      console.log("Editing Item Data:", item); // Debugging
      setName(item.name);
      setDescription(item.description);
      setCategory(item.category);
      setPrice(item.price);
      setAdditionalInfo(item.additionalInfo);
      setMobileNumber(item.mobileNumber);
      setImageUrl(item.imageUrl); // Set the current image URL
      setEditingItemId(item.id); // Set the editing item ID
    }
  }, [location]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log("Selected Image File:", e.target.files[0]); // Debugging
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let newImageUrl = imageUrl; // Default to existing image URL

      if (image) {
        // Upload the new image to Firebase Storage
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        newImageUrl = await getDownloadURL(imageRef); // Get URL of the new image
        console.log("New Image URL:", newImageUrl); // Debugging
      }

      const username = auth.currentUser.displayName || "Anonymous";

      if (editingItemId) {
        // Update existing item
        const itemRef = doc(db, "junk", editingItemId);
        await updateDoc(itemRef, {
          name,
          description,
          category,
          price,
          additionalInfo,
          mobileNumber,
          imageUrl: newImageUrl, // Update to new image URL if changed
          username,
        });
      } else {
        // Add new item
        await addDoc(collection(db, "junk"), {
          name,
          description,
          category,
          price,
          additionalInfo,
          mobileNumber,
          imageUrl: newImageUrl, // Add with new image URL
          username,
        });
      }

      navigate('/junk-collection'); // Redirect after successful operation
    } catch (error) {
      console.error("Failed to save item: ", error);
      setError("Failed to save item. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>{editingItemId ? "Edit Junk Item" : "Add New Junk Item"}</h1>
      <Form onSubmit={handleSubmit} className={styles.form}>
        {imageUrl && !image && ( // Display current image if available and no new image is selected
          <div className={styles.imagePreview}>
            <img src={imageUrl} alt="Current preview" className={styles.currentImage} />
          </div>
        )}
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
          {editingItemId ? "Update Item" : "Add Item"}
        </Button>
      </Form>
    </div>
  );
};

export default AddJunk;
