import type { StudyEntry } from '../types'

const KEY = 'study-tracker-entries'

export function loadEntries(): StudyEntry[] {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as StudyEntry[]) : []
  } catch {
    return []
  }
}

export function saveEntries(entries: StudyEntry[]): void {
  localStorage.setItem(KEY, JSON.stringify(entries))
}
