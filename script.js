/* =========================================
   NIA ESCAPES
   Luxury African Experiences
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        const setMenuState = (isOpen) => {
            navLinks.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            setMenuState(!isOpen);
        });


        // Close menu after clicking a navigation link

        const navigationItems =
            navLinks.querySelectorAll("a");

        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {

                setMenuState(false);

            });

        });


        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
                setMenuState(false);
                menuToggle.focus();
            }
        });

    }


    /* =========================================
       TRAVEL PLANNER
    ========================================== */

    const travelForm =
        document.querySelector(".travel-form");

    const destinationSelect =
        document.querySelector("#destination");

    const experienceSelect =
        document.querySelector("#experience");

    const travellersSelect =
        document.querySelector("#travellers");

    const durationSelect =
        document.querySelector("#duration");

    const plannerResult =
        document.getElementById("plannerResult");

    const travellerProfiles = {
        "1-2": "Couple or duo",
        "3-5": "Small group",
        "6-10": "Family or group",
        "10+": "Large party"
    };

    const plannerData = {
        "maasai-mara": {
            name: "Maasai Mara",
            experiences: [
                {
                    value: "sunrise-safari",
                    label: "Sunrise Safari",
                    note: "Wild game drives, bush breakfasts, and cinematic sunsets."
                },
                {
                    value: "luxury-bush",
                    label: "Luxury Bush Retreat",
                    note: "Private tented suites with spa rituals and fine dining under the stars."
                },
                {
                    value: "culture-journey",
                    label: "Culture & Community",
                    note: "Guided storytelling, village encounters, and a deeper connection to place."
                }
            ],
            durationOptions: {
                "1-2": ["3 nights", "5 nights", "7 nights", "9 nights"],
                "3-5": ["5 nights", "7 nights", "9 nights", "12 nights"],
                "6-10": ["7 nights", "9 nights", "12 nights", "14 nights"],
                "10+": ["9 nights", "12 nights", "14 nights", "18 nights"]
            }
        },
        diani: {
            name: "Diani",
            experiences: [
                {
                    value: "beach-club",
                    label: "Beach Club Escape",
                    note: "Clear-water afternoons, barefoot dinners, and oceanfront downtime."
                },
                {
                    value: "wellness-retreat",
                    label: "Wellness Coastal Reset",
                    note: "Massage rituals, slow mornings, and restorative sea views."
                },
                {
                    value: "family-sunset",
                    label: "Family Coastal Adventure",
                    note: "Snorkelling, island hopping, and playful afternoons by the shore."
                }
            ],
            durationOptions: {
                "1-2": ["3 nights", "5 nights", "7 nights", "8 nights"],
                "3-5": ["5 nights", "7 nights", "9 nights", "10 nights"],
                "6-10": ["7 nights", "10 nights", "12 nights", "14 nights"],
                "10+": ["9 nights", "12 nights", "14 nights", "17 nights"]
            }
        },
        nairobi: {
            name: "Nairobi",
            experiences: [
                {
                    value: "city-luxury",
                    label: "City Luxury",
                    note: "Design-led stays, private dining, and rooftop evenings."
                },
                {
                    value: "wildlife-daytrip",
                    label: "Wildlife Day Escape",
                    note: "Private game drives and a fast, refined introduction to the bush."
                },
                {
                    value: "creative-heritage",
                    label: "Creative Heritage",
                    note: "Gallery walks, boutique stays, and a culture-rich urban stay."
                }
            ],
            durationOptions: {
                "1-2": ["2 nights", "3 nights", "4 nights", "5 nights"],
                "3-5": ["3 nights", "5 nights", "6 nights", "7 nights"],
                "6-10": ["4 nights", "6 nights", "8 nights", "10 nights"],
                "10+": ["5 nights", "7 nights", "9 nights", "12 nights"]
            }
        },
        amboseli: {
            name: "Amboseli",
            experiences: [
                {
                    value: "elephant-safari",
                    label: "Elephant Safari",
                    note: "Iconic views of Kilimanjaro and unforgettable herd encounters."
                },
                {
                    value: "glamping-luxury",
                    label: "Glamping Wilderness",
                    note: "Elevated tent camps with a deep sense of stillness and scale."
                },
                {
                    value: "photography-escape",
                    label: "Photography Escape",
                    note: "Private guides, sunrise framing, and a slower creative rhythm."
                }
            ],
            durationOptions: {
                "1-2": ["3 nights", "4 nights", "5 nights", "6 nights"],
                "3-5": ["5 nights", "6 nights", "7 nights", "9 nights"],
                "6-10": ["6 nights", "8 nights", "10 nights", "12 nights"],
                "10+": ["8 nights", "10 nights", "12 nights", "14 nights"]
            }
        },
        lamu: {
            name: "Lamu",
            experiences: [
                {
                    value: "island-retreat",
                    label: "Island Retreat",
                    note: "Sun-drenched beaches, slow afternoons, and barefoot luxury in a timeless island setting."
                },
                {
                    value: "dhow-escape",
                    label: "Dhow & Coast",
                    note: "Sunset sails, hidden coves, and a beautifully unhurried pace."
                },
                {
                    value: "heritage-ramble",
                    label: "Heritage Ramble",
                    note: "Stone lanes, local crafts, and a slower cultural immersion."
                }
            ],
            durationOptions: {
                "1-2": ["3 nights", "5 nights", "7 nights", "8 nights"],
                "3-5": ["5 nights", "7 nights", "9 nights", "10 nights"],
                "6-10": ["7 nights", "9 nights", "10 nights", "12 nights"],
                "10+": ["9 nights", "12 nights", "14 nights", "16 nights"]
            }
        }
    };

    function populateExperienceOptions(destinationValue) {
        if (!destinationValue || !plannerData[destinationValue]) {
            experienceSelect.innerHTML = '<option value="">Choose experience</option>';
            return;
        }

        const experienceOptions = plannerData[destinationValue].experiences;

        experienceSelect.innerHTML = `
            <option value="">Choose experience</option>
            ${experienceOptions.map((experience) => `
                <option value="${experience.value}">${experience.label}</option>
            `).join("")}
        `;

        experienceSelect.selectedIndex = 1;
    }

    function populateDurationOptions(travellerValue) {
        const destinationValue = destinationSelect.value;

        if (!destinationValue || !travellerValue) {
            durationSelect.innerHTML = '<option value="">Choose trip length</option>';
            return;
        }

        const destination = plannerData[destinationValue];
        const durations = destination?.durationOptions?.[travellerValue] || ["5 nights", "7 nights", "9 nights"];

        durationSelect.innerHTML = `
            <option value="">Choose trip length</option>
            ${durations.map((duration) => `
                <option value="${duration}">${duration}</option>
            `).join("")}
        `;

        durationSelect.selectedIndex = 1;
    }

    function buildJourneyCard({ destination, experience, travellers, duration }) {
        const destinationName = plannerData[destination]?.name || destination;
        const experienceDetails = plannerData[destination]?.experiences.find((item) => item.value === experience) || {};
        const travellerLabel = travellerProfiles[travellers] || travellers;
        const durationLabel = duration || "5 nights";
        const mood = {
            "1-2": "an intimate, restorative escape",
            "3-5": "a flexible, shared adventure",
            "6-10": "a joyful group celebration",
            "10+": "a grand, seamless group itinerary"
        }[travellers] || "a thoughtfully designed journey";

        return `
            <article class="journey-card">
                <div class="journey-card__header">
                    <p>PERSONALIIZED JOURNEY</p>
                    <span>${destinationName}</span>
                </div>

                <h3>${experienceDetails.label || "Signature Experience"}</h3>

                <ul class="journey-card__details">
                    <li>
                        <span>Destination</span>
                        <strong>${destinationName}</strong>
                    </li>
                    <li>
                        <span>Experience</span>
                        <strong>${experienceDetails.label || "Signature Experience"}</strong>
                    </li>
                    <li>
                        <span>Travellers</span>
                        <strong>${travellerLabel}</strong>
                    </li>
                    <li>
                        <span>Duration</span>
                        <strong>${durationLabel}</strong>
                    </li>
                </ul>

                <p class="journey-card__note">
                    This ${mood} is designed around ${experienceDetails.note || "a refined, unforgettable African experience"}.
                </p>
            </article>
        `;
    }

    if (destinationSelect && experienceSelect && travellersSelect && durationSelect && travelForm) {
        destinationSelect.addEventListener("change", (event) => {
            const destinationValue = event.target.value;
            populateExperienceOptions(destinationValue);

            if (travellersSelect.value) {
                populateDurationOptions(travellersSelect.value);
            }
        });

        travellersSelect.addEventListener("change", (event) => {
            if (destinationSelect.value && event.target.value) {
                populateDurationOptions(event.target.value);
            }
        });

        travelForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const destination = destinationSelect.value;
            const experience = experienceSelect.value;
            const travellers = travellersSelect.value;
            const duration = durationSelect.value;

            if (!destination || !experience || !travellers || !duration) {
                showMessage("Please complete your destination, experience, travellers and duration to create your journey.");
                return;
            }

            const journeyCard = buildJourneyCard({
                destination,
                experience,
                travellers,
                duration
            });

            plannerResult.innerHTML = journeyCard;
            plannerResult.hidden = false;

            showMessage(`Your ${plannerData[destination].name} journey is ready.`);
        });
    }


    /* =========================================
       MESSAGE SYSTEM
    ========================================== */

    function showMessage(message) {

        let messageBox =
            document.querySelector(".js-message");

        if (!messageBox) {

            messageBox =
                document.createElement("div");

            messageBox.className =
                "js-message";

            document.body.appendChild(messageBox);

            messageBox.style.position = "fixed";
            messageBox.style.left = "50%";
            messageBox.style.bottom = "25px";
            messageBox.style.transform =
                "translate(-50%, 20px)";
            messageBox.style.zIndex = "9999";
            messageBox.style.maxWidth = "90%";
            messageBox.style.padding = "16px 22px";
            messageBox.style.borderRadius = "50px";
            messageBox.style.background = "#1b241d";
            messageBox.style.color = "#ffffff";
            messageBox.style.fontSize = "14px";
            messageBox.style.textAlign = "center";
            messageBox.style.boxShadow =
                "0 15px 40px rgba(0, 0, 0, 0.25)";
            messageBox.style.opacity = "0";
            messageBox.style.transition =
                "opacity 0.3s ease, transform 0.3s ease";

        }


        messageBox.textContent = message;

        requestAnimationFrame(() => {

            messageBox.style.opacity = "1";

            messageBox.style.transform =
                "translate(-50%, 0)";

        });


        clearTimeout(messageBox.hideTimer);

        messageBox.hideTimer =
            setTimeout(() => {

                messageBox.style.opacity = "0";

                messageBox.style.transform =
                    "translate(-50%, 20px)";

            }, 4500);

    }


    /* =========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-header, .feature-card, .experience-card, .value-card, .journal-card, .story-content, .intro-content, .planner-card, .journey-card, .final-cta-content"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });


    /* =========================================
       SMOOTH EXPERIENCE CARD FEEDBACK
    ========================================== */

    const experienceCards =
        document.querySelectorAll(
            ".experience-card"
        );


    experienceCards.forEach((card) => {

        card.addEventListener("click", () => {

            const title =
                card.querySelector("h3");

            if (title) {

                showMessage(
                    `${title.textContent} — experience selected.`
                );

            }

        });

    });


    /* =========================================
       JOURNAL CARD FEEDBACK
    ========================================== */

    const journalLinks =
        document.querySelectorAll(
            ".journal-content a"
        );


    journalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const title =
                link
                    .closest(".journal-content")
                    ?.querySelector("h3");

            if (title) {

                showMessage(
                    `"${title.textContent}" — story coming soon.`
                );

            }

        });

    });


    /* =========================================
       CURRENT YEAR
    ========================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom p"
        );

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} NIA ESCAPES. All rights reserved.`;

    }


    /* =========================================
       ACTIVE NAVIGATION
    ========================================== */

    const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll("main section[id]");

    const setActiveSection = () => {
        const scrollPosition = window.scrollY + 150;

        sections.forEach((section) => {
            const id = section.getAttribute("id");
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (!link) return;

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                sectionLinks.forEach((item) => item.classList.remove("is-active"));
                link.classList.add("is-active");
            }
        });
    };

    setActiveSection();
    window.addEventListener("scroll", setActiveSection, { passive: true });


    /* =========================================
       KEYBOARD ACCESSIBILITY
    ========================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navLinks
            ) {

                navLinks.classList.remove(
                    "active"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =========================================
       PAGE LOADED
    ========================================== */

    document.body.classList.add(
        "page-ready"
    );


    /* =========================================
       HERO PARALLAX + MOTION
    ========================================== */

    const heroSection = document.querySelector(".hero");

    if (heroSection) {
        const updateHeroMotion = () => {
            const rect = heroSection.getBoundingClientRect();
            const offset = Math.min(90, Math.max(-90, rect.top * 0.12));
            const lift = Math.min(16, Math.max(-16, rect.top * 0.04));

            heroSection.style.setProperty("--hero-shift", `${offset}px`);
            heroSection.style.setProperty("--hero-lift", `${lift}px`);
        };

        updateHeroMotion();
        window.addEventListener("scroll", updateHeroMotion, { passive: true });
    }

});