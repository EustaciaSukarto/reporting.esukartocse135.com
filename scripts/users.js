window.onload = async function () {
  const authToken = sessionStorage.getItem("auth_token");
  if (authToken == null) {
    window.location.href = "../pages/login.html"
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
        if (!data.isAdmin) {
          window.location.href = "../index.html";
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const createButton = document.getElementById('create-button');
const createForm = document.getElementById('create-form');
const createUsername = document.getElementById('create-username');
const createEmail = document.getElementById('create-email');
const createPassword = document.getElementById('create-password');
const createAdmin = document.getElementById('create-admin');

const updateForm = document.getElementById('update-form');
const updateId = document.getElementById('update-id');
const updateUsername = document.getElementById('update-username');
const updateEmail = document.getElementById('update-email');
const updatePassword = document.getElementById('update-password');
const updateAdmin = document.getElementById('update-admin');

createButton.addEventListener('click', () => {
  createForm.classList.toggle('hide');
});

createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = createUsername.value;
  const email = createEmail.value;
  const password = createPassword.value;
  const isAdmin = createAdmin.checked;

  // Prepare the new user object
  const newUser = {
    username,
    email,
    password,
    isAdmin
  };

  // Send POST request to create user
  fetch('/api/user/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': sessionStorage.getItem('auth_token')
    },
    body: JSON.stringify(newUser)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.msg); // Throw the error message from the server
      });
    }
    return response.json();
  })
  .then(() => {
    refreshGrid();
    createForm.reset();
    createForm.classList.add('hide');
  })
  .catch(error => {
    alert(error);
    console.error('Error:', error);
  });
});

// Function to fetch grid data from custom endpoint
function fetchGridData() {
  return fetch('/api/user/users', {
    headers: {
      'auth-token': sessionStorage.getItem('auth_token')
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      alert(error);
      console.error('Error:', error);
    });
}

// Function to render grid rows
function renderGrid(data) {
  const tableBody = document.querySelector('#grid tbody');
  tableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.username}</td>
      <td>${item.email}</td>
      <td>${item.password}</td>
      <td>${item.isAdmin}</td>
      <td>
        <button onclick="editRow('${item._id}')">Edit</button>
        <button onclick="deleteRow('${item._id}')">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to fetch and render grid data
function refreshGrid() {
  fetchGridData()
    .then(data => renderGrid(data));
}

// Function to handle row editing
function editRow(id) {
  fetch(`/api/user/users/${id}`, {
    headers: {
      'auth-token': sessionStorage.getItem('auth_token')
    }
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.msg); // Throw the error message from the server
        });
      }
      return response.json();
    })
    .then(user => {
      updateId.value = user._id;
      updateUsername.value = user.username;
      updateEmail.value = user.email;
      updatePassword.value = user.password;
      updateAdmin.checked = user.isAdmin;

      updateForm.classList.remove('hide');
    })
    .catch(error => {
      alert(error);
      console.error('Error:', error);
    });
}

updateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = updateId.value;
  const username = updateUsername.value;
  const email = updateEmail.value;
  const password = updatePassword.value;
  const isAdmin = updateAdmin.checked;

  // Prepare the updated user object
  const updatedUser = {
    username,
    email,
    password,
    isAdmin
  };

  // Send PUT request to update user
  fetch(`/api/user/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': sessionStorage.getItem('auth_token')
    },
    body: JSON.stringify(updatedUser)
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.msg); // Throw the error message from the server
      });
    }
  })
  .then(() => {
    refreshGrid();
    updateForm.reset();
    updateForm.classList.add('hide');
  })
  .catch(error => {
    alert(error);
    console.error('Error:', error);
  });
});

// Function to handle row deletion
function deleteRow(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    // Send DELETE request to delete user
    fetch(`/api/user/users/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': sessionStorage.getItem('auth_token')
      },
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.msg); // Throw the error message from the server
        });
      }
    })
    .then(() => refreshGrid())
    .catch(error => {
      alert(error);
      console.error('Error:', error);
    });
  }
}

// Initial load
refreshGrid();