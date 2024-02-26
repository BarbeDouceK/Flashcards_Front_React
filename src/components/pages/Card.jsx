function Card(cardId) {

    const monService = new ApiService("http://localhost:8080/api/v1/");

    const endpoint = "card";

    const [card, setCard] = useState([]);

    useEffect( () => {
        monService.get(endpoint)
            .then((response) =>{
                setCard(response.content)
            })
            .catch((error) =>{
                alert(error.message)
            })
    });

    return (
    <>
        <h1>TEST TEST TEST</h1>
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
                {cards.map((card) => (
                    <tr key={card.id}>
                        <td>{card.title}</td>
                        <td>{card.categoryName}</td>
                        <td>{card.question}</td>
                        <td>{card.answer}</td>
                        <td>
                            <button
                                onClick={() => { deleteCard(card.id) }}
                                className="btn btn-error m-auto"
                            >Supprimer</button>
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </table>
        <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div class="shrink-0">
                <img class="h-12 w-12" src="/vite.svg" alt="Logo"/>
            </div>
            <div>
                <div class="text-xl font-medium text-black">Question :</div>
                <p class="text-slate-500">Contenu</p>
            </div>
        </div>
    </>
    );
}

export default Card;