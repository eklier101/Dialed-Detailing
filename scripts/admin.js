const ADMIN_CREDENTIALS = {
  email: "youremail@example.com",
  password: "YourStrongPassword123"
};

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("admin-section").style.display = "block";
    loadData();
  } else {
    alert("Invalid email or password.");
  }
});

async function loadData() {
  const res = await fetch('../bookings.json');
  const data = await res.json();
  document.getElementById("availableTimes").value = data.availableTimes.join(", ");
  document.getElementById("vehicleTypes").value = data.vehicleTypes.join(", ");
  document.getElementById("services").value = JSON.stringify(data.services, null, 2);
  document.getElementById("addons").value = JSON.stringify(data.addons, null, 2);
}

document.getElementById("saveChanges").addEventListener("click", () => {
  const updated = {
    availableTimes: document.getElementById("availableTimes").value.split(",").map(s => s.trim()),
    vehicleTypes: document.getElementById("vehicleTypes").value.split(",").map(s => s.trim()),
    services: JSON.parse(document.getElementById("services").value),
    addons: JSON.parse(document.getElementById("addons").value)
  };

  localStorage.setItem("bookingsData", JSON.stringify(updated));
  alert("Changes saved locally. (Add backend to sync to GitHub later)");
});
