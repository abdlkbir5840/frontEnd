import {instance} from "../apis/AxiosInstance.js";


export const getFournisseurs = async (page)=> {
    return await instance.get(`fournisseurs?page=${page}`);
}
export const search = async (words)=> {
    return await instance.get(`fournisseurs/nom/${words}`);
}

export const saveFournisseur = async (fournisseur)=> {
    return await instance.post('fournisseurs',fournisseur);
}

export const editFournisseur = async (fournisseur)=> {
    return await instance.put(`fournisseurs/${fournisseur.id}`,fournisseur);
}
export const deleteFournisseur= async (id)=> {
    return await instance.delete(`fournisseurs/${id}`);
}