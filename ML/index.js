// Örnek veri
//var data = [2, 298.1, 308.6, 1551.0, 42.8, 0]; 0
// 1	[300.304585	310.597503	1296.837494	62.360826	204]

document.querySelector("#footer").innerHTML = `
&copy; ML GRU MODEL ${new Date().getFullYear()}

`;
function predict() {
  var data = [
    parseInt(document.getElementById("type").value),
    parseFloat(document.getElementById("air_t").value),
    parseFloat(document.getElementById("process_t").value),
    parseFloat(document.getElementById("rot_s").value),
    parseFloat(document.getElementById("torque").value),
    parseInt(document.getElementById("tool_w").value),
  ];
  // API endpointi
  var endpoint = "http://localhost:5000/predict";

  // API'ye POST isteği yapma
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Tahmini işleyin
      console.log(data);
      var prediction = data.prediction;
      // Sonuçları kullanıcıya gösterin
      // document.getElementById("result").className = "";
      // document
      //   .getElementById("result")
      //   .classList.add("alert", "alert-info", "text-center", "fw-bold");
      // document.getElementById("result").innerHTML = `
      //   Machine Failure: ${prediction > 0.5 ? "1" : "0"}
      // `;
      let bold_t = document.createElement("b");
      bold_t.innerText = `Machine Failure : ${prediction > 0.5 ? "1" : "0"}`;

      swal({
        title: "PREDICTION",
        // text: `Machine Failure : ${prediction > 0.5 ? "1" : "0"}`,
        content: bold_t,
        icon: "success",
        button: "Ok",
      });
      console.log("Tahmin: ", prediction);
    })
    .catch((error) => {
      console.error("Hata:", error);
      // document.getElementById("result").className = "";
      // document.getElementById("result").classList.add("alert-danger", "alert");

      // document.getElementById("result").innerHTML = `
      //   please enter valid values for each input!
      // `;
      let bold_t = document.createElement("b");
      bold_t.innerText = "Your Input Values Are Not Valid";
      swal({
        title: "!!! WARNING !!!",
        content: bold_t,
        icon: "warning",
        button: {
          text: "Ok",
          className: "alert_button",
        },
        className: "swal-model",
      }); // setTimeout(() => {
      //   document.getElementById("result").innerHTML = ``;
      //   document.getElementById("result").className = ``;
      // }, 3000);
    });
}

function formatFloatInput(event) {
  let inputText = event.target.value;

  inputText = inputText.replace(/[^0-9.]/g, "");

  // Virgül ve noktaları kaldırın
  inputText = inputText.replace(/,/g, "").replace(/\./g, "");

  // En başta gelen sıfırları silin
  while (inputText.startsWith("0") && inputText.length > 1) {
    inputText = inputText.slice(1);
  }

  // Noktayı yerleştirin
  const decimalIndex = inputText.indexOf(".");
  if (decimalIndex !== -1) {
    // Ondalık kısmı 2 basamakla sınırlayın
    const decimalPart = inputText.slice(decimalIndex + 1, decimalIndex + 7);
    inputText = inputText.slice(0, decimalIndex + 1) + decimalPart;
  }

  // Noktayı ekleyin
  if (inputText.length > 6) {
    inputText = inputText.slice(0, -6) + "." + inputText.slice(-6);
  }

  // Düzeltme sonucunu input alanına yazın
  event.target.value = inputText;

  // Geçerlilik kontrolünü yapmak için girişi doğrulayın
  // validateFloatInput(event);
}

function formatIntegerInput(event) {
  let inputText = event.target.value;

  // Sadece rakamları tutun
  inputText = inputText.replace(/\D/g, "");

  // En başta gelen sıfırları silin
  while (inputText.startsWith("0") && inputText.length > 1) {
    inputText = inputText.slice(1);
  }

  // Düzeltme sonucunu input alanına yazın
  event.target.value = inputText;
}
document.querySelector("#reset_btn").addEventListener("click", () => {
  document.getElementById("type").place = "Select Type:";
  document.getElementById("air_t").value = "";
  document.getElementById("process_t").value = "";
  document.getElementById("rot_s").value = "";
  document.getElementById("torque").value = "";
  document.getElementById("tool_w").value = "";
  document.getElementById("p_id").value = "";
  document.getElementById("UDI").value = "";

  document.getElementById("result").classList().add("invisible");
});
