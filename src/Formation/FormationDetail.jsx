import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FormationDetail = () => {
  const [formation, setFormation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [listefor, setListeFor] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Requêtes API
    fetch(`http://localhost:8081/formation/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Échec de la requête');
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
    // Requêtes API
    fetch(`http://localhost:8081/listeform/${id}`) // nombre utilisateur
      .then(response => response.json())
      .then(data => setListeFor(data[0]));
  }, []);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div>
      <h1>{formation.nom}</h1>
      <p>Date: {formation.sport}</p>
      <p>Description: {formation.description}</p>
      <p>Liste des utilisateurs inscrits: {listefor.liste_utilisateurs}</p>
    </div>
  );
};

export default FormationDetail;
