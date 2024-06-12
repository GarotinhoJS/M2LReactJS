import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./Formation.css"
import Header from '../Header';
import SideBar from '../SideBar';
import Accueil from '../Accueil';

const Aformation = () => {
  const [formations, setFormations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [formationsFiltrees, setFormationsFiltrees] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [updateNom, setUpdateNom] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [formationToUpdate, setFormationToUpdate] = useState(null);
  const { id } = useParams();

  const effectuerRecherche = (texteRecherche) => {
    const formationsFiltrees = formations.filter((formation) =>
      formation.titre.toLowerCase().includes(texteRecherche.toLowerCase())
    );
    setFormationsFiltrees(formationsFiltrees);
  };

  const handleRechercheChange = (e) => {
    const texteRecherche = e.target.value;
    setRecherche(texteRecherche);
    if (texteRecherche === '') {
      setFormationsFiltrees(formations);
    } else {
      effectuerRecherche(texteRecherche);
    }
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:8085/updateformation/${id}`, {
      nom: updateNom,
      description: updateDescription,
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Formation mise à jour avec succès');
        alert('Mise à jour réussie');
        // Réinitialiser la formation en cours de mise à jour
        setFormationToUpdate(null);
        // Fermer la modal
        closeModal2();
      } else {
        console.error('Échec de la mise à jour de la formation');
        alert('Échec de la mise à jour');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
  };

  const openModal2 = (formation) => {
    // Définir la formation en cours de mise à jour
    setFormationToUpdate(formation);
    setIsModalOpen2(true);
  }; 

  const closeModal2 = () => {
    // Réinitialiser la formation en cours de mise à jour
    setFormationToUpdate(null);
    setIsModalOpen2(false);
  };

  const handlePop = async (formationId) => {
    try {
      const response = await fetch(`http://localhost:8085/deleteformation/${formationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Suppression réussie');
      } else {
        console.error('Échec de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://localhost:8085/formation')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          setFormations(data);
          setIsLoading(false);
          setFormationsFiltrees(data);

        })
        .catch((err) => {
          console.error(err);
          setError(err);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <div className="container">
        <Header OpenSidebar={OpenSidebar} />
        <Accueil />
      </div>
      <h1>Formations</h1>
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          name=""
          placeholder="Search"
          value={recherche}
          onChange={handleRechercheChange}
        />
        <button className="searchButton" href="#">
          <i className="material-icons">search</i>
        </button>
      </div>

      {formationsFiltrees.length === 0 && <p>Aucune formation trouvée.</p>}

      {formationsFiltrees.map((formation) => (
        <div className='tout' key={formation.id}>
          <div className="formation-card">
            <div>
              <h2>{formation.nom}</h2>
              
              <div>
                <button onClick={() => handlePop(formation.id)}>Supprimer</button>
                <button onClick={() => openModal2(formation)}>Modifier</button>
                <Link to={`/formation/${formation.id}`}>Voir les détails</Link>
              </div>
            </div>
          </div>
        </div>
      ))}

     

      {isModalOpen2 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModal2()}>&times;</span>
            <h1>Modifier la formation</h1>

            <label>Titre:
              <input type="text" value={updateNom} onChange={(e) => setUpdateNom(e.target.value)} />
            </label>
            <br />
            <label>Description:
              <input type="text" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
            </label>
            <br />
            <button onClick={() => handleUpdate(formationToUpdate?.id)}>Modifier la formation</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aformation;
