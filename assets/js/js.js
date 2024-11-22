


// preloader js
document.addEventListener("DOMContentLoaded", function () {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.style.display = 'flex'; // Show loader initially

    // Hide the loader once everything is loaded
    window.addEventListener('load', function () {
      loaderContainer.style.display = 'none';
    });
  });


  // js for header seach bar mic
  function activateMic() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = function() {
        console.log("Voice recognition activated. Try speaking into the microphone.");
    };
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.querySelector('.form-control').value = transcript; // Set the input value
    };
    recognition.start();
}





// js for view more in books.html page
document.querySelectorAll('.view-more').forEach(button => {
    button.addEventListener('click', function () {
        const fullContent = this.closest('.content-wrapper').querySelector('.full-content');
        const shortContent = this.closest('.content-wrapper').querySelector('.short-content');

        if (fullContent.style.maxHeight === '0px' || fullContent.style.maxHeight === '') {
            // Show full content
            fullContent.style.display = 'block';
            setTimeout(() => {
                fullContent.style.maxHeight = fullContent.scrollHeight + 'px';
                fullContent.style.opacity = 1;
            }, 10);

            shortContent.style.maxHeight = '500px';
            shortContent.style.overflow = 'visible';
            shortContent.classList.remove('fade-effect'); // Remove fade effect while showing full content
            this.innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i> View Less'; // Update button text
        } else {
            // Start collapse of full content
            fullContent.style.maxHeight = '0';
            fullContent.style.opacity = 0;

            // Set timeout to ensure the transition happens before making fullContent display none
            setTimeout(() => {
                fullContent.style.display = 'none';

                // Now apply fade effect on short content after the full content has been collapsed
              
                shortContent.classList.add('fade-effect'); // Reapply fade effect to short content
                this.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i> View More'; // Update button text
            }, 800); // Match the transition duration of the CSS (adjust this if needed)
        }
    });
});





// js for calender
document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
          left: 'prev',
          center: 'title',
          right: 'next'
      },
      dateClick: function(info) {
          document.querySelectorAll('.highlight').forEach(day => {
              day.classList.remove('highlight');
          });
          info.dayEl.classList.add('highlight');
      },
      dayCellDidMount: function(info) {
          // Convert the date to a string format (YYYY-MM-DD)
          let dateStr = FullCalendar.formatDate(info.date, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
          });

         

          // Set moon image for specific dates
          if (dateStr === '2024-09-10') {
              console.log("Adding black moon to:", dateStr);
              appendMoonImage(info.el, './assets/images/black-moon.svg');
          } else if (dateStr === '2024-09-16') {
              console.log("Adding yellow moon to:", dateStr);
              appendMoonImage(info.el, './assets/images/yellow-moon.svg');
          } else if (dateStr === '2024-09-22') {
              console.log("Adding black moon to:", dateStr);
              appendMoonImage(info.el, './assets/images/black-moon.svg');
          }
      }
  });

  calendar.render();

  // Hide the last row containing next month's days after rendering
  setTimeout(function() {
      const lastRow = document.querySelector('.fc-daygrid-body tr:last-child');
      if (lastRow && lastRow.children[0].classList.contains('fc-day-other')) {
          lastRow.style.display = 'none';
      }
  }, 0);

  // Function to append the moon image to the day cell
  function appendMoonImage(cell, imgPath) {
      var moonImg = document.createElement('img');
      moonImg.src = imgPath;
      moonImg.style.width = '20px'; // Adjust size if needed
      moonImg.style.height = '20px'; // Adjust size if needed
      moonImg.style.position = 'absolute';
      moonImg.style.top = '50%';
      moonImg.style.left = '50%';
      moonImg.style.transform = 'translate(-50%, -50%)';
      moonImg.style.zIndex = '10'; // Ensure the image is on top

      cell.style.position = 'relative'; // Ensure the cell is positioned relative for absolute positioning
      cell.appendChild(moonImg);

      console.log('Appending moon image:', imgPath, 'to cell:', cell);
  }
});





