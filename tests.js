$(function(){
  var $fixture = $('#qunit-fixture');


  QUnit.test("returns a Panel instance", function(assert){
    var panel = $fixture.jsonpanel({data: {}});
    assert.strictEqual(typeof panel.render, 'function');
  });


  QUnit.module("nested object");

  QUnit.test("starts off collapsed", function(assert){
    var panel = $fixture.jsonpanel({
      data: {
        obj: {
          foo: 'bar'
        }
      }
    });
    assert.strictEqual($fixture.find('li.expanded').length, 0);
  });

  QUnit.test("adds a .expanded class when expanded", function(assert){
    var panel = $fixture.jsonpanel({
      data: {
        obj: {
          foo: 'bar'
        }
      }
    });
    $fixture.find('.expandable').click();
    assert.strictEqual($fixture.find('li.expanded').length, 1);
  });

  QUnit.test("removes .expanded class when collapsed", function(assert){
    var panel = $fixture.jsonpanel({
      data: {
        obj: {
          foo: 'bar'
        }
      }
    });
    $fixture.find('.expandable').click().click();
    assert.strictEqual($fixture.find('li.expanded').length, 0);
  });


  QUnit.module("nested array");

  QUnit.test("starts off collapsed", function(assert){
    var panel = $fixture.jsonpanel({
      data: {
        ary: ['foo']
      }
    });
    assert.strictEqual($fixture.find('li.expanded').length, 0);
  });

  QUnit.test("adds a .expanded class when expanded", function(assert){
    var panel = $fixture.jsonpanel({
      data: {
        ary: ['foo']
      }
    });
    $fixture.find('.expandable').click();
    assert.strictEqual($fixture.find('li.expanded').length, 1);
  });

  QUnit.test("removes .expanded class when collapsed", function(assert){
    var panel = $fixture.jsonpanel({
      data: {
        ary: ['foo']
      }
    });
    $fixture.find('.expandable').click().click();
    assert.strictEqual($fixture.find('li.expanded').length, 0);
  });


  QUnit.module("autolinking");

  QUnit.test("replaces the URL with a link an anchor tag", function(assert){
    var panel = $fixture.jsonpanel({
      data: {
        foo: 'https://google.com'
      }
    });
    assert.strictEqual($fixture.find('.val.string').html(), '"<a href="https://google.com" target="_blank">https://google.com</a>"');
  });
});
