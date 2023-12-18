import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    deleteCategories,
    getCategories,
    saveCategories,
    editCategories,
    search,
    getAllCategories
  } from "../services/categorieService";

export const fetchCategories = createAsyncThunk(
  "categorie/fetchCategories",
  async (page) => {
    try {
      const response = await getCategories(page);
      return {data:response.data.categories.data,totalPages:response.data.categories.totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "categorie/fetchAllCategories",
  async () => {
    try {
      const response = await getAllCategories();
      return response.data.categories;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchCategories = createAsyncThunk(
  "categorie/searchCategories",
  async ({ words, page }) => {
    try {
      const response = await search(words, page);
      return {data:response.data.categories.data,totalPages:response.data.categories.totalPages};
    } catch (error) {
      console.log(error);
    }
  }
);
export const addCategorie = createAsyncThunk(
  "categorie/addCategorie",
  async (categorie) => {
    try {
      const response = await saveCategories(categorie);
      return response.data.categorie;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCategorie = createAsyncThunk(
  "categorie/updateCategorie",
  async (categorie) => {
    try {
      const response = await editCategories(categorie);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCtegorie = createAsyncThunk(
  "categorie/deleteCategories",
  async (categorie) => {
    try {
      const response = await deleteCategories(categorie.id);
      return categorie;
    } catch (error) {
      console.error(error);
    }
  }
);
const categorieSlice = createSlice({
  name: "categorie",
  initialState: {
    categories: [],
    categorie: {},
    totalPages:null,
    status: "",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages
        state.categories = action.payload.data;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action)=>{
        state.categories = action.payload
      })
      .addCase(searchCategories.fulfilled, (state, action) => {
        state.totalPages = action.payload.totalPages
        state.categories = action.payload.data;
      })
      .addCase(addCategorie.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategorie.fulfilled, (state, action) => {
        console.log(state.categories)
        state.categories = state.categories.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        console.log(state.categories)

      })
      .addCase(removeCtegorie.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});
export const selectCategories = (state) => state.categorie.categories;
export const selectFournisseur = (state) => state.categorie.categorie;
export const totalPages = (state) => state.categorie.totalPages;
export const categorie = categorieSlice.reducer;
