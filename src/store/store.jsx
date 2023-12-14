import { configureStore } from "@reduxjs/toolkit";
import { fournisseur } from "./FournisseurSlice";
import {client} from "./ClientSlice";
const store = configureStore({
  reducer: {
    fournisseur: fournisseur,
    client : client,
  },
});

export default store;
