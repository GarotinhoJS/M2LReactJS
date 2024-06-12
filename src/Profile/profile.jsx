import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContexte';
import './profile.css';
import Navbar from '../Navbar/Navbar';

const Profile = () => {
  const { utilisateur, logout } = useAuth();
  const [inscriptions, setInscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (utilisateur) {
      fetch(`http://localhost:8082/inscriptions/${utilisateur.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          setInscriptions(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, [utilisateur]);

  const handleLogout = () => {
    logout();
    alert("Vous êtes déconnecté.");
  };

  const handleDownloadCertificate = (inscriptionId) => {
    fetch(`http://localhost:8082/certificat/${inscriptionId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec du téléchargement du certificat');
        }
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'certificate.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.error(err);
        alert('Erreur lors du téléchargement du certificat');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <h2>Profil Utilisateur</h2>
        {utilisateur && (
          <>
            <p><span>Email</span>: {utilisateur.email}</p>
            <p><span>Nom</span>: {utilisateur.nom}</p>
            <p><span>Prénom</span>: {utilisateur.prenom}</p>
            <p><span>Date de Naissance</span>: {utilisateur.ddn}</p>
            <p><span>Mot de passe</span>: {utilisateur.mdp}</p>
            
            <h3>Mes Inscriptions:</h3>
            {isLoading ? (
              <p>Chargement...</p>
            ) : error ? (
              <p>Erreur: {error.message}</p>
            ) : (
              <ul>
                {inscriptions.map((inscription) => (
                  <li key={inscription.id}>
                    Formation: {inscription.formation} | Date d'inscription: {inscription.date ? new Date(inscription.date).toLocaleDateString() : 'Date invalide'}
                    <button onClick={() => handleDownloadCertificate(inscription.id)}>Télécharger le certificat</button>
                  </li>
                ))}
              </ul>
            )}
            <button onClick={handleLogout}>Déconnexion</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
