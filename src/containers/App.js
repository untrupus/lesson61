import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import CountryInfo from "../components/CountryInfo/CountryInfo";
import Country from "../components/Country/Country";

function App() {

    const [countries, setCountries] = useState([]);
    const [countryCode, setCountryCode] = useState(null);


    const fetchData = async () => {
        const countryResponse = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code');
        const newCountries = countryResponse.data;
        setCountries(newCountries);
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    const countryList = countries.map(country => {
        return (
            <Country
                key={country.alpha3Code}
                name={country.name}
                click={() => setCountryCode(country.alpha3Code)}
            />
        )
    })


    return (
        <div className="App">
            <div className="countryList">
                {countryList}
            </div>
            <div className="countryInfo">
                <CountryInfo
                    alpha={countryCode}
                />
            </div>
        </div>
    );
}

export default App;
