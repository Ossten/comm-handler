const sendButton = document.getElementById("btn-send");
sendButton.addEventListener("click", (event) => {
  axios
    .request({
      url: "http://localhost:8888/message",
      method: "POST",
      headers: {
        "x-forwarded-for": "1.2.3.4",   // ip address is manualy set for testing purposes
      },
      data: {
        to: "1.6.7.8",   // ip address is manualy set for testing purposes
        message: document.getElementById("message").value,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

const getButton = document.getElementById("btn-get");
getButton.addEventListener("click", (event) => {
  axios
    .request({
      url: "http://localhost:8888/message",
      method: "GET",
      headers: {
        "x-forwarded-for": "1.6.7.8",  // ip address is manualy set for testing purposes
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});
