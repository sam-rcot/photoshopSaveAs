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
        // SWC elements
        const spFormat = document.getElementById("formatSelector");

        const spSlider = document.getElementById("spSlider");
        const spSliderLabel = document.getElementById("spSliderLabel");

        function updateFormat(format, spElements) {
          let min = 0;
          let max = 12;
          let value = 12;
          let sliderLabel = "JPG quality";

          if (format === "png") {
            max = 9;
            value = 1;
            sliderLabel = "PNG compression";
          }

          if (spElements) {
            const { spSlider, spSliderLabel } = spElements;
            spSlider.min = min;
            spSlider.max = max;
            spSlider.value = value;
            spSliderLabel.innerText = sliderLabel;

          }
        }

        // Event listener for the SWC picker
        if (spFormat) {
          spFormat.addEventListener("change", (evt) => {
            const selectedIndex = evt.target.selectedIndex;
            const format = selectedIndex === 0 ? "jpg" : "png";
            updateFormat(format, { spSlider, spSliderLabel });
          });

          // Initialize the picker and slider
          const initialFormat = spFormat.selectedIndex === 0 ? "jpg" : "png";
          updateFormat(initialFormat, { spSlider, spSliderLabel });
        }

        if (spSlider) {
          spSlider.addEventListener("input", evt => {
            console.log(`New value: ${evt.target.value}`);
          })

        }
      }
    }
  }
});