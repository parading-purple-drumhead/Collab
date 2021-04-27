const google_signups = document.querySelectorAll("#google-signup");
const google_signouts = document.querySelectorAll("#google-signout");

link = "https://01da5d02f67b.ngrok.io"

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in:", user);
    sessionStorage.currentUser = user.uid;
    sessionStorage.currentUserVerified = user.emailVerified;
    sessionStorage.currentUserEmail = user.email;
    sessionStorage.currentPhotoURL = user.photoURL;
    sessionStorage.currentUserName = user.displayName;
    console.log(user.uid);
    console.log(sessionStorage);
  } else {
    console.log("User logged out");
    sessionStorage.currentUser = "";
    sessionStorage.currentUserVerified = false;
    sessionStorage.currentUserEmail = "";
    sessionStorage.currentPhotoURL = "";
    sessionStorage.currentUserName = "";
    sessionStorage.clickedPost = "";
    console.log(sessionStorage);
  }
});

function addUserCred(uid, email, photoURL, name) {
  const userCred = {
    uid: uid,
    email: email,
    name: name,
    photo_url: photoURL,
    posts_created: [],
    posts_applied: [],
    posts_saved: [] 
  };
  console.log(userCred);
  try {
    const call = fetch(`${link}/user/add/${uid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCred),
    }).then(() => {
      window.location.href = "./my_profile.html";
    });
    // const res = await call.json()
    // console.log(res)
    // window.location.href = "./my_profile.html";
    return userCred;
  } catch {
    console.log("error");
    return 0;
  }
}

google_signups.forEach((signup) => {
  signup.addEventListener("click", () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // console.log(user);
        // console.log(credential)
        // console.log(token)
        if (result.additionalUserInfo.isNewUser) {
          addUserCred(user.uid, user.email, user.photoURL, user.displayName);
        } else {
          window.location.href = "./discover.html";
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });
});

// googleSignup.forEach(button => {
//   button.addEventListener('click', e => {
//     e.preventDefault();
//     var provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider).then(result => {
//       console.log(result)
//       if (result.additionalUserInfo.isNewUser) {
//         return firebase.firestore().collection('Users').doc(result.user.uid).set({
//           username: result.user.displayName,
//           photoUrl: result.user.photoURL,
//           downVotedPosts: [],
//           upVotedPosts: []
//         });
//       }
//       const modals = document.querySelectorAll('.modal');
//       modals.forEach(modal => {
//         M.Modal.getInstance(modal).close();
//         sidenavDissmiss();
//         window.location.reload();
//       })
//     }).catch(err => {
//       console.log(err)
//       console.log("Try again")
//     })
//   })
// })

google_signouts.forEach((signout) => {
  signout.addEventListener("click", () => {
    console.log("c");
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.href = "./index.html";
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// document.querySelector('#google-signout').addEventListener("click",()=>{
//     firebase.auth().signOut
//     .then(()=>{
//         window.location.href = "./index.html"
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
// })
