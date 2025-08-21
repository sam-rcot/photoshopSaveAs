const { entrypoints } = require("uxp");
const photoshop = require("photoshop").app;
const { core } = require("photoshop");

entrypoints.setup({
  commands: {
    showAlert: (message) => {
      core.showAlert(message);
    },
  },
  panels: {
    vanilla: {
      show(node) {
        // HTML elements
        const imageFormat = document.getElementById("imageFormat");
        const qualitySlider = document.getElementById("qualitySlider");
        const qualityValue = document.getElementById("qualityValue");
        const minSpan = document.getElementById("min");
        const maxSpan = document.getElementById("max");
        const qualityLabel = document.getElementById("qualityLabel");

        // SWC elements
        const spFormat = document.getElementById("formatSelector");
        const spBody = document.getElementById("spBody");
        const spSlider = document.getElementById("spSlider");
        const spSliderLabel = document.getElementById("spSliderLabel");

        minSpan.innerText = 0;

        function updateFormat(format, { slider, label, minDisplay, maxDisplay, spElements } = {}) {
          let min = 0;
          let max = 12;
          let value = 12
          let sliderLabel = "JPG quality";

          if (format === "png") {
            max = 9;
            sliderLabel = "PNG compression";
            value = 1
          }

          // Update HTML range slider
          if (slider) {
            slider.min = min;
            slider.max = max;
            slider.value = min;
            if (label) label.innerText = sliderLabel;
            if (minDisplay) minDisplay.innerText = min;
            if (maxDisplay) maxDisplay.innerText = max;
          }

          // Update SWC elements
          if (spElements) {
            const { spBody, spSlider, spSliderLabel } = spElements;
            spSlider.min = min;
            spSlider.max = max;
            spSlider.value = value;
            spSliderLabel.innerText = sliderLabel;
            spBody.innerText = format.toUpperCase();
          }
        }

        // Event listeners
        if (imageFormat) {
          imageFormat.addEventListener("change", () => updateFormat(imageFormat.value, {
            slider: qualitySlider,
            label: qualityLabel,
            minDisplay: minSpan,
            maxDisplay: maxSpan
          }));
          updateFormat(imageFormat.value, {
            slider: qualitySlider,
            label: qualityLabel,
            minDisplay: minSpan,
            maxDisplay: maxSpan
          });
        }

        if (qualitySlider) {
          qualitySlider.addEventListener("input", () => {
            qualityValue.innerText = qualitySlider.value;
          });
        }

        if (spFormat) {
          spFormat.addEventListener("change", (evt) => {
            const selectedIndex = evt.target.selectedIndex;
            const format = selectedIndex === 0 ? "jpg" : "png";
            updateFormat(format, {
              spElements: { spBody, spSlider, spSliderLabel }
            });
          });
        }
      }
    }
  }
});