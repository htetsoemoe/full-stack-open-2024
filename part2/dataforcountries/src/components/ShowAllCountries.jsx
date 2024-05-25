import React, { useState } from 'react'
import ShowOneCountry from './ShowOneCountry'

const ShowAllCountries = ({ country }) => {
    const [show, setShow] = useState(false)

    const handlerShowClick = () => setShow(!show)

    return (
        <div className='show-all-countries-container'>
            <span className='country-name'>{country.name.common}</span>
            <button className='show-all-countries-btn' onClick={handlerShowClick}>Show</button>
            {/* conditional rendering */}
            {show === true && <ShowOneCountry key={country.name.common} country={country} />}
        </div>
    )
}

export default ShowAllCountries
