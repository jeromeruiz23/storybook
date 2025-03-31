import { useState, useRef, useEffect, useId } from 'react';
import styles from './select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  editable?: boolean;
  theme?: 'light' | 'dark';
  onChange?: (selected: SelectOption | SelectOption[]) => void;
}

export const Select = ({
  options,
  multiple = false,
  placeholder = 'Select...',
  disabled = false,
  editable = true,
  theme = 'light',
  onChange
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownId = useId();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (option: SelectOption) => {
    if (disabled || !editable) return;
    
    const newSelected = multiple
      ? selected.some((item) => item.value === option.value)
        ? selected.filter((item) => item.value !== option.value)
        : [...selected, option]
      : [option];

    setSelected(newSelected);
    onChange?.(multiple ? newSelected : newSelected[0]);
    if (!multiple) setIsOpen(false);
  };

  return (
    <div 
      className={`${styles.selectWrapper} ${disabled ? styles.disabled : ''}`} 
      ref={wrapperRef}
      data-theme={theme}
      data-editable={editable}
    >
      <div
        className={`${styles.selectTrigger} ${isOpen ? styles.open : ''}`}
        onClick={() => !disabled && editable && setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        aria-disabled={disabled || !editable}
      >
        {!editable ? (
          <span className={styles.viewMode}>
            {selected.length > 0 
              ? selected.map(opt => opt.label).join(', ')
              : placeholder}
          </span>
        ) : selected.length === 0 ? (
          <span className={styles.placeholder}>{placeholder}</span>
        ) : multiple ? (
          <span className={styles.truncate} title={selected.map(opt => opt.label).join(', ')}>
            {selected.map(opt => opt.label).join(', ')}
          </span>
        ) : (
          <div className={styles.selectedOptions}>
            {selected.map((option) => (
              <span
                key={option.value}
                className={styles.selectedOption}
                title={option.label}
              >
                <span className={styles.truncate}>{option.label}</span>
                {editable && (
                  <span
                    className={styles.removeOption}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleOption(option);
                    }}
                  >
                    ×
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {isOpen && editable && (
        <div className={styles.dropdown} role="listbox" id={dropdownId}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${
                selected.some((item) => item.value === option.value)
                  ? styles.selected
                  : ''
              }`}
              onClick={() => toggleOption(option)}
              title={option.label}
              role="option"
              aria-selected={selected.some(item => item.value === option.value)}
            >
              {multiple && (
                <input
                  type="checkbox"
                  checked={selected.some((item) => item.value === option.value)}
                  readOnly
                  className={styles.checkbox}
                />
              )}
              <span className={styles.truncate}>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
