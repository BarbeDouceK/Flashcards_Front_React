import { useEffect, useState } from "react";
import { CardCompo } from "../CardCompo"
import ApiService from "../../service/ApiService";
import { useParams } from "react-router-dom";

export const Daily = () => {

    const [bool, setBool] = useState(false);
    const endpoint = "daily/";
    const endpoint2 = "level/";
    let userId = '';

    // Ajouter Carte par Défault Test :)
    const [card, setCard] = useState([]);
    const [passage, setPassage] = useState([]);

    try {
        userId = JSON.parse(localStorage.getItem('auth')).user.id;
    } catch (error) {
        window.location.replace("http://localhost:5173/");
        alert(error);
    }

    // Appel back a effectuer direct
    const api = new ApiService("http://localhost:8080/api/v1/passages");

    useEffect(() => {
        // Méthode flechée qui met à jour la carte affichée

        api.get(endpoint + userId)
            .then((response) => {
                console.log('Réponse de mon GET : ');
                console.log(response);
                setPassage(response);
                setCard(response.card);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(console.log('GET done'));
    }, [])

    const handleLevel = (answered) => {
        console.log("handleLEVEL");

        const endpoiiiint = endpoint2 + passage.id + (answered ? '?success=true' : '');

        api.put(endpoiiiint)
            .then((response) => {
                console.log(`Le Level a eu lieu` + response);
            })
            .catch((error) => {
                console.log(`Erreur handleLevel : ` + error);
            })
    };

    return (
        <>
            <CardCompo card={card} />
            <div>
                <button onClick={() => handleLevel()} className="btn btn-outline btn-error">Next time</button>
                <button onClick={() => handleLevel(true)} className="btn btn-outline btn-success">Level-up</button>
            </div>
        </>
    )
}