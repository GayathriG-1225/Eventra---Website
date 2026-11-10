
// ========================================
// EVENTRA - FULL WEBSITE JAVASCRIPT
// ========================================


// EVENT DATA

const events = [

    {
        id: 1,
        title: "Music & Magic Festival",
        category: "music",
        date: "December 15, 2026",
        location: "Chennai, India",
        price: 999,
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800"
    },

    {
        id: 2,
        title: "Future Tech Summit",
        category: "technology",
        date: "December 20, 2026",
        location: "Bangalore, India",
        price: 1499,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"
    },

    {
        id: 3,
        title: "Creative Art Exhibition",
        category: "art",
        date: "December 25, 2026",
        location: "Mumbai, India",
        price: 499,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800"
    },

    {
        id: 4,
        title: "Digital Design Workshop",
        category: "workshop",
        date: "January 05, 2027",
        location: "Chennai, India",
        price: 799,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
    },

    {
        id: 5,
        title: "Live Beats Concert",
        category: "music",
        date: "January 12, 2027",
        location: "Hyderabad, India",
        price: 1299,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800"
    },

    {
        id: 6,
        title: "Innovation & AI Conference",
        category: "technology",
        date: "January 18, 2027",
        location: "Coimbatore, India",
        price: 1999,
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800"
    },

    {
        id: 7,
        title: "Cultural Celebration",
        category: "art",
        date: "January 22, 2027",
        location: "Madurai, India",
        price: 599,
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800"
    },

    {
        id: 8,
        title: "Photography Masterclass",
        category: "workshop",
        date: "January 28, 2027",
        location: "Pondicherry, India",
        price: 899,
        image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800"
    }

];


// VARIABLES

const eventContainer = document.getElementById("eventContainer");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";
let selectedEvent = null;
let favourites = [];


// ========================================
// DISPLAY EVENT CARDS
// ========================================

function displayEvents(list) {

    eventContainer.innerHTML = "";

    noResults.hidden = list.length !== 0;

    list.forEach(event => {

        const isFavourite = favourites.includes(event.id);

        const card = document.createElement("div");

        card.className = "col-md-6 col-lg-4";

        card.innerHTML = `

            <div class="event-card">

                <div class="event-image">

                    <img src="${event.image}"
                        alt="${event.title}"
                        loading="lazy">

                    <span class="event-category">
                        ${event.category.toUpperCase()}
                    </span>

                    <button class="favorite-btn ${isFavourite ? "liked" : ""}"
                        data-id="${event.id}"
                        aria-label="Add to favourites">

                        <i class="${isFavourite ? "fa-solid" : "fa-regular"} fa-heart"></i>

                    </button>

                </div>

                <div class="event-details">

                    <p class="event-date">
                        <i class="fa-regular fa-calendar"></i>
                        ${event.date}
                    </p>

                    <h3>${event.title}</h3>

                    <p class="event-location">
                        <i class="fa-solid fa-location-dot"></i>
                        ${event.location}
                    </p>

                    <div class="event-bottom">

                        <div class="event-price">
                            ₹${event.price.toLocaleString("en-IN")}
                            <small>Starting price / ticket</small>
                        </div>

                        <button class="book-btn"
                            data-id="${event.id}">
                            Book Now →
                        </button>

                    </div>

                </div>

            </div>
        `;

        eventContainer.appendChild(card);

    });

}


// ========================================
// CATEGORY FILTER
// ========================================

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        this.classList.add("active");

        selectedCategory = this.dataset.category;

        filterAndSearch();

    });

});


// ========================================
// SEARCH EVENTS
// ========================================

searchInput.addEventListener("input", filterAndSearch);


function filterAndSearch() {

    const searchText = searchInput.value
        .toLowerCase()
        .trim();

    const filteredEvents = events.filter(event => {

        const matchesCategory =
            selectedCategory === "all" ||
            event.category === selectedCategory;

        const matchesSearch =
            event.title.toLowerCase().includes(searchText) ||
            event.location.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });

    displayEvents(filteredEvents);

}


// ========================================
// FAVOURITES
// ========================================

