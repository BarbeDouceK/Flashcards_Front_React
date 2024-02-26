function Card () {

    const cards = [];

    <>
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
                        { cards.map((card) => (
                            <tr key={card.id}>
                                <td>{card.title}</td>
                                <td>{card.categoryName}</td>
                                <td>{card.question}</td>
                                <td>{card.answer}</td>
                                <td>
                                    <button
                                        onClick={() => {deleteCard(card.id)}}
                                        className="btn btn-error m-auto"
                                    >Supprimer</button>
                                </td>
                            </tr>
                        )                        
                        )}
                    </tbody>
                </table>
    </>
}

export default Card;