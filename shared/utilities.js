String.prototype.contains = function(substring) {
  return !!this.match(new RegExp(substring, 'i'));
}