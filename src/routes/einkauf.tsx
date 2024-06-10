import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/einkauf')({
  component: () => <div>Hello einkauf!</div>,
});
