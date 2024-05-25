import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  console.log(countries)

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const cssStyles = {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
    padding: '10px',
    margin: '20px',
    fontWeight: 'bold',
    fontSize: '20px'
  }

  const imgStyles = {
    width: '70px'
  }

  return (
    <div>
      <form>
        Find Countries <input value={country} onChange={handleCountryChange} />
      </form>
      <div>
        {countries.map((country, index) => {
          return (
            <div
              key={index}
              style={cssStyles}
            >
              <div>
                {`Country: ${country.name.common}, `}
              </div>
              <div>
                {`City: ${country.capital}, `}
              </div>
              <div>
                {`Continent: ${country.continents}, `}
              </div>
              <img style={imgStyles} src={country.flags.png} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
