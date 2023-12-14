import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteFournisseur,
  getFournisseurs,
  saveFournisseur,
  editFournisseur,
  search
} from "../services/fournisseurService";

export const fetchFournisseurs = createAsyncThunk(
  "fournisseur/fetchFournisseurs",
  async (page) => {
    try {
      const response = await getFournisseurs(page);
      return {data:response.data.fournisseur.data,totalPages:response.data.fournisseur.totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);
export const searchFournisseur = createAsyncThunk(
  "fournisseur/searchFournisseur",
  async (words) => {
    try {
      const response = await search(words);
      return {data:response.data.fournisseur.data,totalPages:response.data.fournisseur.totalPages};
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
      console.log(response.data)
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateFournisseur = createAsyncThunk(
  "fournisseur/updateFournisseur",
  async (fournisseur) => {
    try {
      const response = await editFournisseur(fournisseur);
      return response.data.data;
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
    fournisseur: {},
    totalPages:null,
    status: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFournisseurs.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages
        state.fournisseurs = action.payload.data;
      })
      .addCase(searchFournisseur.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages
        state.fournisseurs = action.payload.data;
        console.log(action.payload.totalPages)
        console.log(action.payload.data)
      })
      .addCase(addFournisseur.fulfilled, (state, action) => {
        state.fournisseurs.push(action.payload);
      })
      .addCase(updateFournisseur.fulfilled, (state, action) => {
        console.log(action.payload)
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
export const selectFournisseur = (state) => state.fournisseur.fournisseur;
export const totalPages = (state) => state.fournisseur.totalPages;
export const fournisseur = fournisseurSlice.reducer;
