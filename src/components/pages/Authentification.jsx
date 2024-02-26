import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";

/* eslint-disable react/no-unescaped-entities */
export const Authentification = () => {
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Quand on est en train de se connecter, on mettra isLoginIn à true, quand le traitement est fini (quand on aura eu + traîter la rép du back)
    // on le repassera à false
    const [isLoginIn, setIsLoginIn] = useState(false)
    const [loginError, setLoginError] = useState('')

    const handleLogin = async () => {
        setIsLoginIn(true);
        try{
            // Ici, ajoutez le véritable appel d'API pour s'authentifier
            // (en attendant, on va juste simuler avec un setTimeout)
            const api = new ApiService("http://localhost:8080/auth/")
            api.post('login',{
                email: username,
                password: password
            }).then(response => {
                console.log(response);
                localStorage.setItem('authToken', JSON.stringify(response))
                console.log(localStorage.getItem('authToken'))
            }).catch(error => {
                console.log(error);
            })

            /* await new Promise(resolve => setTimeout(resolve, 1000)) */

            // A la place de 'notreToken', sauvegarder le Token reçu en réponse a notre requete POST
            /* const authToken = 'notreToken'

            // localStorage -> clé/value
            localStorage.setItem('authToken', authToken)
            
            // Si je veux récupérer mon token je dois faire 'localStorage.getItem(Ma_clé)':
            console.log(localStorage.getItem('authToken')) */

            // Je simule une erreur
            /* throw new Error ("Erreur d'authentification") */
        }
        catch (error){
            console.log("here error",error);
            setLoginError("Nom d'utilisateur ou mot de passe incorrect")
        } 
        finally {
            setIsLoginIn(false)
        }
    }

    useEffect( () => {
        // Logique à exécuter après la tentative de connexion
        if(!isLoginIn && !loginError){
            console.log('Authentification réussi')

            // Ce que fait quand on a réussi à se connecter

        }
    }, [isLoginIn, loginError])

    return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-8 bg-white rounded shadow-md w-96">
          <h2 className="mb-6 text-2xl font-bold">Connexion</h2>
            { loginError && <p className="mb-4 text-red-500">{loginError}</p> }

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
                onChange={ (e) => setPassword(e.target.value) }
            />
          </div>
          <button 
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isLoginIn && 'opacity-50 cursor-not-allowed'}`}
            
            
            onClick={handleLogin}
            disabled={isLoginIn}
            >
                Se connecter  
          </button>
        </div>
      </div>
    </>
  );
};
