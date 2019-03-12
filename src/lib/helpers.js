export default {
  translateStatus: words => {
    if(!words) return
    const capitalize = word => word.charAt(0).toUpperCase() + word.substring(1)
    return words.match(/[A-Za-z][a-z]*/g).map(capitalize).join(' ')
  },
  createKeyHandler: options => e => {
    if(e.target != options.target) return
    options[e.which] && options[e.which](e)
  }
}
