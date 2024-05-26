import React, { useEffect, useState } from 'react'
import axios from 'axios'

const WeatherStatusOfCity = ({ country }) => {

    const [weatherStatus, setWeatherStatus] = useState(null)
    // console.log(country.name.common, country.capital[0])

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

    // there is no capital exist on land or country like 'Antarctica"
    // we need to avoid undefined error => (country.capital[0])
    let noCapitalLandState = false
    const props = 'capital'

    if (country.hasOwnProperty(props)) {
        console.log("yes")
    } else {
        console.log("no")
        noCapitalLandState = true
    }

    if (weatherStatus === null) return null

    return (
        <>
            {noCapitalLandState ? (
                <div className='weather_status_of_capital' >
                    <h2>{`Weather in ${country.name.common} and a capital doesn't exist on this land.`}</h2>
                    <p > {`Temperature: ${(weatherStatus.main.temp - 273.5).toFixed(2)} Celsius`
                    }</p>
                    <img alt="weather_icon" src={`http://openweathermap.org/img/wn/${weatherStatus.weather[0].icon}@2x.png`} />
                    <p>{`Wind: ${weatherStatus.wind.speed} m/s`}</p>
                </div >
            ) : (
                < div className='weather_status_of_capital' >
                    {country?.capital[0] && <h2>{`Weather in ${country?.capital[0]}`}</h2>}
                    <p> {`Temperature: ${(weatherStatus.main.temp - 273.5).toFixed(2)} Celsius`
                    }</p>
                    <img alt="weather_icon" src={`http://openweathermap.org/img/wn/${weatherStatus.weather[0].icon}@2x.png`} />
                    <p>{`Wind: ${weatherStatus.wind.speed} m/s`}</p>
                </div >
            )}
        </>
    )
}

export default WeatherStatusOfCity
