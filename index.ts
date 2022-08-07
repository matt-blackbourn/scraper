import axios, { AxiosError } from 'axios'
import { JSDOM } from 'jsdom'

function fetchPage(url: string): Promise<string|undefined>{
    const HTMLData = axios  
        .get(url)
        .then(res => res.data)
        .catch((error: AxiosError) => {
            console.error(error.toJSON())
        })

    return HTMLData
}

async function fetchFromWeb(url: string){
    const HTMLData = await fetchPage(url)
    if(HTMLData){
        const { document } = (new JSDOM(HTMLData)).window
        return document
    }
}

async function getData(): Promise<void>{
    const companies = ['CHI', 'CNU', 'IFT', 'VCT', 'PPH']
    const document = await fetchFromWeb('https://www.nzx.com/markets/NZSX')


    for(let i = 0; i < companies.length; i++){
        const company = companies[i]
        const price = document?.querySelector(`#instruments-table > tbody > tr[title="${company}"] > td[data-title="Price"]`)?.textContent
        console.log(`${company}:  ${price}`)
    }
}

getData()