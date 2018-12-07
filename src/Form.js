import React  from 'react';

const Form = (props) => {
    return (
        <form className="weather-form" onSubmit={props.getWeather}>
            <input type="text" name="city" placeholder="Enter your city" />
            <button type="submit">Weather Me</button>
        </form>
    )
};

export default Form;