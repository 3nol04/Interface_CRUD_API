    import React, { useState, useEffect } from "react";
    import axios from "axios";

    export default function CreateProdi() {
    const [namaProdi, setNamaProdi] = useState(""); // Mengganti setNamaFakultas ke setNamaProdi
    const [fakultasId, setFakultasId] = useState("");
    const [fakultasList, setFakultasList] = useState([]); // Mengubah dari string menjadi array
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch list of Fakultas on component mount
    useEffect(() => {
        const fetchFakultas = async () => {
        try {
            const response = await axios.get(
            "https://project-apiif-3-b.vercel.app/api/api/fakultas"
            );
            setFakultasList(response.data.result);
        } catch (error) {
            console.error(error);
        }
        };
        fetchFakultas();
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (namaProdi.trim() === "" || fakultasId === "") {
        setError("Semua bidang harus diisi");
        return;
        }

        try {
        const response = await axios.post(
            "https://project-apiif-3-b.vercel.app/api/api/prodi",
            {
            nama: namaProdi,
            fakultas_id: fakultasId,
            }
        );

                if (response.status === 201) {
                    setSuccess("Program Studi berhasil ditambahkan");
                    setNamaProdi("");
                    setFakultasId("");
                } else {
                    setError("Terjadi kesalahan dalam menyimpan data");
                }
                
        } catch (error) {
        setError("Terjadi kesalahan saat membuat Program Studi");
        }
    };

    return (
        <div className="container mt-5">
        <h2 className="mb-4">Create Program Studi</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="namaProdi" className="form-label">
                Nama Program Studi
            </label>
            <input
                type="text"
                className="form-control"
                id="namaProdi"
                placeholder="Masukkan Nama Program Studi"
                value={namaProdi}
                onChange={(e) => setNamaProdi(e.target.value)}
                required
            />
            </div>

            <div className="mb-3">
            <label htmlFor="fakultasId" className="form-label">
                Fakultas
            </label>
            <select
                className="form-select"
                id="fakultasId"
                value={fakultasId}
                onChange={(e) => setFakultasId(e.target.value)}
                required
            >
                <option value="">Pilih Fakultas</option>
                {fakultasList.map((fakultas,index) => (
                <option key={fakultas.id} value={fakultas.id}>
                   {index+1 } {fakultas.nama}
                </option>
                ))}
            </select>
            </div>

            <button type="submit" className="btn btn-primary">
            Create
            </button>
        </form>
        </div>
    );
    }