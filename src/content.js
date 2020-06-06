// Finds the latest commit on the repo page.
const LATEST_COMMIT_SELECTOR = '.commit-tease span[itemprop=dateModified] > relative-time'
const LATEST_COMMIT_SELECTOR_NEW = '.commit-tease .lh-default > relative-time'

// Uses a MutationObserver to ensure we respond
// to dynamically loaded content in the DOM
const observer = new MutationObserver(function (mutations, me) {
  const el = document.querySelector(LATEST_COMMIT_SELECTOR) || document.querySelector(LATEST_COMMIT_SELECTOR_NEW)
  if (el) {
    const datetime = el.getAttribute('datetime')
    chrome.runtime.sendMessage({datetime})
    me.disconnect()
    return
  }
})

observer.observe(document, {
  childList: true,
  subtree: true
})
