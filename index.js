
var sort = require('sort');
var query = require('query');
var events = require('event');
var each = require('each');
var map = require('map');
var natural = require('natural-sort');
var Emitter = require('emitter');
var inherit = require('inherit');
var ap = require('ap');

module.exports = TableSorter;

/**
 * TableSorter
 *
 * @param {Element} table
 * @param {Object} options
 * @api public
 */
function TableSorter(table, options) {
  if (!(this instanceof TableSorter)) return new TableSorter(table, options);
  var self = this;
  Emitter.call(this);
  options = options || {};
  var defaultSort = function(h, i){
    return function(a, b) {
      a = a.children[i];
      b = b.children[i];
      return natural(a.textContent, b.textContent);
    };
  };
  options.sort = options.sort || defaultSort;
  TableSorter.defaultSort = defaultSort;
  this.defaultSort = defaultSort;
  this.options = options;
  this.table = table;
  this.order = 'none';
  this.attach(table, options);
}

inherit(TableSorter, Emitter);


/**
 * Get headers
 *
 * @param {Function} fn
 * @api public
 */
TableSorter.prototype.headers = function(table){
  if (this._headers) return this._headers;
  var hs = this._headers = this.options.headers || query.all('tr > th', table);
  return hs;
};

/**
 * Get parent element for sorting
 *
 * @param {Element} optional table element
 * @api public
 */
TableSorter.prototype.el = function(table) {
  if (this._el) return this._el;
  table = table || this.table;
  this._el = this.options.el || query('tbody', table);
  return this._el;
};

/**
 * Get elements for sorting
 *
 * @param {Element} optional table element
 * @api public
 */
TableSorter.prototype.elements = function() {
  return ap(this.options.elements) || this.el().children;
};

/**
 * Attach handlers to a table
 *
 * @param {Element} table element
 * @param {Object} options
 * @api public
 */
TableSorter.prototype.attach = function(table){
  this.handlers(this.headers(table));
};


/**
 * Set up event handlers on header elements
 *
 * @param {[Element]} header elements
 * @param {Object} options
 * @api public
 */
TableSorter.prototype.handlers = function(headers, options){
  var self = this;
  each(headers, function(h, i){
    events.bind(h, 'click', function(e){
      var srt = self.options.sort(h, i);
      if (srt) self.sort(srt, this.order, h, i);
    });
  });
};


/**
 * Sort rows
 *
 * @param {Function} element sorting function
 * @param {String} order {asc,desc}
 * @param {Element} optional related header element for sort event
 * @param {Number} optional related header index for sort event
 * @api public
 */
TableSorter.prototype.sort = function(fn, order, h, i) {
  var el = this.el();
  var els = this.elements();
  this.order = order = order || this.order === 'asc'? 'desc' : 'asc';
  sort[order](el, els, fn);
  this.emit('sort', order, h, i, fn);
};

