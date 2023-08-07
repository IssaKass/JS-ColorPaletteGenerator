const toggleThemeBtn = document.getElementById("toggle-theme-btn");
const toggleThemeIcon = toggleThemeBtn.querySelector("i");
const colorPalette = document.getElementById("color-palette");
const generateBtn = document.getElementById("generate-btn");

// Toggle between light and dark modes
function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("theme-dark");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  updateThemeToggleButton(isDarkMode);
}

function updateThemeToggleButton(isDarkMode) {
  toggleThemeIcon.classList.replace(
    isDarkMode ? "uil-moon" : "uil-sun",
    isDarkMode ? "uil-sun" : "uil-moon"
  );
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("theme-dark");
    updateThemeToggleButton(true);
  }
}

function initializePage() {
  initializeTheme();
  generatePalette();
}

toggleThemeBtn.addEventListener("click", toggleTheme);

// Generate random color
const maxPaletteBoxes = 6;
const hexDigits = "0123456789ABCDEF";

function generateRandomColor() {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexDigits[Math.floor(Math.random() * hexDigits.length)];
  }
  return color;
}

// Generate color palette
function generatePalette() {
  colorPalette.innerHTML = "";

  for (let i = 0; i < maxPaletteBoxes; i++) {
    let randomColor = generateRandomColor();

    const colorElement = document.createElement("li");
    colorElement.classList.add("color");
    colorElement.innerHTML = `
      <div class="color-box" style="background-color:${randomColor}"></div>
      <p class="color-value">${randomColor}</p>
    `;
    colorElement.addEventListener("click", () =>
      copyColor(colorElement, randomColor)
    );
    colorPalette.appendChild(colorElement);
  }
}

// Copy color to clipboard
const copyColor = (elem, color) => {
  const colorValueElement = elem.querySelector(".color-value");
  navigator.clipboard.writeText(color).then(() => {
    colorValueElement.innerText = "Copied";
    elem.classList.add("copy");
    setTimeout(() => {
      colorValueElement.innerText = color;
      elem.classList.remove("copy");
    }, 1500);
  });
};

// Generate initial palette on page load
window.addEventListener("load", initializePage);

// Regenerate palette on button click
generateBtn.addEventListener("click", generatePalette);
