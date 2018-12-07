import React, { Component } from 'react';
import './App.css';
import Titles from "./Titles";
import Form from "./Form";
import WeatherTile from "./WeatherTile";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ForecastCard from "./ForecastCard";

library.add(faTimes);
library.add(faChevronDown);

class App extends Component {

  constructor() {
    super();

    this.state = {
      cities: [
        {name: 'Toronto', id: 6167865},
        {name: 'London', id: 2643744},
        {name: 'San Francisco', id: 5391959},
        {name: 'Mumbai', id: 1275339},
        {name: 'Beijing', id: 1816670}
      ],
      isLoading: true,
      forecast: [],
        active: false

    };

    /*this.getForecast = this.getForecast.bind(this);*/
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {

    const ids = this.state.cities.map(city => city.id).toString();

    const weather_url = `http://api.openweathermap.org/data/2.5/group?&units=metric&appid=35258ff967505a8cb6e07321a5311cac&id=${ids}`;

    fetch(weather_url)
      .then(res => res.json())
      .then(body => body.list.map(city => {
        return {
          name: city.name,
          id: city.id,
          temp: city.main.temp,
          maxTemp: city.main.temp_max,
          minTemp: city.main.temp_min,
          weather: city.weather[0].main,
          icon: 'http://openweathermap.org/img/w/' +
              city.weather[0].icon + '.png'
        };
      }))
      .then(cities => {
        this.setState({
            cities,
            isLoading: false
        })
      });
  }

  getWeather = async (event) => {
      event.preventDefault();
      const newCity = event.target.elements.city.value;

      const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=35258ff967505a8cb6e07321a5311cac`);
      const response = await apiCall.json();
      const newCityId = response.id;

      let cities = this.state.cities;
      cities[cities.length] = {
          name: newCity,
          id: newCityId,
          temp: response.main.temp,
          maxTemp: response.main.temp_max,
          minTemp: response.main.temp_min,
          weather: response.weather[0].main,
          icon: 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png'
      };

      this.setState({cities: cities});
  };

  /*getForecast = async (index, event) => {
      event.preventDefault();
      console.log(this.state.cities[index].name);
      const forecastCity = this.state.cities[index].name;

      const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${forecastCity}&units=metric&appid=35258ff967505a8cb6e07321a5311cac`);
      const response = await apiCall.json();

      console.log(response);

      let forecast = this.state.forecast;
      forecast[index] = {
          name: response.city.name,
          id: response.city.id,
          forecastTemp1: response.list[0].main.temp
      };

      this.setState({forecast: forecast});
      this.handleClick();

      console.log(forecast);


  };*/

  handleClick() {
      this.setState({active: !this.state.active})
  }

  removeCity(index) {
      this.setState({
          cities: this.state.cities.filter((city, i) => i !== index )
      });
  }

  render() {

    if(this.state.isLoading) {
        return <div>Please wait while the page loads...</div>
    }

    return (
      <div className="App">
        <Titles/>
          {this.state.cities.map((city, i) => (
            <WeatherTile
              key={city.id}
              city={city.name}
              temperature={city.temp}
              maxTemperature={city.maxTemp}
              minTemperature={city.minTemp}
              icon={city.icon}
              description={city.weather}
              removeCity={this.removeCity.bind(this, i)}
              active={this.state.active}
              forecast={this.state.forecast}
            />
          ))}
        <Form getWeather={this.getWeather}/>
      </div>
    );
  }
}

export default App;
