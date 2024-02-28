// Importing necessary modules and components from react-router-dom
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Importing components for different routes
import AlbumList from '../components/AlbumList';
import EditAlbum from '../components/EditAlbum';
import AddAlbum from '../components/AddAlbum';

// Functional component Routers
const Routers = () => {
    // Defining routes using Routes and Route components
    return (
        <Routes>
            {/* Route for displaying the list of albums */}
            <Route path="/albums" element={<AlbumList />} />

            {/* Route for editing an album */}
            <Route path="/albums/edit-album" element={<EditAlbum />} />

            {/* Route for adding a new album */}
            <Route path="/albums/add-album" element={<AddAlbum />} />
        </Routes>
    );
}

// Exporting Routers as the default export
export default Routers;
