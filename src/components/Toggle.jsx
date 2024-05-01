import { useContext } from 'react';
import { Switch } from '@headlessui/react';
import { TableContext } from '@/context/TableContextProvider';

function Toggle({ text }) {
  const { isToggleEnabled, setIsToggleEnabled } = useContext(TableContext);

  return (
    <span className="flex items-center gap-1">
      <span className="font-medium">{text}</span>
      <Switch
        checked={isToggleEnabled}
        onChange={() => setIsToggleEnabled(!isToggleEnabled)}
        className={`${isToggleEnabled ? 'bg-btn-primary' : 'bg-secondary-300'}
          relative inline-flex h-5 w-8 items-center rounded-full`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`${
            isToggleEnabled ? 'translate-x-4' : 'translate-x-1/4'
          } inline-block h-3 w-3 transform rounded-full bg-white transition`}
        />
      </Switch>
    </span>
  );
}

export default Toggle;
