'use client'

import { useMemo, useState } from 'react'
import { timelineData } from '@/lib/dummy-data'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon, Edit2Icon } from 'lucide-react'
import { EditMilestoneDrawer } from '@/components/EditMilestoneDrawer'
import { AddMilestoneDrawer } from '@/components/AddMilestoneDrawer'
import { Lightbox } from '@/components/Lightbox'

export function MilestoneTimeline() {
  const [editingMilestone, setEditingMilestone] = useState(null)
  const [milestones, setMilestones] = useState(timelineData)
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const groupedByYear = useMemo(() => {
    return milestones.reduce((acc, milestone) => {
      const year = milestone.year
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(milestone)
      return acc
    }, {} as Record<string, typeof milestones>)
  }, [milestones])

  const years = Object.keys(groupedByYear).sort((a, b) => Number(b) - Number(a))

  const toggleVisibility = (id: string) => {
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, isPrivate: !m.isPrivate } : m
    ))
  }

  const handleAddMilestone = (newMilestone: any) => {
    setMilestones([...milestones, newMilestone])
  }

  const handleUpdateMilestone = (updatedMilestone: any) => {
    setMilestones(milestones.map(m => 
      m.id === updatedMilestone.id ? updatedMilestone : m
    ))
  }

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
  }

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-blue-100 border-r border-dashed border-blue-200" />

      <div className="space-y-24">
        {years.map((year) => (
          <div key={year} className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-8">
              <div className="text-sm font-light text-gray-500">{year}</div>
            </div>

            <div className="space-y-16">
              {groupedByYear[year].map((milestone) => (
                <div key={milestone.id} className="relative grid grid-cols-[1fr,1fr] gap-4 group">
                  <div className="text-right space-y-1">
                    <div className="text-xs font-medium text-gray-600">
                      {milestone.month} {year}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center justify-end space-x-2">
                      <span>{milestone.description}</span>
                      {milestone.images && milestone.images.length > 0 && (
                        <div className="flex space-x-1">
                          {milestone.images.slice(0, 3).map((image, index) => (
                            <img 
                              key={index}
                              src={image} 
                              alt={`Milestone thumbnail ${index + 1}`} 
                              className="w-10 h-10 object-cover rounded cursor-pointer"
                              onClick={() => openLightbox(milestone.images, index)}
                            />
                          ))}
                          {milestone.images.length > 3 && (
                            <div 
                              className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center cursor-pointer"
                              onClick={() => openLightbox(milestone.images, 3)}
                            >
                              +{milestone.images.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleVisibility(milestone.id)}
                        >
                          {milestone.isPrivate ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditingMilestone(milestone)}
                        >
                          <Edit2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center">
                        <span className="text-sm">{milestone.icon}</span>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-16 bg-blue-100 -z-10" />
                    </div>
                  </div>

                  <div />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {editingMilestone && (
        <EditMilestoneDrawer
          milestone={editingMilestone}
          isOpen={!!editingMilestone}
          setIsOpen={(isOpen) => !isOpen && setEditingMilestone(null)}
          onUpdate={handleUpdateMilestone}
        />
      )}
      <AddMilestoneDrawer
        isOpen={isAddDrawerOpen}
        setIsOpen={setIsAddDrawerOpen}
        onAdd={handleAddMilestone}
      />
      <Button
        onClick={() => setIsAddDrawerOpen(true)}
        className="fixed bottom-8 right-8 rounded-full shadow-lg"
      >
        + Add Milestone
      </Button>
      <Lightbox
        isOpen={lightboxImages.length > 0}
        onClose={() => setLightboxImages([])}
        images={lightboxImages}
        initialIndex={lightboxIndex}
      />
    </div>
  )
}

