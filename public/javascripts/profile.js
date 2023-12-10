let mobileNavBtn = document.getElementById("mobile-nav-btn");
        let mobileNav = document.getElementById("mobile-nav");

        mobileNavBtn.addEventListener("click", function() {
            if(mobileNav.hasAttribute("class")) {
                mobileNav.classList.toggle("active");
            } else {
                mobileNav.classList.toggle("active");
            }
        })