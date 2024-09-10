import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import tw from "twrnc";
import { Text, View } from "react-native";

const RatingComponent = ({ count, rate }: {count: number, rate: number}) => {
  const fullStars = Math.floor(rate); // Full stars
  const halfStar = rate % 1 !== 0 ? 1 : 0; // 1 for half star, 0 otherwise
  const emptyStars = Math.max(5 - fullStars - halfStar, 0); // Ensure non-negative empty stars
  

  return (
    <View style={tw`flex-row items-center`}>
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Icon key={`full-${index}`} name="star" size={30} color="#FFD700" />
      ))}

      {/* Render half star if applicable */}
      {halfStar === 1 && <Icon key="half-star" name="star-half" size={30} color="#FFD700" />}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Icon key={`empty-${index}`} name="star-o" size={30} color="#111" />
      ))}

      {/* Display the rating count */}
      <Text style={tw`ml-2 text-gray-600`}>({count} reviews)</Text>
    </View>
  );
};

export default RatingComponent;
