import React, { useEffect, useState } from 'react';


const ConfirmationPage = () => {
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    // Récupérer le token de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Vérifier si le token est présent dans l'URL
    if (token) {
      // Envoyer une requête à votre backend pour confirmer l'email
      fetch(`http://localhost:3003/confirmation?token=${token}`)
        .then(response => {
          // Vérification de la réponse du serveur
          if (response.ok) {
            return response.text(); // Renvoie le message de confirmation du serveur
          } else {
            throw new Error('Échec de la confirmation de l\'email');
          }
        })
        .then(data => {
          // Mettre à jour le message de confirmation si la requête est réussie
          setConfirmationMessage(data);
        })
        .catch(error => {
          // Gérer les erreurs de requête
          console.error('Erreur lors de la confirmation de l\'email :', error);
          setConfirmationMessage('Une erreur s\'est produite lors de la confirmation de votre email.');
        });
    } else {
      setConfirmationMessage('Token de confirmation manquant');
    }
  }, []);

  return (
    <div className="confirmation-container">
      <h1>Confirmation d'email</h1>
      <p>{confirmationMessage}</p>
    </div>
  );
};

export default ConfirmationPage;
