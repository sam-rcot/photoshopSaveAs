const { entrypoints } = require('uxp');
const app = require('photoshop').app;
const { core } = require('photoshop');
const fs = require('uxp').storage.localFileSystem;

// Configuration for different image formats
const FORMAT_CONFIG = {
  jpg: {
    minValue: 0,
    maxValue: 12,
    defaultValue: 12,
    sliderLabel: 'JPG quality',
  },
  png: {
    minValue: 0,
    maxValue: 9,
    defaultValue: 1,
    sliderLabel: 'PNG compression',
  },
};

entrypoints.setup({
  commands: {
    showAlert: (message) => {
      core.showAlert(message);
    },
  },
  panels: {
    vanilla: {
      show(node) {
        // Get UI elements
        const imageFormatSelector = document.getElementById(
          'imageFormatSelector'
        );
        const qualitySlider = document.getElementById('qualitySlider');
        const qualitySliderLabel =
          document.getElementById('qualitySliderLabel');
        const saveButton = document.getElementById('saveButton');

        /**
         * Updates slider configuration based on selected image format
         * @param {string} selectedFormat - The selected format ('jpg' or 'png')
         * @param {Object} uiElements - Object containing slider and label elements
         */
        /**
         * Updates slider configuration based on selected image format
         * @param {string} selectedFormat - The selected format ('jpg' or 'png')
         * @param {Object} uiElements - Object containing slider and label elements
         */
        function updateSliderForFormat(selectedFormat, uiElements) {
          const config = FORMAT_CONFIG[selectedFormat];

          if (!config) {
            console.warn(`Unknown format: ${selectedFormat}`);
            return;
          }

          if (
            uiElements &&
            uiElements.qualitySlider &&
            uiElements.qualitySliderLabel
          ) {
            const { qualitySlider, qualitySliderLabel } = uiElements;

            qualitySlider.min = config.minValue;
            qualitySlider.max = config.maxValue;
            qualitySlider.value = config.defaultValue;
            qualitySliderLabel.innerText = config.sliderLabel;
          }
        }

        /**
         * Gets the currently selected format from the format selector
         * @returns {string} The selected format ('jpg' or 'png')
         */
        function getCurrentFormat() {
          return imageFormatSelector.selectedIndex === 0 ? 'jpg' : 'png';
        }

        // Initialize format selector event listener
        if (imageFormatSelector) {
          imageFormatSelector.addEventListener('change', (event) => {
            const selectedFormat = getCurrentFormat();
            updateSliderForFormat(selectedFormat, {
              qualitySlider,
              qualitySliderLabel,
            });
          });

          // Initialize the slider with the default format
          const initialFormat = getCurrentFormat();
          updateSliderForFormat(initialFormat, {
            qualitySlider,
            qualitySliderLabel,
          });
        }

        // Initialize quality slider event listener
        if (qualitySlider) {
          qualitySlider.addEventListener('input', (event) => {
            const currentValue = event.target.value;
            const currentFormat = getCurrentFormat();
            console.log(
              `${FORMAT_CONFIG[currentFormat].sliderLabel}: ${currentValue}`
            );
          });
        }

        if (saveButton) {
          saveButton.addEventListener('click', (e) => {
            // file()
            // core.showAlert("Save")
            saveFile();
          });
        }
        async function saveFile() {
          // Prompt user with Save dialog, suggesting a default filename
          const file = await fs.getFileForSaving('output777.txt');
          if (file) {
            await file.write('Hello, world!');
          } else {
            // Handle cancelation or no file selected
          }
        }
      },
    },
  },
});
