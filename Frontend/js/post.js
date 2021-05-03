

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

function getPost() {
  try {
    fetch(`${link}/post/${sessionStorage.clickedPost}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        output = `<div></div>`;
          if(data.created_by != sessionStorage.currentUser){
            years = "";
            tech_st = ``;
            apply_btn = `<a id="applybtn" class="btn btn-small light-blue">Apply</a>`
            savebtn = `<a
                id="save_btn"
                class="outline btn-floating white waves-effect z-depth-0 right"
                ><i id = "save_icon" class="light-blue-text material-icons"> bookmark </i></a
              >`;
            data.saved_by.forEach((user_id) => {
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
            data.tech_stack.forEach((tech) => {
              tech_st += `<li class="grey lighten-2">${tech}</li>`;
            });
            data.eligible_years.forEach((year) => {
              years += year + " ";
            });
            data.responses.forEach((id) => {
              if (id === sessionStorage.currentUser) {
                apply_btn = `<a id="applybtn" class="btn btn-small z-depth-0 red">Withdraw</a>`;
                return 0;
              }
            });
            output += `
            <div class="row container">
            <div class="col s3">
              <div class="card">
                <div class="card-image">
                  <img src="${data.post_cover}" />
                  <span class="card-title white-text flex-text"
                    >${data.post_title}</span
                  >
                </div>
                <div class="card-content">
                  <span>Last Date: ${data.last_date}</span>
                  
                  ${savebtn}

                  <br />
                  <span>Year:${years}</span>
                  <ul class="tags">
                  ${tech_st}
                  </ul>
                  <div class="row">
                    <div class="col s12">Posted By</div>
                  </div>
                  <div class="row">
                    <div class="chip">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=80"
                        alt="Contact Person"
                      />
                      Jane Doe
                    </div>
                  </div>
                  <div class="row">
                    <div class="col m5">
                      Apply By:
                    </div>
                    <div class="col m7">
                    ${data.last_date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col s9">
              <div class="card">
                <div class="card-content">
                  <div class="row valign-wrapper">
                    <div class="col s4">
                      <h6>Description</h6>
                    </div>
                    <div class="col s2 offset-s6">
                      <a href="" class="red-text">Report</a>
                    </div>
                    <div class="col s2 ">
                      ${apply_btn}
                    </div>
                  </div>
                  <p>
                    ${data.post_description}
                    <br>
                    <br>
                    Apply API
                    Save API
                  </p>
                </div>
              </div>
            </div>
          </div>
                `;
          }
          
          document.getElementById("expandpost").innerHTML = output;
      });
      // .catch(err=>{
      //     console.log(err)
      // });
  } catch {
    console.log("error");
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
  getPost();
});
