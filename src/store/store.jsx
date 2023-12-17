import { configureStore } from "@reduxjs/toolkit";
import { fournisseur } from "./FournisseurSlice";
import { categorie } from "./CategorieSlice";
import { produit } from "./ProduitSlice";
import {client} from "./ClientSlice";

const store = configureStore({
  reducer: {
    fournisseur: fournisseur,
    categorie: categorie,
    produit: produit,
    client : client,
}});

export default store;
