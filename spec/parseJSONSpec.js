// test cases are described in fixtures.js
describe("parseJSON", function(){

  it("should match the result of calling JSON.parse", function(){
    validObjects.forEach(function(obj){
      var original = JSON.parse(JSON.stringify(obj))
      var result = parseJSON(JSON.stringify(obj));
      console.log(result);
      var equality = _.isEqual(result, original); // why can't we use `===` here?
      // var equality = _.isEqual(result, obj); // why can't we use `===` here?
      expect(equality).toBeTruthy();
    });

    // if you really want to stress test your code, try this...
    // extraCreditStrings.forEach(function(string){
    //   var expected = JSON.parse(string);
    //   var result = parseJSON(string);
    //   var equality = _.isEqual(result, expected);
    //   expect(equality).toBeTruthy();
    // });
  });

  it("should error out sometimes", function(){
    invalidStrings.forEach(function(test){
      // expect(parseJSON(test)).toBe(undefined); // you can use this test if you'd prefer
      expect(function(){
        parseJSON(test);
      }).toThrow();
    });
  });

});
