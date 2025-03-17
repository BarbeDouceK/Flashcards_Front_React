import { useEffect, useState } from "react";
import { CardCompo } from "../CardCompo"
import ApiService from "../../service/ApiService";
import { NoDaily } from "./NoDaily.jsx";

export const Daily = () => {

    const [bool, setBool] = useState(false);
    const endpointDaily = "daily/";
    const endpointLevel = "level/";
    let userId = '';

    // Ajouter Carte par Défault Test :)
    const [card, setCard] = useState([]);
    const [passage, setPassage] = useState([]);

    try {
        userId = JSON.parse(localStorage.getItem('auth')).user.id;
    } catch (error) {
        // Ajouter logout
        window.location.replace("http://localhost:5173/");
        alert(error);
    }

    const api = new ApiService("http://localhost:8080/api/v1/passages");

    useEffect(() => {
        api.get(endpointDaily + userId)
            .then((response) => {
                setPassage(response);
                setCard(response.card);
            })
            .catch((error) => {
                console.log(error);
                setBool(true);
            });
    }, [])

    const handleLevel = (answered) => {
        const endpoint = endpointLevel + passage.id + (answered ? '?success=true' : '');
        console.log(endpoint)
        api.put(endpoint)
            .then((response) => {
                console.log(`La mise à jour du niveau a eu lieu` + response);
                window.location.replace('http://localhost:5173/daily')
            })
            .catch((error) => {
                console.log(`Erreur handleLevel : ` + error);
            })
    };

    return (
        <>
            { !bool && <>
                <CardCompo card={card} />
                <div>
                    <button onClick={() => { handleLevel(false) }} className="btn btn-outline btn-error">Next time</button>
                    <button onClick={() => { handleLevel(true) }}className="btn btn-outline btn-success">Level-up</button>
                </div>
            </>
            }
            { bool && <NoDaily/> }
        </>
    )
}