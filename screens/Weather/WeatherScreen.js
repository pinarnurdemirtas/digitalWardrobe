import React, { useEffect, useState } from 'react';
import { Box, Text, Center, ScrollView, VStack, HStack, Image } from 'native-base';
import axios from 'axios';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WeatherScreen = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(null); 

  const apiKey = 'f8bef8df7530a93df6fabfa1aef95ca0';

  const getCurrentWeather = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=en`;
    const response = await axios.get(url);
    return response.data;
  };

  const getWeatherForecast = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=en`;
    const response = await axios.get(url);
    return response.data.list.slice(14, 55);
  };

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          const userCity = user.city || 'Istanbul';
          setCity(userCity); 
        } else {
          setCity('Istanbul'); 
        }
      } catch (error) {
        console.error("City çekilirken hata:", error);
        setCity('Istanbul');
      }
    };

    fetchCity();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) return; 

      try {
        const currentResponse = await getCurrentWeather(city);
        const forecastResponse = await getWeatherForecast(city);

        setCurrentWeather(currentResponse);

        const dailyForecast = [];
        let lastDate = null;
        forecastResponse.forEach((day) => {
          const formattedDate = dayjs(day.dt_txt).format('YYYY-MM-DD');
          if (formattedDate !== lastDate) {
            dailyForecast.push(day);
            lastDate = formattedDate;
          }
        });

        setForecast(dailyForecast);
      } catch (error) {
        console.error("Weather verisi alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]); 

  if (loading || !currentWeather) {
    return (
      <Center flex={1}>
        <Text>Loading...</Text>
      </Center>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Center flex={1} bg="white" px="4" py="4">
        <Box
          bg="#054f5c"
          p="6"
          rounded="lg"
          w="90%"
          maxW="350"
          shadow="6"
        >
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <Text fontSize="2xl" fontWeight="bold" color="white">
                {`Today - ${currentWeather.name}, ${currentWeather.sys.country}`}
              </Text>
              <Text fontSize="md" color="white">{currentWeather.weather[0].description.toUpperCase()}</Text>
              <Text fontSize="md" color="white">{`Temp: ${currentWeather.main.temp}°C`}</Text>
              <Text fontSize="sm" color="white">{`Humidity: ${currentWeather.main.humidity}%`}</Text>
              <Text fontSize="sm" color="white">{`Wind: ${currentWeather.wind.speed} m/s`}</Text>
            </VStack>
            <Image
              source={{ uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png` }}
              alt="Weather Icon"
              size="lg"
            />
          </HStack>
        </Box>

        <VStack space={3} mt="6" w="90%" maxW="400">
          <Text fontSize="lg" fontWeight="bold">4-Day Weather Forecast</Text>
          {forecast.map((day, index) => {
            const date = dayjs(day.dt_txt);
            const formattedDate = date.format('DD.MM.YYYY');

            return (
              <Box key={index} bg="coolGray.100" p="3" rounded="lg" shadow="2">
                <HStack alignItems="center" justifyContent="space-between">
                  <VStack>
                    <Text fontSize="md" fontWeight="bold">{formattedDate}</Text>
                    <Text fontSize="sm" color="coolGray.500">{day.weather[0].description}</Text>
                    <Text fontSize="md">{`${day.main.temp}°C`}</Text>
                    <Text fontSize="xs" color="coolGray.500">{`Humidity: ${day.main.humidity}%`}</Text>
                  </VStack>
                  <Image
                    source={{ uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }}
                    alt="Weather Icon"
                    size="md"
                  />
                </HStack>
              </Box>
            );
          })}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default WeatherScreen;
