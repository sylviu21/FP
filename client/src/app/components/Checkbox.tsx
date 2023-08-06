import React from 'react';
// import { Task } from 'app/types/types';

interface CheckboxProps {
  checked: boolean;
  handleChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  handleChange,
}) => {
  return (
    <label>
      <input
        type='checkbox'
        checked={checked}
        onChange={handleChange}
      />
      lorem
    </label>
  );
};

export default Checkbox;
