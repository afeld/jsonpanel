(function($){
  var Pair = function(key, val){
    this.key = key;
    this.val = val;
  };

  Pair.prototype.getKeyMarkup = function(){
    return '<span class="key">' + this.key + '</span>';
  };

  Pair.prototype.getValType = function(){
    return typeof this.val;
  };

  Pair.prototype.getValInnerMarkup = function(){
    return JSON.stringify(this.val);
  };

  Pair.prototype.createTagInnerMarkup = function(){
    return this.getKeyMarkup() + ': <span class="val ' + this.getValType() + '">' + this.getValInnerMarkup() + '</span>';
  };

  Pair.prototype.createTag = function(){
    return $('<li>' + this.createTagInnerMarkup() + '</li>');
  };

  Pair.prototype.render = function(){
    var $li = this.createTag();
    this.$el = $li;
  };



  var ExpandablePair = function(key, val){
    Pair.call(this, key, val);
  };

  $.extend(ExpandablePair.prototype, Pair.prototype);

  ExpandablePair.prototype.getValType = function(){
    return $.isArray(this.val) ? 'array' : 'object';
  };

  ExpandablePair.prototype.getValInnerMarkup = function(){
    var valStr = Pair.prototype.getValInnerMarkup.call(this);
    // truncate the array/object preview
    var valMatch = valStr.match(/^([\{\[])(.*)([\}\]])$/);
    return valMatch[1] + '<span class="val-inner">' + valMatch[2] + '</span>' + valMatch[3];
  };

  ExpandablePair.prototype.createTag = function(){
    var $li = $('<li>'),
      $expandable = $('<a class="expandable" href="#">');

    $expandable.data('obj', this.val);
    $li.append($expandable);

    $expandable.append(this.createTagInnerMarkup());
    return $li;
  };


  // factory
  Pair.create = function(key, val){
    var pair;
    if (typeof val === 'object'){
      pair = new ExpandablePair(key, val);
    } else {
      pair = new Pair(key, val);
    }
    return pair;
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
    var pair = Pair.create(key, val);
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
    Panel.renderToEl($expanded, data);
    $expanded.addClass('expanded');
  };

  Panel.renderToEl = function($container, data){
    var panel = new Panel(data);
    panel.render();
    $container.append(panel.$el);
    return panel;
  }



  $.fn.jsonpanel = function(data){
    return Panel.renderToEl($(this), data);
  };
})(jQuery);
