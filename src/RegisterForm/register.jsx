
import React, { useState } from 'react';


import "./register.css";


import Navbar from '../Navbar/Navbar';

// Définition du composant principal
const RegisterForm = () => {
  // Utilisation de useState pour créer des états pour les champs du formulaire
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [datedenaissance, setDatedenaissance] = useState(''); // Assurez-vous de définir cette variable correctement

  // Fonction pour gérer l'enregistrement lorsque le bouton est cliqué
  const handleRegister = () => {
    // Utilisation de l'API Fetch pour envoyer une requête POST au serveur
    fetch('http://localhost:3003/register', { // API 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        ddn: datedenaissance,
      }),
    })
      .then(response => {
        // Vérification de la réponse du serveur
        if (response.ok) {
          console.log('Enregistrement réussi');
          alert('Enregistrement réussi');
        } else {
          console.error('Échec de l\'enregistrement');
          alert('Échec de l\'enregistrement');
        }
      })
      .catch(error => {
        // Gestion des erreurs lors de la requête
        console.error('Erreur lors de la requête:', error);
      });
  };

  // Rendu du composant avec le formulaire et les éléments d'interface utilisateur
  return (
    <div> 
      
      <Navbar></Navbar>

   
      <div className='Boco'>
        <div className='Boco2'>
          <div className='Borw'>
            <h1>Register</h1>

  
            <div className='Borw2'>
              <h2>Nom:</h2>
              <input className='Te' type="texte" value={nom} onChange={(e) => setNom(e.target.value)} />
            </div>

        
            <br />
            <div className='Borw3'>
              <h2>Prenom:</h2>
              <input className='Te' type="texte" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </div>

         
            <br />
            <div className='Borw4'>
              <h2>Email:</h2>
              <input className='Te' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

     
            <br />
            <div className='Borw5'>
              <h2>Password:</h2>
              <input className='Te' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

          
            <br />
            <div className='Borw6'>
              <h2>Date de Naissance:</h2>
              <input className='Te' type="date" value={datedenaissance} onChange={(e) => setDatedenaissance(e.target.value)} />
            </div>

           
            <br />
            <button onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default RegisterForm;
