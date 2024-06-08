import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContexte';
import './profile.css';
import Navbar from '../Navbar/Navbar';

// Définition du composant principal
const Profile = () => {
  // Utilisation du hook useAuth pour obtenir les informations sur l'utilisateur connecté
  const { utilisateur, logout } = useAuth(); // Ajout de la fonction logout

  // Utilisation de useState pour gérer les inscriptions de l'utilisateur
  const [inscriptions, setInscriptions] = useState([]);

  // Utilisation de useState pour gérer l'état de chargement
  const [isLoading, setIsLoading] = useState(true);

  // Utilisation de useState pour gérer les erreurs
  const [error, setError] = useState(null);

  // Utilisation du hook useEffect pour effectuer des actions après le rendu initial
  useEffect(() => {
    // Vérification de l'existence de la fenêtre (évite les erreurs lors du rendu côté serveur)
    if (typeof window !== 'undefined' && utilisateur) {
      // Utilisation de l'ID de l'utilisateur pour récupérer les inscriptions depuis le serveur
      fetch(`http://194.164.63.21:8081/inscriptions/${utilisateur.id}`)
        .then((res) => {
          // Vérification de la réponse du serveur
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          // Mise à jour de l'état avec les inscriptions récupérées et changement de l'état de chargement
          setInscriptions(data);
          setIsLoading(false);
        })
        .catch((err) => {
          // Gestion des erreurs lors de la récupération des inscriptions
          console.error(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, [utilisateur]); // La dépendance assure que cet effet est exécuté chaque fois que l'utilisateur change

  // Fonction de déconnexion
  const handleLogout = () => {
    logout(); // Utilisation de la fonction logout fournie par useAuth
    // Affichage de la notification
    alert("Vous êtes déconnecté.");
  };

  return (
<div> 
    <Navbar> </Navbar>

    <div className="profile-container">
      <h2>Profil Utilisateur</h2>
      {utilisateur && (
        <>
          <p><span>Email</span>: {utilisateur.email}</p>
          <div> </div>
          <p><span>Nom</span>:{utilisateur.nom}</p>
          <p><span>Prénom</span>:{utilisateur.prenom}</p>
          <p><span>Date de Naissance</span>:{utilisateur.ddn}</p>
          <p><span>Mot de passe</span>:{utilisateur.mdp}</p>
          
          <h3>Inscriptions:</h3>
          <ul>
            {inscriptions.map((inscription) => (
              <li key={inscription.id}>
                Formation: {inscription.formation} | Date d'inscription: {inscription.date}
              </li>
              
            ))}
          </ul>
          <button onClick={handleLogout}>Déconnexion</button> {/* Bouton pour déclencher la déconnexion */}
        </>
      )}
    </div>
    </div>
  );
};

export default Profile;
