

function getSavedPosts(){
    try{
        fetch(`${link}/post/?type=saved`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "uid": sessionStorage.currentUser
            }
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                output = `<div></div>`;
        data.forEach((post) => {
          years = "";
          tech_st = ``;
          savebtn = `<a
              id="save_btn"
              class="outline btn-floating white waves-effect z-depth-0 right"
              ><i id = "save_icon" class="light-blue-text material-icons"> bookmark </i></a
            >`;
          post.saved_by.forEach((user_id) => {
            console.log(user_id);
            if (user_id === sessionStorage.currentUser) {
              savebtn = `<a
                  id="save_btn"
                  class="btn-floating light-blue waves-effect z-depth-0 right"
                  ><i id = "save_icon" class="material-icons"> bookmark </i></a
                >`;
              return 0;
            }
          });
          post.tech_stack.forEach((tech) => {
            tech_st += `<li class="grey lighten-2">${tech}</li>`;
          });
          post.eligible_years.forEach((year) => {
            years += year + " ";
          });
          post.responses.forEach((id) => {
            if (id === sessionStorage.currentUser) {
              apply_btn = `<a id="applybtn" class="btn btn-small z-depth-0 red">Withdraw</a>`;
              return 0;
            } else {
              apply_btn = `<a id="applybtn" class="btn btn-small light-blue">Apply</a>`;
            }
          });
          output += `
            <div class="col s12 m6 l4">
            <div class="card space" id="${post.post_id}">
              <div class="card-image">
                <img src="${post.post_cover}" >
                <span class="card-title white-text flex-text"
                  >${post.post_title}</span
                >
              </div>

              <div class="card-content">
                <span>Apply By: ${post.last_date}</span>
                
                ${savebtn}

                <br />
                <span>Year: ${years}</span>
                <ul class="tags">
                  ${tech_st}
                </ul>

                <p class="limit">
                  ${post.post_description}
                </p>
              </div>

              <div class="card-action right-align">
                <a href="#" id="expand">Expand</a>
                ${apply_btn}
              </div>
            </div>
          </div>
              `;
        });
        document.getElementById("template").innerHTML = output;
            })
    }
    catch{
        console.log("error")
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getSavedPosts();
  });