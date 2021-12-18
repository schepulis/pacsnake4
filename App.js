import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Constants from './Constants';
import PacSnakeHead from './src/components/PacSnakeHead';
import Pellet from './src/components/Pellet';
import Tail from './src/components/Tail';
import GameLoop from './src/systems/GameLoop';

const windowWidth = Constants.BOARD_WIDTH;
const windowHeight = Constants.BOARD_HEIGHT;
const GridSizeRow = Constants.GRID_SIZE_ROW;
const GridSizeCol = Constants.GRID_SIZE_COL;


const randomPositions = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function App() {
  const engine = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(true);

  const resetPacsnake = () => {
    engine.current.swap({
      head:{
        position: [ Math.round((GridSizeRow/2)) , Math.round((GridSizeCol/2)) ],
        size:Constants.CELL_SIZE,
        tickRate: 10,
        nextMove: 10,
        xspeed: 0,
        yspeed: 0,
        GridSizeRow,
        GridSizeCol,
        renderer: <PacSnakeHead />
      },
      Pellet: {
        position: [
          randomPositions(0, GridSizeRow-1),
          randomPositions(0, GridSizeCol-1),
        ],
        size: Constants.CELL_SIZE,
        renderer: <Pellet />
      },
      tail: {
        size: Constants.CELL_SIZE,
        elements: [],
        renderer: <Tail />
      }
    });
    setIsGameRunning(true);
  };

  return (
    <View style={styles.container}>
      <GameEngine
        ref={engine}
        style={styles.gameBoard}
        entities={{
          head: {
            position: [ Math.round((GridSizeRow/2)) , Math.round((GridSizeCol/2)) ],
            size:Constants.CELL_SIZE,
            tickRate: 10,
            nextMove: 10,
            xspeed: 0,
            yspeed: 0,
            GridSizeRow,
            GridSizeCol,
            renderer: <PacSnakeHead />
          },
          Pellet: {
            position: [
              randomPositions(0, GridSizeRow-1),
              randomPositions(0, GridSizeCol-1),
            ],
            size: Constants.CELL_SIZE,
            renderer: <Pellet />
          },
          tail: {
            size: Constants.CELL_SIZE,
            elements: [],
            renderer: <Tail />
          }
        }}
        systems={ [GameLoop] }
        running={isGameRunning}
        onEvent= {(e) => {
          switch (e) {
            case 'game-over':
              alert('Game over!');
              setIsGameRunning(false);          }
        }}
      />

      <View style={styles.controlContainer}>
        <View style={styles.controllerRow}>
          <TouchableOpacity onPress={() => engine.current.dispatch("move-up")}>
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-left")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
          <View style={[styles.controlBtn, { backgroundColor: null }]} />
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-right")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllerRow}>
          <TouchableOpacity
            onPress={() => engine.current.dispatch("move-down")}
          >
            <View style={styles.controlBtn} />
          </TouchableOpacity>
        </View>
      </View>
      {!isGameRunning && (
        <TouchableOpacity onPress={resetPacsnake}>
          <Text
            style={{
              color: "white",
              marginTop: 15,
              fontSize: 22,
              padding: 10,
              backgroundColor: "grey",
              borderRadius: 10
            }}
          >
            Start New Game
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  gameBoard: {
    width: windowWidth,
    height: windowHeight,
    flex: null,
    backgroundColor: '#333',
    top:50,
  },
  controlContainer: {
    marginTop: 10,
    bottom: 20,
    position: 'absolute',
    width: Constants.BOARD_WIDTH * .95,

  },
  controllerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlBtn: {
    backgroundColor: "yellow",
    width: 100,
    height: 55,
    borderRadius: 50,
  },
});
