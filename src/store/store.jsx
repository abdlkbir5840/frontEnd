import { configureStore } from "@reduxjs/toolkit";
import { fournisseur } from "./FournisseurSlice";
import { categorie } from "./CategorieSlice";
import { produit } from "./ProduitSlice";
import {client} from "./ClientSlice";
import {pack} from "./PackSlice.jsx";
import {command} from "./CommandeSlice.jsx";
import {commandPack} from "./CommandePackSlice.jsx";

const store = configureStore({
  reducer: {
    fournisseur: fournisseur,
    categorie: categorie,
    produit: produit,
    client : client,
    pack : pack,
    command : command,
    commandPack: commandPack,
  },
});

export default store;
