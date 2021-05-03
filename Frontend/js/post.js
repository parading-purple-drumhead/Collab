

function toggle_save(postid) {
  try {
    fetch(`${link}/post/toggle_save/${postid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "uid": sessionStorage.currentUser
      }
    }).then(() => {
      save_btn_classes = []
      save_icon_classes = []
      save_Btn = document.getElementById(postid).childNodes[1].childNodes[1].childNodes[3].childNodes[3]
      save_btn_classes = save_Btn.classList
      save_icon = save_Btn.childNodes[0]
      save_icon_classes = save_icon.classList
      if (save_btn_classes.contains('outline')) {
        save_btn_classes.remove('outline', 'white')
        save_btn_classes.add('light-blue')
        save_icon_classes.remove('light-blue-text')
      }
      else {
        save_btn_classes.add('outline', 'white')
        save_btn_classes.remove('light-blue')
        save_icon_classes.add('light-blue-text')
      }
    }).catch(err => {
      console.log(err)
    })
  }
  catch {
    console.log("error")
  }
}

function toggle_Apply(postid) {
  try {
    fetch(`${link}/post/toggle_register/${postid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "uid": sessionStorage.currentUser
      }
    }).then(() => {
      apply = document.getElementById(postid).childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[5].childNodes[1]
      apply_classes = apply.classList
      if (apply_classes.contains('red')) {
        apply_classes.remove('red')
        apply_classes.add('light-blue')
        apply.text = "Apply"
      }
      else {
        apply_classes.add('red')
        apply_classes.remove('light-blue')
        apply.text = "Withdraw"
      }
    }).catch(err => {
      console.log(err)
    })
  }
  catch {
    console.log("error")
  }
}

function getPost() {
  try {
    fetch(`${link}/post/${sessionStorage.clickedPost}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.querySelector("title").textContent = "Collab | " + data.post_title;
        output = `<div></div>`;
        if (data.created_by != sessionStorage.currentUser) {
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
            if (year == 1) {
              year = "1st"
            }
            else if (year == 2) {
              year = "2nd"
            }
            else if (year == 3) {
              year = "3rd"
            }
            else {
              year += "th"
            }
            years += year + " ";
          });
          data.responses.forEach((id) => {
            if (id === sessionStorage.currentUser) {
              apply_btn = `<a id="applybtn" class="btn btn-small z-depth-0 red">Withdraw</a>`;
              return 0;
            }
          });
          var date = new Date(data.last_date)
          date = date.toDateString().substr(4)
          output += `
            <div id=${data.post_id} class="row container">
            <div class="col s3">
              <div class="card">
                <div class="card-image">
                  <img src="${data.post_cover}" />
                  <span class="card-title white-text flex-text"
                    >${data.post_title}</span
                  >
                </div>
                <div class="card-content">
                  <span>Apply by: ${date}</span>
                  
                  ${savebtn}

                  <br />
                  <span>Year: ${years}</span>
                  <ul class="tags">
                  ${tech_st}
                  </ul>
                  <div class="row">
                    <div class="col s12">Posted By</div>
                  </div>
                  <div class="row">
                    <div class="col s12">
                      <div class="chip">
                        <img
                          src=${sessionStorage.currentPhotoURL}
                          alt="Contact Person"
                        />
                        ${sessionStorage.currentUserName}
                      </div>
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
    const post_id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    console.log(post_id);

    toggle_Apply(post_id)
  }
  else if (e.target && e.target.id == "expand") {
    sessionStorage.clickedPost = e.target.parentNode.parentNode.id
    window.location.href = "./post.html"
  }
  else if (e.target && e.target.id == "save_icon") {
    const post_id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    console.log(post_id);

    toggle_save(post_id);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  getPost();
});
