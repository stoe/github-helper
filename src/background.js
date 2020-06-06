const ACTION_TITLE = 'GitHub Repo Status'
/*
 * GitHub Repo Status
 * Provide at-a-glance overview of a GitHub repository's status.
 * Status: Active, Inactive, Unmaintained, Abandonded
 * Configure the thresholds below
 */
const SHOW_FOR_ACTIVE_REPOS = true // when false do nothing for active repos
const MAX_DAYS_ACTIVE = 14 // active if last commit < N days
const MAX_DAYS_INACTIVE = 56 // inactive when last commit < N days
const MAX_DAYS_UNMAINTAINED = 365 // unmaintain when < N, abandoned when > N

const STATUS = {
  UNKNOWN: 'UNKNOWN',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  UNMAINTAINED: 'UNMAINTAINED',
  ABANDONED: 'ABANDONED'
}

const ICONS = {
  UNKNOWN: 'icons/status/unknown.png',
  ACTIVE: 'icons/status/active.png',
  INACTIVE: 'icons/status/inactive.png',
  UNMAINTAINED: 'icons/status/unmaintained.png',
  ABANDONED: 'icons/status/abandoned.png'
}

/*
 * Checks if a number is contained in start-end range (inclusive)
 * between(2, 2);       // true
 * between(4, 2);       // false
 * between(4, 8);       // true
 * between(3, 2, 4);    // true
 */
function between(number, start, end) {
  if (end === undefined) {
    end = start
    start = 0
  }

  return number >= start && number <= end
}

function dateDiffInDays(a, b) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc2 - utc1) / MS_PER_DAY)
}

function showRepoStatus(message, sender) {
  const latestCommit = new Date(message.datetime)
  const tab = sender.tab
  const daysElapsed = dateDiffInDays(latestCommit, new Date())
  let status = STATUS.UNKNOWN

  if (between(daysElapsed, MAX_DAYS_ACTIVE) && SHOW_FOR_ACTIVE_REPOS) {
    status = STATUS.ACTIVE
  } else if (between(daysElapsed, MAX_DAYS_ACTIVE, MAX_DAYS_INACTIVE)) {
    status = STATUS.INACTIVE
  } else if (between(daysElapsed, MAX_DAYS_INACTIVE, MAX_DAYS_UNMAINTAINED)) {
    status = STATUS.UNMAINTAINED
  } else if (daysElapsed > MAX_DAYS_UNMAINTAINED) {
    status = STATUS.ABANDONED
  }

  chrome.pageAction.setIcon({
    tabId: tab.id,
    path: {
      16: ICONS[status],
      32: ICONS[status]
    }
  })

  chrome.pageAction.setTitle({
    tabId: tab.id,
    title: `${ACTION_TITLE}: ${status}`
  })

  chrome.pageAction.show(tab.id)
}

chrome.runtime.onMessage.addListener(showRepoStatus)
