import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const EditPenginapan = () => {
    const [nama, SetNama] = useState("");
    const [deskripsi, SetDeskripsi] = useState("");
    const [url_gmaps, setUrlGmaps] = useState("");
    const [rating, setRating] = useState("");
    const [file, SetFile] = useState("");
    const [preview, setPreview] = useState("");
    const [isRatingValid, setIsRatingValid] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getPenginapanbyId();
    }, [])

    const getPenginapanbyId = async () => {
        const response = await axios.get(`http://localhost:5000/Penginapan/${id}`);
        SetNama(response.data.nama);
        SetDeskripsi(response.data.deskripsi);
        setUrlGmaps(response.data.url_gmaps);
        setRating(response.data.rating);
        SetFile(response.data.gambar);
        setPreview(response.data.url);
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        SetFile(image);
        setPreview(URL.createObjectURL(image));
    };

    const validateRating = (value) => {
        const parsedRating = parseFloat(value);
        if (parsedRating >= 0 && parsedRating <= 5) {
            setIsRatingValid(true);
        } else {
            setIsRatingValid(false);
        }
        setRating(value);
    };

    const updatePenginapan = async (e) => {
        e.preventDefault();
        if (!isRatingValid) {
            alert("Rating harus berada dalam rentang 0 hingga 5");
            return;
        }
        const formData = new FormData();
        formData.append("nama", nama); // Mengganti "title" dengan "nama"
        formData.append("deskripsi", deskripsi); // Mengganti "title" dengan "nama"
        formData.append("url_gmaps", url_gmaps);
        formData.append("rating", rating); 
        formData.append("file", file);
        try {
            await axios.patch(`http://localhost:5000/Penginapan/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/admin/penginapan");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updatePenginapan}>
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
                        <label className="label">RATING</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                step="0.1"
                                min="0"
                                max="5"
                                value={rating}
                                onChange={(e) => validateRating(e.target.value)}
                                placeholder="RATING"
                            />
                        </div>
                        {!isRatingValid && (
                            <p className="help is-danger">Rating harus berada dalam rentang 0 hingga 5</p>
                        )}
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

export default EditPenginapan;