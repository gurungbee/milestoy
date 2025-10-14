'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { AddMilestoneDrawer } from '@/components/AddMilestoneDrawer'

export function AddMilestoneButton() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-8 right-8 rounded-full shadow-lg"
      >
        <PlusIcon className="mr-2 h-4 w-4" /> Add Milestone
      </Button>
      <AddMilestoneDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </>
  )
}

