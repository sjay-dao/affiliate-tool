import { useState } from 'react';
import Label from './Label';

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void; // Function to handle value changes
}

const RangeInput: React.FC<RangeInputProps> = ({ label, min, max, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10); 
    setValue(newValue);
    onChange(newValue); // Notify the parent component of the change
  };

  return (
    <div>
      <Label text={label} className="form-h5 mb-2" />
      <div className="d-flex align-items-center h-25">
        <input type="text" className="col-1" value={value} readOnly /> {/* Display the value */}
        <input
          type="range"
          className="form-range ms-2"
          min={min}
          max={max}
          value={value}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default RangeInput;