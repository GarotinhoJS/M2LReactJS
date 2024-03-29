import React from "react"


function disconnect() {
    if (connection) {
        connection.end(function(err) {
            if (err) {
                console.log('erreur lors de la déconnexion de la base de données :', err);
            } else {
                console.log('déconnexion de la base de données réussie.');
            }
        });
    } else {
        console.log('aucune connexion active à la base de données.');
    }
}

const deconnexion = () => {
  return (
    <div>



        
    </div>
  )
}
export default deconnexion