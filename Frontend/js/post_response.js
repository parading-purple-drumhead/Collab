// link = "https://6ef1f5ebff3f.ngrok.io"

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${link}/post/responses/${sessionStorage.clickedPost}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      output = ``;
      data.forEach((applicant) => {
        output += `<div class="col s12 m6 l3 card">
          <div class="row center">
            <img
              class="circle responsive-img candidate"
              src=${applicant.photo_url}
              alt=""
            />
          </div>
          <div class="row center">
            <div class="col s8 right-align">${applicant.name}</div>
            <div class="col s2">${applicant.year}</div>
          </div>
          <div class = "row center">
            <a href=${applicant.linkedin} class="col s3">
            <i class='bx bxl-linkedin'></i>
            </a>
            <a href=${applicant.email} class="col s3">
            <span class="material-icons">
            email
            </span>
            </a>
            <a href=${applicant.github} class="col s3">
            <i class='bx bxl-github'></i>
            </a>
            <a href=${applicant.website} class="col s3">
            <i class='bx bx-globe' ></i>
            </a>
          </div>
          <div class = "row center">
            <a href=${applicant.resume} class="btn light-blue wave-effect">
                Resume
            </a>
          </div>
        </div>`;
      });
      document.getElementById("template").innerHTML = output;
    });
});
