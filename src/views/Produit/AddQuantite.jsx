import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduit } from "../../store/ProduitSlice";
import {
  fetchFournisseurs,
  selectFournisseurs,
} from "../../store/FournisseurSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
export default function AddQuantite({produitInfo}) {
  const fournisseurs = useSelector(selectFournisseurs);
  const [code_produit, setCodeProduit] = useState(produitInfo.code_produit);
  const [nom, setNom] = useState(produitInfo.nom);
  const [id, setId] = useState(produitInfo.id);
  const [qte_entree, setQteEntree] = useState("");
  const [fournisseur_id, setFournisseurId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFournisseurs());
    console.log(fournisseurs);
  }, [dispatch]);
  const handleAdd = () => {
    const produit = {
      id,
      code_produit,
      nom,
      qte_entree,
      fournisseur_id,
    };
    console.log(produit);
    // dispatch(addQuantite(produit));
  };

  return (
    <>
      <button
        type="button"
        class="bg-light outline-non border-0"
        data-bs-toggle="modal"
        data-bs-target={"#exampleModal"+produitInfo.id}
      >
        <span class="wishlist bg-success">
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </button>

      <div
        class="modal fade"
        id={"exampleModal"+produitInfo.id}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Code Produit :</label>
                  <input
                    value={code_produit}
                    className="form-control"
                    disabled
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nom :</label>
                  <input
                    value={nom}
                    className="form-control"
                    disabled
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Quantite Entree :</label>
                  <input
                    onChange={(e) => setQteEntree(e.target.value)}
                    value={qte_entree}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fournisseur :</label>
                  <select
                    onChange={(e) => setFournisseurId(e.target.value)}
                    value={fournisseur_id}
                    className="form-select"
                  >
                    <option value="">Sélectionner un Fournisseur</option>
                    {fournisseurs.map((fournisseur) => (
                      <option key={fournisseur.id} value={fournisseur.id}>
                        {fournisseur.nom}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleAdd} type="button" class="btn btn-primary">
                Ajouter Qauntite
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
