var newPost = document.getElementById("new_post");
var qualification = document.querySelectorAll(".qualification");
var roles = document.querySelectorAll(".role");



function addNewPost() {
  tech = [];
  rolesData = [];
  eligible_years = [];
  chips = newPost.childNodes[9].childNodes[1].childNodes[1];
  chipNode = chips.childNodes;
  no_of_chips = chipNode.length;
  for (var i = 0; i < no_of_chips - 1; i++) {
    tech.push(chips.childNodes[i].childNodes[0].data);
  }
  selected = 2 * newPost.post_cover.selectedIndex - 1;
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
    "post_title": newPost.post_title.value,
    "post_cover": newPost.post_cover.childNodes[selected+ 2].dataset.icon,
    "post_description": newPost.description.value,
    "last_date": newPost.apply_by.value,
    "tech_stack": tech,
    "roles": rolesData,
    "event": newPost.post_type.value,
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
  fetch(`${link}/post/add`, {
    method: "POST",
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

newPost.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewPost();
});

  