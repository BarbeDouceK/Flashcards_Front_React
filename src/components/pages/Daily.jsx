import { useEffect, useState } from "react";
import { CardCompo } from "../CardCompo"
import ApiService from "../../service/ApiService";

export const Daily = () => {

    const [bool, setBool] = useState(false);
    const endpoint = "daily/";
    let userId = '';

    // Ajouter Carte par Défault Test :)
    const [card, setCard] = useState([]);

    try {
        userId = JSON.parse(localStorage.getItem('auth')).user.id;
    } catch (error) {
        window.location.replace("http://localhost:5173/");
        alert(error);
    }

    // Appel back a effectuer direct
    const api = new ApiService("http://localhost:8080/api/v1/passages");

    useEffect(() => {

        api.get(endpoint + userId)
            .then((response) => {
                console.log(response);
                setCard(response.card);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(console.log('done'));
    }, [])

    const handleRAZ = () => {

    };
    const handleLevelUp = () => {

    };

    return (
        <>
            <CardCompo card={card} />
            <div>
                <button onClick={handleRAZ} className="btn btn-outline btn-error">Next time</button>
                <button onClick={handleLevelUp} className="btn btn-outline btn-success">Level-up</button>
            </div>
        </>
    )
}