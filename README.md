# JSONPanel

JavaScript JSON viewer plugin.  Requires jQuery.

## Usage

1. Download [the latest release](https://github.com/afeld/jsonpanel/releases), or install using [Bower](http://bower.io):

    ```bash
    bower install --save jsonpanel
    ```

1. Include in page

    ```html
    <link rel="stylesheet" type="text/css" href="bower_components/jsonpanel/stylesheets/jsonpanel.css">
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/Autolinker.js/dist/Autolinker.js"></script>
    <script src="bower_components/jsonpanel/jsonpanel.js"></script>

    <!-- ... -->

    <div class="jsonpanel"></div>
    ```

1. Initialize by passing JSON object into jQuery plugin:

    ```javascript
    $(document).ready(function(){
      $('.jsonpanel').jsonpanel({
        data: {
          sample: 'json'
        }
      });
    });
    ```

See [the demo page](http://afeld.github.io/jsonpanel/), or [api.afeld.me](http://api.afeld.me) for a real-world example.

## Development

### Installation

```bash
gem install bundler
bundle
```

### Compile files

```bash
bundle exec compass watch
open index.html
```

### Run test coverage

```bash
bundle exec rackup
open "http://localhost:9292/index.html?coverage=true"
```

## Inspiration

* https://github.com/bhollis/jsonview
* https://github.com/josdejong/jsoneditor
