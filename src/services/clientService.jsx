import {instance} from "../apis/AxiosInstance.js";




export const getClients = async ()=> {
    return  instance.get(`clients`);
}
export const deleteClients = (client)=> {
    return instance.delete(`clients/${client.id}`);
}
export const getClient = async (id)=> {
    return instance.get(`clients/id/${id}`);
}
export const getClientByFirstNameAndLastName = async (firstName,lastName)=> {
    return instance.get(`clients/firstName/${firstName}/lastName/${lastName}`);
}
export const saveClient = (client)=> {
    return instance.post(`clients`,client);
}

export const updateClient = (client)=> {
    console.log(client)
    return instance.put(`clients/${client.id}`,client);
}

