import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteFournisseur,
  getFournisseurs,
  saveFournisseur,
} from "../services/fournisseurService";

export const fetchFournisseurs = createAsyncThunk(
  "fournisseur/fetchFournisseurs",
  async () => {
    try {
      const response = await getFournisseurs();
      return response.data.fournisseur.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFournisseur = createAsyncThunk(
  "fournisseur/addFournisseurs",
  async (fournisseur) => {
    try {
      const response = await saveFournisseur(fournisseur);
      console.log(response);
      return response.data.fournisseur;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateFournisseur = createAsyncThunk(
  "fournisseur/updateFournisseur",
  async (fournisseur) => {
    try {
      const response = await updateFournisseur(fournisseur);
      console.log(response);
      return response.data.fournisseur;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeFournisseur = createAsyncThunk(
  "fournisseur/deleteFournisseur",
  async (fournisseur) => {
    try {
      const response = await deleteFournisseur(fournisseur.id);
      return fournisseur;
    } catch (error) {
      console.error(error);
    }
  }
);
const fournisseurSlice = createSlice({
  name: "fournisseur",
  initialState: {
    fournisseurs: [],
    status: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFournisseurs.fulfilled, (state, action) => {
        state.fournisseurs = action.payload;
      })
      .addCase(addFournisseur.fulfilled, (state, action) => {
        state.fournisseurs.push(action.payload);
      })
      .addCase(updateFournisseur.fulfilled, (state, action) => {
        state.fournisseurs = state.fournisseurs.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
      })
      .addCase(removeFournisseur.fulfilled, (state, action) => {
        console.log(action.payload.id)
        state.fournisseurs = state.fournisseurs.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});
export const selectFournisseurs = (state) => state.fournisseur.fournisseurs;
export const fournisseur = fournisseurSlice.reducer;
