import React from 'react';
import { View } from 'react-native';

export default function Pellet({ position, size }) {
    return ( 
        <View
            style = {{
                width: size/2,
                height: size/2,
                backgroundColor: '#DEA185',
                position: 'absolute',
                left: (position[0] * size) + 5,
                top: (position[1] * size) + 5,
                borderRadius: 5,
            }}
        ></View>
    );
}