/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import ReactModal from "react-modal";

function Cards () {

    const monService = new ApiService("http://localhost:8080/api/v1/")
    const endpoint = "cards";
    

    const [cards, setCards] = useState([]);
    const [pageable, setPage] = useState({
        pageNumber:0,
        totalPages:0
    });

    const [pagepoint,setPagePoint] = useState(`?page=${pageable.pageNumber}`);

    const changePage = (index) => {
        setPagePoint(`?page=${index}`)
        setPage({...pageable,pageNumber:index});
    }

    const [isModalOpen, setModalOpen] = useState(false)

    const [newCard, setNewCard] = useState({
        categoryName: "",
        title: "",
        question: "",
        answer: ""
    });

    useEffect( () => {
        monService.get(endpoint+pagepoint)
            .then((response) =>{
                setCards(response.content)
            })
            .catch((error) =>{
                alert(error.message)
            })
    },[pageable]);

    useEffect( () => {
        if(newCard.title !== ""){
            monService.post(endpoint, newCard)
            .then( (data) => {
                console.log(data);
                changePage(pageable.pageNumber);
            })
            .catch((error) => alert(error.message))
        } 

        monService.get(endpoint+pagepoint)
            .then((response) =>{
                if (response.empty) {
                    window.location.replace("http://localhost:5173/cards")
                } else {
                    setCards(response.content)
                }
                setPage({
                    ...pageable,
                    totalPages:response.totalPages
                })
            })
            .catch((error) =>{
                alert(error.message)
            })
    }, [newCard])

    // Config. React-modal

    // indispensable pour configurer mon pop-up. 
    // Sera généralement exactement la mm ligne (sans rien modifier) sur tous les projets React
    // 'root' est l'id de la div sur laquelle on se 'branchera' ___ ce sera 'root' sauf si modifier après création du projet / Voir le index.html
    ReactModal.setAppElement('#root');

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleSubmit = (e) => {
        // A mettre si je veux éviter que le composant se recharge
        e.preventDefault()

        const formData = new FormData(e.target)

        setNewCard({
            categoryName: formData.get('categoryName'),
            title: formData.get('title'),
            question: formData.get('question'),
            answer: formData.get('answer')
        })
        closeModal();
    }

    const deleteCard = (cardId) => {
        monService.delete(endpoint+"/"+cardId)
            .then(() => {
                console.log(`Produit avec ID ${cardId} supprimé`)
                setNewCard({...newCard,title:""});
            })
            .catch(error => alert(error.message));
    }

    return(
        <>
            <h1>Les cartes récupérés en passant par mon service: </h1>
            <div className="m-10 w-4/6 m-auto">
                <div className="flex justify-end mb-5">
                    <button className="btn btn-outline btn-inf" onClick={openModal}>Ajouter une nouvelle carte</button>
                </div>
                <div className="grid grid-cols-3 gap-10 mb-5">
                    <button className="btn btn-outline btn-inf" disabled={pageable.pageNumber==0} onClick={() => changePage(pageable.pageNumber-1)}>T---</button>
                    <div className="center" >{pageable.pageNumber+1}</div>
                    <button className="btn btn-outline btn-inf" disabled={pageable.pageNumber==(pageable.totalPages-1)} onClick={() => changePage(pageable.pageNumber+1)}>---T</button>
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
            </div>
            
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
            >
            <p className="font-semibold"> Ajouter votre carte: </p>

               <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-4 mb-5">
                    <input 
                        placeholder="Titre de la carte: "
                        className="flex input input-bordered"
                        type="text" 
                        name="title"
                    />
                    <input 
                        placeholder="Question"
                        className="flex input input-bordered"
                        type="text" 
                        name="question"
                    />
                    <input 
                        placeholder="Réponse"
                        className="flex input input-bordered"
                        type="text" 
                        name="answer"
                    />
                    <select className="flex input input-bordered" name="categoryName">
                        <option value="">Sélectionnez une catégorie</option>
                        <option value="TEST">Test</option>
                        <option value="JAVA">Java</option>
                        <option value="HTML">HTML</option>
                        <option value="MAVEN">Maven</option>
                    </select>
                </div>
                <div className="m-auto w-fit">
                    <button
                        type = 'submit'
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"  
                    >Ajouter la carte</button>
                </div>

               </form>

            </ReactModal>


        </>
    )
}

export default Cards;