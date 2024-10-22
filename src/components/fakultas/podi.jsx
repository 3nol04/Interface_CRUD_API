import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Prodi() {
    const [prodi, setProdi] = useState([]);
  
    useEffect(() => {
        axios.get('https://project-apiif-3-b.vercel.app/api/api/prodi')
            .then((res) => {
                console.log(res.data.result);
                setProdi(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Delete ${nama}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
                    .then((res) => {
                        setProdi(prodi.filter((prodi) => prodi.id !== id));
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
    }

    return (
        <div>
            <h1>List Program Studi dan Fakultas</h1>
            <ul className="list-group">
            <NavLink to="/prodi/create" className="btn btn-primary mb-3 m ">
                        Create
                    </NavLink>
                {prodi.map((data) => (
                    <li key={data.id} className="list-group-item">
                        {data.nama} - {data.fakultas.nama}
                        <div className='btn btn-danger float-end' role="group" aria-label="Basic example">
                        <NavLink className="btn btn-warning float-end" to={`/prodi/edit/${data.id}`}> edit</NavLink>
                        <button className="btn btn-danger float-end" role="group" aria-label="Basic example" 
                        onClick={() =>handleDelete(data.id, data.nama)}> delete
                        </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
