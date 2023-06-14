const logoutButton = document.getElementById("logout");

logoutButton.onclick = async (e) => {
  e.preventDefault();

  sessionStorage.removeItem("auth_token");
  window.location.href = "../pages/logout.html";
};