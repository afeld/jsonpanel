$(function(){
  var $fixture = $('#qunit-fixture');

  QUnit.test("returns a Panel instance", function(assert){
    var panel = $fixture.jsonpanel({});
    assert.strictEqual(typeof panel.render, 'function');
  });

  QUnit.test("object starts off collapsed", function(assert){
    var panel = $fixture.jsonpanel({
      obj: {
        foo: 'bar'
      }
    });
    assert.strictEqual($fixture.find('li.expanded').length, 0);
  });

  QUnit.test("array starts off collapsed", function(assert){
    var panel = $fixture.jsonpanel({
      ary: ['foo']
    });
    assert.strictEqual($fixture.find('li.expanded').length, 0);
  });

  QUnit.test("adds a .expanded class when object is clicked", function(assert){
    var panel = $fixture.jsonpanel({
      obj: {
        foo: 'bar'
      }
    });
    $fixture.find('.expandable').click();
    assert.strictEqual($fixture.find('li.expanded').length, 1);
  });

  QUnit.test("adds a .expanded class when array is clicked", function(assert){
    var panel = $fixture.jsonpanel({
      ary: ['foo']
    });
    $fixture.find('.expandable').click();
    assert.strictEqual($fixture.find('li.expanded').length, 1);
  });
});
