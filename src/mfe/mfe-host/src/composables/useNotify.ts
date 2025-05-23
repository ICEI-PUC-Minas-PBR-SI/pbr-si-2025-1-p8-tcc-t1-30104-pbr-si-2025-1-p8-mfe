import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 5000,
  position: { x: 'right', y: 'bottom' },
  types: [
    {
      type: 'warning',
      background: '#FBBF24',
      icon: {
        tagName: 'i',
        className: 'material-icons',
        text: 'error',
        color: 'white',
      },
    },
  ],
});

export function useNotify() {
  return notyf;
}