// js for blog likes
let likeCounts = Array.from(document.querySelectorAll('.like-count'));
let isLikedArray = Array(likeCounts.length).fill(false);
let likeIcons = document.querySelectorAll('.like-icon-img');

likeIcons.forEach((icon, index) => {
    icon.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior

        if (isLikedArray[index]) {
            icon.classList.remove('liked'); // Remove red color
            likeCounts[index].textContent = parseInt(likeCounts[index].textContent) - 1;
        } else {
            icon.classList.add('liked'); // Add red color
            likeCounts[index].textContent = parseInt(likeCounts[index].textContent) + 1;
        }

        isLikedArray[index] = !isLikedArray[index]; // Toggle liked state
    });
});























// js for youtube

document.addEventListener('DOMContentLoaded', function () {
    const playIcon = document.getElementById('youtube-play-icon');
    const youtubeThumbnail = document.getElementById('youtube-thumbnail');
    const youtubeVideo = document.getElementById('youtube-video');

    if (playIcon && youtubeThumbnail && youtubeVideo) {
        playIcon.addEventListener('click', function () {
            // Hide the play icon and thumbnail
            youtubeThumbnail.style.display = 'none';
            playIcon.style.display = 'none';

            // Show the YouTube video and autoplay it
            youtubeVideo.style.display = 'block';
            youtubeVideo.src += "&autoplay=1"; // Autoplay the video
        });
    }
});




// js for arrows in second section of top poets
document.addEventListener('DOMContentLoaded', function () {
    const leftArrow = document.getElementById('arrow-left');
    const rightArrow = document.getElementById('arrow-right');
    const galleryContainer = document.querySelector('.gallery-container');

    // Check if the elements exist before trying to add event listeners
    if (leftArrow && rightArrow && galleryContainer) {
        // Function to check scroll position and update arrow visibility
        function checkArrows() {
            const maxScrollLeft = galleryContainer.scrollWidth - galleryContainer.clientWidth;

            // Hide left arrow at the start
            if (galleryContainer.scrollLeft <= 0) {
                leftArrow.style.display = 'none';
            } else {
                leftArrow.style.display = 'block';
            }

            // Hide right arrow at the end
            if (galleryContainer.scrollLeft >= maxScrollLeft) {
                rightArrow.style.display = 'none';
            } else {
                rightArrow.style.display = 'block';
            }
        }

        // Initial check to hide left arrow at the start
        checkArrows();

        // Event listeners for clicking the arrows
        leftArrow.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });

        // Listen for scroll events to check arrow visibility
        galleryContainer.addEventListener('scroll', checkArrows);
    } else {
        console.error('Arrow or gallery container elements not found.');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function initializeRadioSlider(containerSelector, leftArrowSelector, rightArrowSelector, scrollAmount = 300) {
        const radioLeftArrow = document.querySelector(leftArrowSelector);
        const radioRightArrow = document.querySelector(rightArrowSelector);
        const radioContainer = document.querySelector(containerSelector);

        // Check if the container and arrows exist
        if (!radioContainer || !radioLeftArrow || !radioRightArrow) {
            console.error('One or more elements are not found. Please check your selectors.');
            return; // Exit the function if any of the elements are not found
        }

        function checkRadioArrows() {
            const maxScrollLeft = radioContainer.scrollWidth - radioContainer.clientWidth;

            // Show/hide arrows based on scroll position
            radioLeftArrow.style.display = radioContainer.scrollLeft <= 0 ? 'none' : 'block';
            radioRightArrow.style.display = radioContainer.scrollLeft >= maxScrollLeft ? 'none' : 'block';
        }

        // Initial check to hide left arrow at the start
        checkRadioArrows();

        // Event listeners for clicking the arrows
        radioLeftArrow.addEventListener('click', () => {
            radioContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        radioRightArrow.addEventListener('click', () => {
            radioContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Listen for scroll events to check arrow visibility
        radioContainer.addEventListener('scroll', checkRadioArrows);
    }

    // Usage on multiple pages
    initializeRadioSlider('.radio-channel-container', '#radio-arrow-left', '#radio-arrow-right');
});









































// SCRIPT FOR underline effect  

document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-btn');
    const underline = document.querySelector('.underline');
    const tabsContainer = document.querySelector('.scrollable-tabs');

    // Function to update the underline position and width
    function updateUnderline(tab) {
        const tabRect = tab.getBoundingClientRect(); // Get the bounding rectangle of the tab
        const containerRect = tabsContainer.getBoundingClientRect(); // Get the bounding rectangle of the container

        const leftPosition = tabRect.left - containerRect.left + tabsContainer.scrollLeft; // Adjust for the scroll
        const width = tabRect.width; // Width of the tab

        underline.style.left = `${leftPosition}px`; // Move the underline to the tab
        underline.style.width = `${width}px`; // Adjust the width of the underline
    }

    // Initialize the underline on the first active tab
    updateUnderline(tabs[0]);

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to the clicked tab
            this.classList.add('active');
            // Update the underline position
            updateUnderline(this);
        });
    });

    // Update the underline on window resize
    window.addEventListener('resize', function () {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            updateUnderline(activeTab);
        }
    });

    // Update the underline when the tabs container is scrolled
    tabsContainer.addEventListener('scroll', function () {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            updateUnderline(activeTab);
        }
    });
});



