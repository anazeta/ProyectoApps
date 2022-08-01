import React, { useState, useEffect, useContext } from "react";
import {useNavigate , useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    nombre: "",
    email: "",
    contacto: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);

    const { nombre, email, contacto } = state;

    const navigate = useNavigate();

    const { id } = useParams();
    

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/get/${id}`)
        .then((resp) => setState({...resp.data[0] }));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let { nombre, email, contacto } = e.target;
        nombre = nombre.value;
        email = email.value; 
        contacto = contacto.value;

        //console.log(nombre, email, contacto)
        if (!nombre || !email || !contacto) {
            toast.error("Por favor llene los campos");   
        } else {
            if(!id) {
            axios
            .post("http://localhost:5000/api/post", {
                nombre,
                email,
                contacto,
            })
            .then(() => {
                setState({ nombre: "", email: "", contacto: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Contacto añadido correctamente");
            } else {
            axios
            .put(`http://localhost:5000/api/update/${id}`, {
                nombre,
                email,
                contacto,
            })
            .then(() => {
                setState({ nombre: "", email: "", contacto: ""});
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("Contacto actualizado correctamente");
            }
            
            setTimeout(() => navigate.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setState({ text: value});
    };

  return (
    <div style={{marginTop: "100px"}}>
        <form
         style={{
            margin: "auto",
            padding: "15px",
            maxWidth: "400px",
            alignContent: "center",
        }}
        onSubmit={handleSubmit}
        >
            <label htmlFor="name">nombre</label>
            <input 
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre ..."
            value={nombre}
            onChange={handleInputChange}
            />
              <label htmlFor="email">email</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="Tu email ..."
            value={email}
            onChange={handleInputChange}
            />
              <label htmlFor="contacto">contacto</label>
            <input 
            type="number"
            id="contacto"
            name="contacto"
            placeholder="Tu contacto ..."
            value={contacto}
            onChange={handleInputChange}
            />
            <input type="submit" value={id ? "Actualizar" : "Guardar"} />
            
            <Link to="/">
            <input type="button" value="Volver" />
            </Link>
        </form> 
    </div>
  );
};

export default AddEdit;
