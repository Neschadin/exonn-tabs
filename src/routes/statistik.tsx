import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/statistik')({
  component: () => <div>Hello statistik!</div>,
});
