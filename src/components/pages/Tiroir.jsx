/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import ReactModal from "react-modal";

function Tiroir() {

    const api = new ApiService("http://localhost:8080/api/v1/")
    const endpoint = "passages/user/"+JSON.parse(localStorage.getItem('authToken')).user.id;
    const cardpoint = "cards"

    const [passages, setPassages] = useState([]);
    const [newPassage, setNewPassage] = useState({
        cardId:"",
        userId:""
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
        if (newPassage.cardId !== "") {
            api.post(endpoint, newPassage)
                .then((data) => {
                    console.log(data);
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

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        setNewPassage({
            userId: formData.get('user'),
            cardId: formData.get('card')
        })
        closeModal();
    }

    const deletePassage = (passageId) => {
        api.delete("passages/"+passageId)
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
                            <th>cardTitle</th>
                            <th>niveau</th>
                            <th>dateUpdate</th>
                            <th>userId</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {passages.map((passage,index) => (
                            <tr key={passage.id}>
                                <td>{passage.card.title}</td>
                                <td>{passage.niveau}</td>
                                <td>{passage.dateUpdate}</td>
                                <td>{passage.userId}</td>
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
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="w-fit h-fit border p-10 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50"
            >
                <p className="font-semibold"> Ajouter votre passage ?: </p>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                        <input
                            placeholder="Id de la carte"
                            className="flex input input-bordered"
                            type="text"
                            name="cardId"
                        />
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