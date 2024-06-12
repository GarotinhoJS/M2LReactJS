import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContexte'; // Importer le contexte d'authentification
import "./formdet.css"
const FormationDetail = () => {
  const { id } = useParams();
  const { utilisateur } = useAuth(); // Récupérer l'utilisateur connecté depuis le contexte d'authentification
  const [formation, setFormation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listefor, setListeFor] = useState({});
  const [avis, setAvis] = useState([]);
  const [avisError, setAvisError] = useState(null);

  // Nouveaux états pour le formulaire d'avis
  const [nouvelAvis, setNouvelAvis] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8082/formation/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec de la requête pour récupérer les détails de la formation');
        }
        return res.json();
      })
      .then((data) => {
        setFormation(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8082/formationavis/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec de la requête pour récupérer les avis');
        }
        return res.json();
      })
      .then((data) => {
        setAvis(data.avis);
        setAvisError(null);
      })
      .catch((err) => {
        console.error(err);
        setAvisError(err);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8082/listeform/${id}`)
      .then(response => response.json())
      .then(data => setListeFor(data[0]))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [id]);

  const handleAvisSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8082/avis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        utilisateur_id: utilisateur.id, // Utiliser l'ID de l'utilisateur connecté
        formation_id: id,
        avis: nouvelAvis,
        note: note,
      }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Erreur lors de l\'ajout de l\'avis');
      }
      return res.json();
    })
    .then((data) => {
      setMessage(data.message);
      setAvis((prevAvis) => [...prevAvis, { utilisateur_nom: utilisateur.nom, avis: nouvelAvis, note }]);
      setNouvelAvis('');
      setNote('');
    })
    .catch((err) => {
      console.error(err);
      setMessage('Erreur lors de l\'ajout de l\'avis');
    });
  };

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div className="full-page-container">
      <div className="content">
        <div className="sportif">
        <h1>{formation.nom}</h1>
        <p>Sport: {formation.sport}</p>
        <p>Description: {formation.description}</p>
        <p>
          Commence le {formation.date_debut}
        </p>

        <p>
          Fini  {formation.date_fin}
        </p>
        <p className="utilisateurs-inscrits">Liste des utilisateurs inscrits: {listefor.liste_utilisateurs}</p>
        </div>
        <h2>Avis des utilisateurs</h2>
        {avisError ? (
          <p>Erreur lors du chargement des avis : {avisError.message}</p>
        ) : avis.length === 0 ? (
          <p>Aucun avis pour cette formation.</p>
        ) : (
          <ul>
            {avis.map((a, index) => (
              <li key={index}>
                <div className="avis">
                  <p><strong>{a.utilisateur_nom}</strong> : {a.avis}</p>
                  <p className="note">Note : {a.note}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
  
        <h2>Ajouter un avis</h2>
        <form onSubmit={handleAvisSubmit} className="form-container">
          <div>
            <label htmlFor="avis">Votre avis :</label>
            <textarea
              id="avis"
              value={nouvelAvis}
              onChange={(e) => setNouvelAvis(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="note">Note :</label>
            <input
              id="note"
              type="number"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
              min="1"
              max="5"
            />
          </div>
          <button type="submit">Soumettre</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
  
};

export default FormationDetail;
