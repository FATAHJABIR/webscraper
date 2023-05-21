import puppeteer from "puppeteer"
import comparaison_dictionnaire from "../comparaison.js"

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random()* (max - min)+ min)

}
const sleep_for = async (page, min, max) =>{
    let sleep_duration = randomIntFromInterval(min, max);
    console.log('Waiting for ', sleep_duration / 1000, 'seconds');
    await page.waitForTimeout(sleep_duration);
}

const selectors = {
    cookies: "#didomi-notice-agree-button",
    prochain: ".dl-text.dl-text-body.dl-text-regular.dl-text-s.dl-text-left.dl-text-primary-110",
    searchBar: ".searchbar-input.searchbar-query-input",
    locationBar: ".searchbar-input.searchbar-place-input",
    searchButton : ".searchbar-submit-button-label.dl-text-transform-none"
    };


let main_actual = async() =>{
    let URL = "https://www.doctolib.fr/"
    let old_availabilites = new Map();

    old_availabilites = JSON.parse(localStorage.getItem("availabilities"))
    try{
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
         
        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1
        })
        await page.goto(URL, {waitUntil: "networkidle2"})
        console.log("page loaded")
        try{await page.click(selectors.cookies);}
        catch(e){}

        await sleep_for(page, 1000, 2000);
        let rendezvous = "covid";
        let endroit = "metz";
        await page.click(selectors.searchBar)
        await page.keyboard.type(rendezvous);
        await page.keyboard.press("Tab");
        await page.keyboard.type(endroit);
        await page.keyboard.press("Tab");
        await page.keyboard.press("Enter");
        // await page.$eval(selectors.searchBar, (el, rendezvous) => {
        //     return el.value = rendezvous;
        // }, rendezvous);
        // await page.$eval(selectors.locationBar, (el, endroit) => {
        //     return el.value = endroit;
        // }, endroit);
        await sleep_for(page, 1000, 2000);
        await page.click(selectors.searchButton);
        await sleep_for(page, 1000, 2000);
        

        var availabilities = new Map();
        const handles = await page.$$("div.dl-search-result")
        const handlesXPaths = [];
        try{
            for(let index = 0; index < handles.length; index++){

                const handle = handles[index]
                handlesXPaths[index] = await page.evaluate(element => element.getAttribute("id"), handle); 
                const hours = await page.$x(`//div[@id=`+ '"' + handlesXPaths[index] + '"' + `]//div[@class="Tappable-inactive availabilities-slot"]`) 

                const titleHandles = await page.$x(`//div[@id=`+ '"' + handlesXPaths[index] + '"' + `]//h3`)
                const titleHandle = titleHandles[0]
                const title = await page.evaluate(element => element.textContent, titleHandle);

                var l = [];
                availabilities.set(title, l) 
                
                try{
                    await page.click(selectors.prochain);
                }
                catch(e){
                    console.log("me3lich")
                }
                
                
                await sleep_for(page, 1000, 1500);
                await page.evaluate((Pageitem)=> Pageitem.scrollIntoView(), titleHandle)
                await sleep_for(page, 1000, 1500);
                for(let index = 0; index < hours.length; index++){
                const hour = hours[index];
                const titleText = await page.evaluate(element => element.getAttribute("aria-label"), hour);
                l.push(titleText)
                }
            }
        console.log(availabilities)
        if (old_availabilites == null){
            old_availabilites = availabilities;
        }
        else{
            comparaison_dictionnaire(old_availabilites, availabilities)
        }
        let myMap_serialized = JSON.stringify(old_availabilites);
        localStorage.setItem("availabilities", myMap_serialized);
    }
    catch(err){
        console.log(err)
    }
    }
    catch(e){
        console.log(e)
    }
}


let main = async () => {
    await main_actual();
}




main_actual();
export default main_actual
// Il reste à montrer plus d'horaires et cliquers sur le rdv le plus proche