import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/banking')({
  component: () => <div>Hello banking!</div>,
});
