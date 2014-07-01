$(function(){
  var $fixture = $('#qunit-fixture');

  QUnit.test("returns a Panel instance", function(assert){
    var panel = $fixture.jsonpanel({});
    assert.equal(typeof panel.render, 'function');
  });

  QUnit.test("starts off collapsed", function(assert){
    var panel = $fixture.jsonpanel({
      obj: {
        foo: 'bar'
      }
    });
    assert.equal($fixture.find('li.selected').length, 0);
  });

  QUnit.test("expands when clicked", function(assert){
    var panel = $fixture.jsonpanel({
      obj: {
        foo: 'bar'
      }
    });
    $fixture.find('.expandable').click();
    assert.equal($fixture.find('li.selected').length, 1);
  });
});
