import main from "./src/index.js";


setInterval(repet, 600000); 
//permet de lancer périodiquement la fonction de recherche

function repet (){
        if (monStockage.getItem("specialite") != null){
            let specialite = monStockage.getItem("specialite");
            let adresse = monStockage.getItem("adresse")
            let code_postal = monStockage.getItem("code_postal ") 
            let ville = monStockage.getItem("ville") 
            let pays = monStockage.getItem("pays") ;
            // let limite = monStockage.getItem("perimetre");
            // let contraintes_jours = monStockage.getItem("jours");
            // let contraintes_heures = monStockage.getItem("horaires")
            
            lieu = pays + code_postal + ville + adresse
        // fonction qui scan le web
        main(lieu, specialite );
        }
}