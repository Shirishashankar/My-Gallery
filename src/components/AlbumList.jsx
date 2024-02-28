// Importing necessary modules and components
import AlbumCard from "./AlbumCard";
import "../styles/albumList.css";
import { Container, Row, Col } from "reactstrap";
import { useValue } from "../albumContext";
import { useEffect, useState } from "react";

// Functional component AlbumList
const AlbumList = () => {
  // Destructuring values from the useValue hook
  const { error, loading, searchedAlbum, deleteAlbum } = useValue();

  // State to store data for rendering
  const [data, setData] = useState([]);

  // useEffect to update data when searchedAlbum changes
  useEffect(() => {
    setData(searchedAlbum);
  }, [searchedAlbum]);

  return (
    <>
      {/* Conditional rendering based on error */}
      {error ? (
        <div className="error-message">
          <h1>{error}...</h1>
        </div>
      ) : (
        <>
          {/* Conditional rendering based on loading state */}
          {loading ? (
            <div className="loader-section">
              <div className="custom-loader"></div>
            </div>
          ) : (
            <>
              {/* Album List Sections */}
              <section>
                {/* Container for the album list */}
                <Container>
                  {/* Row to display albums */}
                  <Row>
                    {/* Mapping through data and rendering AlbumCard component */}
                    {data.map((album, index) => (
                      <Col lg="3" md="4" sm="6" xs="12" className="mb-5 gap-2 album-col" key={album.id}>
                        <AlbumCard
                          album={album}
                          deleteAlbum={deleteAlbum}
                          index={index}
                        />
                      </Col>
                    ))}
                  </Row>
                </Container>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

// Exporting AlbumList as the default export
export default AlbumList;
