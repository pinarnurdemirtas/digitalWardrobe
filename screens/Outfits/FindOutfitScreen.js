import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  VStack,
  Center,
  Spinner,
  Text,
  Pressable,
  Button,
  HStack,
  Box,
  ChevronLeftIcon,
  ChevronRightIcon,
  Image,
} from "native-base";
import axios from "axios";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FindOutfitScreen() {
  const [weatherDays, setWeatherDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const apiKey = "f8bef8df7530a93df6fabfa1aef95ca0";

  const scrollLeft = () => {
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const fetchForecast = async () => {
    try {
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);
      const city = user?.city || "Istanbul";

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );

      const seen = new Set();
      const dailyTemps = res.data.list.reduce((acc, item) => {
        const date = dayjs(item.dt_txt).format("YYYY-MM-DD");
        if (!seen.has(date)) {
          seen.add(date);
          acc.push({
            date,
            temp: item.main.temp,
            label: getDateLabel(date),
          });
        }
        return acc.length < 6 ? acc : acc;
      }, []);

      setWeatherDays(dailyTemps);
      setSelectedDay(dailyTemps[0]);
    } catch (err) {
      console.error("Hava durumu alınamadı", err);
    }
  };

  const fetchOutfitSuggestions = async (temp) => {
    try {
      setLoading(true);
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);

      const res = await axios.post(
        `http://kombin.pinarnur.com/api/Suggestion/suggest-user-combo/${user.id}`,
        temp
        ,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setOutfits(res.data);
    } catch (err) {
      console.error("Kombinler getirilemedi", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  useEffect(() => {
    if (selectedDay) fetchOutfitSuggestions(selectedDay.temp);
  }, [selectedDay]);

  const getDateLabel = (dateStr) => {
    const today = dayjs().format("YYYY-MM-DD");
    const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");
    if (dateStr === today) return "Bugün";
    if (dateStr === tomorrow) return "Yarın";
    return dayjs(dateStr).format("DD MMMM");
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Spinner color="#054f5c" size="lg" />
      </Center>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: "#f0f4f8" }}>
      <VStack space={4}>
        <HStack alignItems="center" space={2}>
          <Pressable onPress={scrollLeft}><ChevronLeftIcon size="6" color="#054f5c" /></Pressable>

          <ScrollView
            horizontal
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 4 }}
          >
            <HStack space={3}>
              {weatherDays.map((day, i) => (
                <Pressable key={i} onPress={() => setSelectedDay(day)}>
                  <Box
                    px="4" py="3"
                    bg={selectedDay?.date === day.date ? "#054f5c" : "white"}
                    borderWidth={1}
                    borderColor={selectedDay?.date === day.date ? "#054f5c" : "#ccc"}
                    rounded="xl" shadow={selectedDay?.date === day.date ? "6" : "2"} mr={2}
                  >
                    <VStack alignItems="center">
                      <Text bold fontSize="sm" color={selectedDay?.date === day.date ? "white" : "black"}>{day.label}</Text>
                      <Text fontSize="xs" color={selectedDay?.date === day.date ? "white" : "gray.500"}>
                        {Math.round(day.temp)}°C
                      </Text>
                    </VStack>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>

          <Pressable onPress={scrollRight}><ChevronRightIcon size="6" color="#054f5c" /></Pressable>
        </HStack>

        {outfits.length > 0 ? (
          outfits
  .filter((outfit) => outfit.probability > 0.001)
  .map((outfit, index) => (

            <Box key={index} bg="white" p="4" rounded="lg" shadow="2">
              <Text bold mb="2">
                Kombin Önerisi 
              </Text>

              <HStack space={4} justifyContent="center">
                {[["Üst", outfit.upper], ["Alt", outfit.bottom], ["Ayakkabı", outfit.shoes]].map(
                  ([title, item], idx) => (
                    <VStack key={idx} alignItems="center" width={100}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        alt={item.name}
                        style={{ width: 80, height: 80, borderRadius: 10 }}
                      />
                      <Text mt="1" bold fontSize="sm">{title}</Text>
                      <Text fontSize="xs">{item.name}</Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.color}
                      </Text>
                    </VStack>
                  )
                )}
              </HStack>
            </Box>
          ))
        ) : (
          <Center mt="6">
            <Text fontSize="md" color="gray.500">
              Bu havaya uygun kıyafetin yok.
            </Text>
          </Center>
        )}

        <Button mt="6" colorScheme="dark" onPress={() => fetchOutfitSuggestions(selectedDay.temp)}>
          Kombinleri Yenile
        </Button>
      </VStack>
    </ScrollView>
  );
}
