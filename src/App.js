import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Acceuil from './Acceuil/Acceuil';
import Footer from './Footer/Footer';
import Login from './Login/seconnecter';
import RegisterForm from './RegisterForm/register';
import Profile from './Profile/profile';
import Avis from './Avis/Avis';
// Accueil
import Contexte from './Contexte/page';
/*import Etape from './Etape/etape';*/
/*import Choisir from './Choisir/Choisir';*/
/*import Avis from './Avis/Avis';*/

//Fin Accueil
import Formation from './Formation/Formation';
import FormationDetail from './Formation/FormationDetail';
// coté Admin
import Panel from "./Panel/Panel";
import Utilisateur from './Panel/Utilisateur/Utilisateur';
import UtilDetail from './Panel/Utilisateur/UtilDetail';
//Fin
import { AuthProvider } from './AuthContexte';
import Aformation from './Panel/Formation/Formation';



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/seconnecter" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
        
         <Route path="/profile" element={<Profile />} />
         <Route path="/formation" element={<Formation />} />
        <Route path="/formation/:id" element={<FormationDetail />} />
        {/*Coté admin */}
        <Route path="/panel" element={<Panel />} />
        <Route path="/utilisateur" element={<Utilisateur />} />
        <Route path="/utilisateur/:id" element={<UtilDetail />} />
        <Route path="/aformation" element={<Aformation />} />
         {/*Coté admin Fin */}
         
          <Route
            path="/*"
            element={
              <>
                <Navbar />
               <Acceuil/> 
                <Contexte />
               <Avis/>
               
                <Footer />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
