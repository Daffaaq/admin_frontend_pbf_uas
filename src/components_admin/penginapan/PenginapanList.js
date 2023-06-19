import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUtensils, faBed, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const PenginapanList = () => {
    const [datapenginapan, setPenginapan] = useState([]);

    useEffect(() => {
        getPenginapan();
    }, []);

    const getPenginapan = async () => {
        const response = await axios.get('http://localhost:5000/Penginapan');
        setPenginapan(response.data);
    };

    const deletePenginapan = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Penginapan/${id}`);
            getPenginapan();
        } catch (error) {
            console.log(error);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    return (
        <div className="columns mt-5">
            <div className="column is-one-fifth">
                <aside className="menu">
                    <p className="menu-label" style={{ textAlign: "center", fontWeight: "bold" }}>Menu</p>
                    <ul className="menu-list">
                        <li className="menu-item" style={{ marginBottom: '10px' }}>
                            <Link to="/admin/wisata">
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
                            <Link to="/admin/penginapan" className="is-active">
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
                    <h1 className="title">Penginapan List</h1>
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
                    <table className="table is-fullwidth is-bordered mt-4">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Deskripsi</th>
                                <th>Gambar</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datapenginapan.
                                filter((penginapan) => {
                                    const searchRegex = new RegExp(searchQuery, 'i');
                                    return (
                                        searchRegex.test(penginapan.nama) ||
                                        searchRegex.test(penginapan.deskripsi)
                                    );
                                })
                                .map((Penginapan, index) => (
                                    <tr key={Penginapan.id}>
                                        <td>{index + 1}</td>
                                        <td>{Penginapan.nama}</td>
                                        <td>{Penginapan.deskripsi}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <img src={Penginapan.url} alt="Gambar Penginapan" style={{ height: "128px", width: "228px", display: "block", margin: "0 auto" }} />
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <div className="field is-grouped">
                                                <div className="control">
                                                    <Link to={`edit/${Penginapan.id}`} className="button is-small is-info">
                                                        <span className="icon is-small">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </span>
                                                        <span>Edit</span>
                                                    </Link>
                                                </div>
                                                <div className="control">
                                                    <button onClick={() => deletePenginapan(Penginapan.id)} className="button is-small is-danger">
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
    );
};

export default PenginapanList;
