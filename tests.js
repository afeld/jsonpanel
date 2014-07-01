(function(){
  var $fixture = $('#qunit-fixture');

  QUnit.test("returns a Panel instance", function(assert){
    var result = $fixture.jsonPanel({});
    assert.equal(typeof result.render, 'function');
  });
})();
