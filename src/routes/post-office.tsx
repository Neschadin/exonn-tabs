import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/post-office')({
  component: () => <div>Hello post office!</div>,
});