// Script to handle tab content switching
        $(document).ready(function () {
            // Tab functionality: Change content when a tab button is clicked
            $('.tab-btn').click(function () {
                // Get the tab associated with the clicked button
                var tabId = $(this).data('tab');

                // Remove the active class from all tab buttons
                $('.tab-btn').removeClass('active');

                // Hide all content sections
                $('.content-section > div').removeClass('active').hide();

                // Add the active class to the clicked button
                $(this).addClass('active');

                // Show the corresponding content based on the tab clicked
                $('#' + tabId).addClass('active').show();

                // Reset alphabet filter when switching tabs
                $('.alphabet-btn').removeClass('active');
                $('.alphabet-btn[data-alphabet="A"]').addClass('active');
                $('#' + tabId).find('.content-item').hide();
                $('#' + tabId).find('.content-item').filter(function () {
                    // Show only items starting with 'A' by default
                    return $(this).find('.name').text().trim().toLowerCase().startsWith('a');
                }).show();
            });

            // Alphabet filter functionality
            $('.alphabet-btn').click(function () {
                var alphabet = $(this).data('alphabet');

                // Remove active class from all alphabet buttons
                $('.alphabet-btn').removeClass('active');

                // Add active class to the clicked button
                $(this).addClass('active');

                // Get the active tab content section
                var activeTabContent = $('.content-section > div.active');

                // Hide all content items in the active tab
                activeTabContent.find('.content-item').hide();

                // Show content items in the active tab that start with the selected alphabet
                activeTabContent.find('.content-item').filter(function () {
                    // Check if the name starts with the selected alphabet
                    return $(this).find('.name').text().trim().toLowerCase().startsWith(alphabet.toLowerCase());
                }).show();
            });

            // Show the first tab's content and filter by default
            $('.content-section > div').hide(); // Hide all content sections initially
            $('#tab1').show().addClass('active'); // Show only the first tab's content
            $('.alphabet-btn[data-alphabet="A"]').addClass('active'); // Default alphabet filter 'A'

            // Initially show items starting with 'A' in the first tab
            $('#tab1 .content-item').filter(function () {
                return $(this).find('.name').text().trim().toLowerCase().startsWith('a');
            }).show();
        });

    



// js for pagination

