import { NodeArray } from 'typescript';
import input from '../input';

const inputFormatted = input.split('\n\n').map((el) => ({
  tile: el.split('\n')[0].slice(5,9),
  image: el.split('\n').slice(1).map((str) => str.split('')),
}));

function flipArray(direction: 'vertical' | 'horizontal', arr: string[][]): string[][] {
  if (direction === 'vertical') {
    return [...arr].reverse();
  }
  return [...arr].map((el) => [...el].reverse());
}

function rotateArray(amount: number, arr: string[][]): string[][] {
  let copyOfArr = [...arr].map((el) => [...el]);
  for (let i = 0; i < amount; i += 1) {
    copyOfArr = copyOfArr[0].map((val, index) => copyOfArr.map(row => row[index]).reverse());
  }
  return copyOfArr;
}

// [x][y];
let field = new Array(30)
  .fill(null)
  .map((el) => new Array(30).fill(null));

field[15][15] = inputFormatted.splice(0, 1)[0];

type TFill = {
  index: {
    x: number,
    y: number,
  },
  connections: {
    top?: typeof inputFormatted[number],
    bottom?: typeof inputFormatted[number],
    left?: typeof inputFormatted[number],
    right?: typeof inputFormatted[number],
  }
};

const needToFill: TFill[] = [{ index: { x: 14, y: 15 }, connections: {
  bottom: field[15][15]
}}, { index: { x: 16, y: 15 }, connections: {
  top: field[15][15]
}}, { index: { x: 15, y: 16 }, connections: {
  left: field[15][15]
}}, { index: { x: 15, y: 14 }, connections: {
  right: field[15][15]
}}];

function tryToConnect(el: typeof inputFormatted[number], index: number): void {
  for (let i = 0; i < needToFill.length; i += 1) {
    const possibility = needToFill[i];
    const res = isValidConnect(el, possibility);
    if (res.state) {
      let elFromInput = inputFormatted.splice(index, 1)[0];
      elFromInput.image = res.newImage;
      field[possibility.index.x][possibility.index.y] = elFromInput;

      needToFill.splice(i, 1);
      const possibleMoves = [{ move: [0, 1], dir: 'left' }, { move: [1, 0], dir: 'top' }, { move: [-1, 0], dir: 'bottom' }, { move: [0, -1], dir: 'right' }]
        .filter((el) => !field[el.move[0] + possibility.index.x][el.move[1] + possibility.index.y]) as { move: [number, number], dir: 'right' | 'left' | 'top' | 'bottom' }[];

      possibleMoves.forEach((el) => {
        const elToFillIndexes = [el.move[0] + possibility.index.x, el.move[1] + possibility.index.y];
        const elToFill = needToFill.find((point) => {
          return point.index.x === elToFillIndexes[0] && point.index.y === elToFillIndexes[1];
        });
        if (elToFill) {
          elToFill.connections[el.dir] = elFromInput;
        } else {
          needToFill.push({
            index: {
              x: elToFillIndexes[0],
              y: elToFillIndexes[1],
            }, 
            connections: {
              [el.dir]: elFromInput,
            }
          });
        }
      });
      break;
    }
  }
}

type TValidConnectResponse = {
  state: false,
} | {
  state: true,
  newImage: string[][]
};

function connectTwoElements(connectDir: 'right' | 'left' | 'top' | 'bottom', connector: typeof inputFormatted[number]['image'], main: typeof inputFormatted[number]['image']): boolean {
  if (connectDir === 'left') {
    return connector.map((el) => el[el.length - 1]).join('') === main.map((el) => el[0]).join('');
  }
  if (connectDir === 'right') {
    return connector.map((el) => el[0]).join('') === main.map((el) => el[el.length - 1]).join('');
  }
  if (connectDir === 'top') {
    return connector[connector.length - 1].join('') === main[0].join('');
  }
  return connector[0].join('') === main[main.length - 1].join('');
}

