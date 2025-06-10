import { useNotify } from '@/composables/useNotify.ts';

const notify = useNotify();

window.addEventListener('notify', (event: Event) => {
  const { type, message } = (event as CustomEvent).detail;
  notify.open({ type, message });
});
