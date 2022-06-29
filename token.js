const Big = require('big.js');


const TOKEN_UNITS = {
  "acudos": {
    "display": "CUDOS",
    "exponent": 18
  },
  "fcudos": {
    "display": "CUDOS",
    "exponent": 15
  },
  "pcudos": {
    "display": "CUDOS",
    "exponent": 12
  },
  "ncudos": {
    "display": "CUDOS",
    "exponent": 9
  },
  "ucudos": {
    "display": "CUDOS",
    "exponent": 6
  },
  "mcudos": {
    "display": "CUDOS",
    "exponent": 3
  },
  "cudos": {
    "display": "CUDOS",
    "exponent": 1
  }
};

module.exports.FormatToken = (value, denom = '') => {
    if (typeof value !== 'string' && typeof value !== 'number') {
      value = '0';
    }
  
    if (typeof value === 'number') {
      value = `${value}`;
    }

    const selectedDenom = TOKEN_UNITS[denom];

    if (!selectedDenom) {
      throw `invalid denom ${denom}`;
    }
  
    const ratio = 10 ** selectedDenom.exponent;

    let result = {};
    result.value = Big(value).div(ratio).toFixed(selectedDenom.exponent);
    result.displayDenom = selectedDenom.display;
    return result;
};