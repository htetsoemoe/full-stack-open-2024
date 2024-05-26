import React, { useEffect, useState } from 'react'
import WeatherStatusOfCity from './WeatherStatusOfCity'
import axios from 'axios'

const ShowOneCountry = ({ country }) => {
    // there is no language exist on land or country like 'Antarctica"
    const keys = country.languages ? Object.keys(country.languages) : []
    const [weatherStatus, setWeatherStatus] = useState(null)

    useEffect(() => {
        const api_key = import.meta.env.VITE_API_KEY
        // console.log(api_key)
        axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?q=${country.name.common}&appid=${api_key}`)
            .then(response => {
                // console.log(response.data.list[0])
                setWeatherStatus(response.data.list[0])
            })
    }, [])
    // console.log(weatherStatus.main.temp)

    return (
        <>
            <div className='show-one-country-container'>
                <h1>{country.name.common}</h1>
                <p>{`Capital: ${country.capital}`}</p>
                <p>{`Area: ${country.area}`}</p>
                <h3>Languages: </h3>
                <ul>
                    {keys && keys?.map(key => <li>{country.languages[key]}</li>)}
                </ul>
                <img src={country.flags.png} width='350' height='200' alt="flag" />
            </div>
            <WeatherStatusOfCity country={country} />
        </>
    )
}

export default ShowOneCountry
