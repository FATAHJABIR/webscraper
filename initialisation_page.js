if (monStockage.getItem("specialite") != null){
    document.getElementById("spe").innerHTML = "Spécialité : " + monStockage.getItem("specialite");
    document.getElementById("nom_medecin").innerHTML = "Nom du médecin : " + monStockage.getItem("nom_medecin");
    document.getElementById("lieu").innerHTML = "Lieu de la recherche : " + monStockage.getItem("adresse") +" " + monStockage.getItem("code_postal ") +" " + monStockage.getItem("ville") +" "+ monStockage.getItem("pays") ;
    document.getElementById("peri").innerHTML = "Périmètre : " + monStockage.getItem("perimetre");
    document.getElementById("dispo").innerHTML = "Disponibilités : " + monStockage.getItem("jours")+ monStockage.getItem("horaires");
    }
else{
    document.getElementById("spe").innerHTML = "Spécialité : Non renseignée";
    document.getElementById("nom_medecin").innerHTML = "Nom du médecin : Non renseigné";
    document.getElementById("lieu").innerHTML = "Lieu de la recherche : Non renseigné";
    document.getElementById("peri").innerHTML = "Périmètre : Non renseigné";
    document.getElementById("dispo").innerHTML = "Disponibilités : Non renseigné";
 }