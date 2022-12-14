import React, {useState, useEffect} from 'react';
import {useParams, Link} from "react-router-dom";
import axios from 'axios';
import "./Views.css";

const View = () => {
  const [user, setUser] = useState({});  

  const {id} = useParams();

  useEffect(() => {
    axios
    .get(`http://localhost:5000/api/get/${id}`)
    .then((resp) => setUser({...resp.data[0] }));
}, [id]);

  return (
    <div style={{marginTop: "150px"}}>
        <div className="card">
            <div className="card-header">
                <p>Detalle del usuario</p>
            </div>
            <div className="container">
                <strong>ID: </strong>
                <span>{id}</span>
                <br />
                <br />
                <strong>NOMBRE: </strong>
                <span>{user.nombre}</span>
                <br />
                <br />
                <strong>EMAIL: </strong>
                <span>{user.email}</span>
                <br />
                <br />
                <strong>CONTACTO: </strong>
                <span>{user.contacto}</span>
                <br />
                <br />
                <Link to="/">
                    <div className="btn btn-edit">Volver</div>
                </Link>
            </div>
        </div>
    </div>
  );
};

export default View;
