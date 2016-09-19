// Given a window.document, Produces a new iframe.
// Effect - Installs the given context into the window object of new iframe.
const makeIframe = (doc, context) => {
  const iframe = document.createElement('iframe')

  if (!iframe.style)
    iframe.style = {}

  iframe.style.display = 'none'

  document.body.appendChild(iframe)

  const win = iframe.contentWindow

  if (!win.eval && win.execScript)
    win.execScript.call(win, 'null')

  Object.keys(context).forEach(k => {
    win[k] = context[k]
  })

  win.assert = context.assert

  return iframe
}

export default makeIframe
