import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteFournisseur,
  getFournisseurs,
  getAllFournisseurs,
  saveFournisseur,
  editFournisseur,
  search
} from "../services/fournisseurService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export const fetchAllFournisseurs = createAsyncThunk(
  "fournisseur/fetchAllFournisseurs",
  async () => {
    try {
      const response = await getAllFournisseurs();
      return response.data.fournisseur;
    } catch (error) {
      console.log(error);
    }
  }
);
export const searchFournisseur = createAsyncThunk(
  "fournisseur/searchFournisseur",
  async ({ words, page }) => {
    try {
      console.log(page)
      console.log(words)
      const response = await search(words, page);
      return {data:response.data.fournisseur.data,totalPages:response.data.fournisseur.totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);
export const addFournisseur = createAsyncThunk(
  "fournisseur/addFournisseurs",
  async (fournisseur, { rejectWithValue }) => {
    try {
      const response = await saveFournisseur(fournisseur);
      return response.data.fournisseur;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data);
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
      .addCase(fetchAllFournisseurs.fulfilled, (state, action)=>{
        state.fournisseurs = action.payload
      })
      .addCase(searchFournisseur.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages
        state.fournisseurs = action.payload.data;
      })
      .addCase(addFournisseur.fulfilled, (state, action) => {
          console.log(action.payload)
        state.fournisseurs.push(action.payload);
      })
      .addCase(addFournisseur.rejected, (state, action) => {
        console.error('Erreur lors de l\'ajout du fournisseur:', action.payload);
        toast.error(action.payload.message || 'Une erreur s\'est produite lors de l\'ajout du fournisseur');
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
