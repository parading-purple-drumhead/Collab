postDetails = document.getElementById("edit_post");
var qualification = document.querySelectorAll(".qualification");
var roles = document.querySelectorAll(".role");


function updatePost(){
    tech = [];
  rolesData = [];
  eligible_years = [];
  chips = postDetails.childNodes[9].childNodes[1].childNodes[1];
  chipNode = chips.childNodes;
  no_of_chips = chipNode.length;
  for (var i = 0; i < no_of_chips - 1; i++) {
    tech.push(chips.childNodes[i].childNodes[0].data);
  }
  selected = 2 * postDetails.post_cover.selectedIndex - 1;
  if (selected == -1) {
    selected = 1;
  }
//   console.log(newPost.post_cover.childNodes[selected + 2].dataset.icon)

  roles.forEach((role) => {
    if (role.checked) rolesData.push(role.id);
  });
  qualification.forEach((year) => {
    if (year.checked) eligible_years.push(parseInt(year.value));
  });
  const postData = {
    "post_title": postDetails.post_title.value,
    "post_cover": postDetails.post_cover.childNodes[selected+ 2].dataset.icon,
    "post_description": postDetails.description.value,
    "last_date": postDetails.apply_by.value,
    "tech_stack": tech,
    "roles": rolesData,
    "event": postDetails.post_type.value,
    "eligible_years": eligible_years,
    "responses": [],
    "archive": false,
    "qualifications": [],
    "responsibilities": [],
    "duration": "1 month",
    "saved_by": [],
    "created_at": new Date().toISOString().slice(0,10)
  };
  // console.log(postData)
  fetch(`${link}/post/${sessionStorage.clickedPost}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "uid": sessionStorage.currentUser,
    },
    body: JSON.stringify(postData),
  }).then(() => {
      window.location.href = "./my_posts.html"
  }).catch((err)=>{
      console.log(err)
  })
}

function deletePost(){
  fetch(`${link}/post/${sessionStorage.clickedPost}`,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "uid": sessionStorage.currentUser,
    }
  }).then(()=>{
    window.location.href = "./my_posts.html"
  }).catch((err)=>{
    console.log(err)
  })
}

document.addEventListener("click", function (e) {
    if (e.target && e.target.id == "update_post") {
      //do something
      updatePost()
    }
    else if (e.target && e.target.id == "delete_post") {
      //do something
      deletePost()
    }
})

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${link}/post/${sessionStorage.clickedPost}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("post_title").value = data.post_title;
      coverNode = document.getElementById("post_cover");
      for (var i = 1; i <= 2 * coverNode.length; i++) {
        if (i % 2) {
          if (coverNode.childNodes[i].dataset.icon == data.post_cover) {
            console.log("1");
            console.log(coverNode[(i-1)/2])
            coverNode[(i-1)/2].setAttribute('selected','selected')
            coverNode.selectedIndex = (i - 1) / 2;
            // console.log(coverNode.childNodes[i].dataset.icon)
          }
        }
      }
      document.getElementById("description").value = data.post_description;
      console.log(
        postDetails.childNodes[9].childNodes[1].childNodes[1].childNodes
      );
    //   chips = postDetails.childNodes[9].childNodes[1].childNodes[1];
    //   chipNode = chips.childNodes;
    //   no_of_chips = data.tech_stack.length;
    //   for (var i = 0; i < no_of_chips - 1; i++) {
    //     techchips.childNodes[i].childNodes[0].innerHTML = data.tech_stack[i];
    //     console.log(techchips.childNodes[i].childNodes[0])
    //   }
    document.querySelectorAll('#post_type').forEach(type=>{
        if(type.value == data.event){
            type.checked = true
        }
    })
    qualification.forEach((year)=>{
        data.eligible_years.forEach(eligible_year=>{
            if(year.value == eligible_year){
                year.checked = true
            }
        })
    })
    roles.forEach(role=>{
        data.roles.forEach(d_role=>{
            if(role.id == d_role)
                role.checked = true
        })
    })
    postDetails.apply_by.value = data.last_date
      //   console.log(coverNode.length)
      M.updateTextFields();
    });
});
