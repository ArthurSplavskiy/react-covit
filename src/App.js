import React, { useEffect, useState } from 'react'

import { Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import { fetchData } from './api'
import coronaImage from './img/image.png'

const App = () => {
    const [covidData, setCovidData] = useState({
        data: {},
        country: ''
    })

    useEffect(() => {
        const fetchAPI = async () => {
            setCovidData({ data: await fetchData() })
        }
        fetchAPI()
    }, [setCovidData])

    const handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country)
        setCovidData({ data: fetchedData, country: country })
    }

    return (
        <div className={styles.container}>
            <img src={coronaImage}/>
            <Cards data={covidData.data}/>
            <CountryPicker handleCountryChange={handleCountryChange} />
            <Chart data={covidData.data} country={covidData.country}/>
            <p className={styles.copyright}>Author by Arhur Splavskiy</p>
        </div>
    )
}

export default App