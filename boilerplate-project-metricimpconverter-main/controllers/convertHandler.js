function ConvertHandler() {
  
  this.getNum = function(input) {
    let numRegex = /^[0-9.\/]+/;
    let match = input.match(numRegex);

    if (!match) return 1; // no hay número explícito

    let numString = match[0];
    let fractionCount = (numString.match(/\//g) || []).length;
    if (fractionCount > 1) return null;

    if (numString.includes('/')) {
      let [numerator, denominator] = numString.split('/');
      let result = parseFloat(numerator) / parseFloat(denominator);
      return isNaN(result) ? null : result;
    }

    let result = parseFloat(numString);
    return isNaN(result) ? null : result;
  };

  
  this.getUnit = function(input) {
    // Extract unit from input (everything after the numbers)
    let unitRegex = /[a-zA-Z]+$/;
    let match = input.match(unitRegex);
    
    if (!match) {
      return null;
    }
    
    let unit = match[0];
    if (!unit) return null;
    unit = unit === 'L' || unit === 'l' ? 'L' : unit.toLowerCase();

    
    // Valid units: gal, L, mi, km, lbs, kg
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    if (validUnits.includes(unit)) {
      // Return 'L' capitalized, others lowercase
      return unit === 'l' ? 'L' : unit;
    }
    
    return null;
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    
    return unitNames[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
    }
    
    return Math.round(result * 100000) / 100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;