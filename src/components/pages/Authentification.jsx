import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";

/* eslint-disable react/no-unescaped-entities */
export const Authentification = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const [isLoginIn, setIsLoginIn] = useState('')

    // Quand on est en train de se connecter, on mettra isLoginIn à true, quand le traitement est fini (quand on aura eu + traîter la rép du back)
    // on le repassera à false

    const handleLogin = async (event) => {
        event.preventDefault();
        const api = new ApiService("http://localhost:8080/auth/")
            api.post('login', {
                email: username,
                password: password
            }).then(response => {
                setIsLoginIn("Connexion réussi !")
                setLoginError("")
                localStorage.setItem('authToken', JSON.stringify(response))
                location.replace("/")
            }).catch(error => {
                localStorage.clear();
                setIsLoginIn("")
                setLoginError("Nom d'utilisateur ou mot de passe incorrect")
            })
        setIsLoginIn(false)
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <form className="p-8 bg-white rounded shadow-md w-96" onSubmit={handleLogin}>
                    <h2 className="mb-6 text-2xl font-bold">Connexion</h2>
                    { loginError && <p className="mb-4 text-red-500">{loginError}</p> }
                    { isLoginIn && <p className="mb-4 text-green-500">{isLoginIn}</p> }
                    <div className="mb-4" >
                        <label htmlFor="username" className="block font-semibold text-gray-700">Nom d'utilisateur</label>

                        <input
                            type="text"
                            id='username'
                            className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-semibold text-gray-700">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 mt-1 text-black border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
                        type="submit"
                        disabled={isLoginIn}
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </>
    );
};
