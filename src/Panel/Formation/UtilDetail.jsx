import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Utilisateur.css"

const UtilDetail = () => {
  const [utilisateur, setUtilisateur] = useState({});
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [ddn, setDdn] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch(`http://localhost:8085/utilisateur/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          setUtilisateur(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = () => {
    fetch(`http://localhost:8085/updatutilisateur/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: nom,
        prenom: prenom,
        email: email,
        ddn: ddn,
        
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec de la mise à jour de l\'utilisateur');
        }
        return res.json();
      })
      .then((data) => {
        console.log('Utilisateur mis à jour avec succès');
        // Ajoutez ici le code pour gérer le succès de la mise à jour
      })
      .catch((err) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
        // Ajoutez ici le code pour gérer les erreurs de la mise à jour
      });
  };

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div className='gi'>
      <h1>{utilisateur.nom}</h1>
      <p>{utilisateur.prenom}</p>
      <p>{utilisateur.ddn}</p>
      <p>{utilisateur.role}</p>
      <p>{utilisateur.confirmation_token}</p>

      {/* Formulaire de mise à jour */}
      <h2>Modifier l'utilisateur</h2>
      <label>Nom:
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
      </label>
      <br />
      <label>Prénom:
        <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
      </label>
      <br />
      <label>email
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>ddn:
        <input type="date" value={ddn} onChange={(e) => setDdn(e.target.value)} />
      </label>
      <br />
      <button onClick={handleUpdate}>Mettre à jour l'utilisateur</button>
    </div>
  );
};

export default UtilDetail;
