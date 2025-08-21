// import '@spectrum-web-components/picker/sp-picker.js';

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
        const imageFormat = document.getElementById("imageFormat");
        const qualitySlider = document.getElementById("qualitySlider");
        const qualityValue = document.getElementById("qualityValue");
        const minSpan = document.getElementById("min");
        const maxSpan = document.getElementById("max");
        const qualityLabel = document.getElementById("qualityLabel");
        const spFormat = document.getElementById("formatSelector")
        const spBody = document.getElementById("spBody")

        spBody.innerText = "Goodbye"
        
        // console.log(spFormat)
        minSpan.innerText = 0;

        function updateFormat() {
          const selectedOption = imageFormat.value;

          if (qualitySlider) {
            if (selectedOption === "jpg") {
              qualityLabel.innerText = "JPG quality";
              qualitySlider.min = 0;
              qualitySlider.max = 12;
              maxSpan.innerText = 12;
            } else if (selectedOption === "png") {
              qualityLabel.innerText = "Compression level";
              qualitySlider.min = 0;
              qualitySlider.max = 9;
              maxSpan.innerText = 9;
            }

            qualitySlider.value = qualitySlider.min;
            qualityValue.innerText = qualitySlider.value;
          }
        }
        if (spFormat) {
          spFormat.addEventListener("change", evt => {
            console.log(`Selected item: ${evt.target.selectedIndex}`);
          })

        }
        if (imageFormat) {
          imageFormat.addEventListener("change", updateFormat);
          updateFormat();
        }

        if (qualitySlider) {
          qualitySlider.addEventListener("input", () => {
            qualityValue.innerText = qualitySlider.value;
          });
        }
      }
    }
  }
});