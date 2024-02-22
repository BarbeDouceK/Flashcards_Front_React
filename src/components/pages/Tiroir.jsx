/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import ReactModal from "react-modal";

function Tiroir() {

    const api = new ApiService("http://localhost:8080/api/v1/")
    const endpoint = "passages/user/";

    const [passages, setPassages] = useState([]);
    const [pageable, setPage] = useState({
        pageNumber: 0,
        totalPages: 0
    });

    const [pagepoint, setPagePoint] = useState(`?page=${pageable.pageNumber}`);

    const changePage = (index = -1) => {
        if (index !== -1) {
            setPagePoint(`?page=${index}`)
            setPage({ ...pageable, pageNumber: index });
        }
    }

    const [isModalOpen, setModalOpen] = useState(false)

    const [newPassage, setNewPassage] = useState({
        categoryName: "",
        title: "",
        question: "",
        answer: "",
        niveau: "",
        dateUpdate: ""
    });

    const [load, setLoad] = useState(true);

    useEffect(() => {
        api.get(endpoint + pagepoint)
            .then((response) => {
                setPassages(response.content)
                if (load) {
                    setPage({
                        pageNumber: response.pageable.pageNumber,
                        totalPages: response.totalPages
                    })
                    setLoad(false);
                }
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => console.log('Get terminé'))
    }, [pageable]);

    useEffect(() => {
        if (newPassage.title !== "") {
            api.post(endpoint, newCard)
                .then((data) => {
                    setNewPassage((prevPassages) => [...prevPassages, data]);
                })
                .catch((error) => alert(error.message))
                .finally(() => console.log('Post terminé'))
        }
    }, [newPassage])

    console.log(pageable);

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

        setNewPassage({
            cardId: formData.get('cardId'),
            niveau: formData.get('title'),
            dateUpdate: "",
            userId: ""
        })
        closeModal();
    }

    const deleteCard = (PassageId) => {
        api.delete(endpoint + "/" + PassageId)
            .then(() => {
                console.log(`Passage avec ID ${PassageId} supprimé`)
                setPassages((prevPassage) =>
                    prevPassage.filter((Passage) => Passage.id !== PassageId)
                );
            })
            .catch(error => alert(error.message));
    }

    return (
        <>
            <h1>Les Passages récuperés en passant par mon API :</h1>
            <div className="m-10 w-4/6 m-auto">
                <div className="flex justify-end mb-5">
                    <button className="btn btn-outline btn-inf" onClick={openModal}>Ajouter un Passage ? mdr non</button>
                </div>
                <div className="grid grid-cols-3 gap-10 mb-5">
                    <button className="btn btn-outline btn-inf" disabled={pageable.pageNumber == 0} onClick={() => changePage(pageable.pageNumber - 1)}>T---</button>
                    <div className="center" >{Number(pageable.pageNumber) + 1}</div>
                    <button className="btn btn-outline btn-inf" disabled={pageable.pageNumber == (pageable.totalPages - 1)} onClick={() => changePage(pageable.pageNumber + 1)}>---T</button>
                </div>
                <table className="table table-zebra border">
                    <thead>
                        <tr>
                            <th>cardId</th>
                            <th>niveau</th>
                            <th>dateUpdate</th>
                            <th>userId</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {passages.map((passage) => (
                            <tr key={passage.id}>
                                <td>{passage.cardId}</td>
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