const {request} = require('@octokit/request')

class GitHubHighlighter {
  constructor() {
    chrome.storage.sync.get(
      {
        token: '',
        login: '',
        teams: [],
        lastChecked: 0
      },
      async items => {
        this.options = items

        if (this.options['token'] === '') {
          // eslint-disable-next-line no-console
          console.warn('github-helper: Please specify a personal access token via the options page.')
        }

        if (Date.now() > this.options['lastChecked'] + 1000 * 60 * 60 * 24) {
          // update daily
          return await this.update()
        } else {
          return this.highlight()
        }
      }
    )
  }

  mentions() {
    const haystack = [this.options.login, ...this.options.teams]
    const needle = 'a.user-mention, a.member-mention, a.team-mention'
    const mentions = []

    for (const m of document.querySelectorAll(needle)) {
      const txt = m.text.toLowerCase()

      if (txt[0] === '@' && haystack.includes(txt.substr(1))) {
        mentions.push(m)
      }
    }

    return mentions
  }

  highlight() {
    for (const m of this.mentions()) {
      try {
        m.classList.add('highlight')
        m.closest('.timeline-comment, .timeline-entry').classList.add('highlight')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err)
      }
    }
  }

  async update() {
    const {
      data: {login}
    } = await request('GET /user', {
      headers: {
        authorization: `token ${this.options['token']}`
      }
    })

    this.options['login'] = login.toLowerCase()

    const {data} = await request('GET /user/teams', {
      headers: {
        authorization: `token ${this.options['token']}`
      }
    })

    this.options['teams'] = data.map(team => {
      return `${team.organization.login.toLowerCase()}/${team.slug.toLowerCase()}`
    })

    this.options['lastChecked'] = Date.now()

    chrome.storage.sync.set(this.options, () => {
      return this.highlight()
    })
  }
}

;(async () => {
  return new GitHubHighlighter()
})()
