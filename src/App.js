import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Acceuil from './Acceuil/Acceuil';
import Footer from './Footer/Footer';
import Login from './Login/seconnecter';
import RegisterForm from './RegisterForm/register';
import Profile from './Profile/profile';
import Avis from './Avis/Avis';
import Contexte from './Contexte/page';
import Formation from './Formation/Formation';
import FormationDetail from './Formation/FormationDetail';
import ConfirmationPage from './RegisterForm/confirmation';
import Panel from "./Panel/Panel";
import Utilisateur from './Panel/Utilisateur/Utilisateur';
import UtilDetail from './Panel/Utilisateur/UtilDetail';
import Aformation from './Panel/Formation/Formation';


import { AuthProvider } from './AuthContexte';

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
          <Route path="/panel" element={<Panel />} />
          <Route path="/utilisateur" element={<Utilisateur />} />
          <Route path="/utilisateur/:id" element={<UtilDetail />} />
          <Route path="/aformation" element={<Aformation />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/confirmation/:token" element={<ConfirmationPage />} />
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
