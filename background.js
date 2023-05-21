import main from "./src/index.js";


//setInterval(test, 30000); 
//permet de lancer périodiquement la fonction de recherche

function test (){

    // chrome.notifications.create({
    //     type: 'basic',
    //     iconUrl: '/images/icone_P_128.png',
    //     title: `Notification title`,
    //     message: "Your message",
    //     priority: 1
    //     });


        // fonction qui scan le web
        let lieu = "Paris";
        let rdv = "covid";
        main(lieu, rdv);
    }
test();