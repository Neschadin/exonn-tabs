import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/administration')({
  component: () => <div>Hello administration!</div>,
});
