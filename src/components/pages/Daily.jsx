import { useEffect, useState } from "react";
import { CardCompo } from "../CardCompo"
import ApiService from "../../service/ApiService";
import { NewDelhi } from "./NewDelhi";

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
        // Ajouter logout
        window.location.replace("http://localhost:5173/");
        alert(error);
    }

    const api = new ApiService("http://localhost:8080/api/v1/passages");

    useEffect(() => {

        // Méthode flechée qui met à jour la carte affichée
        api.get(endpoint + userId)
            .then((response) => {
                console.log('Réponse de mon GET : ');
                console.log(response);
                setPassage(response);
                setCard(response.card);
                // TODO Clean ça
            })
            .catch((error) => {
                console.log(error);
                setBool(true);
            })
            .finally(console.log(`Always plays log api GET dans Daily `));
    }, [])

    const handleLevel = (answered) => {
        console.log("handleLEVEL");

        const endpoiiiint = endpoint2 + passage.id + (answered ? '?success=true' : '');

        api.put(endpoiiiint)
            .then((response) => {
                console.log(`La mise à jour du niveau a eu lieu` + response);
            })
            .catch((error) => {
                console.log(`Erreur handleLevel : ` + error);
            })
    };

    return (
        <>
            {!bool && <>            <CardCompo card={card} />
                <div>
                    <button onClick={() => {handleLevel();window.location.replace('http://localhost:5173/daily') }} className="btn btn-outline btn-error">Next time</button>
                    <button onClick={() => {
                            handleLevel(true)
                            window.location.replace('http://localhost:5173/daily')
                            }                           
                            }className="btn btn-outline btn-success">Level-up</button>
                </div></>}
            {bool && <>
                <NewDelhi/>
            </>}
        </>
    )
}