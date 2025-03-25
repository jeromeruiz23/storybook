import React from 'react';
import './button.css';

// Define the properties that the Button component will accept
export interface ButtonProps {
  primary?: boolean; // Determines if the button is styled as primary
  backgroundColor?: string; // Background color of the button
  size?: 'small' | 'medium' | 'large'; // Size of the button
  label: string; // Text label of the button
  onClick?: () => void; // Optional click handler
  textColor?: string; // Text color of the button
  disabled?: boolean; // Determines if the button is disabled 
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false, // Default to secondary button if primary is not specified
  size = 'medium', // Default size is medium
  backgroundColor, // Background color of the button
  label, // Text label of the button
  textColor, // Text color of the button
  disabled = false, // Default to not disabled
  ...props // Spread the rest of the props
}: ButtonProps) => {
  // Determine the button mode based on the primary prop
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      disabled={disabled} // Apply the disabled attribute
      {...props} // Spread the rest of the props onto the button element
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${disabled ? '#ddd' : backgroundColor}; // Apply default background color when disabled
          color: ${disabled ? '#aaa' : textColor}; // Apply default text color when disabled
          transition: background-color 0.3s ease; // Smooth transition for background color
          cursor: ${disabled ? 'not-allowed' : 'pointer'}; // Change cursor when disabled
          opacity: ${disabled ? 0.5 : 1}; // Change opacity when disabled
        }
        button:hover {
          background-color: ${!disabled && backgroundColor ? lightenColor(backgroundColor, 20) : '#ddd'}; // Lighten background color on hover if not disabled
        }
        button:active,
        button:focus {
          background-color: ${!disabled && backgroundColor ? darkenColor(backgroundColor, 20) : '#bbb'}; // Darken background color on active or focus if not disabled
        }
      `}</style>
    </button>
  );
};

// Utility functions to lighten and darken colors
const lightenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = ((num >> 8) & 0x00ff) + amt,
    B = (num & 0x0000ff) + amt;
  return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1).toUpperCase()}`;
};

const darkenColor = (color: string, percent: number) => {
  const num = parseInt(color.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;
  return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1).toUpperCase()}`;
};