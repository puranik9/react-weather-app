import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ForecastCard from "./ForecastCard";

const WeatherTile = (props) => {

    return (
        <div className="weather-tile" >
            <div className="weather-tile_details">
                <span>H: {props.maxTemperature}&#8451;</span>
                <p>{props.city}</p>
                <span>L: {props.minTemperature}&#8451;</span>
            </div>
            <div className="weather-tile_image">
                <img src={props.icon} alt={props.city} />
            </div>
            <div className="weather-tile_temperature">
                <span>{props.temperature}&#8451;</span>
                <p>{props.description}</p>
            </div>
            <div className="weather-tile_remove-button">
                <button onClick={props.removeCity}><FontAwesomeIcon icon="times" /></button>
            </div>
        </div>
    )
};

export default WeatherTile;

/*<div className="weather-tile_forecast-button">
                <button onClick={props.getForecast}><FontAwesomeIcon icon="chevron-down" /></button>
            </div>
            {props.active && props.forecast.map((forecast) => (
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>SUN</th>
                            <th>MON</th>
                            <th>TUE</th>
                            <th>WED</th>
                            <th>THU</th>
                            <th>FRI</th>
                            <th>SAT</th>
                        </tr>
                        <tr>
                            <th>{forecast.name}</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            ))}*/