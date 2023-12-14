import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {deleteClients, getClients, saveClient, updateClient} from "../services/clientService.jsx";

export const fetchClients = createAsyncThunk(
    "client/fetchClients",
    async () => {
        try {
            const response = await getClients();
            return response.data.clients.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const addClient = createAsyncThunk(
    "client/addClients",
    async (client) => {
        try {
            const response = await saveClient(client);
            console.log(response);
            return response.data.client;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updateClients = createAsyncThunk(
    "client/updateClients",
    async (client) => {
        try {
            const response = await updateClient(client);
            console.log(response);
            return response.data.client;
        } catch (error) {
            console.log(error);
        }
    }
);

export const removeClient = createAsyncThunk(
    "client/deleteClient",
    async (client) => {
        try {
            const response = await deleteClients(client);
            return client;
        } catch (error) {
            console.error(error);
        }
    }
);
const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients: [],
        status: "",
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.clients= action.payload;
            })
            .addCase(addClient.fulfilled, (state, action) => {
                console.log(action.payload)
                state.clients.push(action.payload);
            })
            .addCase(updateClients.fulfilled, (state, action) => {
                // Assurez-vous que action.payload et action.payload.id sont définis
                if (action.payload && action.payload.id) {
                    state.clients = state.clients.map((item) =>
                        // Vérifiez également que item est défini avant d'accéder à item.id
                        item && item.id === action.payload.id ? { ...item, ...action.payload } : item
                    );
                }
            })

            .addCase(removeClient.fulfilled, (state, action) => {
                console.log(action.payload.id)
                state.clients = state.clients.filter(
                    (item) => item.id !== action.payload.id
                );
            });
    },
});
export const selectClients = (state) => state.client.clients;
export const client = clientSlice.reducer;
