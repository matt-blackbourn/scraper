import axios, { AxiosError } from 'axios'
import { JSDOM } from 'jsdom'
require('dotenv').config()

export class DataFetcher {

    fetchPage(url: string): Promise<string|undefined>{
        const HTMLData = axios  
            .get(url)
            .then(res => res.data)
            .catch((error: AxiosError) => {
                console.error(error.toJSON())
            })
    
        return HTMLData
    }
    
    async fetchFromWeb(url: string): Promise<Document|void>{
        const HTMLData = await this.fetchPage(url)
        if(HTMLData){
            const { document } = (new JSDOM(HTMLData)).window
            return document
        }
    }
    
    async getData(url: any, companies: Array<string>): Promise<Data>{
        const document = await this.fetchFromWeb(url)
        const data: Data = {}

        for(let i = 0; i < companies.length; i++){
            const company = companies[i]
            const rawPriceString = document?.querySelector(`#instruments-table > tbody > tr[title="${company}"] > td[data-title="Price"]`)?.textContent
            const price = Number(rawPriceString?.trim().replace(/\$/, ''))

            data[company] = price
        }
        
        return data
    }
}

interface Data {
    [company: string]: Number
}


