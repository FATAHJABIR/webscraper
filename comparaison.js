var vieux = new Map();
vieux.set("pareil",["Je veux","aller","au dodo"]);
vieux.set("different",["Je","peux","pas"]);

var jeune = new Map();
jeune.set("pareil",["Je veux","aller","au dodo"]);
jeune.set("different",["Je","peux","maintenant"]);
function comparaison_dictionnaire(dict_vieux, dict_nouveaux){
    let changement = [];
    for (let [clé,valeur] of dict_nouveaux) {
        let liste_valeurs_anciennes = dict_vieux.get(clé);
        for (let valeur_nouvelle of valeur){
            if (liste_valeurs_anciennes !== undefined){
                if (!liste_valeurs_anciennes.includes(valeur_nouvelle)){
                    changement.push({clé,valeur_nouvelle});
                }
            }
        }
    };
    console.log(changement)
    return changement;
}

console.log(comparaison_dictionnaire(vieux,jeune));

function notification(rdv){
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/images/icone_P_128.png',
        title: 'Rendez-vous trouvé par Papou',
        message: "rdv",
        priority: 1
    });}

export default comparaison_dictionnaire

