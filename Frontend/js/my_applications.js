

function toggle_save(postid){
    try{
      fetch(`${link}/post/toggle_save/${postid}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "uid": sessionStorage.currentUser
        }
      }).then(()=>{
        console.log("1")
        save_btn_classes = []
        save_icon_classes = []
        save_Btn = document.getElementById(postid).childNodes[3].childNodes[3]
        save_btn_classes = save_Btn.classList
        save_icon = save_Btn.childNodes[0]
        save_icon_classes = save_icon.classList
        console.log(save_icon)
        console.log(save_btn_classes)
        if(save_btn_classes.contains('outline')){
          save_btn_classes.remove('outline', 'white')
          save_btn_classes.add('light-blue')
          save_icon_classes.remove('light-blue-text')
        }
        else{
          save_btn_classes.add('outline', 'white')
          save_btn_classes.remove('light-blue')
          save_icon_classes.add('light-blue-text')
        }
      }).catch(err=>{
        console.log(err)
      })
    }
    catch{
      console.log("error")
    }
  }
  
  function toggle_Apply(postid){
    try{
      fetch(`${link}/post/toggle_register/${postid}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "uid": sessionStorage.currentUser
        }
      }).then(()=>{
        apply = document.getElementById(postid).childNodes[5].childNodes[3]
    apply_classes = apply.classList
    console.log(apply.text)
    if(apply_classes.contains('red')){
      apply_classes.remove('red')
      apply_classes.add('light-blue')
      apply.text = "Apply"
    }
    else{
      apply_classes.add('red')
      apply_classes.remove('light-blue')
      apply.text = "Withdraw"
        }
      }).catch(err=>{
        console.log(err)
      })
    }
    catch{
      console.log("error")
    }
  }

function getAppliedPosts(){
    try{
        fetch(`${link}/post/?type=applied`,{
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

document.addEventListener("click", function (e) {
    if (e.target && e.target.id == "applybtn") {
      //do something
      toggle_Apply(e.target.parentNode.parentNode.id)
      console.log(e.target.parentNode.parentNode.id);
    }
    else if (e.target && e.target.id == "expand") {
      //do something
      sessionStorage.clickedPost = e.target.parentNode.parentNode.id
      window.location.href = "./post.html"
    }
    else if (e.target){
      if(e.target.id == "save_btn"){
        toggle_save(e.target.parentNode.parentNode.id)
        console.log(e.target.parentNode.parentNode.id);
      }
      else if(e.target.id == "save_icon"){
        toggle_save(e.target.parentNode.parentNode.parentNode.id)
        console.log(e.target.parentNode.parentNode.parentNode.id);
      }
      //do something
      
    }
    // console.log(e.target.)
  });

document.addEventListener("DOMContentLoaded", function () {
    getAppliedPosts();
  });