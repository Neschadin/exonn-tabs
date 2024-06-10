import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rechn')({
  component: () => <div>Hello rechn!</div>,
});
