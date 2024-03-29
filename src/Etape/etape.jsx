import React, { useEffect } from 'react';
import "./etape.css";
import AOS from "aos";
import "aos/dist/aos.css";

function Etape() {
  useEffect(() => {
    AOS.init({
      once: false, // Animation s'exécute une seule fois
      
    });
  }, []);

  return (
    <div className="etape">
      
    <div  data-aos="fade-left">
      <h1 className='titre'>Comment s'inscrire</h1>
      </div>
      <div
      data-aos="fade-down" 
      >
      <ol>
     
        <li>
            
          <div className="icon"><i className="fa-solid fa-user"
          
          ></i></div>
          <div className="title">Etape 1</div>
          <div className="descr">Se connecter.</div>
        </li>
        

        <li>
          <div className="icon"><i className="fa-solid fa-table"></i></div>
          <div className="title">Etape 2</div>
          <div className="descr">Aller sur la page de formation.</div>
        </li>
        
      </ol>
      </div>
      <div
      data-aos="fade-right" 
      >
      <ol>
        <li>
          <div className="icon"><i className="fa-solid fa-spell-check"></i></div>
          <div className="title">Etape 3</div>
          <div className="descr">Choisir la formation.</div>
        </li>

        <li>
          <div className="icon"><i className="fa-solid fa-rectangle-list"></i></div>
          <div className="title">Etape 4</div>
          <div className="descr">S'inscrire à la formation.</div>
        </li>
      </ol>
      </div>
      </div>
  );
}

export default Etape;
