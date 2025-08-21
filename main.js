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
        // DOM elements
        const imageFormat = document.getElementById("imageFormat");
        const optionText = document.getElementById("option");
        const qualitySlider = document.getElementById("qualitySlider");
        const qualityValue = document.getElementById("qualityValue");
        const minSpan = document.getElementById("min");
        const maxSpan = document.getElementById("max");

        minSpan.innerText = 0;

        // Function to update slider and labels based on selected format
        function updateFormat() {
          const selectedOption = imageFormat.value;
          optionText.innerText = selectedOption;

          if (qualitySlider) {
            if (selectedOption === "jpg") {
              qualitySlider.min = 0;
              qualitySlider.max = 12;
              maxSpan.innerText = 12;
            } else if (selectedOption === "png") {
              qualitySlider.min = 0;
              qualitySlider.max = 9;
              maxSpan.innerText = 9;
            }

            // Reset slider to min when switching formats
            qualitySlider.value = qualitySlider.min;
            qualityValue.innerText = qualitySlider.value;
          }
        }

        // Attach change listener
        if (imageFormat) {
          imageFormat.addEventListener("change", updateFormat);
        }

        // Real-time slider updates
        if (qualitySlider) {
          qualitySlider.addEventListener("input", () => {
            qualityValue.innerText = qualitySlider.value;
          });
        }

        // Initialize default selection (JPG)
        if (imageFormat) {
          updateFormat();
        }
      }
    }
  }
});