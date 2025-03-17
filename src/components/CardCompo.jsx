import { useState } from "react";

export const CardCompo = ({ card }) => {

    const [answerDisplay, setAnswerDisplay] = useState(false);

    const handleSwap = () => {
        setAnswerDisplay(!answerDisplay);
    }

    return (
        <div onClick={handleSwap} className="p-6 max-w-sm mx-auto bg-info rounded-xl shadow-lg flex items-center space-x-4">
            <div className="shrink-0">
                <img className="h-12 w-12" src="/vite.svg" alt="Logo"/>
            </div>
            <div className="card-container m-5">
                {answerDisplay && <div className="text-slate-500">Réponse: {card.answer}</div>}
                {!answerDisplay && <>
                    <div>Titre: {card.title}</div>
                    <div>Catégorie: {card.category}</div>
                    <div className="text-xl font-medium text-black">Question: {card.question}</div>
                </>}
            </div>
        </div>
    );
}

