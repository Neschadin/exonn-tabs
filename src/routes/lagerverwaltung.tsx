import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/lagerverwaltung')({
  component: () => <div>Hello lagerverwaltung!</div>
})