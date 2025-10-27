const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

  // 1️⃣ Whole number input
  test('convertHandler should correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  // 2️⃣ Decimal number input
  test('convertHandler should correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2mi'), 3.2);
  });

  // 3️⃣ Fractional input
  test('convertHandler should correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('3/2km'), 1.5);
  });

  // 4️⃣ Fractional input with a decimal
  test('convertHandler should correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('3.5/7kg'), 0.5);
  });

  // 5️⃣ Double-fraction error
  test('convertHandler should correctly return an error on a double-fraction', function() {
    assert.isNull(convertHandler.getNum('3/2/3kg'));
  });

  // 6️⃣ Default to 1 if no number is provided
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  // 7️⃣ Read each valid input unit
  test('convertHandler should correctly read each valid input unit', function() {
    const input = ['gal','L','mi','km','lbs','kg','GAL','l','MI','KM','LBS','KG'];
    const expected = ['gal','L','mi','km','lbs','kg','gal','L','mi','km','lbs','kg'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getUnit(ele), expected[i]);
    });
  });

  // 8️⃣ Invalid input unit
  test('convertHandler should correctly return an error for an invalid input unit', function() {
    assert.isNull(convertHandler.getUnit('23g'));
  });

  // 9️⃣ Return correct return unit for each valid input unit
  test('convertHandler should return the correct return unit for each valid input unit', function() {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expected = ['L','gal','km','mi','kg','lbs'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
    });
  });

  // 🔟 Spelled-out string unit for each valid input unit
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function() {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expected = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    input.forEach(function(ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expected[i]);
    });
  });

  // 11️⃣ gal to L
  test('convertHandler should correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
  });

  // 12️⃣ L to gal
  test('convertHandler should correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  // 13️⃣ mi to km
  test('convertHandler should correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
  });

  // 14️⃣ km to mi
  test('convertHandler should correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  // 15️⃣ lbs to kg
  test('convertHandler should correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1);
  });

  // 16️⃣ kg to lbs
  test('convertHandler should correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });

});
