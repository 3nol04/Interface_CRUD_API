import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function editList() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [nama, setNama] = useState("");
    const [error, setError] = useState(null);
            
    useEffect(() => {
        axios.get(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
        .then((res)=>{
            setNama(res.data.result.nama)
            console.log(nama)
        })
        .catch((err)=>{
            console.error("Error get data",err)
            setError("Data Tidak Ditemukan")
        });
    },[id]);
        const handleSubmit = (e)=>{
            e.preventDefault(); //mencegan form dari reload
            axios.patch(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`,{
                nama
            }).then((res)=>{
                navigate("/fakultas");
            }).catch((err)=>{
                console.error("Error update data",err)
                setError("Error update data")
            })
    }
    return (
        <div>
            <h2>
                Edit Fakultas    
            </h2>  
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama Fakultas</label>
                    <input type="text" className="form-control" id="nama" 
                    value={nama} 
                    onChange={(e)=>setNama(e.target.value)} 
                    required/>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                </form>
        </div>
    )
}