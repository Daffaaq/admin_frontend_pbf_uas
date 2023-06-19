import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUtensils, faBed, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const WisataList = () => {
  const [datawisata, setWisata] = useState([]);

  useEffect(() => {
    getWisata();
  }, []);

  const getWisata = async () => {
    const response = await axios.get('http://localhost:5000/Wisata');
    console.log(response);
    setWisata(response.data);
  };

  const deleteWisata = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Wisata/${id}`);
      getWisata();
    } catch (error) {
      console.log(error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  return (
    <>
      <div className="columns mt-5">
        <div className="column is-one-fifth">
          <aside className="menu">
            <p className="menu-label" style={{ textAlign: "center", fontWeight: "bold" }}>Menu</p>
            <ul className="menu-list">
              <li className="menu-item" style={{ marginBottom: '10px' }}>
                <Link to="/admin/wisata" className="is-active">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faGlobe} />
                  </span>
                  <span className="ml-2">Wisata</span>
                </Link>
              </li>
              <li className="menu-item" style={{ marginBottom: '10px' }}>
                <Link to="/admin/kuliner">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faUtensils} />
                  </span>
                  <span className="ml-2">Kuliner</span>
                </Link>
              </li>
              <li className="menu-item" style={{ marginBottom: '10px' }}>
                <Link to="/admin/penginapan">
                  <span className="icon is-small">
                    <FontAwesomeIcon icon={faBed} />
                  </span>
                  <span className="ml-2">Penginapan</span>
                </Link>
              </li>
            </ul>
          </aside>
        </div>
        <div className="column">
          <div className="container">
            <h1 className="title">Wisata List</h1>
            <div className="buttons">
              <Link to="add" className="button is-success">
                <span className="icon is-small">
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                <span>Add New</span>
              </Link>
              <div className="field ml-3 is-flex-grow-1">
                <div className="control">
                  <input
                    className="input is-fullwidth"
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>
            <div className="table-container">
              <table className="table is-fullwidth is-bordered mt-4">
                <thead>
                  <tr>
                    <th>No</th>
                    <th style={{ width: "15%" }}>Nama</th>
                    <th style={{ width: "15%" }}>Lokasi</th>
                    <th style={{ width: "10%" }}>Jam</th>
                    <th style={{ width: "10%" }}>Harga</th>
                    <th style={{ width: "10%" }}>Rating</th>
                    <th style={{ width: "20%" }}>Deskripsi</th>
                    <th style={{ width: "30%" }}>Gambar</th>
                    <th style={{ width: "15%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {datawisata.
                    filter((wisata) => {
                      const searchRegex = new RegExp(searchQuery, 'i');
                      return (
                        searchRegex.test(wisata.nama) ||
                        searchRegex.test(wisata.lokasi) ||
                        searchRegex.test(wisata.jam) ||
                        searchRegex.test(wisata.harga) ||
                        searchRegex.test(wisata.deskripsi)
                      );
                    })
                    .map((Wisata, index) => (
                      <tr key={Wisata.id}>
                        <td>{index + 1}</td>
                        <td>{Wisata.nama}</td>
                        <td>{Wisata.lokasi}</td>
                        <td>{Wisata.jam}</td>
                        <td>{Wisata.harga}</td>
                        <td>{Wisata.rating}</td>
                        <td>{Wisata.deskripsi}</td>
                        <td style={{ textAlign: "center" }}>
                          <img src={Wisata.url} alt="Gambar Wisata" style={{ height: "128px", width: "328px", display: "block", margin: "0 auto" }} />
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <div className="field is-grouped">
                            <div className="control">
                              <Link to={`edit/${Wisata.id}`} className="button is-small is-info">
                                <span className="icon is-small">
                                  <FontAwesomeIcon icon={faEdit} />
                                </span>
                                <span>Edit</span>
                              </Link>
                            </div>
                            <div className="control">
                              <button onClick={() => deleteWisata(Wisata.id)} className="button is-small is-danger">
                                <span className="icon is-small">
                                  <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WisataList;
