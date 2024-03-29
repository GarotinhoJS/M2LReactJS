import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Choisir.css';
import run from '../../style/img/running.png';
import walk from '../../style/img/walking.png';
import dum from '../../style/img/dumbbell.png';

function Choisir() {
  useEffect(() => {
    AOS.init({
      once: false, // Animation s'exécute une seule fois
    });
  }, []);

  return (
    <div className="icon-container">
      <div className="icon-item" data-aos="fade-left" >
        <img src={walk} alt="Icône 1" />
        <p>Faites de chaque séance un pas vers l'excellence</p>
      </div>
      <div className="icon-item" data-aos="fade-left" >
        <img src={run} alt="Icône 2" />
        <p>Relevez vos défis sportifs avec assurance</p>
      </div>
      <div className="icon-item" data-aos="fade-left" >
        <img src={dum} alt="Icône 3" />
        <p>Transformez votre passion en expertise exceptionnelle</p>
      </div>
    </div>
  );
}

export default Choisir;
