import { configureStore } from "@reduxjs/toolkit";
import { fournisseur } from "./FournisseurSlice";
import { categorie } from "./CategorieSlice";
import { produit } from "./ProduitSlice";
const store = configureStore({
  reducer: {
    fournisseur: fournisseur,
    categorie: categorie,
    produit: produit,
  },
});

export default store;
