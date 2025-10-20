// Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Mapping for random generators
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Copy to clipboard
clipboardEl.addEventListener('click', () => {
  const password = resultEl.innerText;
  if (!password) return;
  navigator.clipboard.writeText(password).then(() => {
    alert('Password copied to clipboard!');
  }).catch(() => {
    alert('Could not copy to clipboard.');
  });
});

// Generate password on button click
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

/**
 * Generate password by distributing chosen types evenly then slicing to length
 * @param {boolean} lower
 * @param {boolean} upper
 * @param {boolean} number
 * @param {boolean} symbol
 * @param {number} length
 * @returns {string}
 */
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  const typesCount = lower + upper + number + symbol;
  const typesArr = [
    { lower },
    { upper },
    { number },
    { symbol }
  ].filter(item => Object.values(item)[0]);

  if (typesCount === 0) return '';

  // Add characters in cycles to ensure inclusion of each chosen type
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  // Trim to requested length
  return generatedPassword.slice(0, length);
}

// Random helpers
function getRandomLower() {
  // a - z -> 97 - 122
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  // A - Z -> 65 - 90
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  // 0 - 9 -> 48 - 57
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/.,';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
