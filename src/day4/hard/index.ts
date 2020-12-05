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
  const requiredKeys = [
    { 
      key: 'byr', 
      validate: function(input: string): boolean {
        return Number(input) >= 1920 && Number(input) <= 2002;
      } 
    }, 
    {
      key: 'iyr', 
      validate: function(input: string): boolean {
        return Number(input) >= 2010 && Number(input) <= 2020;
      } 
    },
    {
      key: 'eyr', 
      validate: function(input: string): boolean {
        return Number(input) >= 2020 && Number(input) <= 2030;
      } 
    },
    {
      key: 'hgt', 
      validate: function(input: string): boolean {
        if (input.endsWith("cm"))
          return parseInt(input) >= 150 && parseInt(input) <= 193;
        if (input.endsWith("in"))
          return parseInt(input) >= 59 && parseInt(input) <= 76;
        return false;
      } 
    },
    {
      key: 'hcl', 
      validate: function(input: string): boolean {
        return /^#[0-9a-f]{6}$/.test(input);
      } 
    },
    {
      key: 'ecl', 
      validate: function(input: string): boolean {
        const validValues = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        return validValues.includes(input);
      } 
    },
    {
      key: 'pid', 
      validate: function(input: string): boolean {
        return Boolean(input.match(/^[0-9]{9}$/));
      } 
    }
  ];
 
  const countOfValidPassports = formatedInput.reduce((count, passport) => {
    const isAllKeysValid = requiredKeys.every((el) => passport[el.key] && el.validate(passport[el.key]));

    if (isAllKeysValid) {
      count += 1;
    }
    return count;
  }, 0);
  return countOfValidPassports;
}

console.log(`Result of day4/hard -> ${main()}`);