function isValidConnect(el: typeof inputFormatted[number], possibility: typeof needToFill[number]): TValidConnectResponse {
  const swaps = [{ vertical: false, horizontal: false }, { vertical: true, horizontal: false }, { vertical: false, horizontal: true}, { vertical: true, horizontal: true }];
  for (let i = 0; i < swaps.length; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      const swap = swaps[i];
      let swappedImage = el.image;
      if (swap.horizontal) {
        swappedImage = flipArray('horizontal', swappedImage);
      }

      if (swap.vertical) {
        swappedImage = flipArray('vertical', swappedImage);
      }

      swappedImage = rotateArray(j, swappedImage);

      if (Object.entries(possibility.connections).every((value) => {
        return connectTwoElements(value[0] as 'right' | 'left' | 'top' | 'bottom', value[1]!.image, swappedImage)
      })) {
        return {
          state: true,
          newImage: swappedImage,
        }
      }
    }
  };

  return {
    state: false,
  }
}

const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `;

const monsterPositions = monster.split('\n').map((el) => el.split('')).reduce<{x: number, y: number}[]>((acc, row, rowIndex) => {
  row.forEach((el, elIndex) => {
    if (el === '#') {
      acc.push({
        x: rowIndex,
        y: elIndex,
      });
    }
  });
  return acc;
}, []);

function getElementOfField(x: number, y: number, imageToCheck: { value: string, isMonster: boolean }[][]): string | undefined {
  if (imageToCheck[x] && imageToCheck[x][y]) {
    return imageToCheck[x][y].value;
  }
}

function checkMonsterOnPosition(x: number, y: number, imageToCheck: { value: string, isMonster: boolean }[][]): void {
  if (monsterPositions.every((el) => {
    return getElementOfField(x + el.x, y + el.y, imageToCheck) === '#';
  })) {
    monsterPositions.forEach((el) => {
      imageToCheck[x + el.x][y + el.y].isMonster = true;
    });
  }
}

function main(): number {
  while (inputFormatted.length) {
    for (let i = 0; i < inputFormatted.length; i += 1) {
      const element = inputFormatted[i];
      tryToConnect(element, i);
    }
  }

  field = field.map((el) => el.filter(Boolean));
  field = field.filter((el) => el.length);
  field = field.map((el) => {
      return el.reduce((acc, el) => {
          acc.push(el.image.slice(1, el.image.length - 1).map((val: string[]) => val.slice(1, val.length - 1)));
          return acc;
      }, []);
  });

  field = field.reduce((acc, image, index) => {
      image.forEach((row) => {
          for (let i = 0; i < row.length; i += 1) {
              acc[index * row.length + i % row.length] = acc[index * row.length + i % row.length] || [];
              acc[index * row.length + i % row.length] = [...acc[index * row.length + i % row.length], ...row[i]]
          }
      })
      return acc;
  }, []);

  field = field.map((row) => {
    return row.map((el) => ({ value: el, isMonster: false }));
  });

  let minAmount = Infinity;

  const swaps = [{ vertical: false, horizontal: false }, { vertical: true, horizontal: false }, { vertical: false, horizontal: true}, { vertical: true, horizontal: true }];
  for (let i = 0; i < swaps.length; i += 1) {
    for (let j = 0; j < 4; j += 1) {
      const copyOfField = [...field].map((el) => [...el].map((obj) => ({...obj})));
      const swap = swaps[i];
      let swappedImage = copyOfField;
      if (swap.horizontal) {
        swappedImage = flipArray('horizontal', swappedImage);
      }

      if (swap.vertical) {
        swappedImage = flipArray('vertical', swappedImage);
      }

      swappedImage = rotateArray(j, swappedImage);

      swappedImage.forEach((row, rowIndex) => {
        row.forEach((el, elIndex) => {
          checkMonsterOnPosition(rowIndex, elIndex, swappedImage);
        });
      });
    
      let amountOfNotMonsters = 0;
      swappedImage.forEach((row) => {
        row.forEach((el) => {
          if (el.value === '#' && !el.isMonster) {
            amountOfNotMonsters += 1;
          }
        });
      });
      minAmount = Math.min(amountOfNotMonsters, minAmount);
    }
  }

  return minAmount;
}

console.log(`Result of day20/easy -> ${main()}`);
