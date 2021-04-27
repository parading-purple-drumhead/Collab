

function getUserDetails() {
    try {
      fetch(`${link}/user/${sessionStorage.currentUser}`)
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("name").innerHTML =
            sessionStorage.currentUserName;
          document.getElementById("email").innerHTML =
            sessionStorage.currentUserEmail;
          document.getElementById("year").selectedIndex  = data.year
          // document.getElementById("year").value = 
          // data.year
          document.getElementById("linkedin").value =
            data.linkedin;
          document.getElementById("github").value =
          data.github;
          document.getElementById("website").value =
          data.website;
          document.getElementById("resume").value =
          data.resume;
          console.log(data);
        });
      // .catch((error)=>{
      //   console.log(error)
      // })
  
      // window.location.href = "./my_profile.html";
    } catch {
      console.log("error");
      return 0;
    }
  }

document.addEventListener("DOMContentLoaded", getUserDetails())