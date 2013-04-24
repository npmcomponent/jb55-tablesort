
# tablesort

  Minimalistic table sorter

## Installation

    $ component install jb55/tablesort

## Example

```javascript
var tablesort = require('tablesort')
var el = document.querySelector('table')
var sorter = tablesort(el, {
  sort: function(header, index){
    var title = header.textContent;
    if (title === 'complicatedColumn')
      return complicatedSort;
    return tablesort.defaultSort;
  }
});

sorter.on('sort', function(order, header, index){
  header.style.backgroundColor = order === 'asc'? 'red' : 'blue';
});
```

## Gotchas

The table requires `thead` and `tbody` elements.

## License

  MIT
