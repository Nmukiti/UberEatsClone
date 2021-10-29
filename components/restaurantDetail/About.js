import React from 'react'
import { View, Text, Image } from 'react-native' 

export default function About(props) {

    const { name, image, price, reviews, rating, categories } = props.route.params;

    const formattedCategories = categories.map((cat) => cat.title).join(" • ");

    const description = `${formattedCategories} ${
        price ? " • " + price : ""
         } • 🎫 • ${rating} ⭐ (${reviews}+)`;
    return (
        <View>
           <RestaurantImage image={image}/>
           <RestaurantName name={name}/> 
           <RestaurantDescription description={description}/>
        </View>
    );
}

const RestaurantImage = (props) => (
    <Image source={{uri: props.image}} style={{ width: "100%", height: 170 }}/>
);

const RestaurantName = (props) => (
        <Text 
          style={{
              fontSize: 20,
              fontWeight: "600",
              marginTop: 10,
              marginHorizontal: 15
          }}>
            {props.name}
        </Text>
);

const RestaurantDescription = (props) => (
    <Text 
      style={{
          marginHorizontal: 15,
          marginTop: 10,
          fontWeight: "400",
          fontSize: 15
      }}>
          {props.description}</Text>
)
