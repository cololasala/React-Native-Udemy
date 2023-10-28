import { View } from "react-native";
import { Image } from "react-native-elements";
import React from "react";
import { styles } from "./Carousel.styles";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { useState } from "react";

export function Carousel({ arrayImages, width, height, hideDots }) {
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        containerStyle={styles.dotsContainer}
        dotsLength={arrayImages.length}
        activeDotIndex={activeDotIndex}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />

      {!hideDots && pagination()}
    </View>
  );
}
