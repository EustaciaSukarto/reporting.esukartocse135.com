const loginForm = document.getElementById("register-form")

loginForm.onsubmit = async (e) => {
    e.preventDefault();

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var isAdmin = document.getElementById('isAdmin').checked;
    var error = document.getElementById("error-text")
    
    requestBody = {
        username,
        email,
        password,
        isAdmin
    }
    const res = await fetch("https://reporting.esukartocse135.com/api/user/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  try {
    if (res.status !== 200) {
      const data = await res.json();
      error.innerHTML = data.msg;
    } else {
        window.location.href = "../pages/login.html";
    }
  } catch (error) {
    console.log(error);
  }
}