import input from '../input';

const inputFormatted = input.split('\n').map((el) => el.replace(/\s/g, ''));

function elementIsNumber(el: string): boolean {
  return !isNaN(parseInt(el));
}

function infixToPostfix(infixInput: string): string {
  let outputQueue = '';
  const operatorStack = [];
  const operators = {
    '*': {
      precedence: 1,
    },
    '+': {
      precedence: 2,
    },
  }

  const infix = infixInput.replace(/\s+/g, '').split(/([\+\*\(\)])/).filter((el) => el.length);

  for(let i = 0; i < infix.length; i+= 1) {
    const token = infix[i];
    if (elementIsNumber(token)) {
      outputQueue += token + ' ';
    } else if ('*+'.includes(token)) {
      const o1 = token as '*' | '+';
      let o2 = operatorStack[operatorStack.length - 1];
      while ('*+'.includes(o2) && operators[o1].precedence <= operators[o2 as '*' | '+'].precedence) {
        outputQueue += operatorStack.pop() + ' ';
        o2 = operatorStack[operatorStack.length - 1];
      }
      operatorStack.push(o1);
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while(operatorStack[operatorStack.length - 1] !== '(') {
        outputQueue += operatorStack.pop() + ' ';
      }
      operatorStack.pop();
    }
  }

  while(operatorStack.length > 0) {
    outputQueue += operatorStack.pop() + ' ';
  }

  return outputQueue;
}

function solvePostfix(postfixInput: string): number {
  const resultStack: Array<string | number> = [];
  const postfix = postfixInput.split(' ').filter((el) => el.length);
  for(let i = 0; i < postfix.length; i += 1) {
    if (elementIsNumber(postfix[i])) {
      resultStack.push(postfix[i]);
    } else {
      const a = resultStack.pop() as string;
      const b = resultStack.pop() as string;
      if(postfix[i] === '+') {
        resultStack.push(parseInt(a) + parseInt(b));
      } else if(postfix[i] === '-') {
        resultStack.push(parseInt(b) - parseInt(a));
      } else if(postfix[i] === '*') {
        resultStack.push(parseInt(a) * parseInt(b));
      } else if(postfix[i] === '/') {
        resultStack.push(parseInt(b) / parseInt(a));
      } else if(postfix[i] === '^') {
        resultStack.push(Math.pow(parseInt(b), parseInt(a)));
      }
    }
  }

  return resultStack.pop() as number;
}


function main(): number {
  return inputFormatted.reduce((acc, el) => {
    return acc + solvePostfix(infixToPostfix(el));
  }, 0);
}

console.log(`Result of day18/hard -> ${main()}`);
