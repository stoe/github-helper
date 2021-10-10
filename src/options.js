;(() => {
  const restoreOptions = () => {
    return chrome.storage.sync.get(
      {
        token: ''
      },
      items => {
        return (document.getElementById('token').value = items.token)
      }
    )
  }

  const saveOptions = () => {
    return chrome.storage.sync.set(
      {
        token: document.getElementById('token').value,
        lastChecked: 0
      },
      () => {
        const status = document.getElementById('status')

        // eslint-disable-next-line i18n-text/no-en
        status.textContent = 'Options saved.'

        return setTimeout(() => {
          return (status.textContent = '')
        }, 750)
      }
    )
  }

  document.addEventListener('DOMContentLoaded', restoreOptions)
  document.getElementById('save').addEventListener('click', saveOptions)
})()
