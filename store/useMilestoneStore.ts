import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

export interface Milestone {
  id: string
  title: string
  category: string
  date: string
  description: string
  isPrivate: boolean
  media?: string[]
}

interface MilestoneStore {
  milestones: Milestone[]
  addMilestone: (milestone: Omit<Milestone, 'id'>) => void
  updateMilestone: (id: string, milestone: Partial<Milestone>) => void
  deleteMilestone: (id: string) => void
  toggleMilestonePrivacy: (id: string) => void
}

export const useMilestoneStore = create<MilestoneStore>((set) => ({
  milestones: [],
  addMilestone: (milestone) =>
    set((state) => ({
      milestones: [...state.milestones, { ...milestone, id: uuidv4() }],
    })),
  updateMilestone: (id, updatedMilestone) =>
    set((state) => ({
      milestones: state.milestones.map((m) =>
        m.id === id ? { ...m, ...updatedMilestone } : m
      ),
    })),
  deleteMilestone: (id) =>
    set((state) => ({
      milestones: state.milestones.filter((m) => m.id !== id),
    })),
  toggleMilestonePrivacy: (id) =>
    set((state) => ({
      milestones: state.milestones.map((m) =>
        m.id === id ? { ...m, isPrivate: !m.isPrivate } : m
      ),
    })),
}))

