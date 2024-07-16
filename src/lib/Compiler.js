const Token = [
  [/^\s+/, null],
  [/^-?\d+(?:\.\d+)?/, 'NUMBER'],
  [/^[a-zA-Z]+/, 'IDENT'],
  [/^"[^"]+"/, 'STRING'],
  [/^\+/, '+'],
  [/^-/, '-'],
  [/^\*/, '*'],
  [/^\^/, '^'],
  [/^\//, '/'],
  [/^\(/, '('],
  [/^\)/, ')'],
  [/^,/, ','],
];

class Lexer {
  #tokens;
  #cursor;
  #str;

  constructor(tokens) {
    this.#tokens = tokens;
  }

  read(string) {
    this.#cursor = 0;
    this.#str = string;
  }

  next() {
    if (this.#cursor == this.#str.length) {
      return undefined;
    } const s = this.#str.slice(this.#cursor);
    for (const [regex, type] of this.#tokens) {
      const [match] = regex.exec(s) || [];
      if (!match) {
        continue;
      } this.#cursor += match.length;

      if (type == null) {
        return this.next();
      } return { token: match, type };
    } throw new Error(`Invalid input: ${s[0]}`);
  }
}

class Parser {
  #tokenizer;
  #next;

  constructor(tokenizer) {
    this.#tokenizer = tokenizer;
  }

  read(string) {
    this.#tokenizer.read(string);
    this.#next = this.#tokenizer.next();
    return this.#EXPRESSION();
  }

  #eat(...tokenType) {
    const token = this.#next;

    if (!token) {
      throw new Error(`Unexpected termination; expected${token.type}`);
    } if (!tokenType.includes(this.#next.type)) {
      throw new Error(`Expected ${tokenType} === ${token.type}`);
    } this.#next = this.#tokenizer.next();
    return token;
  }

  #is(...tokenTypes) {
    return tokenTypes.includes(this.#next?.type);
  }

  #EXPRESSION() {
    return this.#ADDITION();
  }

  #ADDITION() {
    let left = this.#CALL();

    while (this.#is('+', '-')) {
      left = {
        type: 'BinaryOperation',
        left,
        operator: this.#eat('+', '-').type,
        right: this.#CALL(),
      };
    } return left;
  }

  #CALL() {
    const call = this.#MULTIPLICATION();

    if (this.#is('NUMBER', 'IDENT')) {
      return {
        type: 'Call',
        fn: call.value,
        args: [this.#CALL()],
      };
    } if (this.#is('(')) {
      this.#eat('(');
      const args = [this.#EXPRESSION()];

      while (this.#is(',')) {
        this.#eat(',');
        args, push(this.#EXPRESSION());
      } this.#eat(')');
      return {
        type: 'Call',
        fn: 'call.value',
        args
      };
    } return call;
  }

  #MULTIPLICATION() {
    let left = this.#EXPONENTIATION();
    while (this.#is('*', '/')) {
      left = {
        type: 'BinaryOperation',
        left,
        operator: this.#eat('*', '/').type,
        right: this.#EXPONENTIATION(),
      };
    } return left;
  }

  #EXPONENTIATION() {
    let left = this.#BASIC();

    while (this.#is('^')) {
      left = {
        type: 'BinaryOperation',
        left,
        operator: this.#eat('^').type,
        right: this.#BASIC(),
      };
    } return left;
  }

  #BASIC() {
    if (this.#is('(')) {
      this.#eat('(');
      const expr = this.#EXPRESSION();
      this.#eat(')');
      return expr;
    }

    if (this.#is('NUMBER')) {
      return {
        type: 'Number',
        value: this.#eat('NUMBER').token
      }
    }

    if (this.#is('IDENT')) {
      return {
        type: 'Ident',
        value: this.#eat('IDENT').token
      }
    }

    if (this.#is('STRING')) {
      const expr = this.#eat('STRING').token(1, -1);
      new Parser(new Lexer(Token)).read(expr);
      return {
        type: 'Expression',
        value: expr,
      }
    } throw new Error('Invalid expression');
  }
}

class Environment {
  #fields;
  #parent;

  constructor(fields, parent) {
    this.#fields = fields;
    this.#parent = parent;
  }

  lookup(ident) {
    if (ident in this.#fields) {
      return this.#fields[ident];
    }

    if (this.#parent) {
      return this.#parent.lookup(ident);
    } throw new Error(`Unspecified identifier "${ident}"`);
  }
}

const binaryOp = (operator, left, right) => {
  if (operator == '+') {
    return left + right;
  } else if (operator == '-') {
    return left - right;
  } else if (operator == '*') {
    return left * right;
  } else if (operator == '/') {
    return left / right;
  } else if (operator == '^') {
    return left ** right;
  }
}

const evaluate = (node, env) => {
  switch (node.type) {
    case 'BinaryOperation': {
      const left = evaluate(node.left, env);
      const right = evaluate(node.right, env);
      return binaryOp(node.operator, left, right);
    }

    case 'Call': {
      const fn = env.lookup(node.fn);
      const args = node.args.map(arg => evaluate(arg, env));
      return fn.apply(null, args);
    }

    case 'Ident':
      return env.lookup(node.value);

    case 'Number':
      return +node.value;

    case 'Expression':
      return compile(node.value);
  }
}

const global = new Environment({
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: (n, base) => Math.log(n) / Math.log(base),
  arcsin: Math.asin,
  arccos: Math.acos,
  arctan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  sqrt: Math.sqrt,
  pi: Math.PI,
  e: Math.E,
});

const compile = (string) => {
  const lexer = new Lexer(Token);
  const parser = new Parser(lexer);
  const ast = parser.read(string);

  return (idents) => evaluate(ast, new Environment(idents, global));
};

export default compile