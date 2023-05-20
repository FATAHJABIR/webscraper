setInterval(test, 3000); 
//permet de lancer périodiquement la fonction de recherche

function test (){
    // Notification.requestPermission
    console.log(Notification.permission);
    chrome.notifications.create({
        type: 'basic',
        iconUrl: '/images/icone_P_128.png',
        title: `Notification title`,
        message: "Your message",
        priority: 1
        });
    }
