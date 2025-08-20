const { entrypoints } = require("uxp");

  showAlert = () => {
    alert("This is an alert message");
  }

  entrypoints.setup({
    commands: {
      showAlert,
    },
    panels: {
      vanilla: {
        show(node ) {
        }
      }
    }
  });

function getImageFormat() {
  const app = require("photoshop").app;
  const imageFormat = document.getElementById("imageFormat")
  imageFormat.addEventListener('change', function() {
    selectedOption = this.value;
    const optionText = document.getElementById("option")
    optionText.innerText = selectedOption
    alert(selectedOption)
});

}



document.getElementById("btnImageFormat").addEventListener("click", getImageFormat);