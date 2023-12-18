import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduit } from "../../store/ProduitSlice";
import {
  fetchAllFournisseurs,
  selectFournisseurs,
} from "../../store/FournisseurSlice";
import {
  fetchAllCategories,
  selectCategories,
} from "../../store/CategorieSlice";
export default function AddProduit() {
  const fournisseurs = useSelector(selectFournisseurs);
  const categories = useSelector(selectCategories);
  const [code_produit, setCodeProduit] = useState("");
  const [nom, setNom] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [qte_entree, setQteEntree] = useState("");
  const [prix_unitaire, setPrixUnitaire] = useState("");
  const [description, setDescription] = useState("");
  const [categorie_id, setCategorieId] = useState("");
  const [fournisseur_id, setFournisseurId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllFournisseurs());
    dispatch(fetchAllCategories());
  }, [dispatch]);
  const handleAdd = () => {
    const basePath = "D:\\react\\images\\";
    // Utiliser replace pour enlever la partie de base du chemin
    const image = imagePath.replace(basePath, "");

    const produit = {
      code_produit,
      nom,
      image,
      qte_entree,
      prix_unitaire,
      description,
      categorie_id,
      fournisseur_id,
    };
    console.log(produit);
    dispatch(addProduit(produit));
  };

  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Ajouter Produit
      </button>

      <div
        class="modal fade"
        id="exampleModal"
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
                    onChange={(e) => setCodeProduit(e.target.value)}
                    value={code_produit}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nom :</label>
                  <input
                    onChange={(e) => setNom(e.target.value)}
                    value={nom}
                    className="form-control"
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
                  <label className="form-label">Prix Unitaire :</label>
                  <input
                    onChange={(e) => setPrixUnitaire(e.target.value)}
                    value={prix_unitaire}
                    className="form-control"
                  ></input>
                </div>
                <div className="mb-3">
                  <label className="form-label">Catégorie :</label>
                  <select
                    onChange={(e) => setCategorieId(e.target.value)}
                    value={categorie_id}
                    className="form-select"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.nom}
                      </option>
                    ))}
                  </select>
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
                <div className="mb-3">
                  <label className="form-label">Image :</label>
                  {/* <input
                    type="text-aria"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                  ></input> */}
                  <input
                    type="file"
                    onChange={(e) => setImagePath(e.target.value)}
                    value={imagePath}
                    class="form-control"
                    id="customFile"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description :</label>
                  <input
                    type="text-aria"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className="form-control"
                  ></input>
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
                Ajouter Produit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
