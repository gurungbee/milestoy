'use client'

import { useState } from 'react'
import { useMilestoneStore, Milestone } from '@/store/useMilestoneStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

interface EditMilestoneFormProps {
  milestone: Milestone
  onClose: () => void
}

export default function EditMilestoneForm({ milestone, onClose }: EditMilestoneFormProps) {
  const updateMilestone = useMilestoneStore((state) => state.updateMilestone)

  const [formData, setFormData] = useState({
    title: milestone.title,
    category: milestone.category,
    date: milestone.date,
    description: milestone.description,
    isPrivate: milestone.isPrivate,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMilestone(milestone.id, formData)
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Milestone</SheetTitle>
          <SheetDescription>Make changes to your milestone here.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isPrivate"
              checked={formData.isPrivate}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isPrivate: checked }))
              }
            />
            <Label htmlFor="isPrivate">Private</Label>
          </div>
          <Button type="submit" className="w-full">
            Update Milestone
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

