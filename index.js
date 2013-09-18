module.exports = function load (href, cb) {
  var head = document.head || document.getElementsByTagName('head')[0]
  var link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = href

  if (cb) {
    var onend = 'onload' in link ? stdOnEnd : ieOnEnd
    onend(link, cb)
  }

  head.appendChild(link)
}

function stdOnEnd (link, cb) {
  link.onload = function () {
    this.onerror = this.onload = null
    cb()
  }
  link.onerror = function () {
    // this.onload = null here is necessary
    // because even IE9 works not like others
    this.onerror = this.onload = null
    cb(new Error('Failed to load ' + this.src))
  }
}

function ieOnEnd (link, cb) {
  link.onreadystatechange = function () {
    if (this.readyState != 'complete') return
    this.onreadystatechange = null
    cb() // there is no way to catch loading errors in IE8
  }
}