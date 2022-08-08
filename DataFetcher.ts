import axios, { AxiosError } from 'axios'
import { JSDOM } from 'jsdom'

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
    
    async fetchFromWeb(url: string){
        const HTMLData = await this.fetchPage(url)
        if(HTMLData){
            const { document } = (new JSDOM(HTMLData)).window
            return document
        }
    }
    
    async getData(url: string, companies: Array<string>){
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


