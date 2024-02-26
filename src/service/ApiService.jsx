import axios from "axios";

class ApiService {

    headers() {
        const user = localStorage.getItem('authToken');
        return user ? 
            { headers: { Authorization: `Bearer ${JSON.parse(user).token}` }} : 
            {}
    }

    constructor(baseURL) {
        this.api = axios.create({baseURL});
    }

    async get(endpoint = '') {
        try {
            const response = await this.api.get(endpoint);
            return response.data
        } catch (error) {
            // Ajouter le traitement à effectuer pour le traitement des erreurs
            console.error('Erreur lors du GET: ', error);
            throw error;
        }
    }

    // Méthode POST
    async post(endpoint = '', objectToSave) {
        console.log(objectToSave);
        try{
            const response = await this.api.post(endpoint, objectToSave,this.headers());
            return response.data;
        } catch (error){
            if (error.code == "ERR_BAD_REQUEST") {
                console.log(error.message);
            } else {
                console.error('Erreur lors du POST !: ' ,error)
                throw error;
            }
        }
    }

    // Méthode PUT
    async put (endpoint = '', objectToSave) {
        try{
            const response = await this.api.put(endpoint, objectToSave);
            return response.data;
        } catch (error){
            console.error('Erreur lors du PUT !: ' ,error)
            throw error;
        }
    }

    // Méthode pour effectuer une requête DELETE
    async delete(endpoint=''){
        try{
            const response = await this.api.delete(endpoint);
            return response.data;
        } catch (error){
            console.error('Erreur lors du DELETE !: ' ,error)
            throw error;
        }
    }
}

export default ApiService;