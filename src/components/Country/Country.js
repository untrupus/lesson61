import React from 'react';
import './Country.css'

const Country = props => {
    return (
        <div>
            <p className="country" onClick={props.click}>{props.name}</p>
        </div>
    );
};

export default Country;