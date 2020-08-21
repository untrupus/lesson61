import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './CountryInfo.css';

const CountryInfo = props => {
    const [info, setInfo] = useState(null);
    const [borders, setBorders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (props.alpha !== null) {
                const response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + props.alpha);
                setInfo(response.data);
                const promises = response.data.borders.map(async country => {
                    const countryUrl = 'https://restcountries.eu/rest/v2/alpha/' + country;
                    const countryResponse = await axios.get(countryUrl);
                    return [countryResponse.data.name];
                });
                const newCountries = await Promise.all(promises);

                setBorders(newCountries);
            }
        }
        fetchData().catch(console.error);
    }, [props.alpha]);

    const borderCountry = borders.map(border => {
       return (
           <li key={border}>{border}</li>
       )
    });

    return info && (
        <div>
            <h2>{info.name}</h2>
            <img src={info.flag} className="flag" alt="flag"/>
            <p>Capital: {info.capital}</p>
            <p>Population: {info.population}</p>
            <h4>Border with:</h4>
            <ul>
                {borderCountry}
            </ul>
        </div>
    );
};

export default CountryInfo;