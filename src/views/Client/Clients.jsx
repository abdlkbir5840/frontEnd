import React, {useEffect, useState} from "react";
import {deleteClients, getClients} from "../../services/clientService.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import NewClient from "./NewClient.jsx";
import {useDispatch, useSelector} from "react-redux";

import {fetchClients, removeClient, searchClient, selectClients, totalPages} from "../../store/ClientSlice.jsx";
import EditClient from "./EditClient";
import {fetchFournisseurs} from "../../store/FournisseurSlice.jsx";
export default function Clients() {
    const dispatch = useDispatch()
    const clients = useSelector(selectClients);
    const totalPage = useSelector(totalPages);
    const [currentPage, setCurrentPage] = useState(1);
    const [firstName ,setFirstName]= useState("")
    const [lastName ,setLastName]= useState("")
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchClients(1));
    }, [dispatch]);
    const handleDeleteClient =  (client) => {
        console.log(client);
        dispatch(removeClient(client));
        if(clients.length<=1) {
            setCurrentPage(currentPage-1)
            dispatch(fetchClients(currentPage-1))
        }else{
            dispatch(fetchClients(currentPage))
        }

    };
    const handelPaginate = (page) => {

        if(currentPage>=totalPage){
            setCurrentPage(1);
            dispatch(fetchClients(1));
        }else{
            dispatch(fetchClients(page));
            setCurrentPage(page);
        }

    };
    const renderPaginationLinks = () => {
        if (totalPage < 5)
            return Array.from({ length: totalPage }, (_, index) => index + 1);
        const maxLinksToShow = 5;
        const halfMaxLinksToShow = Math.floor(maxLinksToShow / 2);

        let startIdx = currentPage - halfMaxLinksToShow;
        let endIdx = currentPage + halfMaxLinksToShow;

        if (startIdx < 1) {
            startIdx = 1;
            endIdx = maxLinksToShow;
        }

        if (endIdx > totalPage) {
            endIdx = totalPage;
            startIdx = totalPage - maxLinksToShow + 1;
        }

        return Array.from(
            { length: endIdx - startIdx + 1 },
            (_, index) => startIdx + index
        );
    };
    const handleSearch = (e) => {
        e.preventDefault()
        if(firstName==="" && lastName===""){
            dispatch(fetchClients(1))
        }else{
        // console.log(firstName+" "+lastName)
        dispatch(searchClient({firstName,lastName}));}
    };

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gestion des clients</h1>
                <div className="btn-toolbar mb-2 mb-md-0">

                    <NewClient info={{page:currentPage}}/>
                </div>
            </div>
            {clients.length <=0 ? <div  style={{display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '75vh',}}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <>
            <div className="card-body">

                <form onSubmit={handleSearch}>
                    <div className="row g-2">
                        <div className="col-auto">
                            <input
                                value={lastName}
                                onChange={(e)=>setLastName(e.target.value)}
                                className="form-control"
                                placeholder="Nom"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                value={firstName}
                                onChange={(e)=>setFirstName(e.target.value)}
                                className="form-control"
                                placeholder="Prénom"
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-primary">
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
                    {Array.isArray(clients) && clients.slice(0,5).map((client)=>(
                        client && (
                        <tr  key={client && client.id}>
                            {client && <td>{client.id}</td>}
                            {client &&<td>{client.lastName}</td>}
                            {client &&<td>{client.firstName}</td>}
                            {client &&<td>{client.email}</td>}
                            {client &&<td>{client.phone}</td>}
                            {client &&<td>{client.adresse}</td>}
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

                                <EditClient
                                    infoClient={{
                                        id: client.id,
                                        lastName: client.lastName,
                                        firstName: client.firstName,
                                        email: client.email,
                                        phone: client.phone,
                                        adresse: client.adresse,
                                    }}
                                />
                            </td>

                        </tr>)
                    ))}
                    </tbody>

                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li
                            className="page-item"
                            onClick={() => handelPaginate(currentPage - 1)}
                        >
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {renderPaginationLinks().map((page) => (
                            <li
                                onClick={() => handelPaginate(page)}
                                key={page}
                                className={
                                    page === currentPage ? "page-item active" : "page-item"
                                }
                            >
                                <a href="#" className="page-link">
                                    {page}
                                </a>
                            </li>
                        ))}
                        <li
                            className={
                                currentPage === totalPage ? "page-item disabled" : "page-item"
                            }
                            onClick={() => handelPaginate(currentPage + 1)}
                        >
                            <a
                                class={
                                    currentPage === totalPage ? "page-link disabled" : "page-link"
                                }
                                href="#"
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
                </>}
        </main>







    );
}
