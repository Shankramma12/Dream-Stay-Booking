// let but = document.querySelector(".book");
// but.addEventListener("click", checkForm);

function checkForm() {

    const name = document.querySelector("#name").value;
    const checkinDate = document.getElementById("checkin").value;
    const checkoutDate = document.getElementById("checkout").value;
    const roomType = document.getElementById("roomtype").value;
    const rooms = parseInt(document.getElementById("rooms").value);
    const persons = parseInt(document.getElementById("persons").value);

    const resultDiv = document.getElementById("result");

    // Maximum 4 persons per room
    if (persons > rooms * 4) {
        resultDiv.innerHTML =
            "Each room can accommodate a maximum of 4 people.";
        return;
    }

    // Validate dates
    const noOfDays = checkValidateDates(checkinDate, checkoutDate);

    if (!noOfDays) {
        resultDiv.innerHTML =
            "Check-out date cannot be earlier than check-in date!";
        return;
    }

    // Calculate total cost
    const totalCost =
        calculateTotalCost(rooms, roomType, noOfDays);

    // Display booking details
    resultDiv.innerHTML =
        `Hi ${name}! You've successfully booked ${rooms} room(s)
        for ${persons} person(s) from ${checkinDate} to ${checkoutDate}.
        <br>Total Cost: ₹${totalCost}`;
}

function checkValidateDates(checkinDate, checkoutDate) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);

    // Check-in date cannot be in the past
    if (checkin < today) {
        return false;
    }

    // Check-out date cannot be before check-in
    if (checkout < checkin) {
        return false;
    }

    // Calculate number of days
    const timeDiff = checkout.getTime() - checkin.getTime();

    const dayDiff =
        Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Same-day booking counts as 1 day
    return dayDiff === 0 ? 1 : dayDiff;
}

function calculateTotalCost(rooms, roomType, noOfDays) {

    let roomRate = 0;

    switch (roomType) {

        case "standard":
            roomRate = 1000;
            break;

        case "deluxe":
            roomRate = 1500;
            break;

        case "suite":
            roomRate = 2500;
            break;

        default:
            roomRate = 0;
    }

    return roomRate * rooms * noOfDays;
}