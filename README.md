# Storybook for Next.js with Tailwind CSS & TypeScript

## 🚀 Introduction
This repository contains a Storybook setup for a Next.js project using Tailwind CSS and TypeScript. It provides a well-structured and scalable way to develop and showcase UI components in isolation.

## 🛠️ Tech Stack
- **Next.js** - React Framework for Production
- **React** - JavaScript Library for Building UIs
- **Storybook** - Component-driven UI development environment
- **Tailwind CSS** - Utility-first CSS Framework
- **TypeScript** - Strongly typed JavaScript

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/your-repository.git
cd your-repository
npm install  # or yarn install
```

## 🚀 Running Storybook

To start Storybook, run:

```bash
npm run storybook  # or yarn storybook
```

Storybook will be available at `http://localhost:6006/`.

## 📁 Project Structure
```
.
├── .storybook/        # Storybook configuration files
├── components/        # Reusable UI components
│   ├── Button.tsx    # Example component
│   ├── Button.stories.tsx # Storybook file for Button
│   ├── Button.module.css # Optional CSS module
├── pages/            # Next.js pages
├── styles/           # Global Tailwind styles
├── tsconfig.json     # TypeScript configuration
└── package.json      # Project dependencies
```

## 📝 Writing Stories

Create a new story in the `components/` directory:

```tsx
// components/Button.stories.tsx
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "./Button";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Click Me",
};
```

## 🔧 Customizing Storybook
Modify `.storybook/main.js` to customize the Storybook setup:

```js
module.exports = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/react",
};
```

## 📌 Useful Commands

| Command               | Description                     |
|----------------------|--------------------------------|
| `npm run dev`       | Start the Next.js app         |
| `npm run build`     | Build the production bundle   |
| `npm run storybook` | Start Storybook UI            |
| `npm run lint`      | Run ESLint and fix issues     |

## 🎉 Contributing
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy Coding! 🎨🚀

