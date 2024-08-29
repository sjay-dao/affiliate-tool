import { useState, useEffect } from 'react';
import Label from './Label';

interface RangeInputProps {
    label: string;
    min: number;
    max: number;
    value: number;
    onChange: (newValue: number) => void;
  }
  
  const RangeInput: React.FC<RangeInputProps> = ({
    label,
    min,
    max,
    value,
    onChange,
  }) => {
    const [inputValue, setInputValue] = useState(value);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value, 10);
      setInputValue(newValue);
      onChange(newValue);
    };
  
    useEffect(() => {
      setInputValue(value);
    }, [value]);
  
    return (
        <div>
        <Label text={label} className="form-h5 mb-2" />
        <div className="flex items-center"> 
          <input
            type="text"
            className="w-12 border border-gray-300 rounded-lg px-2 py-1 mr-2"
            value={inputValue}
            readOnly
          />{" "}
          <input
            type="range"
            className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            min={min}
            max={max}
            value={inputValue}
            onChange={handleInputChange}
          />{" "}
        </div>
      </div>
    );
  };
  
  export default RangeInput;
  