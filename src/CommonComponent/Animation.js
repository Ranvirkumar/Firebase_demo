import React, { useState } from 'react';
import { Animated,Easing } from 'react-native';



export const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export const SlideUpAnim = (props) => {
  const [slideUpValue] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      slideUpValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        transform: [
          {
            translateY: slideUpValue.interpolate({
              inputRange: [0, 1],
              outputRange: [500, 0]
            })
          }
        ],
        opacity: slideUpValue,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export const LeftToRightAnim = (props) => {
  const [LeftToRightValue] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      LeftToRightValue,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        transform: [
          {
            translateX: LeftToRightValue.interpolate({
              inputRange: [0, 1],
              outputRange: [-400, 0]
            })
          }
        ],
        opacity: LeftToRightValue,
      }}
    >
      {props.children}
    </Animated.View>
  );
}

export const RotateAnim = (props) => {
  const [RotateValue] = useState(new Animated.Value(0))  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      RotateValue,
      {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
        easing: Easing.linear
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        
        transform: [
          {
            rotate: RotateValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            })
          }
        ],
        opacity: RotateValue,
      }}
    >
      {props.children}
    </Animated.View>
  );
}