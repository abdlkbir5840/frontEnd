import { configureStore } from "@reduxjs/toolkit";
import { fournisseur } from "./FournisseurSlice";
const store = configureStore({
  reducer: {
    fournisseur: fournisseur,
  },
});

export default store;
