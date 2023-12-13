import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddFournisseur from "./AddFournisseur";
import { useDispatch, useSelector } from "react-redux";
import { fetchFournisseurs, removeFournisseur, selectFournisseurs } from "../../store/FournisseurSlice";
import EditFournisseur from "./EditFournisseur";
export default function Clients() {
  const dispatch = useDispatch()
  const fournisseurs = useSelector(selectFournisseurs);
  useEffect(() => {
    dispatch(fetchFournisseurs())
  }, [dispatch]);

  const handleDeleteFournisseur =  (fournisseur) => {
    console.log(fournisseur);
     dispatch(removeFournisseur(fournisseur));
  
  };  
  const handleEditFournisseur = (fournisseur) => {
    console.log(fournisseur);
  };
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Export
            </button>
          </div>
          <AddFournisseur />
        </div>
      </div>

      <h2>Fournisseur Data</h2>
      <div className="table-responsive small">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Code</th>
              <th scope="col">Nom</th>
              <th scope="col">Téléphone</th>
              <th scope="col">Email</th>
              <th scope="col">Fax</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(fournisseurs) &&
              fournisseurs.map((fournisseur) => (
                <tr key={fournisseur.id}>
                  <td>{fournisseur.id}</td>
                  <td>{fournisseur.code_fournisseur}</td>
                  <td>{fournisseur.nom}</td>
                  <td>{fournisseur.tel}</td>
                  <td>{fournisseur.mail}</td>
                  <td>{fournisseur.fax}</td>
                  {/*<td>*/}
                  {/*    <button onClick={()=> handleCheckProduct(product)} className={"btn btn-outline-success"}>*/}
                  {/*        <FontAwesomeIcon icon={product.checked ? faCheckCircle:faCircle}>*/}
                  {/*        </FontAwesomeIcon>*/}
                  {/*    </button>*/}
                  {/*</td>*/}
                  <td>
                    <button
                      onClick={() => handleDeleteFournisseur(fournisseur)}
                      className="btn btn-outline-danger"
                    >
                      <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditFournisseur(fournisseur)}
                      className={"btn btn-outline-secondary"}
                    >
                      <FontAwesomeIcon icon={faEdit}>
                        <EditFournisseur />
                      </FontAwesomeIcon>
                      
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
