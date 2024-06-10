import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/accounting')({
  component: () => <div>Hello accounting!</div>,
});
