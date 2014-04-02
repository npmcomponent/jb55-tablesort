*This repository is a mirror of the [component](http://component.io) module [jb55/tablesort](http://github.com/jb55/tablesort). It has been modified to work with NPM+Browserify. You can install it using the command `npm install npmcomponent/jb55-tablesort`. Please do not open issues or send pull requests against this repo. If you have issues with this repo, report it to [npmcomponent](https://github.com/airportyh/npmcomponent).*
# tablesort

  Minimalistic table sorter

## Installation

    $ component install jb55/tablesort

## Example

```javascript
var tablesort = require('tablesort')
var table = document.querySelector('table')
var sorter = tablesort(table);

sorter.on('sort', function(order, header, index){
  header.style.backgroundColor = order === 'asc'? 'red' : 'blue';
});
```

### Custom sort

```javascript
var sorter = tablesort(el, {
  sort: function(header, index){
    var title = header.textContent;
    if (title === 'complicatedColumn')
      return complicatedSort;
    return tablesort.defaultSort;
  }
});
```

## Gotchas

The table requires `thead` and `tbody` elements.

## License

  MIT
