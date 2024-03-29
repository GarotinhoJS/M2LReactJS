import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import "./Utilisateur.css";
import Header from '../Header';
import SideBar from '../SideBar';
import Accueil from '../Accueil';
import { useAuth } from '../../AuthContexte';
import axios from 'axios';

const Utilisateur = () => {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [utilisateursFiltres, setUtilisateursFiltres] = useState([]);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const utilisateur = useAuth();

  // update utilisateur
  const [updateNom, setUpdateNom] = useState('');
  const [updatePrenom, setUpdatePrenom] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateDatedenaissance, setUpdateDatedenaissance] = useState('');
  const [userToUpdate, setUserToUpdate] = useState(null);
  const { id } = useParams();

  const effectuerRecherche = (texteRecherche) => {
    const utilisateursFiltres = utilisateurs.filter((utilisateur) =>
      utilisateur.nom.toLowerCase().includes(texteRecherche.toLowerCase())
    );
    setUtilisateursFiltres(utilisateursFiltres);
  };

  const handleRechercheChange = (e) => {
    const texteRecherche = e.target.value;
    setRecherche(texteRecherche);
    if (texteRecherche === '') {
      setUtilisateursFiltres(utilisateurs);
    } else {
      effectuerRecherche(texteRecherche);
    }
  };

  const handleupdate = (id) => {
    axios.put(`http://localhost:8085/updatutilisateur/${id}`, {
      nom: updateNom,
      prenom: updatePrenom,
      email: updateEmail,
      ddn: updateDatedenaissance,
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Utilisateur mis à jour avec succès');
        alert('Mise à jour réussie');
        // Réinitialiser l'utilisateur en cours de mise à jour
        setUserToUpdate(null);
        // Fermer la modal
        closeModal2();
      } else {
        console.error('Échec de la mise à jour de l\'utilisateur');
        alert('Échec de la mise à jour');
      }
    })
    .catch(error => {
      console.error('Erreur lors de la requête:', error);
    });
  };

  const openModal2 = (utilisateur) => {
    // Définir l'utilisateur en cours de mise à jour
    setUserToUpdate(utilisateur);
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    // Réinitialiser l'utilisateur en cours de mise à jour
    setUserToUpdate(null);
    setIsModalOpen2(false);
  };

  const handlePop = async (supputilid) => {
    try {
      const response = await fetch(`http://localhost:8085/supputilisateur/${supputilid}`, {
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


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('http://localhost:8085/utilisateur')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Échec de la requête');
          }
          return res.json();
        })
        .then((data) => {
          setUtilisateurs(data);
          setIsLoading(false);
          setUtilisateursFiltres(data);
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
      <h1>Utilisateurs</h1>
      <div class="searchBox">
        <input
          class="searchInput"
          type="text"
          name=""
          placeholder="Search"
          value={recherche}
          onChange={handleRechercheChange}
        />
        <button class="searchButton" href="#">
          <i class="material-icons">search</i>
        </button>
      </div>

      {utilisateursFiltres.length === 0 && <p>Aucun utilisateur trouvé.</p>}

      {utilisateursFiltres.map((utilisateur) => (
        <div className='tout' key={utilisateur.id}>
          <div className="utilisateur-card">
            <div>
              <h2>{utilisateur.nom}</h2>
              <p>{utilisateur.prenom}</p>

              <div>
                <button onClick={() => handlePop(utilisateur.id)}>Supprimer</button>
                <button onClick={() => openModal2(utilisateur)}>Modifier</button>
                <Link to={`/utilisateur/${utilisateur.id}`}>Voir les détails</Link>
              </div>
            </div>
          </div>
          {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModal()}>&times;</span>
            <h1>Voulez-vous vraiment supprimer cet utilisateur</h1>

            <div className="ounon">
              <button  onClick={() => handlePop(utilisateur.id)} className='ouioui'>
                Oui
              </button>
              <button>
                Non
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      ))}

     

      {isModalOpen2 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => closeModal2()}>&times;</span>
            <h1>Modifier l'utilisateur</h1>

            <label>Nom:
              <input type="text" value={updateNom} onChange={(e) => setUpdateNom(e.target.value)} />
            </label>
            <br />
            <label>Prénom:
              <input type="text" value={updatePrenom} onChange={(e) => setUpdatePrenom(e.target.value)} />
            </label>
            <br />
            <label>Email:
              <input type="email" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} />
            </label>
            <br />
            <label>Date de naissance:
              <input type="date" value={updateDatedenaissance} onChange={(e) => setUpdateDatedenaissance(e.target.value)} />
            </label>
            <br />
            <button onClick={() => handleupdate(userToUpdate?.id)}>Modifier l'utilisateur</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Utilisateur;
