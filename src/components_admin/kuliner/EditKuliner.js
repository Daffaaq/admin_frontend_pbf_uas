import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const EditKuliner = () => {
    const [nama, SetNama] = useState("");
    const [lokasi, SetLokasi] = useState("");
    const [file, SetFile] = useState("");
    const [preview, setPreview] = useState("");
    const [deskripsi, SetDeskripsi] = useState("");
    const [url_gmaps, setUrlGmaps] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getKulinerbyId();
    }, [])

    const getKulinerbyId = async () => {
        const response = await axios.get(`http://localhost:5000/Kuliner/${id}`);
        SetNama(response.data.nama);
        SetLokasi(response.data.lokasi);
        SetDeskripsi(response.data.deskripsi);
        SetFile(response.data.gambar);
        setPreview(response.data.url);
        setUrlGmaps(response.data.url_gmaps);
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        SetFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const updateKuliner = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nama", nama); // Mengganti "title" dengan "nama"
        formData.append("lokasi", lokasi); // Mengganti "title" dengan "nama"
        formData.append("deskripsi", deskripsi); // Mengganti "title" dengan "nama"
        formData.append("url_gmaps", url_gmaps);
        formData.append("file", file);
        try {
            await axios.patch(`http://localhost:5000/Kuliner/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/admin/kuliner");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateKuliner}>
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
                    <div className="field">
                        <button type="submit" className="button is-success">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditKuliner;