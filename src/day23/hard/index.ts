import input from '../input';

const inputFormatted: any = input.split('').map(Number);

for (let i = 10; i <= 1000000; i += 1) {
  inputFormatted.push(i);
}

inputFormatted[0] = {
  value: inputFormatted[0],
  next: null,
};

for (let i = 0; i < inputFormatted.length; i += 1) {
  const pos = i === inputFormatted.length - 1 ? 0 : i + 1;
  if (pos !== 0) {
    inputFormatted[pos] = {
      value: inputFormatted[pos],
      next: null,
    };
  }
  inputFormatted[i].next = inputFormatted[pos];
}

type TLinkedList = {
  value: number,
  next: TLinkedList,
}

const mappedInput = inputFormatted as TLinkedList[]

const hashMap = mappedInput.reduce<{[key: string]: TLinkedList}>((acc, item) => {
  acc[item.value] = item;
  return acc;
}, {});

function spliceThree(item: TLinkedList): [TLinkedList, TLinkedList, TLinkedList] {
  const spliced = [item.next, item.next.next, item.next.next.next] as [TLinkedList, TLinkedList, TLinkedList];
  item.next = item.next.next.next.next;
  return spliced;
}

export function main():number {
  let currentCup = inputFormatted[0];
  let nextCup = null;
  for (let i = 0; i < 10000000; i += 1) {
    const res = spliceThree(currentCup);
    nextCup = currentCup.next;
    let needToFind = currentCup.value - 1;
    let destinationCupValue: null | number = null;
    while (!destinationCupValue) {
      if (needToFind === 0) {
        break;
      }
      if (res.some((el) => el.value === needToFind)) {
        needToFind -= 1;
      } else {
        destinationCupValue = needToFind;
      }
    }
    if (!destinationCupValue) {
      const possibleMax = [1000000, 999999, 999998, 999997];

      destinationCupValue = Math.max(...possibleMax.filter((el) => res.every((part) => part.value !== el)));
    }

    const destinationCup = hashMap[destinationCupValue];
    res[2].next = destinationCup.next;
    destinationCup.next = res[0];
    currentCup = nextCup;
  }
  return hashMap[1].next.next.value * hashMap[1].next.value;
}

console.log(`Result of day23/hard -> ${main()}`);
