import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUtensils, faBed, faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const KulinerList = () => {
    const [datakuliner, setKuliner] = useState([]);

    useEffect(() => {
        getKuliner();
    }, []);

    const getKuliner = async () => {
        const response = await axios.get('http://localhost:5000/Kuliner');
        setKuliner(response.data);
    };

    const deleteKuliner = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/Kuliner/${id}`);
            getKuliner();
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
                            <Link to="/admin/kuliner" className="is-active">
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
                    <h1 className="title">Kuliner List</h1>
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
                                <th style={{ width: "10%" }}>No</th>
                                <th style={{ width: "15%" }}>Nama</th>
                                <th style={{ width: "15%" }}>Deskripsi</th>
                                <th style={{ width: "30%" }}>Gambar</th>
                                <th style={{ width: "10%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datakuliner.
                                filter((kuliner) => {
                                    const searchRegex = new RegExp(searchQuery, 'i');
                                    return (
                                        searchRegex.test(kuliner.nama) ||
                                        searchRegex.test(kuliner.deskripsi)
                                    );
                                })
                                .map((kuliner, index) => (
                                    <tr key={kuliner.id}>
                                        <td>{index + 1}</td>
                                        <td>{kuliner.nama}</td>
                                        <td>{kuliner.deskripsi}</td>
                                        <td style={{ textAlign: "center" }}>
                                            <img src={kuliner.url} alt="Gambar Kuliner" style={{ height: "128px", width: "228px", display: "block", margin: "0 auto" }} />
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            <div className="field is-grouped">
                                                <div className="control">
                                                    <Link to={`edit/${kuliner.id}`} className="button is-small is-info">
                                                        <span className="icon is-small">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </span>
                                                        <span>Edit</span>
                                                    </Link>
                                                </div>
                                                <div className="control">
                                                    <button onClick={() => deleteKuliner(kuliner.id)} className="button is-small is-danger">
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

export default KulinerList;
