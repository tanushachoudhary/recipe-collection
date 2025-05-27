# 🍽️ Interactive Recipe Web App

This is a responsive and interactive recipe web application built with HTML, CSS, and JavaScript. Users can view multiple recipes, toggle visibility for ingredients and steps, and follow a step-by-step cooking guide with a live timer and progress bar.

![Screenshot 2025-05-20 224632](https://github.com/user-attachments/assets/6b441396-f41d-4e88-8aa7-f222febf5673)

## ✨ Features

- 🔄 Toggle ingredients and cooking steps with interactive buttons
- 📋 Highlight each step while cooking
- ⏱ Live cooking timer with minute:second format
- 📈 Progress bar shows step-by-step progress
- 📱 Mobile-friendly and responsive design
- ✅ Works with multiple recipe cards independently

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/recipe-app.git
cd recipe-app
````

### 2. Open in Browser

Simply open the `index.html` file in your browser:

```bash
open index.html
```

Or, serve with a live server extension (VSCode or Python HTTP server).

## 🧠 How It Works

Each recipe card contains:

* A **"Start Cooking"** button to begin step-by-step guidance
* A **"Next Step"** button to move through the instructions
* A **live timer** and **progress bar** that update in real-time
* Interactive buttons to show/hide **ingredients** and **steps**

JavaScript binds event listeners to each `.recipe-card` independently using **class selectors** to ensure multiple cards can work simultaneously.

## 📁 Project Structure

```
recipe-app/
├── index.html
├── style.css
└── script.js
```

* `index.html`: Main page with all recipes
* `style.css`: Styles for layout, buttons, highlights, and responsiveness
* `script.js`: JS to handle toggle, step navigation, and timers

## 🛠 Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)


## 📦 Future Improvements

* 🔊 Add sound alerts for steps and completion
* 📲 Save progress in `localStorage`
* 📝 Add ability to customize recipes
* 🎨 Add dark/light theme toggle


## 🧾 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
