import React, { useState } from "react";
import axios from "axios";

export default function CreateFakultas() {
    const [namaFakultas, setNamaFakultas] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (namaFakultas.trim() === "") {
            setError("Masukkan Nama Fakultas");
            return;
        }

        try {
            const response = await axios.post("https://project-apiif-3-b.vercel.app/api/api/fakultas", {
                nama: namaFakultas,
            });

            if (response.status === 201) {
                setSuccess("Data Berhasil Disimpan");
                setNamaFakultas("");
            } else {
                setError("Data Gagal Disimpan. Coba lagi.");
            }
        } catch (err) {
            if (err.response) {
                // Server responded with a status other than 2xx
                setError(`Error: ${err.response.data.message || "Data Gagal Disimpan"}`);
            } else if (err.request) {
                // No response from server
                setError("Tidak dapat terhubung ke server. Coba lagi.");
            } else {
                // Error in setting up request
                setError("Terjadi kesalahan. Coba lagi.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Formulir Tambah Fakultas</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="namaFakultas" className="form-label">Nama Fakultas</label>
                    <input
                        type="text"
                        id="namaFakultas"
                        className="form-control"
                        value={namaFakultas}
                        onChange={(e) => setNamaFakultas(e.target.value)}
                        placeholder="Masukkan Nama Fakultas"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
