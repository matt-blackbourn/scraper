import { DataFetcher } from './DataFetcher'

const companies: Array<string> = ['CHI', 'CNU', 'IFT', 'VCT', 'PPH', 'EBO']
const url: string = 'https://www.nzx.com/markets/NZSX'

const fetcher = new DataFetcher()

fetcher.getData(url, companies)
    .then(res => console.table(res))
    .catch(error => console.log(error))