import React, {useEffect, useState} from "react";
import {deleteClients, getClients} from "../../services/clientService.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import NewClient from "./NewClient.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchFournisseurs, removeFournisseur, selectFournisseurs} from "../../store/FournisseurSlice.jsx";
import {fetchClients, removeClient, selectClients} from "../../store/ClientSlice.jsx";
import EditClient from "./EditClient";
export default function Clients() {
    const dispatch = useDispatch()
    const clients = useSelector(selectClients);
    const [firstName ,setFirstName]= useState("")
    const [lastName ,setLastName]= useState("")
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchClients())
    }, [dispatch]);
    const handleDeleteClient =  (client) => {
        console.log(client);
        dispatch(removeClient(client));

    };

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gestion des clients</h1>
                <div className="btn-toolbar mb-2 mb-md-0">

                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"*/}
                    {/*>*/}
                    {/*    <FontAwesomeIcon icon={faPlus}>*/}
                    {/*    </FontAwesomeIcon> Ajouter*/}
                    {/*</button>*/}
                    <NewClient/>
                </div>
            </div>

            <div className="card-body">
                <form>
                    <div className="row g-2">
                        <div className="col-auto">
                            <input
                                // value={query}
                                // onChange={(e)=>setSQuery(e.target.value)}
                                className="form-control"
                                placeholder="Nom"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                // value={query}
                                // onChange={(e)=>setSQuery(e.target.value)}
                                className="form-control"
                                placeholder="Prénom"
                            />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-success">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </form>

            </div>
            <br/>
            <div className="table-responsive small">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Téléphone</th>
                        <th scope="col">Address</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(clients) && clients.map((client)=>(
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.lastName}</td>
                            <td>{client.firstName}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.adresse}</td>
                            {/*<td>*/}
                            {/*    <button onClick={()=> handleCheckProduct(product)} className={"btn btn-outline-success"}>*/}
                            {/*        <FontAwesomeIcon icon={product.checked ? faCheckCircle:faCircle}>*/}
                            {/*        </FontAwesomeIcon>*/}
                            {/*    </button>*/}
                            {/*</td>*/}
                            <td>
                                <button
                                    onClick={()=>handleDeleteClient(client)}
                                    className={"btn btn-outline-danger"}>
                                    <FontAwesomeIcon icon={faTrash}>
                                    </FontAwesomeIcon>
                                </button>
                            </td>
                            <td>

                                <EditClient infoClient={{id:client.id,lastName:client.lastName,firstName:client.firstName,email:client.email,phone:client.phone,adresse: client.adresse}}/>
                            </td>

                            {/*<td>*/}
                            {/*    <button*/}
                            {/*        onClick={()=>navigate(`/editProduct/${product.id}`)}*/}
                            {/*        className={"btn btn-outline-secondary"}>*/}
                            {/*        <FontAwesomeIcon icon={faEdit}>*/}
                            {/*        </FontAwesomeIcon>*/}
                            {/*    </button>*/}
                            {/*</td>*/}
                        </tr>
                    ))}
                    </tbody>

                </table>
                {/*<ul className={"nav nav-pills"}>*/}
                {/*    {*/}
                {/*        new Array(clients.totalPages).fill(0).map((v,index)=>(*/}
                {/*            <li>*/}
                {/*                <button onClick={()=>handleGotoPage(index+1)}*/}
                {/*                        className={(index+1)==state.currentPage?"btn btn-info ms-1":"btn btn-outline-info ms-1"}>*/}
                {/*                    {index+1}*/}
                {/*                </button>*/}
                {/*            </li>*/}
                {/*        ))*/}
                {/*    }*/}
                {/*</ul>*/}
            </div>
        </main>







    );
}
