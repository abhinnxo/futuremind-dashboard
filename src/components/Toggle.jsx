'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';

function Toggle({ text }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <span className="flex items-center gap-1">
      <span className="font-medium">{text}</span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-btn-primary' : 'bg-secondary-300'}
          relative inline-flex h-5 w-8 items-center rounded-full`}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={`${
            enabled ? 'translate-x-4' : 'translate-x-1/4'
          } inline-block h-3 w-3 transform rounded-full bg-white transition`}
        />
      </Switch>
    </span>
  );
}

export default Toggle;
