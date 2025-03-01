import axios from 'axios';

const API_URL = 'http://192.168.92.150:5000';


export const loginUser = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,  
          password: password,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        return { success: true, data, message: '' };
      } else {
        return { success: false, message: data.errors?.Username?.[0] || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred. Please try again later.' };
    }
  };
  

  export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/User/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const responseBody = await response.text(); 

   
    if (response.ok) {
      return { success: true, message: responseBody }; 
    } else {
      console.error('Error response:', responseBody);
      return { success: false, message: responseBody }; 
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return { success: false, message: 'An error occurred. Please try again later.' };
  }
};


const apiKey = 'f8bef8df7530a93df6fabfa1aef95ca0';
const city = 'Istanbul';
const urlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=en`;

export const getCurrentWeather = async () => {
  try {
    const response = await axios.get(urlCurrent);
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather data", error);
    throw error;
  }
};

export const getWeatherForecast = async () => {
  try {
    const response = await axios.get(urlForecast);
    return response.data.list.slice(14, 55); 
  } catch (error) {
    console.error("Error fetching weather forecast data", error);
    throw error;
  }
};
