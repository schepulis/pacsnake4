import React from 'react';
import { View } from 'react-native';
import Constants from '../../Constants';

export default function Tail({ elements, position, size, width, height }) {
    const tailArray = elements.map((el, idx) => (
        <View
            key={idx}
            style={{
                width: size,
                height: size, 
                position: 'absolute',
                left: el[0] * size,
                top: el[1] * size,
                backgroundColor: "FFFF00",
            }}
        />
    ));
    return (
        <View
            style={{
                //width: Constants.GRID_SIZE_ROW * size,
                //height: Constants.GRID_SIZE_COL * size
                width: 100,
                height: 100

            }}
        >
            {tailArray}
        </View>
    );
}