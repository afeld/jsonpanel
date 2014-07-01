(function(){
  var $fixture = $('#qunit-fixture');

  QUnit.test("returns a Panel instance", function(assert){
    var result = $fixture.jsonpanel({});
    assert.equal(typeof result.render, 'function');
  });
})();
