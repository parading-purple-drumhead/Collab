

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
      }).catch(err=>{
          console.log(err)
      });
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
