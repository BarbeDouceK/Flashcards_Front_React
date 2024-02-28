import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useParams } from "react-router-dom";
import { CardCompo } from "./CardCompo";

function Card({ carte }) {

    const api = new ApiService("http://localhost:8080/api/v1/cards");
    let { id } = useParams();
    const endpoint = id;
    const [card, setCard] = useState([]);

    useEffect(() => {
        if (carte) {
            setCard(carte);
        } else {
            api.get(endpoint)
                .then((response) => {
                    console.log(response);
                    setCard(response)
                })
                .catch((error) => {
                    alert(error.message)
                })
        }
    },[])


    return (
        <>
            <CardCompo card={card} />
        </>
    );
}

export default Card;