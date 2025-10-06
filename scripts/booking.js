async function loadBookingData() {
  const res = await fetch('../bookings.json');
  const data = await res.json();

  const vehicle = document.getElementById("vehicle");
  const service = document.getElementById("service");
  const addons = document.getElementById("addons");
  const time = document.getElementById("time");

  data.vehicleTypes.forEach(v => {
    const opt = document.createElement("option");
    opt.textContent = v;
    vehicle.appendChild(opt);
  });

  data.services.forEach(s => {
    const opt = document.createElement("option");
    opt.textContent = s.name;
    service.appendChild(opt);
  });

  data.addons.forEach(a => {
    const opt = document.createElement("option");
    opt.textContent = `${a.name} (+$${a.price})`;
    addons.appendChild(opt);
  });

  data.availableTimes.forEach(t => {
    const opt = document.createElement("option");
    opt.textContent = t;
    time.appendChild(opt);
  });
}

document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();

  const booking = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    vehicle: document.getElementById("vehicle").value,
    service: document.getElementById("service").value,
    addons: Array.from(document.getElementById("addons").selectedOptions).map(a => a.value),
    date: document.getElementById("date").value,
    time: document.getElementById("time").value
  };

  alert(`Thanks, ${booking.name}! Your ${booking.vehicle} is booked for ${booking.service} on ${booking.date} at ${booking.time}.`);
});

loadBookingData();
