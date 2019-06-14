export default {
  translateStatus: words => {
    if (!words) return;
    const capitalize = word => word.charAt(0).toUpperCase() + word.substring(1);
    return words
      .match(/[A-Za-z][a-z]*/g)
      .map(capitalize)
      .join(" ");
  },
  createKeyHandler: options => e => {
    if(!options.targets.some(i => i === e.target)) return
    e.preventDefault();
    options[e.which] && options[e.which](e);
  },
  sortByDate: array =>
    array.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
};
