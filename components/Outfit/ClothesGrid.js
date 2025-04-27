import React from "react";
import { VStack, HStack, Image } from "native-base";

export default function ClothesGrid({ clothes }) {
  const rows = [];
  for (let i = 0; i < clothes.length; i += 2) {
    rows.push(clothes.slice(i, i + 2));
  }

  return (
    <VStack space={1}>
      {rows.map((row, rowIndex) => (
        <HStack key={rowIndex} space={1}>
          {row.map((cloth, index) => (
            <Image
              key={`${rowIndex}-${index}`}
              source={{ uri: cloth.image_url }}
              alt={cloth.name}
              width={60}
              height={60}
              borderRadius="md"
              resizeMode="cover"
              bg="gray.100"
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
