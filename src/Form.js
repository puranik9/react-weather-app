import React, { Component } from 'react';

const Form = (props) => {
    return (
        <form>
            <input type="text" name="location" placeholder="Enter your location" />
            <button>Weather Me</button>
        </form>
    )
};

export default Form;