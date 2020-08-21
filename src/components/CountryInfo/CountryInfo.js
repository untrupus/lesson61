import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './CountryInfo.css';

const CountryInfo = props => {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (props.alpha !== null) {
                const response = await axios.get('https://restcountries.eu/rest/v2/alpha/' + props.alpha);
                setInfo(response.data);
            }
        }
        fetchData().catch(console.error);
    }, [props.alpha])

    // const borders = info.borders.map(border => {
    //     return (
    //         <li>{border}</li>
    //     )
    // });


    return info && (
        <div>
            <h2>{info.name}</h2>
            <img src={info.flag} className="flag" alt="flag"/>
            <p>Capital: {info.capital}</p>
            <p>Population: {info.population}</p>
            <p>{info.borders.join(' ')}</p>
            {/*<ul>{borders}</ul>*/}
        </div>
    );
};

export default CountryInfo;