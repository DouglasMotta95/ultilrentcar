import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ia')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ia"!</div>
}
