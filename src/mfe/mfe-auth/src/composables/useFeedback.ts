export function useFeedback(type: 'success' | 'error' | 'warning', message: string) {
  window.dispatchEvent(
    new CustomEvent('notify', {
      detail: { type, message },
    }),
  );
}