eventContainer.addEventListener("click", function(event) {

    const favouriteButton = event.target.closest(".favorite-btn");

    if (favouriteButton) {

        const id = Number(favouriteButton.dataset.id);

        if (favourites.includes(id)) {

            favourites = favourites.filter(item => item !== id);

            showToast("Removed from favourites");

        } else {

            favourites.push(id);

            showToast("Added to favourites!");

        }

        filterAndSearch();

        return;
    }


    // BOOKING BUTTON

    const bookButton = event.target.closest(".book-btn");

    if (bookButton) {

        const id = Number(bookButton.dataset.id);

        selectedEvent = events.find(item => item.id === id);

        openBookingModal();

    }

});


// ========================================
// BOOKING MODAL
// ========================================

const bookingModal = document.getElementById("bookingModal");

const bookingTitle = document.getElementById("bookingTitle");

const bookingDetails = document.getElementById("bookingDetails");

const ticketQuantity = document.getElementById("ticketQuantity");

const bookingTotal = document.getElementById("bookingTotal");


function openBookingModal() {

    if (!selectedEvent) return;

    bookingTitle.textContent = selectedEvent.title;

    bookingDetails.textContent =
        `${selectedEvent.date} | ${selectedEvent.location}`;

    ticketQuantity.value = 1;

    updateTotal();

    bookingModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeBookingModal() {

    bookingModal.classList.remove("show");

    document.body.style.overflow = "";

    selectedEvent = null;

}


document.getElementById("closeModal").addEventListener(
    "click",
    closeBookingModal
);


// Close when clicking outside popup

bookingModal.addEventListener("click", function(event) {

    if (event.target === bookingModal) {
        closeBookingModal();
    }

});


// ========================================
// TICKET PRICE CALCULATION
// ========================================

ticketQuantity.addEventListener("input", updateTotal);


function updateTotal() {

    if (!selectedEvent) return;

    let quantity = Number(ticketQuantity.value);

    if (!Number.isFinite(quantity)) quantity = 1;

    quantity = Math.min(10, Math.max(1, quantity));

    ticketQuantity.value = quantity;

    const total = selectedEvent.price * quantity;

    bookingTotal.textContent =
        `Total: ₹${total.toLocaleString("en-IN")}`;

}


// ========================================
// CONFIRM BOOKING
// ========================================

document.getElementById("bookingForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (!selectedEvent) return;

        const name = document.getElementById("bookingName").value.trim();

        const email = document.getElementById("bookingEmail").value.trim();

        const quantity = Number(ticketQuantity.value);

        if (!name || !email || quantity < 1 || quantity > 10) {
            showToast("Please check your booking details.");
            return;
        }

        const total = selectedEvent.price * quantity;

        const bookingId =
            "EVT" + Date.now().toString().slice(-7);

        alert(
            `Booking Request Successful!\n\n` +
            `Booking ID: ${bookingId}\n` +
            `Event: ${selectedEvent.title}\n` +
            `Name: ${name}\n` +
            `Tickets: ${quantity}\n` +
            `Total: ₹${total.toLocaleString("en-IN")}\n\n` +
            `This is a demo booking. No payment has been processed.`
        );

        closeBookingModal();

        this.reset();

    }
);


// ========================================
// NEWSLETTER SUBSCRIPTION
// ========================================

document.getElementById("newsletterForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const email = document.getElementById("newsletterEmail").value.trim();

        if (!email) {
            showToast("Please enter your email.");
            return;
        }

        showToast("Thank you for subscribing!");

        this.reset();

    }
);


// ========================================
// CONTACT FORM
// ========================================

document.getElementById("contactForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();

        const email = document.getElementById("contactEmail").value.trim();

        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {
            showToast("Please complete all fields.");
            return;
        }

        showToast("Thank you! Your demo message is ready.");

        this.reset();

    }
);


// ========================================
// TOAST NOTIFICATION
// ========================================

let toastTimer;

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

window.addEventListener("scroll", function() {

    const navbar = document.getElementById("navbar");

    if (window.scrollY > 50) {

        navbar.style.padding = "10px 0";

    } else {

        navbar.style.padding = "18px 0";

    }

});


// ========================================
// INITIALIZE WEBSITE
// ========================================

displayEvents(events);

console.log("EVENTRA website loaded successfully!");
