import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import UserSelectedCountry from './components/UserSelectedCountry'

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  console.log(countries)

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value)
  }

  return (
    <div>
      <form>
        Find Countries <input value={selectedCountry} onChange={handleCountryChange} />
      </form>
      <div>
        <UserSelectedCountry key={countries.capital} countries={countries} selectedCountry={selectedCountry} />
      </div>
    </div>
  )
}

export default App
