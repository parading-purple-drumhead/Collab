
function editFunction(postid){
  sessionStorage.clickedPost = postid
    window.location.href = "./edit_post.html"
}

function viewResponses(postid){
  sessionStorage.clickedPost = postid
    window.location.href = "./post_response.html"
}

function getMyPosts(){
    try{
        fetch(`${link}/post/?type=created`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "uid": sessionStorage.currentUser
            }
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                output = `<div></div>`
                data.forEach(post => {
                  years = "";
                  tech_st = ``;
                  post.saved_by.forEach((user_id) => {
                    console.log(user_id);
                  });
                  post.tech_stack.forEach((tech) => {
                    tech_st += `<li class="grey lighten-2">${tech}</li>`;
                  });
                  post.eligible_years.forEach((year) => {
                    years += year + " ";
                  });
                  output += `<div class="col s12 m6 l4">
                  <div class="card space" id="${post.post_id}">
                    <div class="card-image">
                      <img src="${post.post_cover}" />
                      <span class="card-title white-text flex-text"
                        >${post.post_title}</span
                      >
                    </div>
      
                    <div class="card-content">
                      <span>Last Date: ${post.last_date}</span>
                      <a
                        href="#"
                        id = "edit_btn"
                        class="btn-floating red waves-effect z-depth-0 right"
                        ><i id="edit_icon" class="material-icons"> mode_edit </i></a
                      >
      
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
                      <a href="#" id="responses" class="btn btn-small light-blue"
                        >View Response</a
                      >
                    </div>
                  </div>
                </div>`
                });
                document.getElementById("template").innerHTML = output;
            })
    }
    catch{
        console.log("error")
    }
}

document.addEventListener('click', function(e){
  if(e.target && e.target.id == "edit_btn"){
    editFunction(e.target.parentNode.parentNode.parentNode.id)
    console.log(e.target.parentNode.parentNode.id)
  }
  else if(e.target && e.target.id == "edit_icon"){
    editFunction(e.target.parentNode.parentNode.parentNode.id)
    console.log(e.target.parentNode.parentNode.parentNode.id)
  }
  else if(e.target && e.target.id == "responses"){
    viewResponses(e.target.parentNode.parentNode.id)
    console.log(e.target.parentNode.parentNode.id)
  }
})

document.addEventListener("DOMContentLoaded", function () {
    getMyPosts();
  });