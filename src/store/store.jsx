import { configureStore } from "@reduxjs/toolkit";
import { fournisseur } from "./FournisseurSlice";
import {client} from "./ClientSlice";
import {pack} from "./PackSlice.jsx";
const store = configureStore({
  reducer: {
    fournisseur: fournisseur,
    client : client,
    pack : pack,
  },
});

export default store;
