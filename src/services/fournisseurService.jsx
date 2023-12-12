import {instance} from "../apis/AxiosInstance.js";


export const getFournisseurs = async ()=> {
    return await instance.get('fournisseurs');
}
export const getFournisseur = async (id)=> {
    return await instance.get(`fournisseurs/${id}`);
}

export const saveFournisseur = async (fournisseur)=> {
    return await instance.post('fournisseurs',fournisseur);
}

export const updateFournisseur = async (fournisseur)=> {
    return await instance.put(`fournisseurs/${fournisseur.id}`,fournisseur);
}
export const deleteFournisseur= async (id)=> {
    return await instance.delete(`fournisseurs/${id}`);
}