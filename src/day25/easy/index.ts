import input from '../input';

const [cardPublicKey, doorPublicKey] = input.split('\n').map(BigInt);

function decrypt(input: bigint): bigint {
  let value = BigInt(1);
  let repeat = BigInt(0);
  while (value !== input) {
    repeat += BigInt(1);
    value = (value * BigInt(7)) % BigInt(20201227);
  }

  return repeat;
}

function main(): bigint {
  return decrypt(cardPublicKey);
}

console.log(`Result of day25/easy -> Wolfram ${doorPublicKey} ^ ${main()} mod 20201227`);
// console.log(`Result of day25/easy -> ${(doorPublicKey ** main()) % BigInt(20201227) }`);
