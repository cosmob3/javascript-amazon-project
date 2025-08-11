const xhr = new XMLHttpRequest();

//First we have to set up the event listener before the request.
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});
xhr.open("GET", "https://supersimplebackend.dev");

//(type of http request, where to send message)

xhr.send();
//As soon as this code is ran, it will execute but the response takes a bit to arrived so that's why we set up the event listener to wait for a response
