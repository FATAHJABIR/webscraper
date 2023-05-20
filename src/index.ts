import puppeteer, { Puppeteer } from "puppeteer";

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random()* (max - min)+ min)

}
const sleep_for = async (page: puppeteer.Page, min: number, max: number) =>{
    let sleep_duration = randomIntFromInterval(min, max);
    console.log('Waiting for ', sleep_duration / 1000, 'seconds');
    await page.waitForTimeout(sleep_duration);
}


let main_actual = async() =>{
    try{
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        const URL = 'doctolib.fr';
        await page.setViewport({
            width: 1280,
            height: 800,
            deviceScaleFactor: 1
        })
        await page.goto(URL, {waitUntil: "networkidle2"})
        await sleep_for(page, 1000, 2000);
    }
    catch(e){
        console.log(e);
    }
}


let main = async () => {
    await main_actual();
}

main();