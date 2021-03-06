function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function debounceEvent(func, wait) {
  const debounced = debounce(func, wait);
  return function(event) {
    event.persist();
    debounced(event);
  };
}

export default debounce;
export { debounceEvent };
