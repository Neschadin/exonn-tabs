import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auswahllisten')({
  component: () => <div>Hello auswahllisten!</div>,
});
