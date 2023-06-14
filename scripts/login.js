const loginForm = document.getElementById("login");

window.onload = async function () {
  const authToken = sessionStorage.getItem("auth_token");
  if (authToken != null) {
    window.location.href = "../index.html";
    // console.log("Auth token present");
    // const res = await fetch("https://reporting.esukartocse135.com/api/user/role", {
    //   headers: {
    //     "auth-token": authToken,
    //   },
    // });

    // try {
    //   if (res.status === 200) {
    //     const data = await res.json();
    //     if (data.isAdmin) {
          // window.location.href = "../index.html";
    //     } else {
    //       window.location.href = "../pages/basic_dashboard.html";
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
};

loginForm.onsubmit = async (e) => {
  e.preventDefault();

  const usernameOrEmail = document.getElementById("usernameOrEmail").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error-text");
  const requestBody = {
    usernameOrEmail,
    password,
  };

  const res = await fetch("https://reporting.esukartocse135.com/api/user/login", {
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
      const data = await res.json();
      sessionStorage.setItem("auth_token", data.token);

      window.location.href = "../index.html";

      // Determine whether the user is an admin or not
      // const isAdminRes = await fetch("https://reporting.esukartocse135.com/api/user/role", {
      //   headers: {
      //     "auth-token": data.token,
      //   },
      // });

      // try {
      //   if (isAdminRes.status === 200) {
      //     const isAdminData = await isAdminRes.json();
      //     if (isAdminData.isAdmin) {
      //       window.location.href = "../pages/admin_dashboard.html";
      //     } else {
      //       window.location.href = "../pages/basic_dashboard.html";
      //     }
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    }
  } catch (error) {
    console.log(error);
  }
};
