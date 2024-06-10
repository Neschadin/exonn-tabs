import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/warenbestand')({
  component: () => <div>Hello warenbestand!</div>,
});
