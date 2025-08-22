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

        // Set JPG as default format
        if (imageFormatSelector) {
          imageFormatSelector.selectedIndex = 0; // 0 = JPG, 1 = PNG
        }

        // Check document is open
        if (!app.documents.length) {
          core.alert('No document is open. Please open an image first.');
          return;
        }
        const doc = app.activeDocument;

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
            // Removed console logging
          });
        }

        if (saveButton) {
          saveButton.addEventListener('click', async (e) => {
            await saveDocumentWithSettings();
          });
        }

        /**
         * Saves the active document with the selected format and quality settings
         */
        async function saveDocumentWithSettings() {
          try {
            const currentFormat = getCurrentFormat();
            const currentQuality = qualitySlider
              ? parseInt(qualitySlider.value)
              : FORMAT_CONFIG[currentFormat].defaultValue;

            // Get default filename based on document name
            const defaultName = doc.name.replace(/\.[^/.]+$/, '') || 'untitled';
            const extension = currentFormat === 'jpg' ? '.jpg' : '.png';
            const suggestedFilename = defaultName + extension;

            // Get default folder (user's home directory)
            const homeFolder = await fs.getDataFolder();

            // Show file save dialog with home folder as starting location
            const file = await fs.getFileForSaving(suggestedFilename, {
              startLocation: homeFolder,
            });

            if (!file) {
              return; // User cancelled
            }

            // Execute the save operation in modal scope
            await core.executeAsModal(
              async () => {
                // Create save options based on format
                let saveOptions;
                if (currentFormat === 'jpg') {
                  saveOptions = {
                    quality: currentQuality,
                    embedColorProfile: true,
                  };
                } else {
                  // PNG
                  saveOptions = {
                    compression: currentQuality,
                    interlaced: false,
                  };
                }

                // Save the document
                if (currentFormat === 'jpg') {
                  await doc.saveAs.jpg(file, saveOptions);
                } else {
                  await doc.saveAs.png(file, saveOptions);
                }
              },
              { commandName: 'Save Document with Custom Settings' }
            );

            core.showAlert(`Document saved successfully as ${file.name}`);
          } catch (error) {
            console.error('Error saving document:', error);
            core.showAlert(`Error saving document: ${error.message}`);
          }
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
