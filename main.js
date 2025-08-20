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

            // Update slider min/max based on format
            if (qualitySlider) {
              if (selectedOption === "jpg") {
                qualitySlider.min = 0;
                qualitySlider.max = 12;
              } else if (selectedOption === "png") {
                qualitySlider.min = 0;
                qualitySlider.max = 9;
              }

              // Optional: reset slider value to min to avoid out-of-range
              qualitySlider.value = qualitySlider.min;
              qualityValue.innerText = qualitySlider.value;
            }

            alert(selectedOption);
          });
        }

        // Update slider value in real-time as user drags
        if (qualitySlider) {
          qualitySlider.addEventListener("input", () => {
            qualityValue.innerText = qualitySlider.value;
          });
        }
      }
    }
  }
});