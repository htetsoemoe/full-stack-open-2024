import React from 'react'

const ShowOneCountry = ({ country }) => {
    // there is no language exist on land or country like 'Antarctica"
    const keys = country.languages ? Object.keys(country.languages) : []

    return (
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
    )
}

export default ShowOneCountry
