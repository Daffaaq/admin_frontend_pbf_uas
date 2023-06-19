import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddWisata = () => {
    const [nama, SetNama] = useState("");
    const [lokasi, SetLokasi] = useState("");
    const [jam, SetJam] = useState("");
    const [harga, SetHarga] = useState(0);
    const [file, SetFile] = useState("");
    const [preview, setPreview] = useState("");
    const [deskripsi, SetDeskripsi] = useState("");
    const [url_gmaps, setUrlGmaps] = useState("");
    const [rating, setRating] = useState("");
    const [isRatingValid, setIsRatingValid] = useState(true);
    const navigate = useNavigate();
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

    const saveWisata = async (e) => {
        e.preventDefault();

        if (!isRatingValid) {
            alert("Rating harus berada dalam rentang 0 hingga 5");
            return;
        }

        const formData = new FormData();
        formData.append("nama", nama); // Mengganti "title" dengan "nama"
        formData.append("lokasi", lokasi); // Mengganti "title" dengan "nama"
        formData.append("jam", jam); // Mengganti "title" dengan "nama"
        formData.append("harga", harga); // Mengganti "title" dengan "nama"
        formData.append("deskripsi", deskripsi); // Mengganti "title" dengan "nama"
        formData.append("url_gmaps", url_gmaps); // Mengganti "title" dengan "nama"
        formData.append("rating", rating); // Mengganti "title" dengan "nama"
        formData.append("file", file);
        try {
            await axios.post("http://localhost:5000/Wisata", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/admin/wisata");
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
                <form onSubmit={saveWisata}>
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
                        <label className="label">Lokasi</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={lokasi}
                                onChange={(e) => SetLokasi(e.target.value)}
                                placeholder='Lokasi' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Jam</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={jam}
                                onChange={(e) => SetJam(e.target.value)}
                                placeholder='Jam' />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Harga</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                value={harga}
                                onChange={(e) => SetHarga(e.target.value)}
                                placeholder='Harga' />
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
                                step="0.1" // Mengatur langkah inkremental menjadi 0.1 untuk menerima nilai desimal
                                min="0" // Menetapkan nilai minimum menjadi 0
                                max="5" // Menetapkan nilai maksimum menjadi 5
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

export default AddWisata;