'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import dynamic from 'next/dynamic'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

interface EditMilestoneDrawerProps {
  milestone: any
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  onUpdate: (updatedMilestone: any) => void
}

export function EditMilestoneDrawer({ milestone, isOpen, setIsOpen, onUpdate }: EditMilestoneDrawerProps) {
  const [formData, setFormData] = useState(milestone)

  useEffect(() => {
    setFormData({
      ...milestone,
      images: milestone.images || [],
    })
  }, [milestone])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const date = new Date(formData.date)
    onUpdate({
      ...formData,
      year: date.getFullYear().toString(),
      month: date.toLocaleString('default', { month: 'long' }).toUpperCase(),
    })
    setIsOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmojiSelect = (emojiObject: any) => {
    setFormData((prev) => ({ ...prev, icon: emojiObject.emoji }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newImages.push(reader.result as string)
          if (newImages.length === files.length) {
            setFormData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Milestone</SheetTitle>
          <SheetDescription>Make changes to your milestone here.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">{formData.icon} Select Emoji</Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <EmojiPicker onEmojiClick={handleEmojiSelect} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input
                id="images"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                {formData.images && formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">Update Milestone</Button>
          </form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

