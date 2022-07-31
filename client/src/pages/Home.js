import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  
  const deleteContact = (id) => {
    if(
        window.confirm("Estas seguro de eliminar este contacto ?")
    ) {
        axios.delete(`http://localhost:5000/api/get/${id}`);
        toast.success("Contacto eliminado satisfactoriamente");
        setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
        <Link to="/addContact">
            <button className="btn btn-contact">Agregar contacto</button>
        </Link>
        
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{ textAlign: "center"}}>No.</th>
                    <th style={{ textAlign: "center"}}>nombre</th>
                    <th style={{ textAlign: "center"}}>email</th>
                    <th style={{ textAlign: "center"}}>contacto</th>
                    <th style={{ textAlign: "center"}}>accion</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.nombre}</td>
                            <td>{item.email}</td>
                            <td>{item.contacto}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                    <button className="btn btn-edit">editar</button>
                                </Link>
                                <button 
                                className="btn btn-delete" 
                                onClick={() => deleteContact(item.id)}
                                >
                                    eliminar
                                </button>
                                <Link to={`/view/${item.id}`}>
                                <button className="btn btn-view">ver</button>
                                </Link>

                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  );
};

export default Home;
