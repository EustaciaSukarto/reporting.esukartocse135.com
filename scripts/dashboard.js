window.onload = async function () {
    const authToken = sessionStorage.getItem("auth_token");
    if (authToken == null) {
        window.location.href = "../pages/login.html";
    } else {
      console.log("Auth token present");
      const res = await fetch("https://reporting.esukartocse135.com/api/user/role", {
        headers: {
          "auth-token": authToken,
        },
      });
  
      try {
        if (res.status === 200) {
          const data = await res.json();
          
            if (data.isAdmin) {
                const userManagement = document.getElementById('userManagement');
                const link = document.createElement('a');
                link.href = '/pages/users.html';
                link.textContent = 'User Management';
                userManagement.appendChild(link);
            }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };