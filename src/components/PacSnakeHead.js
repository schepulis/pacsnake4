import React from 'react';
import { View, StyleSheet } from 'react-native';


export default function PacSnakeHead ({ position, size }) {
    return (
        <View 
            style={{
                width: size,
                height: size,
                backgroundColor: 'yellow',
                position: 'absolute',
                left: position[0] * size,
                top: position[1] * size,
                borderRadius: 10,

            }}
        ></View>
    );
}


const styles = StyleSheet.create({
  });