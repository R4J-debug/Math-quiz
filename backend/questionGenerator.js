// Dynamic math question generator

let questionIdCounter = 1;

function generateQuestion() {
  const types = [
    'addition',
    'subtraction', 
    'multiplication',
    'division',
    'algebra',
    'squares',
    'modulo',
    'mixed'
  ];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const difficulty = Math.floor(Math.random() * 3) + 1; // 1-3
  
  const id = questionIdCounter++;
  
  switch (type) {
    case 'addition':
      return generateAddition(id, difficulty);
    case 'subtraction':
      return generateSubtraction(id, difficulty);
    case 'multiplication':
      return generateMultiplication(id, difficulty);
    case 'division':
      return generateDivision(id, difficulty);
    case 'algebra':
      return generateAlgebra(id, difficulty);
    case 'squares':
      return generateSquares(id, difficulty);
    case 'modulo':
      return generateModulo(id, difficulty);
    case 'mixed':
      return generateMixed(id, difficulty);
    default:
      return generateAddition(id, difficulty);
  }
}

function generateAddition(id, difficulty) {
  const max = difficulty * 50;
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * max) + 1;
  
  return {
    id,
    type: 'addition',
    difficulty,
    question: `${a} + ${b} = ?`,
    answer: a + b
  };
}

function generateSubtraction(id, difficulty) {
  const max = difficulty * 50;
  const a = Math.floor(Math.random() * max) + 20;
  const b = Math.floor(Math.random() * (a - 1)) + 1;
  
  return {
    id,
    type: 'subtraction',
    difficulty,
    question: `${a} - ${b} = ?`,
    answer: a - b
  };
}

function generateMultiplication(id, difficulty) {
  const max = difficulty * 12;
  const a = Math.floor(Math.random() * max) + 2;
  const b = Math.floor(Math.random() * max) + 2;
  
  return {
    id,
    type: 'multiplication',
    difficulty,
    question: `${a} × ${b} = ?`,
    answer: a * b
  };
}

function generateDivision(id, difficulty) {
  const divisor = Math.floor(Math.random() * (difficulty * 10)) + 2;
  const quotient = Math.floor(Math.random() * (difficulty * 10)) + 1;
  const dividend = divisor * quotient;
  
  return {
    id,
    type: 'division',
    difficulty,
    question: `${dividend} ÷ ${divisor} = ?`,
    answer: quotient
  };
}

function generateAlgebra(id, difficulty) {
  const a = Math.floor(Math.random() * (difficulty * 10)) + 2;
  const b = Math.floor(Math.random() * (difficulty * 20)) + 5;
  const x = Math.floor(Math.random() * 20) + 1;
  const result = a * x + b;
  
  return {
    id,
    type: 'algebra',
    difficulty,
    question: `Solve for x: ${a}x + ${b} = ${result}`,
    answer: x
  };
}

function generateSquares(id, difficulty) {
  const base = Math.floor(Math.random() * (difficulty * 5)) + 2;
  
  return {
    id,
    type: 'squares',
    difficulty,
    question: `What is ${base}² (${base} squared)?`,
    answer: base * base
  };
}

function generateModulo(id, difficulty) {
  const a = Math.floor(Math.random() * (difficulty * 30)) + 10;
  const b = Math.floor(Math.random() * 10) + 3;
  
  return {
    id,
    type: 'modulo',
    difficulty,
    question: `${a} mod ${b} = ?`,
    answer: a % b
  };
}

function generateMixed(id, difficulty) {
  const a = Math.floor(Math.random() * 20) + 2;
  const b = Math.floor(Math.random() * 10) + 2;
  const c = Math.floor(Math.random() * 10) + 1;
  
  const operations = [
    { q: `(${a} + ${b}) × ${c}`, a: (a + b) * c },
    { q: `${a} × ${b} - ${c}`, a: a * b - c },
    { q: `(${a * c}) ÷ ${c} + ${b}`, a: a + b },
  ];
  
  const op = operations[Math.floor(Math.random() * operations.length)];
  
  return {
    id,
    type: 'mixed',
    difficulty,
    question: `${op.q} = ?`,
    answer: op.a
  };
}

function checkAnswer(question, userAnswer) {
  const parsed = parseFloat(userAnswer);
  if (isNaN(parsed)) return false;
  return parsed === question.answer;
}

module.exports = {
  generateQuestion,
  checkAnswer
};

