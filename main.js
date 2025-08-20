const { entrypoints } = require("uxp");
const photoshop = require("photoshop").app;

// Simple alert command
const showAlert = () => {
  alert("This is an alert message");
};

// Setup UXP entrypoints
entrypoints.setup({
  commands: {
    showAlert,
  },
  panels: {
    vanilla: {
      show(node) {
        // DOM is loaded here; attach all listeners
        const imageFormat = document.getElementById("imageFormat");
        const optionText = document.getElementById("option");
        const qualitySlider = document.getElementById("qualitySlider");
        const qualityValue = document.getElementById("qualityValue");

        // Update text immediately when dropdown changes
        if (imageFormat) {
          imageFormat.addEventListener("change", () => {
            const selectedOption = imageFormat.value;
            optionText.innerText = selectedOption;
            alert(selectedOption);
          });
        }
        if (qualitySlider) {
          qualitySlider.addEventListener("input", () => {
            const sliderValue = qualitySlider.value;
            qualityValue.innerText = sliderValue
          })
        }
      }
    }
  }
});