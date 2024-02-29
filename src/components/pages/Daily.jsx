import { useState } from "react";
import { CardCompo } from "./CardCompo"
import ApiService from "../../service/ApiService";

export const Daily = () => {

    const [bool, setBool] = useState(false);
    const endpoint = "daily/";

    // Ajouter Carte par Défault Test :)
    const [card, setCard] = useState([]);
    
    try {
        const userId = JSON.parse(localStorage.getItem('authToken')).user.id;
    } catch (error) {
        alert(error);
    }

    // Appel back a effectuer direct
    api = new ApiService("http://localhost:8080/api/v1/");

    api.get(endpoint+userId)
        .then((response) => {
            setCard(response.content)
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(console.log('done'));
        
    // insérer dynamiquement dans CardCompo




    return (
        <>
            <CardCompo card={card}/>
        </>
    )
}