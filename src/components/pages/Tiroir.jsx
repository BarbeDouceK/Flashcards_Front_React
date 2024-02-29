/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import ReactModal from "react-modal";
import { CardCompo } from "../CardCompo";

function Tiroir() {

    const api = new ApiService("http://localhost:8080/api/v1/")
    const userId = JSON.parse(localStorage.getItem('auth')).user.id;
    const endpoint = "passages/user/" + userId;
    const cardpoint = "cards"

    const [passages, setPassages] = useState([]);
    const [newPassage, setNewPassage] = useState({
        card:{
            id: 0
        },
        userId: userId
    });

    const [pageable, setPage] = useState({
        pageNumber: 0,
        totalPages: 0
    });
    const [pagepoint, setPagePoint] = useState(`?page=${pageable.pageNumber}`);
    const changePage = (index) => {
        setPagePoint(`?page=${index}`)
        setPage({ ...pageable, pageNumber: index });
    }

    const [cards, setCards] = useState([]);
    const [cardPageable, setCardPageable] = useState({
        pageNumber: 0,
        totalPages: 0
    });
    const [cardpagepoint, setCardPagePoint] = useState(`?page=${cardPageable.pageNumber}`);
    const changeCardPage = (index,event) => {
        event.preventDefault();
        setCardPagePoint(`?page=${index}`)
        setCardPageable({ ...cardPageable, pageNumber: index });
        setModalOpen(true)
    }

    const [isModalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        api.get(endpoint + pagepoint)
            .then((response) => {
                setPassages(response.content)
            })
            .catch((error) => {
                alert(error.message)
            })
    }, [pageable]);

    useEffect(() => {
        api.get(cardpoint + cardpagepoint)
            .then((response) => {
                setCards(response.content)
                if (response.totalPages !== cardPageable.totalPages) {
                    setCardPageable({
                        ...cardPageable,
                        totalPages: response.totalPages
                    })
                }
            })
            .catch((error) => {
                alert(error.message)
            })
    }, [cardPageable]);

    useEffect(() => {
        if (newPassage.card.id !== 0) {
            api.post("passages", newPassage)
                .then((data) => {
                    newPassage.card.id = 0; // pour ne pas ajouter la carte en continue
                    changePage(pageable.pageNumber);
                })
                .catch((error) => alert(error.message))
        }

        api.get(endpoint + pagepoint)
            .then((response) => {
                if (response.empty) {
                    window.location.replace("http://localhost:5173/tiroir")
                } else {
                    setPassages(response.content)
                }
                setPage({
                    ...pageable,
                    totalPages: response.totalPages
                })
            })
            .catch((error) => {
                alert(error.message)
            })
    }, [newPassage])

    ReactModal.setAppElement('#root');

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
    }

    const [cardDisplayed, setCardDisplay] = useState();
    const [isOpenDisplayModal, setPrintModalOpen] = useState(false)
    const openDisplayModal = () => {
        setPrintModalOpen(true)
    }
    const closeDisplayModal = () => {
        setPrintModalOpen(false)
    }
    const viewCard = (cardDisplayed) => {
        console.log(cardDisplayed);
        setCardDisplay(cardDisplayed);
        openDisplayModal();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        if(formData.has("cardId")) {
            setNewPassage({
                ...newPassage,
                card: {
                    id: formData.get('cardId')
                }
            })
            closeModal();
        } else {
            console.log("card ID incorrect");
        }
    }

    const deletePassage = (passageId) => {
        api.delete("passages/" + passageId)
            .then(() => {
                console.log(`Passage avec ID ${passageId} supprimé`)
                setNewPassage({ ...newPassage, cardId: "" });
            })
            .catch(error => alert(error.message));
    }

    return (
        <>
            <h1>Les Passages récuperés en passant par mon API :</h1>
            <div className="m-10 w-4/6 m-auto">
                <div className="flex justify-end mb-5">
                    <button className="btn btn-outline btn-inf" onClick={openModal}>Ajouter un Passage</button>
                </div>
                <div className="grid grid-cols-3 gap-10 mb-5">
                    <button className="btn btn-outline btn-inf" disabled={pageable.pageNumber == 0} onClick={() => changePage(pageable.pageNumber - 1)}>T---</button>
                    <div className="center" >{Number(pageable.pageNumber) + 1}</div>
                    <button className="btn btn-outline btn-inf" disabled={pageable.pageNumber == (pageable.totalPages - 1)} onClick={() => changePage(pageable.pageNumber + 1)}>---T</button>
                </div>
                <table className="table table-zebra border">
                    <thead>
                        <tr>
                            <th>Titre de la carte</th>
                            <th>Niveau actuel</th>
                            <th>Dernier daily</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {passages.map((passage) => (
                            <tr key={passage.id}>
                                <td>{passage.card.title}</td>
                                <td>{passage.niveau}</td>
                                <td>{passage.dateUpdate}</td>
                                <td>
                                    <button
                                        onClick={() => {viewCard(passage.card)}}
                                        className="btn btn-outline"
                                    >Afficher</button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => { deletePassage(passage.id) }}
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
                isOpen={isOpenDisplayModal}
                onRequestClose={closeDisplayModal}
                className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
            >
                <div className="gap-4 mb-5">
                    <CardCompo card={cardDisplayed}/>
                </div>
            </ReactModal>

            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
            >
                <p className="font-semibold"> Ajouter une carte à votre tiroir: </p>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 mb-5">
                        <select defaultValue="" className="select w-full max-w-xs" name="cardId">
                            <option disabled value="">Sélectionnez une carte</option>
                            {cards.map(card => (
                                <option key={card.id} value={card.id}>{card.title}</option>
                            ))}
                        </select>
                        <div className="text-center">
                            Page {cardPageable.pageNumber + 1} sur {cardPageable.totalPages}
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                className="btn btn-secondary mr-2"
                                onClick={(e) => changeCardPage(cardPageable.pageNumber - 1,e)}
                                disabled={cardPageable.pageNumber == 0}
                            >
                                Previous
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={(e) => changeCardPage(cardPageable.pageNumber + 1,e)}
                                disabled={cardPageable.pageNumber == (cardPageable.totalPages - 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <div className="m-auto w-fit">
                        <button
                            type='submit'
                            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Ajouter la carte</button>
                    </div>

                </form>

            </ReactModal>


        </>
    )
}

export default Tiroir;