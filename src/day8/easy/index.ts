import input from '../input';

interface IOperation {
  operation: 'acc' | 'jmp' | 'nop',
  value: number,
};

interface IOperationWithCounter extends IOperation {
  counter: number,
}

interface IState {
  acc: number,
  commandPosition: number,
};

interface IAbstractResponse {
  state: IState,
  operation: IOperationWithCounter | null,
  result: 'ok' | 'loop' | 'out max' | 'out min',
};

interface ISuccessResponse extends IAbstractResponse {
  operation: IOperationWithCounter,
  result: 'ok' | 'loop',
}

interface IErrorResponse extends IAbstractResponse {
  operation: null,
  result: 'out max' | 'out min',
}

type TProceedResponse = ISuccessResponse | IErrorResponse;


const inputFormatted: IOperation[] = input.split('\n')
  .map((el) => {
    const [operation, value] = el.split(' ') as [IOperation['operation'], IOperation['value']];
    return {
      operation,
      value: Number(value),
    }
  });


class IntCodeComputer {
  private commands: typeof inputFormatted;
  private state: IState;
  private memory: TProceedResponse[];
  private loopMemory: { [key: number]: true };

  constructor(commands: typeof inputFormatted) {
    this.commands = commands;
    this.state = { acc: 0, commandPosition: 0 };
    this.memory = [];
    this.loopMemory = {};
  }

  proceedCommand(): TProceedResponse {
    const result = this.makeOperation();
    this.memory.push(result);
    return result;
  }

  getHistory(): TProceedResponse[] {
    return this.memory;
  }

  private makeOperation(): TProceedResponse {
    const copyOfState = { ...this.state };
    if (this.state.commandPosition >= this.commands.length) {
      return {
        state: copyOfState ,
        result: 'out max',
        operation: null,
      }
    }

    if (this.state.commandPosition < 0) {
      return {
        state: copyOfState,
        result: 'out min',
        operation: null,
      }
    }

    const currentCommand = this.commands[this.state.commandPosition];
    const isLoop = Boolean(this.loopMemory[this.state.commandPosition]);
    this.loopMemory[this.state.commandPosition] = true;
    if (!isLoop) {
      switch (currentCommand.operation) {
        case 'acc':
          this.state.acc += currentCommand.value;
          this.state.commandPosition += 1;
          break
  
        case 'jmp': 
          this.state.commandPosition += currentCommand.value;
          break;
        
        case 'nop':
          this.state.commandPosition += 1;
          break;
      }
    }

    return {
      state: copyOfState,
      result: isLoop ? 'loop' : 'ok',
      operation: { ...currentCommand, counter: this.memory.length + 1 },
    }
  }
}

function main(): number {
  const computer = new IntCodeComputer(inputFormatted);
  let response: TProceedResponse = computer.proceedCommand();
  while (response.result === 'ok') {
    response = computer.proceedCommand();
  }
  return response.state.acc;
}

console.log(`Result of day8/easy -> ${main()}`);
