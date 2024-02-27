import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useParams } from "react-router-dom";

function Card() {

    const api = new ApiService("http://localhost:8080/api/v1/cards");
    let {id} = useParams();
    const endpoint = id;

    const [card, setCard] = useState([]);

    useEffect( () => {
        api.get(endpoint)
            .then((response) =>{
                console.log(response);
                setCard(response)
            })
            .catch((error) =>{
                alert(error.message)
            })
    },[]);

    return (
    <>

        <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div class="shrink-0">
                <img class="h-12 w-12" src="/vite.svg" alt="Logo"/>
            </div>
            <div>
                <div class="text-xl font-medium text-black">{card.question}</div>
                <p class="text-slate-500">{card.answer}</p>
            </div>
        </div>

        <table className="table table-zebra border">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Question</th>
                    <th>Réponse</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                    <tr key={card.id}>
                        <td>{card.title}</td>
                        <td>{card.categoryName}</td>
                        <td>{card.question}</td>
                        <td>{card.answer}</td>
                    </tr>
            </tbody>
        </table>
    </>
    );
}

export default Card;