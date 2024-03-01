import { useState } from "react";

export const NewDelhi = () => {

    const [goDelhis, setGoDelhis] = useState(false);

    const handleDelhis = () => {
        setGoDelhis(!goDelhis);
    }

    return (
        <>
            <div onClick={handleDelhis} className="p-6 max-w-sm mx-auto bg-info rounded-xl shadow-lg flex items-center space-x-4">
                <div className="shrink-0">
                    <img className="h-12 w-12" src="/vite.svg" alt="Logo" />
                </div>
                <div className="card-container m-5">
                    <div className="font-medium text-black">Pour pouvoir lancer vos Dailys, vous devez ajouter des cartes dans votre Tiroir !</div>
                    <div className="text-slate-500"><button className="btn-info"><a href="/cards">Liste des cartes proposées par l'équipe</a></button></div>
                </div>
            </div>
        </>
    )
}