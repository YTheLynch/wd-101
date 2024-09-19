
let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];

const validateDate = (dob) => {
  const date = new Date(dob.value);
  const currDate = new Date();  
  const age = Math.floor((currDate - date) / (1000 * 60 * 60 * 24 * 365.25));
  if (age < 18 || age > 55) {
    dob.setCustomValidity("The Age must be in the range 18 and 55!");
  } else {
    dob.setCustomValidity("");
  }
}

const renderEntries = () => {
  let entries = `<table>
  <tr>
  <th>Name</th>
  <th>Email</th>
  <th>Password</th>
  <th>Dob</th>
  <th>Accepted terms?</th>
  </tr>`;
  userEntries.forEach((entry) => {
    entries += `
    <tr>
    <td>${entry.name}</td>
    <td>${entry.email}</td>
    <td>${entry.password}</td>
    <td>${entry.dobv}</td>
    <td>${entry.accepted ? 'Yes' : 'No'}</td>
    </tr>`;
  });
  entries += `</table>`;
  
  document.getElementById("user-entries").innerHTML = entries;
};
renderEntries();

const dob = document.getElementById('dob')
dob.addEventListener('input', () => validateDate(dob));

let userForm = document.getElementById("user-form");

const saveUserForm = (event) => {
  event.preventDefault(); 
  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const dobv = document.getElementById("dob").value
  const accepted = document.getElementById("acceptTerms").checked

  console.log(dobv);
  const entry = {
    name,
    email,
    password,
    dobv,
    accepted,
  };

  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  renderEntries();
};

userForm.addEventListener("submit", saveUserForm);