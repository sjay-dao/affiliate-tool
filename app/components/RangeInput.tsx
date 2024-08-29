import { useState, useEffect } from 'react';
import Label from './Label';

interface RangeInputProps {
  label: string;
  min: number;
  max: number;
  value: number; // Now accepts the current value from the parent
  onChange: (newValue: number) => void; 
}

const RangeInput: React.FC<RangeInputProps> = ({ label, min, max, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value); // Initialize with the value from parent

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10); 
    setInputValue(newValue);
    onChange(newValue); 
  };

  // Update internal state when the value from the parent changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div>
      <Label text={label} className="form-h5 mb-2" />
      <div className="d-flex align-items-center h-25">
        <input type="text" className="col-1" value={inputValue} readOnly /> 
        <input
          type="range"
          className="form-range ms-2"
          min={min}
          max={max}
          value={inputValue} // Use the internal state value
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default RangeInput;