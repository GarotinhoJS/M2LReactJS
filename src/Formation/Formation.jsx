import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContexte';
import { Link } from 'react-router-dom';
import './formation.css';
import Navbar from '../Navbar/Navbar';

const Formation = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [formationFiltre, setFormationFiltre] = useState([]);
  const [nombreFor, setNombreFor] = useState({});
  const [sportSelectionne, setSportSelectionne] = useState('');

  const { utilisateur } = useAuth();

  const effectuerRecherche = (texteRecherche) => {
    const formationFiltre = data.filter((item) =>
      item.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );
    setFormationFiltre(formationFiltre);
  };

  const handleRechercheChange = (e) => {
    const texteRecherche = e.target.value;
    setRecherche(texteRecherche);
    if (texteRecherche === '') {
      setFormationFiltre(data);
    } else {
      effectuerRecherche(texteRecherche);
    }
  };

  const handlePop = async (formationId) => {
    try {
      const response = await fetch('http://localhost:8082/inscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formation: formationId,
          utilisateur: utilisateur.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de la requête d\'inscription');
      }

      console.log('Inscription réussie!');
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://localhost:8082/formations')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setFormationFiltre(data);
        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, []);

  // Afficher le nombre d'information pour chaque formation 
  useEffect(() => {
    // Requêtes API
    fetch('http://localhost:8082/nombreinscriptionform')
      .then(response => response.json())
      .then(data => setNombreFor(data.reduce((acc, cur) => ({ ...acc, [cur.id]: cur.count }), {})));
  }, []);

  const filtrerParSport = (sport) => {
    const formationsFiltrees = data.filter((formation) => formation.sport === sport);
    setFormationFiltre(formationsFiltrees);
    setSportSelectionne(sport);
  };

  return (
    <div className='dodz'>
      <Navbar />
      <div className='flege'>
        <div className='fleche'></div>
        <div className='vosformas'>
          <h2 className='retour'>Acceuil </h2>
          <h2 className='poz'> </h2>
          <h2 className='retour2'>Formations</h2>
          <h1 className='nosForma'>Nos Formations </h1>
        </div>
      </div>
      <div className="search-bar">
        <input className='tot'
          type="text"
          placeholder="Chercher une formation"
          value={recherche}
          onChange={handleRechercheChange}
        />
      </div>
      <div className="sport-buttons">
        <button onClick={() => filtrerParSport('foot')}>Foot</button>
        <button onClick={() => filtrerParSport('basket')}>Basket</button>
        {/* Ajoutez d'autres boutons pour d'autres sports si nécessaire */}
      </div>
      {formationFiltre.length === 0 && <p>Aucune formation trouvée.</p>}
      {formationFiltre.map((item) => (
        <div className='tout' key={item.id}>
          <div className="formation-card">
            <div>
              <h2>{item.nom}</h2>
              <h2>{nombreFor[item.id]}</h2>
              <div>
                <Link to={`/formation/${item.id}`}>Voir les détails</Link>
              </div>
              <div>
                <button onClick={() => handlePop(item.id)}>Inscrire</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Formation;
