import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';
export interface SelectProps {
  options: any;
  defaultValue?: any;
  onChange?: any;
  className?: string;
  styles?: any; 
  name?:string;
}

const CommonSelect: React.FC<SelectProps> =({ options, defaultValue, className, name, onChange }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the options loading
  // const debouncedLoadOptions = debounce((inputValue, callback) => {
  //   setIsLoading(true);
  //   options(inputValue)
  //     .then((options: any) => {
  //       callback(options);
  //       setIsLoading(false);
  //     })
  //     .catch(() => setIsLoading(false));
  // }, 500);

  useEffect(() => {
    if (defaultValue) {
      setIsLoading(true);
      const selectedOption = options.find((opt: { value: any; }) => 
            opt.value === (defaultValue.value || defaultValue)
          );
          if (selectedOption) {
            setValue(selectedOption);
          }
          setIsLoading(false);
    }
  }, [defaultValue, options]);

  const handleChange = (selectedOption: React.SetStateAction<null>) => {
    setValue(selectedOption);
    // onChange(selectedOption);
  };

  return (
    <AsyncSelect
      cacheOptions
      // loadOptions={options}
      defaultOptions={options}
      value={value}
      onChange={handleChange}
      onInputChange={setInputValue}
      inputValue={inputValue}
      isLoading={isLoading}
      placeholder="Type to search..."
      noOptionsMessage={({ inputValue }) => 
        inputValue ? 'No options found' : 'Type to search'
      }
      className={className}
      name={name}
    />
  );
};

export default CommonSelect;