import input from '../input';

const formatedInput = input.split('\n').reduce<Array<{ [key: string]: string }>>((acc, el) => {
  if (el === '') {
    acc.push({});
  } else {
    el.split(' ').forEach((str) => {
      const [key, value] = str.split(':');
      acc[acc.length - 1][key] = value;
    });
  }
  return acc;
}, [{}]);

function main(): number {
  const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
 
  const countOfValidPassports = formatedInput.reduce((count, passport) => {
    const passportHaveAllKeys = requiredKeys.reduce((valid, el) => {
      return Boolean(valid && passport[el]);
    }, true);

    if (passportHaveAllKeys) {
      count += 1;
    }
    return count;
  }, 0);
  return countOfValidPassports;
}

console.log(`Result of day4/easy -> ${main()}`);
