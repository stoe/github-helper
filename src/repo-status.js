;(() => {
  // Finds the latest commit on the repo page.
  const selectors = [
    '.commit-tease span[itemprop=dateModified] > relative-time',
    '.commit-tease .lh-default > relative-time',
    '.repository-content .Details > div relative-time',
  ]

  // Uses a MutationObserver to ensure we respond
  // to dynamically loaded content in the DOM
  const observer = new MutationObserver((mutations, me) => {
    let el

    for (const s of selectors) {
      const e = document.querySelector(s)

      el = e ? e : null
    }

    if (el) {
      const datetime = el.getAttribute('datetime')

      chrome.runtime.sendMessage({datetime})
      me.disconnect()

      return
    }
  })

  observer.observe(document, {
    childList: true,
    subtree: true,
  })
})()
