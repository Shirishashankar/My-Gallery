// Importing necessary modules from React and Reactstrap
import React, { useEffect, useRef } from "react";
import { Form, FormGroup } from "reactstrap";

// Importing styles for the AlbumForm component
import "../styles/albumForm.css";

// Importing custom hook and navigation hook from the albumContext and react-router-dom
import { useValue } from "../albumContext";
import { useNavigate } from "react-router-dom";

// Functional component AlbumForm
const AlbumForm = () => {

  // Destructuring values from the useValue hook

    const {
      albums,
      editAlbum,
      editAlbumHandler,
      addAlbum,
      setEditAlbum,
    } = useValue();

    // Creating refs to store references to input elements

    const userIdRef = useRef();
    const titleRef = useRef();

    // Accessing the navigate function from react-router-dom

    const navigate = useNavigate();

    // useEffect to populate form fields when editing an album

    useEffect(() => {
        if (editAlbum) {
          userIdRef.current.value = editAlbum.userId;
          titleRef.current.value = editAlbum.title;
        }
      }, [editAlbum]);

      // Function to handle form submission

      const submitHandler = (e) => {
        e.preventDefault();

        // Extracting values from the input fields

        const userId = userIdRef.current.value;
        const title = titleRef.current.value;
    
        //if user select edit the album
        if (editAlbum) {
          const obj = {
            userId: parseInt(userId),
            id: parseInt(editAlbum.id),
            title: title,
          };

          // Calling the editAlbumHandler function to update the album
          editAlbumHandler(obj);

          // Resetting editAlbum state and clearing input fields
          setEditAlbum(null);
          clear();

          // Navigating to the "/albums" route
          navigate("/albums");
          return;
        }

        // If creating a new album
        const albumLength = albums.length - 1
        const newAlbumId = albums[albumLength].id + 1
     
    // Creating a new album object
 
    const obj = {
      userId: parseInt(userId),
      id: parseInt(newAlbumId),
      title: title,
    };

    // Calling the addAlbum function to add the new album
    addAlbum(obj);

    // Clearing input fields
    clear();

    // Navigating to the "/albums" route
    navigate("/albums");
    return;
  };

  // Function to clear input fields
  const clear = () => {
    userIdRef.current.value = "";
    titleRef.current.value = "";
    return;
  };

  // Rendering the AlbumForm component
  return (
    <div className="form-wrapper">
      <Form className="w-50 " onSubmit={submitHandler}>
        <FormGroup className="form-group">
          <input
            type="number"
            placeholder="Enter User Id"
            ref={userIdRef}
            required
          />
        </FormGroup>
        <FormGroup className="form-group">
          <input
            type="text"
            placeholder="Enter Album Name"
            ref={titleRef}
            required
          />
        </FormGroup>

        <button className="btn">
          {editAlbum ? "Edit Album" : "Add Album"}
        </button>
      </Form>
    </div>
  );
};

// Exporting AlbumForm as the default export
export default AlbumForm;
    
    