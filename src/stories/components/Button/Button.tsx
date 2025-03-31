import React from 'react';
import styles from './button.module.css';

/**
 * Button component properties
 */
export interface ButtonProps {
  /** Primary button style variant */
  primary?: boolean;
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Button text label */
  label: string;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Reusable button component with multiple variants and states
 */
export const Button = ({
  primary = false,
  size = 'medium',
  label,
  disabled = false,
  ...props
}: ButtonProps) => {
  const variantClass = primary 
    ? styles['storybook-button--primary']
    : styles['storybook-button--secondary'];

  return (
    <button
      type="button"
      className={[
        styles['storybook-button'],
        styles[`storybook-button--${size}`],
        variantClass,
        disabled && styles['storybook-button--disabled']
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};
