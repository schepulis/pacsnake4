import { Dimensions } from 'react-native';

export default {
    BOARD_WIDTH: Math.round(  (Dimensions.get('screen').width) * .95  ),
    BOARD_HEIGHT: Math.round(  (Dimensions.get('screen').height)  * .6  ),
    CELL_SIZE: 20,
    GRID_SIZE_ROW: Math.round(  ((Dimensions.get('screen').width) * .95) / 20 ),
    GRID_SIZE_COL: Math.round(  ((Dimensions.get('screen').height)  * .6) / 20 ),
};