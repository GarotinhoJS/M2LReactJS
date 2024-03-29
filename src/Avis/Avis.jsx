// Avis.js
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Avis.css";

function Avis() {
    useEffect(() => {
        AOS.init({
            once: false, // Animation s'exécute une seule fois
        });
    }, []);

    return (
        <div className="avis-container">
            <div className="avv" data-aos="fade-up">
                <h1>
                    Comptez sur Nous!
                </h1>
            </div>

            {/* Premier avis */}
            <div className="avis" data-aos="fade-up">
                <div className="note">5</div>
                <div className="commentaire">Excellent service! Très satisfait.</div>
            </div>

            {/* Deuxième avis */}
            <div className="avis" data-aos="fade-up">
                <div className="note">5</div>
                <div className="commentaire">Service acceptable, mais peut s'améliorer.</div>
            </div>
        </div>
    );
}

export default Avis;
