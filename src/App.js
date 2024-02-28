// Importing the CSS styles for the App component
import './App.css';

// Importing the Navbar component
import Navbar from "./components/Navbar";

// Importing the Routers component 
import Routers from "./routers/Routers";

// Importing the CustomAlbumContext
import CustomAlbumContext from "./albumContext";


// Defining the functional component App
function App() {

  // Returning JSX representing the structure of the App component
  return (

    // Wrapping the App content with the CustomAlbumContext provider
    <CustomAlbumContext>
      <Navbar/>
      <Routers/>
    </CustomAlbumContext>
  );
}


// Exporting the App component as the default export
export default App;
