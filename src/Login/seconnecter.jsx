
import React, { useState } from 'react';


import axios from 'axios';


import { useNavigate } from 'react-router-dom';


import { useAuth } from '../AuthContexte';


import "./seconnecter.css";


import Navbar from '../Navbar/Navbar';

// Définition du composant principal
function Login() {
  // Utilisation de useState pour gérer l'état de l'email
  const [email, setEmail] = useState('');

  // Utilisation de useState pour gérer l'état du mot de passe
  const [motDePasse, setMotDePasse] = useState('');

  // Utilisation de useState pour gérer l'affichage des messages
  const [message, setMessage] = useState('');

  // Utilisation du hook useAuth pour obtenir la fonction de connexion
  const { login } = useAuth();

  // Utilisation du hook useNavigate pour la navigation programmatique
  const navigate = useNavigate();

  // Fonction pour gérer la connexion lorsque le bouton est cliqué
  const handleConnexion = async () => {
    try {
      // Utilisation de la bibliothèque axios pour envoyer une requête POST au serveur
      const response = await axios.post('http://localhost:3002/connexion', {
        email,
        mot_de_passe: motDePasse,
      });

      // Mise à jour du message avec la réponse du serveur
      setMessage(response.data.message);

      // Si l'utilisateur est connecté avec succès, mise à jour du contexte d'authentification
      if (response.data.utilisateur) {
        login(response.data.utilisateur);
        // Navigation vers la page de profil
        navigate('/profile');
      }
    } catch (error) {
      // Gestion des erreurs
      setMessage('Erreur de connexion');
      console.error(error);
    }
  };

  // Rendu du composant avec le formulaire de connexion et les éléments d'interface utilisateur
  return (
    <div>

      <Navbar> </Navbar>

    
      <body className='we'>
        <div className='Coco'>
          <div className='Coco2'>
            <div className='Corw'>
              <h1>Page de Connexion</h1>
              
            
              <div className='Corw2'>
                <h2>Email:</h2>
                <input className='Ze' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
              </div>
      
              <div className='Corw3'>
                <h2>Mot de passe:</h2>
                <input className='Ze' type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} placeholder='Mot de passe'/>
              </div>
              
              
              <button onClick={handleConnexion}>Se Connecter</button>

           
              <p>{message}</p>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

// Exportation du composant pour une utilisation dans d'autres fichiers
export default Login;
