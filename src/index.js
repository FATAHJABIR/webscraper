
const { default: puppeteer } = require("puppeteer")
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
    place: "lyon",
    URL: "https://www.doctolib.fr/ophtalmologue/lyon?search_uuid=243a2e79-12b2-41bb-9592-ac1207938487"
};


let main_actual = async() =>{
    try{
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        const URL = selectors.URL;

        var availabilities = new Object();

        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1
        })
        await page.goto(URL, {waitUntil: "networkidle2"})
      

        try{await page.click(selectors.cookies);}
        catch(e){}
        await sleep_for(page, 1000, 2000);

        const handles = await page.$$("div.dl-search-result")
        handlesXPaths = [];

        for(let index = 0; index < handles.length; index++){

            const handle = handles[index]
            handlesXPaths[index] = await page.evaluate(element => element.getAttribute("id"), handle); 
            const hours = await page.$x(`//div[@id=`+ '"' + handlesXPaths[index] + '"' + `]//div[@class="Tappable-inactive availabilities-slot"]`) 

            const titleHandles = await page.$x(`//div[@id=`+ '"' + handlesXPaths[index] + '"' + `]//h3`)
            const titleHandle = titleHandles[0]
            const title = await page.evaluate(element => element.textContent, titleHandle);

            var l = [];
            availabilities[title] = l 
            
            try{
                await page.click(selectors.prochain);
            }
            catch(e){
                console.log("me3lich")
            }
            // for(let i = 0; i <= 0; i++){
            //     await page.keyboard.press("PageDown");
            // }
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
    }
    catch(e){
        console.log(e);
    }
}


let main = async () => {
    await main_actual();
}

main();

// Il reste à montrer plus d'horaires et cliquers sur le rdv le plus proche