(function($){
  var Pair = function(key, val){
    this.key = key;
    this.val = val;
  };

  Pair.prototype.valIsPlainObject = function(){
    return $.isPlainObject(this.val);
  };

  Pair.prototype.valIsArray = function(){
    return $.isArray(this.val);
  };

  Pair.prototype.isExpandable = function(){
    return this.valIsPlainObject() || this.valIsArray();
  };

  Pair.prototype.getKeyMarkup = function(){
    return '<span class="key">' + this.key + '</span>';
  };

  Pair.prototype.render = function(){
    var $li = $('<li>'),
      val = this.val,
      valStr = JSON.stringify(val),
      $rowContainer, valType, valMarkup;

    if (this.isExpandable()){
      // nested data
      var $expandable = $('<a class="expandable" href="#">');
      $expandable.data('obj', val);
      $li.append($expandable);
      $rowContainer = $expandable;

      valType = this.valIsPlainObject() ? 'object' : 'array';

      // truncate the array/object preview
      var valMatch = valStr.match(/^([\{\[])(.*)([\}\]])$/);
      valMarkup = valMatch[1] + '<span class="val-inner">' + valMatch[2] + '</span>' + valMatch[3];

    } else {
      // normal key-value
      $rowContainer = $li;
      valType = typeof val;
      valMarkup = valStr;
    }

    $rowContainer.append(this.getKeyMarkup() + ': <span class="val ' + valType + '">' + valMarkup + '</span>');
    this.$el = $li;
  };


  var Panel = function(data){
    this.data = data;
  };

  Panel.prototype.render = function(){
    var data = this.data;

    if ($.isArray(data)){
      $list = $('<ol class="list" start="0">');
    } else {
      $list = $('<ul class="list">');
    }

    var self = this;
    $.each(data, function(key, val){
      var $li = self.createListItem(key, val);
      $list.append($li);
    });

    // handle expand/collapse
    $list.on('click', '.expandable', $.proxy(this.onKeyClicked, this));
    var $listWrap = $('<div class="panel">');
    $listWrap.html($list);

    this.$el = $listWrap;
    return this;
  };

  // private
  Panel.prototype.createListItem = function(key, val){
    var pair = new Pair(key, val);
    pair.render();
    return pair.$el;
  };

  // private
  Panel.prototype.onKeyClicked = function(e){
    var $expandable = $(e.currentTarget),
      $expanded = $expandable.closest('li');

    if ($expanded.hasClass('expanded')){
      // collapse
      $expanded.children('.panel').remove();
      $expanded.removeClass('expanded');
    } else {
      var nestedData = $expandable.data('obj');
      this.addChildPanel($expanded, nestedData);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  // private
  Panel.prototype.addChildPanel = function($expanded, data){
    // open new panel
    var childPanel = new Panel(data);
    childPanel.render();
    $expanded.append(childPanel.$el);

    $expanded.addClass('expanded');
  };



  $.fn.jsonpanel = function(data){
    var panel = new Panel(data);
    panel.render();
    $(this).html(panel.$el);
    return panel;
  };
})(jQuery);
