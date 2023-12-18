import {instance} from "../apis/AxiosInstance.js";


export const getProduits = async (page)=> {
    return await instance.get(`produits?page=${page}`);
}
export const search = async (search, page)=> {
    return await instance.get(`produits/nom/${search}?page=${page}`);
}

export const saveProduits = async (produit)=> {
    return await instance.post('produits',produit);
}

export const editProduits = async (produit)=> {
    return await instance.put(`produits/${produit.id}`,produit);
}
export const deleteProduits = async (id)=> {
    return await instance.delete(`produits/${id}`);
}