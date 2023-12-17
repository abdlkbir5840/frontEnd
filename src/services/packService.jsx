import {instance} from "../apis/AxiosInstance.js";




export const getPacks= async (page)=> {
    return await instance.get(`packProduits?page=${page}`);
}
export const deletePack = (pack)=> {
    return instance.delete(`packs/${pack.id}`);
}
export const deleteProduitFromPack = (packId,produitId)=> {
    return instance.delete(`packProduits/${packId}/${produitId}`);
}
export const getPack = async (codePack)=> {
    return instance.get(`packs/codePack/${codePack}`);
}
// export const getClientByFirstNameAndLastName = async (firstName,lastName)=> {
//     return instance.get(`clients/firstName/${firstName}/lastName/${lastName}`);
//     console.log("testsdfs")
// }
export const savePack = (pack)=> {
    return instance.post(`packs`,pack);
}

export const editPack = (pack)=> {
    console.log(pack)
    return instance.put(`packs/${pack.id}`,pack);
}

