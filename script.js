    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userForm = document.getElementById("userForm");
    let userList = document.getElementById("userList");
    let submitBtn = document.getElementById("submitBtn");
    let editIndex = -1;
    // Save users
    function saveUsers() {
        localStorage.setItem("users", JSON.stringify(users));
    }
    // Display users
    function displayUsers() {
        userList.innerHTML = "";
        if (users.length === 0) {
            userList.innerHTML = "<tr><td colspan='5'>No users added yet.</td></tr>";
            return;
        }
        users.forEach(function(user, index) {
            let row = document.createElement("tr");
            [user.name, user.email, user.phone, user.city].forEach(function(value) {
                let cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });
            let actionCell = document.createElement("td");
            let editBtn = document.createElement("button");
            let deleteBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.className = "edit-btn";
            deleteBtn.textContent = "Delete";
            deleteBtn.className = "delete-btn";
            editBtn.addEventListener("click", function() {
                ["name", "email", "phone", "city"].forEach(function(field) {
                    document.getElementById(field).value = user[field];
                });
                editIndex = index;
                submitBtn.textContent = "Update User";
            });
            deleteBtn.addEventListener("click", function() {
                users.splice(index, 1);
                saveUsers();
                displayUsers();
                editIndex = -1;
                userForm.reset();
                submitBtn.textContent = "Add User";
            });
            actionCell.append(editBtn, deleteBtn);
            row.appendChild(actionCell);
            userList.appendChild(row);
        });
    }
    // Add or update user
    userForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let user = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            city: document.getElementById("city").value.trim()
        };
        if (Object.values(user).some(value => value === "")) {
            alert("Please fill all fields.");
            return;
        }
        if (editIndex === -1) {
            user.id = Date.now();
            users.push(user);
        } else {
            user.id = users[editIndex].id;
            users[editIndex] = user;
        }
        saveUsers();
        displayUsers();
        userForm.reset();
        editIndex = -1;
        submitBtn.textContent = "Add User";
    });
    displayUsers();