var profile = document.querySelectorAll("#profile");


function updateUser(inputs) {
  const userCred = {
    name: sessionStorage.currentUserName,
    photo_url: sessionStorage.currentPhotoURL,
    year: inputs.year.value,
    linkedin: inputs.linkedin.value || null,
    github: inputs.linkedin.value || null,
    website: inputs.website.value || null,
    resume: inputs.resume.value
  };
  console.log(userCred);
  try {
    const call = fetch(
      `${link}/user/${sessionStorage.currentUser}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCred),
      }
    ).catch((error) => {
      console.log(error);
    });

    // window.location.href = "./my_profile.html";
  } catch {
    console.log("error");
    return 0;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var date = new Date();
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems, {
    constrainWidth: false,
    alignment: "right",
    coverTrigger: false,
  });

  var chip_elems = document.querySelectorAll(".chips");
  var instances = M.Chips.init(chip_elems, {
    placeholder: "Enter Tech Stack",
    secondaryPlaceholder: "Enter Tech Stack",
    limit: 4
  });

  var date_elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(date_elems, {
    minDate: date,
    autoClose: true,
    yearRange: 0,
    format: 'yyyy-mm-dd'
  });

  var select_elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(select_elems, {});

  var action_btn_elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(action_btn_elems, {});
});

profile.forEach((i) => {
  i.addEventListener("submit", (e) => {
    console.log(i.linkedin.value);
    e.preventDefault();
    updateUser(i);
  });
});
