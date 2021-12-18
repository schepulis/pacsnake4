import Constants from "../../Constants";

const randomPositions = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

export default function (entities, { events, dispatch }) {
    const head = entities.head;
    const pellet = entities.Pellet;
    const tail = entities.tail;

    console.log(pellet.position[0], ",", pellet.position[1])
    console.log(head.position[0], ",", head.position[1])
    
    if (events.length) {
        events.forEach((e) => {
          switch (e) {
            case "move-up":
              if (head.yspeed === 1) return;
              head.yspeed = -1;
              head.xspeed = 0;
              return;
            case "move-right":
              if (head.xspeed === -1) return;
              head.xspeed = 1;
              head.yspeed = 0;
              return;
            case "move-down":
              if (head.yspeed === -1) return;
              head.yspeed = 1;
              head.xspeed = 0;
              console.log("ping")
              return;
            case "move-left":
              if (head.xspeed === 1) return;
              head.xspeed = -1;
              head.yspeed = 0;
              return;
          }
        });
      }


    head.nextMove -= 1;
    if (head.nextMove === 8
        ) {
        head.nextMove = head.tickRate;
        
        
        if (
            head.position[0] + head.xspeed < 0 ||
            head.position[0] + head.xspeed >= Constants.GRID_SIZE_ROW-1 ||
            head.position[1] + head.yspeed < 0 ||
            head.position[1] + head.yspeed >= Constants.GRID_SIZE_COL-1
          ) {
            dispatch("game-over");
        } else {
                tail.elements = [[head.position[0], head.position[1]], ...tail.elements];
                tail.elements.pop();

                head.position[0] += head.xspeed;
                head.position[1] += head.yspeed;
          
                tail.elements.forEach((el, idx) => {
                  if (
                    head.position[0] === el[0] &&
                    head.position[1] === el[1] 
                  )
                    dispatch("game-over");
                });
                if (
                  head.position[0] == pellet.position[0] &&
                  head.position[1] == pellet.position[1]
                ) {
                  tail.elements = [
                    [head.position[0], head.position[1]],
                    ...tail.elements,
                  ];
          
                  pellet.position = [
                    randomPositions(0, Constants.GRID_SIZE_ROW - 1),
                    randomPositions(0, Constants.GRID_SIZE_COL - 1),
                  ];
                }
              }




      }
    

    return entities;

}