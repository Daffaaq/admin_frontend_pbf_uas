import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddKuliner = () => {
    const [nama, SetNama] = useState("");
    const [lokasi, SetLokasi] = useState("");
    const [file, SetFile] = useState("");
    const [preview, setPreview] = useState("");
    const [deskripsi, SetDeskripsi] = useState("");
    const [url_gmaps, setUrlGmaps] = useState("");
    const navigate = useNavigate();
    const loadImage = (e) => {
        const image = e.target.files[0];
        SetFile(image);
        setPreview(URL.createObjectURL(image));
    };
    const saveKuliner = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama", nama); // Mengganti "title" dengan "nama"
        formData.append("lokasi", lokasi); // Mengganti "title" dengan "nama"
        formData.append("deskripsi", deskripsi); // Mengganti "title" dengan "nama"
        formData.append("url_gmaps", url_gmaps); // Mengganti "title" dengan "nama"
        formData.append("file", file);
        try {
            await axios.post("http://localhost:5000/Kuliner", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/admin/kuliner");
        } catch (error) {
            console.log(error);
        }
    };
    // const saveWisata = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post("http://localhost:5000/Wisata", {
    //             nama,
    //             lokasi,
    //             jam,
    //             harga,
    //             gambar,
    //             deskripsi
    //         });
    //         navigate("/");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveKuliner}>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={nama}
                                onChange={(e) => SetNama(e.target.value)}
                                placeholder='Nama' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Deskripsi</label>
                        <div className="control">
                            <input type="text" className="input"
                                value={deskripsi}
                                onChange={(e) => SetDeskripsi(e.target.value)}
                                placeholder='Deskripsi' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">URL GMAPS</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={url_gmaps} // Mengganti 'deskripsi' menjadi 'url_gmaps'
                                onChange={(e) => setUrlGmaps(e.target.value)} // Mengganti 'SetDeskripsi' menjadi 'setUrlGmaps'
                                placeholder='URL GMAPS'
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Image</label>
                        <div className="control">
                            <div className="file">
                                <label className="file-label">
                                    <input
                                        type="file"
                                        className="file-input"
                                        onChange={loadImage}
                                    />
                                    <span className="file-cta">
                                        <span className="file-label">Choose a file...</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {preview ? (
                        <figure className="image is-128x128">
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}
                    <div className="field is-grouped">
                        <div className="control">
                            <button type="button" className="button is-danger" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-success ml-2">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddKuliner;