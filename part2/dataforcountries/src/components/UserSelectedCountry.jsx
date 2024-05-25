import React from 'react'
import ShowOneCountry from './ShowOneCountry'
import ShowAllCountries from './ShowAllCountries'

const UserSelectedCountry = ({ countries, selectedCountry }) => {

    let filteredCountries = []

    // find country with user input country name 
    if (selectedCountry.length > 0) {
        filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(selectedCountry.toLowerCase()))
    } else {
        filteredCountries = countries
    }

    if (filteredCountries.length > 10) {
        return (`Too many matches, specify another filter`)
    }
    else if (filteredCountries.length === 1) {
        return (filteredCountries.map(country => <ShowOneCountry key={country.name.common} country={country} />))
    }
    else { // found countries is between 2 and 10
        return (filteredCountries.map(country => <ShowAllCountries key={country.name.common} country={country} />))
    }
}

export default UserSelectedCountry
