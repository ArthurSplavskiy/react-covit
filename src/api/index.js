import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async (country) => {
    try {
        let changeableUrl = url

        if(country) {
            changeableUrl = `${url}/countries/${country}`
        }
        
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl)

        return { confirmed, recovered, deaths, lastUpdate }

    } catch(error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)

        const modefiedData = data.map((item) => ({
            confirmed: item.confirmed.total,
            deaths: item.deaths.total,
            date: item.reportDate
        }))

        return modefiedData
    } catch(error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: {countries} } = await axios.get(`${url}/countries`)
        return countries.map(country => country.name)
    } catch(error) {
        console.log(error)
    }
}