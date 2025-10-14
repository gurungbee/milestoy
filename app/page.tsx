import { MilestoneTimeline } from '@/components/MilestoneTimeline'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light mb-4">Our Story</h1>
          <p className="text-gray-600 text-sm">
            Learn about and become part of our story...
          </p>
        </div>
        <MilestoneTimeline />
      </div>
    </main>
  )
}