document.querySelectorAll('.pagination-section').forEach(paginationSection => {
    const pages = paginationSection.parentElement.querySelectorAll('.poems-page'); // Select all poems pages
    const totalPages = pages.length; // Count total number of pages

    // Function to show the specified page
    function showPage(pageNumber) {
        pages.forEach((page, index) => {
            page.style.display = (index + 1 === pageNumber) ? 'flex' : 'none'; // Show the selected page
        });

        // Update active pagination link
        paginationSection.querySelectorAll('.page-item').forEach((item, index) => {
            item.classList.toggle('active', index === pageNumber - 1);
        });

        // Update visibility of previous/next buttons
        paginationSection.querySelector('.prev-page-quotes').style.display = pageNumber === 1 ? 'none' : 'inline-block';
        paginationSection.querySelector('.next-page-quotes').style.display = pageNumber === totalPages ? 'none' : 'inline-block';
    }

    // Attach event listeners to page links
    paginationSection.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageNumber = parseInt(link.getAttribute('data-page'));
            showPage(pageNumber);
        });
    });

    // Initial page setup
    showPage(1);
});





        
    // Get the like button
    document.addEventListener("DOMContentLoaded", function() {
        // Select all like buttons with the class "likeBtn"
        const likeBtns = document.querySelectorAll('.likeBtn');
    
        // Loop through each like button and add a click event listener
        likeBtns.forEach(likeBtn => {
            let liked = false; // Track if the button has been liked
    
            likeBtn.addEventListener('click', function() {
                const icon = likeBtn.querySelector('i'); // Get the icon inside the button
    
                liked = !liked; // Toggle the liked state
    
                if (liked) {
                    icon.classList.remove('fa-regular'); // Change to filled heart
                    icon.classList.add('fa-solid'); // Change to solid heart
                    likeBtn.classList.add('liked'); // Optionally add a class for styling
                } else {
                    icon.classList.remove('fa-solid'); // Change to regular heart
                    icon.classList.add('fa-regular'); // Change to regular heart
                    likeBtn.classList.remove('liked'); // Remove the class for styling
                }
            });
        });
    });
    




    // js for slidingin quizes and games used in multiple pages


   
    document.addEventListener('DOMContentLoaded', function () {
        function initializeSlider(sliderClass, leftArrowClass, rightArrowClass, scrollAmount = 300) {
            const sliders = document.querySelectorAll(sliderClass);
            const leftArrows = document.querySelectorAll(leftArrowClass);
            const rightArrows = document.querySelectorAll(rightArrowClass);
    
            if (sliders.length === 0 || leftArrows.length === 0 || rightArrows.length === 0) {
                console.error('Slider or arrows not found. Please check your selectors and ensure they exist on this page.');
                return;
            }
    
            sliders.forEach((sliderContainer, index) => {
                const leftArrow = leftArrows[index];
                const rightArrow = rightArrows[index];
    
                if (!sliderContainer || !leftArrow || !rightArrow) {
                    console.error(`Slider or arrow elements not found at index ${index}. Please check the HTML structure.`);
                    return;
                }
    
                function checkArrowVisibility() {
                    const maxScrollLeft = sliderContainer.scrollWidth - sliderContainer.clientWidth;
                    leftArrow.style.display = sliderContainer.scrollLeft <= 0 ? 'none' : 'block';
                    rightArrow.style.display = sliderContainer.scrollLeft >= maxScrollLeft ? 'none' : 'block';
                }
    
                checkArrowVisibility();
    
                leftArrow.addEventListener('click', () => {
                    sliderContainer.scrollBy({
                        left: -scrollAmount,
                        behavior: 'smooth'
                    });
                });
    
                rightArrow.addEventListener('click', () => {
                    sliderContainer.scrollBy({
                        left: scrollAmount,
                        behavior: 'smooth'
                    });
                });
    
                sliderContainer.addEventListener('scroll', checkArrowVisibility);
            });
        }
    
        // Initialize sliders for each specific slider section
        initializeSlider('.slider-container', '.quiz-arrow.arrow-left', '.quiz-arrow.arrow-right');
    });
    