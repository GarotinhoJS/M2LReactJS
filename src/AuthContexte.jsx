// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [utilisateur, setUtilisateur] = useState(() => {
    const storedUser = localStorage.getItem('utilisateur');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (utilisateur) {
      localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
    } else {
      localStorage.removeItem('utilisateur');
    }
  }, [utilisateur]);

  const login = (user) => {
    setUtilisateur(user);
  };

  const logout = () => {
    setUtilisateur(null);
  };

  return (
    <AuthContext.Provider value={{ utilisateur, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
