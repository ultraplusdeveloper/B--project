let signupBtn = document.getElementById("signupBtn");
  let signinBtn = document.getElementById("signinBtn");
  let nameField = document.getElementById("nameField");
  let title = document.getElementById("title");

  signinBtn.onclick = function(){
    nameField.style.maxHeight="0";
    title.innerHTML="Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    const userNameInput = document.querySelector('#nameField input');
     const userName = userNameInput.value.trim();

  if (userName) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("userSignedIn", "true");
    alert("Signed in successfully! Redirecting to the main site...");
    window.location.href = "http://127.0.0.1:5500/index.html"; 
  } else {
    alert("Please enter your name before signing in!");
  }
};

  

  signupBtn.onclick = function(){
    nameField.style.maxHeight="60px";
    title.innerHTML="Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
    
 window.location.href = "sighnUp.html";
};
