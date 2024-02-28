// Importing necessary modules and components
import React, { useState, useEffect } from "react";
import "../styles/navBar.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useValue } from "../albumContext";
import { Container, Row, Col } from "reactstrap";
import { FaPlusSquare } from "react-icons/fa"; // Importing the 'plus' icon
import logo from "../gallery.png"; // Importing the custom logo

// Functional component Navbar
const Navbar = () => {
  // State to control the sticky behavior of the navbar
  const [show, setShow] = useState("");

  // Destructuring values from the useValue hook
  const { albums, setSearchedAlbum, setEditAlbum } = useValue();

  // useEffect to handle the sticky behavior of the navbar on scroll
  useEffect(() => {
    // Function to update the 'show' state based on scroll position
    const stickyNavbarFunc = () => {
      if (window.scrollY > 70) {
        setShow("sticky");
      } else {
        setShow("");
      }
    };

    // Adding an event listener for scroll events
    window.addEventListener("scroll", stickyNavbarFunc);

    // Cleaning up the event listener to avoid memory leaks
    return () => {
      window.removeEventListener("scroll", stickyNavbarFunc);
    };
  }, []); // Empty dependency array ensures that this effect runs only once during component mount

  // Function to handle search input changes
  const searchHandler = (e) => {
    const searchedValue = e.target.value;

    // If the search input is empty or contains only spaces, show all albums
    if (parseInt(searchedValue.length) === 0 || searchedValue === " ") {
      setSearchedAlbum(albums);
      return;
    }

    // Using a timeout to delay the search to avoid frequent updates
    setTimeout(() => {
      // Filtering albums based on the search input
      const result = albums.filter((item) =>
        item.title.toLowerCase().includes(searchedValue.toLowerCase())
      );
      // Updating the searchedAlbum state with the filtered result
      setSearchedAlbum(result);
    }, 1000);
  };

  // Rendering the Navbar component
  return (
    <ul className={`navbar-wrapper ${show}`}>
      {/* Container for layout styling */}
      <Container>
        {/* Row for layout styling */}
        <Row>
          {/* Column with flex properties for layout */}
          <Col className="d-flex justify-content-between align-items-center">
            {/* Logo and Title */}
            <li className="title">
              {/* Link to navigate to the "/albums" route */}
              <Link to="/albums" className="d-flex gap-2">
                {/* Custom logo image */}
                <img className="logo" src={logo} alt="Gallery Logo" />
                {/* Title */}
                <h2>My Gallery</h2>
              </Link>
            </li>

            {/* Search Box */}
            <li className="search-box">
              {/* Input for search with onChange event handler */}
              <input
                type="text"
                placeholder="Search...."
                onChange={searchHandler}
              />
              {/* Search icon */}
              <BiSearch />
            </li>

            {/* Navigation List Item for Adding Albums */}
            <li className="nav-list-item" onClick={() => setEditAlbum(null)}>
              {/* Link to navigate to the "/albums/add-album" route */}
              <Link to="/albums/add-album">
                {/* 'Plus' icon for adding albums */}
                <FaPlusSquare className="add-icon" />
              </Link>
            </li>
          </Col>
        </Row>
      </Container>
    </ul>
  );
};

// Exporting Navbar as the default export
export default Navbar;
