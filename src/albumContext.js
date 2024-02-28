// Importing necessary modules
import { createContext , useState , useContext , useEffect } from "react";
import {toast} from "react-toastify";

// Creating a context named albumContext
const albumContext = createContext();

// Custom hook for accessing the context value
const useValue = () => {
    const value = useContext(albumContext);
    return value;
}


// Exporting the CustomAlbumContext component as the default export
export default function CustomAlbumContext({children}){

    // State variables for managing album data, loading state, error state, and more

    const [albums, setAlbums] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(false);
    const [editAlbum , setEditAlbum] = useState(null);
    const [searchedAlbum , setSearchedAlbum] = useState([]);

    // Function to fetch albums from an external API
const fetchAlbums = async() => {
    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/albums"
        );

        const data = await response.json();
        setAlbums(data.slice(0,30));
        setSearchedAlbum(data.slice(0,30));
        setLoading(false);
    }
    catch (err){
        setLoading(false);
        setError("Something went wrong!");
    }
};

// useEffect hook to fetch albums when the component mounts
useEffect(() => {
    setLoading(true);
    setAlbums([]);
    setError(false);
    fetchAlbums();
},[]);

// Function to create a new album
const CreateAlbum = async(album) => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method:'POST',
            body: JSON.stringify({
                id:album.id,
                title:album.title,
                userId:album.userId
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })

        const data = await res.json()
        console.log(data);
    }
    catch(error){
        toast.error(`Error:${error}`)
    }
}

// Function to update an existing album
const updateAlbumReq = async(album) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${album.id}`,{
            method:'PUT',
            body:JSON.stringify({
                id:album.id,
                title:album.title,
                userId:album.userId
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })
        const data = await res.json()
        console.log(data);
    }
    catch(error){
        toast.error(`Error:${error}`)
    }
}

// Function to delete an album
const deleteAlbumReq = async (id) =>{
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
            method:'DELETE',
        })
        const data = await res.json()
        console.log(data);
    }
    catch(error){
        toast.error(`Error:${error}`)
    }
}

// Function to handle editing an album
const editAlbumHandler = (album) => {
    const albumIndex = searchedAlbum.findIndex((item) => item.id === album.id);
    searchedAlbum.splice(albumIndex, 1, album);
    updateAlbumReq(album)
    setAlbums(albums);
    toast.success("Album succesfully updated");
};

// Function to delete an album
const deleteAlbum = (id) =>{
    const newData = albums.filter((album) => album.id !==id);
    setAlbums(newData);
    setSearchedAlbum(newData);
    deleteAlbumReq(id)
    toast.info(" Deleted Successfully! ");
};

// Function to add a new album
const addAlbum = (album) => {
    albums.push(album);
    setSearchedAlbum(albums)
    CreateAlbum(album)
    toast.success("New Album added successfully!");
};

// Providing the context value to the components wrapped within

return (
    <albumContext.Provider
    value={{
        albums,
        loading,
        error,
        editAlbum,
        searchedAlbum,
        setAlbums,
        editAlbumHandler,
        setEditAlbum,
        addAlbum,
        deleteAlbum,
        setSearchedAlbum,
    }}
    >
        {children}
    </albumContext.Provider>
 );
}

// Exporting the useValue hook for external use
export { useValue };