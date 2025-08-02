export const calculateStreak = (entries) => {
  if (!entries || entries.length === 0) return 0

  const sortedEntries = entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  let streak = 0
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  for (const entry of sortedEntries) {
    const entryDate = new Date(entry.timestamp)
    entryDate.setHours(0, 0, 0, 0)

    const daysDiff = Math.floor((currentDate - entryDate) / (1000 * 60 * 60 * 24))

    if (daysDiff === streak) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (daysDiff > streak) {
      break
    }
  }

  return streak
}

export const getStreakStatus = (lastEntryDate) => {
  if (!lastEntryDate) return "start"

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const lastEntry = new Date(lastEntryDate)
  lastEntry.setHours(0, 0, 0, 0)

  const daysDiff = Math.floor((today - lastEntry) / (1000 * 60 * 60 * 24))

  if (daysDiff === 0) return "complete"
  if (daysDiff === 1) return "continue"
  return "broken"
}
