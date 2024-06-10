import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/verkauf')({
  component: () => <div>Hello verkauf!</div>,
});
