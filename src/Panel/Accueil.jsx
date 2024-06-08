import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import "./Style/Admin.css"
function Accueil() {
  const [userData, setUserData] = useState({});
  const [formationData, setFormationData] = useState({});
  const [inscriptionData, setInscriptionData] = useState({});
  const [utilinscritData, setUtilinscritData] = useState({});

  useEffect(() => {
    // Requêtes API
    fetch('http://194.164.63.21:8085/nombreutilisateur')// nombre utilisateur
      .then(response => response.json())
      .then(data => setUserData(data[0]));

    fetch('http://194.164.63.21:8085/nombreformation') // nombre formation
      .then(response => response.json())
      .then(data => setFormationData(data[0]));

    fetch('http://194.164.63.21:8085/nombreinscription')// nombre inscription
      .then(response => response.json())
      .then(data => setInscriptionData(data[0]));

    fetch('http://194.164.63.21:8085/utilinscrit') // nombre utilisateur inscris
      .then(response => response.json())
      .then(data => setUtilinscritData(data[0]));
  }, []);

  const chartData = [
    {
      name: 'Utilisateurs',
      utilisateur: userData.count || 0,
      formation: formationData.count || 0,
      inscription: inscriptionData.count || 0,
    }
  ];

 

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Utilisateur</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{userData.count}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Formation</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{formationData.count}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Inscriptions</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{inscriptionData.count}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Ut. inscrit</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>{utilinscritData.nombre_inscrits}</h1>
        </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
  height={300}
  data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="utilisateur" fill="#8884d8" />
            <Bar dataKey="formation" fill="#8a9d" />
          </BarChart>
        </ResponsiveContainer>

       
      </div>
    </main>
  );
}

export default Accueil;
