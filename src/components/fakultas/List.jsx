import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function List( ) {
    
        const [fakultas,setProdi] = useState([])
        useEffect(()=>{
            axios.get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
            .then((res)=>{
                console.log(res.data.result)
                setProdi(res.data.result)
            })
            .catch((err)=>{
                console.log(err)
            })
},[])
const handleDelete = (id,nama)=>{
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
          axios.delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
          .then((res)=>{
            setProdi(fakultas.filter((fakultas)=>fakultas.id !== id))
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'   
              )
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      })
}
    return (
        <div>
            <div className=" bg-light sticky-top">
            <h1 className="text-center pt-5 sticky-top" >List Fakultas
            </h1>
            <NavLink to="/fakultas/create" className="btn btn-primary ">
                        Create
                    </NavLink>
            </div>
            <ul className="list-group">
            {fakultas.map((data,idx) =>(
            <li key={data.id} className="list-group-item">
                {idx+1}  {data.nama}
                <div className='btn-group float-end ' role="group" aria-label='Action buttons'>
                    
                <NavLink className="btn btn-warning float-end " to={`/fakultas/edit/${data.id}`}> edit</NavLink>
                <button  className="btn btn-danger float-end" onClick={()=>handleDelete(data.id,data.nama)}> Delete</button>
                </div>
            </li>
            ))}
        </ul>

        </div>
    )
}