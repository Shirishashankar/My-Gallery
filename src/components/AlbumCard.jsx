// Importing the styles for the AlbumCard component
import "../styles/albumCard.css";

// Importing specific icons for edit and delete actions
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt  } from "react-icons/fa";

// Importing a custom album icon
import albumIcon from "../photo-icon.png";

// Importing Link component from react-router-dom for navigation
import {Link} from "react-router-dom";

// Importing the useValue hook from the albumContext
import { useValue } from "../albumContext";


// Functional component AlbumCard
const AlbumCard = ({album, deleteAlbum, index}) => {

    // Using the useValue hook to get the setEditAlbum function from albumContext
    const {setEditAlbum}= useValue();
    return(
        <>
        <div className="card-container">
            <div className="album-details text-center">
                <h4>Album {index+1}</h4>
                <img src={albumIcon} className="album-icon" alt="icon"/>
                <div className="album-title">
                <h5> {album.title} </h5>
                </div>
            </div>
            <div className="action-button">
                <div className="action-icon" onClick={() => setEditAlbum({ ...album })}>
                <Link to="edit-album" className="edit_btn">
              <button>
                {" "}
                <FiEdit />
              </button>
              
                </Link>

                </div>
                <div className="action-icon" onClick={() => deleteAlbum(album.id)}>
                    <button className="delete-btn">
          
                    <FaRegTrashAlt />

                    </button>
                    
                </div>
            </div>
        </div>
        </>
    );

};

//Exporting AlbumCard as the default export
export default AlbumCard;