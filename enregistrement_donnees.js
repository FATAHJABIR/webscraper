
document.getElementById("data").addEventListener("submit", test1);  //ajout de la fonction qui se réalisera lorsque le bouton submit est cliqué

//initialisation des variables 
var specialite ;
var nom_medecin ; 
var adresse  ; 
var code_postal ;
var ville ;
var pays ; 
var perimetre ;
var jours = " ";
var horaires = " ";
var semaine = ['lundi', ' mardi', ' mercredi', ' jeudi', ' vendredi', ' samedi', ' dimanche'];
var creneaux = [' 8h-10h', ',10h-12h',',12h-14h',',14h-16h',',16h-18h',',18h-20h']

//création du local Storage
monStockage = localStorage;  


function test1 (form){
    //mise à jour des variables en y mettant ce qui est contenu dans les zones de saisies de la page web
    specialite = document.getElementById("specialite").value;
    nom_medecin = document.getElementById("nom_medic").value;
    adresse = document.getElementById("adresse").value;
    code_postal = document.getElementById("code-postal").value;
    ville = document.getElementById("ville").value;
    pays = document.getElementById("pays").value;
    perimetre = document.getElementById("périmètre").value;

    alert(specialite);

    //stockage des variables dans le local Storage, avec un système de clé/valeur 
    localStorage.setItem('specialite', specialite);  //clé='specialité' ; valeur = variable specialite
    localStorage.setItem('nom_medecin', nom_medecin);
    localStorage.setItem('adresse', adresse);
    localStorage.setItem('code_postal', code_postal);
    localStorage.setItem('ville', ville);
    localStorage.setItem('pays', pays);
    localStorage.setItem('perimetre', perimetre);

    //récupération des checkbox cochées : on regarde si elles le sont, et si oui on ajoute le jour correspondant à la variable jours
    var check1 = [new Boolean(document.getElementById("lun").checked),new Boolean(document.getElementById("mar").checked),new Boolean(document.getElementById("mer").checked),new Boolean(document.getElementById("jeu").checked),new Boolean(document.getElementById("ven").checked),new Boolean(document.getElementById("sam").checked),new Boolean(document.getElementById("dim").checked)];
    for (let i=0; i<7;i++) { 
        if (check1[i]==true) {
            jours = jours +  semaine[i];
        }
    }

    var check2 = [new Boolean(document.getElementById("8-10").checked),new Boolean(document.getElementById("10-12").checked),new Boolean(document.getElementById("12-14").checked),new Boolean(document.getElementById("14-16").checked),new Boolean(document.getElementById("16-18").checked),new Boolean(document.getElementById("18-20").checked)];
    for (let i=0; i<6;i++) { 
        if (check2[i]==true) {
            horaires = horaires +  creneaux[i];
        }
    }

    //stockage
    localStorage.setItem('jours', jours);
    localStorage.setItem('horaires', horaires);
    
    
}






