function navigateTo(event, element) {
  event.preventDefault();

  const appName = element.getAttribute("data-app");
  const newsFeed = document.querySelector(".col-md-6");

  // Remove the active class from all nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  // Add the active class to the clicked link
  element.classList.add("active");

  // Close any existing full-screen container
  const fullScreenContainer = document.querySelector("#fullScreenContainer");
  if (fullScreenContainer) {
    document.body.removeChild(fullScreenContainer);
  }

  // Push state to history
  history.pushState({ app: appName }, "", `#${appName}`);

  // Update the News Feed section based on the selected app
  switch (appName) {
    case "home":
      backToHome();
      break;
    case "video":
      navigateToVideoPage(event);
      break;
    case "marketplace":
      newsFeed.innerHTML = `
          <div id="marketplaceContainer" class="container-fluid">
            <h3 class="text-center">🛒Marketplace</h3>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>The Godfather DVD</td>
                  <td>Movies</td>
                  <td>$19.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Inception Blu-Ray</td>
                  <td>Movies</td>
                  <td>$24.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Marvel's Avengers DVD</td>
                  <td>Movies</td>
                  <td>$29.99</td>
                  <td>Out of Stock</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Interstellar Blu-Ray</td>
                  <td>Movies</td>
                  <td>$22.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>The Dark Knight DVD</td>
                  <td>Movies</td>
                  <td>$19.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Forrest Gump Blu-Ray</td>
                  <td>Movies</td>
                  <td>$18.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Pulp Fiction DVD</td>
                  <td>Movies</td>
                  <td>$15.99</td>
                  <td>Out of Stock</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>The Matrix Blu-Ray</td>
                  <td>Movies</td>
                  <td>$20.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Star Wars DVD Collection</td>
                  <td>Movies</td>
                  <td>$79.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Gladiator Blu-Ray</td>
                  <td>Movies</td>
                  <td>$21.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>11</td>
                  <td>Jurassic Park DVD</td>
                  <td>Movies</td>
                  <td>$14.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>12</td>
                  <td>Shawshank Redemption Blu-Ray</td>
                  <td>Movies</td>
                  <td>$18.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>13</td>
                  <td>The Lion King DVD</td>
                  <td>Movies</td>
                  <td>$12.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>14</td>
                  <td>Harry Potter Blu-Ray Collection</td>
                  <td>Movies</td>
                  <td>$89.99</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>15</td>
                  <td>Frozen DVD</td>
                  <td>Movies</td>
                  <td>$13.99</td>
                  <td>Out of Stock</td>
                </tr>
              </tbody>
            </table>
          </div>
        `;
      break;
    case "toDoList":
      newsFeed.innerHTML = `
        <div id="taskContainer" class="card-body">
      <h3 class="text-center">📝 To-Do List App</h3>
       <div>
        <textarea
         type="text"
         id="taskInput"
         class="form-control mb-2"
         placeholder="Enter a new task"
       ></textarea>
      <button
      id="addTaskButton"
      class="btn btn-primary w-100 mb-3"
      onclick="addTask()"
    >
      Add Task
     </button>
     <p id="totalCount" class="text-center">Total: 0 tasks</p>
     <button
      id="deleteAllButton"
      class="btn btn-danger w-100 mb-3"
      onclick="deleteAllTasks()"
    >
      Delete All Tasks
     </button>
     <ul id="taskList" class="list-group"></ul>
     <p id="emptyMessage" class="text-center text-danger" style="display: none;">
       Empty List
      </p>
    </div>
    </div>`;
      initializeToDoList();
      break;
    case "slotMachine":
      newsFeed.innerHTML = `
       <div id="slotMachineContainer" class="container-fluid">
       <h3>🎰 Slot App</h3>
       <div id="slotResultContainer">
       <h5 id="slotResult">🍎 | 🍒 | 🍇</h5>
       </div>
       <p id="tokenDisplay">Tokens: 10</p>
       <button id="spinButton" class="btn btn-primary" onclick="spinSlot()">
       <i class="bi bi-arrow-repeat me-2"></i> Spin
       </button>
       <p id="countdown" style="display: none;">
       Tokens will be restored in <span id="countdownTimer">3</span> seconds.
       </p>
    </div>`;
      break;
    default:
      newsFeed.innerHTML = `<h3 class="text-center">Page Not Found</h3>`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const bioElements = document.querySelectorAll(".bio");

  bioElements.forEach((bio) => {
    const fullText = bio.getAttribute("data-bio");
    const toggleButton = bio.nextElementSibling;

    // Truncate the bio initially to two lines
    const truncatedText = truncateText(fullText, 40);
    bio.textContent = truncatedText;

    toggleButton.addEventListener("click", function () {
      if (bio.textContent === fullText) {
        // Collapse to truncated text
        bio.textContent = truncatedText;
        toggleButton.textContent = "See More";
      } else {
        // Expand to full text
        bio.textContent = fullText;
        toggleButton.textContent = "See Less";
      }
    });
  });

  // Helper function to truncate text
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }
});

document.querySelectorAll(".toggle-bio").forEach((button) => {
  button.addEventListener("click", function () {
    const bio = this.previousElementSibling; // Get the bio paragraph
    bio.classList.toggle("expanded");
    this.textContent = bio.classList.contains("expanded")
      ? "See Less"
      : "See More";
  });
});

function navigateToVideoPage(event) {
  event.preventDefault();

  // Check if a full-screen container already exists
  const existingContainer = document.querySelector("#fullScreenContainer");
  if (existingContainer) {
    // If the user clicks a different nav link, remove the existing container
    document.body.removeChild(existingContainer);
    return;
  }

  // Create a full-screen container dynamically
  const fullScreenContainer = document.createElement("div");
  fullScreenContainer.id = "fullScreenContainer";
  fullScreenContainer.innerHTML = `
    <div class="background">
        <header>
                <ul class="secondary-menu--list">
                    <li class="secondary-menu--item"><a href="#"><i class="fa-solid fa-search"></i></a></li>
                    <li class="secondary-menu--item"><a href="#"><i class="fa-solid fa-bell"></i></a></li>
                    <li class="secondary-menu--item user">
                        <span class="secondary-menu--user-icon" data-user="User's icon"><a href="#"></a></span>
                        <a href="#"><i class="fa-solid fa-caret-down"></i></a>
                    </li>
                </ul>
            </nav>
            <div role="banner" class="hero">
                <img class="hero--logo" src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/poster%201.png?raw=true" alt="Movie title logo">
                <p class="hero--description">In a state-of-the-art penitentiary, an inmate participates in an experiment with drugs that control emotions for a pharmaceutical genius.</p>
                <button class="hero--button play"><i class="fa-solid fa-play"></i>Watch</button>
                <button class="hero--button info"><i class="fa-solid fa-circle-info"></i>More information</button>
            </div>
        </header>

        <main>
            <h1 class="visually-hidden">Homepage Netflix</h1>

            <section class="section__category">
                <h3 class="category--title"><a href="#">My list</a></h3>
                <div class="category--carousel">
                    <span class="carousel-button prev" role="button" aria-label="See before titles"><b class="fa-solid fa-chevron-left"></b></span>
                    <div class="carousel__container">
                        <ul class="carousel--list">
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/minhalista_1.png?raw=true" alt="Bojack Horseman"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/minhalista_2.png?raw=true" alt="Ozark"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/minhalista_3.png?raw=true" alt="A Vizinha da Mulher na Janela"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/minhalista_4.png?raw=true" alt="Breaking Bad"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/minhalista_5.png?raw=true" alt="The End of the F***ing World"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/minhalista_6.png?raw=true" alt="Russian Doll"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/minhalista_7.png?raw=true" alt="Pray Away"></a></li>
                        </ul>
                    </div>
                    <span class="carousel-button next" role="button" aria-label="See more titles"><b class="fa-solid fa-chevron-right"></b></span>
                </div>
            </section>

            <section class="section__category">
                <h3 class="category--title"><a href="#">Trending</a></h3>
                <div class="category--carousel">
                    <span class="carousel-button prev" role="button" aria-label="See previous titles"><b class="fa-solid fa-chevron-left"></b></span>
                    <div class="carousel__container">
                        <ul class="carousel--list">
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/top_1.png?raw=true" alt="Stranger Things"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/top_2.png?raw=true" alt="The Umbrella Academy"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/top_3.png?raw=true" alt="Arremessando Alto"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/top_4.png?raw=true" alt="Amor & Gelato"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/top_5.png?raw=true" alt="Peaky Blinders"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/top_6.png?raw=true" alt="La Casa de Papel - Coreia"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/top_7.png?raw=true" alt="Polar"></a></li>
                        </ul>
                    </div>
                    <span class="carousel-button next" role="button" aria-label="See more titles"><b class="fa-solid fa-chevron-right"></b></span>
                </div>
            </section>

            <section class="section__category">
                <h3 class="category--title"><a href="#">Foreign series</a></h3>
                <div class="category--carousel">
                    <span class="carousel-button prev" role="button" aria-label="See previous titles"><b class="fa-solid fa-chevron-left"></b></span>
                    <div class="carousel__container">
                        <ul class="carousel--list">
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/estrangeiras_1.png?raw=true" alt="Queen Loreta"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/estrangeiras_2.png?raw=true" alt="As 7 Vidas de Lea"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/estrangeiras_3.png?raw=true" alt="Young Royals"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/estrangeiras_4.png?raw=true" alt="Dark"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/estrangeiras_5.png?raw=true" alt="Bem-vindos ao Eden"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/estrangeiras_6.png?raw=true" alt="Ozark"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/estrangeiras_7.png?raw=true" alt="Elize Matsunga"></a></li>
                        </ul>
                    </div>
                    <span class="carousel-button next" role="button" aria-label="See more titles"><b class="fa-solid fa-chevron-right"></b></span>
                </div>
            </section>

            <section class="section__category">
                <h3 class="category--title"><a href="#">Eccentric acid humor series</a></h3>
                <div class="category--carousel">
                    <span class="carousel-button prev" role="button" aria-label="See previous titles"><b class="fa-solid fa-chevron-left"></b></span>
                    <div class="carousel__container">
                        <ul class="carousel--list">
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/excentricas_1.png?raw=true" alt="Fyre"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/excentricas_2.png?raw=true" alt="Friends from College"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/excentricas_3.png?raw=true" alt="Riverdale"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/excentricas_4.png?raw=true" alt="Velvet Buzzsaw"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/excentricas_5.png?raw=true" alt="Amazing Interiors"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/excentricas_6.png?raw=true" alt="The Good Place"></a></li>
                            <li class="carousel--item"><a href="#"><img src="https://github.com/debschaan/netflix-clone/blob/main/assets/img/excentricas_7.png?raw=true" alt="Unbreakable Kimmy Schmidt"></a></li>
                        </ul>
                    </div>
                    <span class="carousel-button next" role="button" aria-label="See more titles"><b class="fa-solid fa-chevron-right"></b></span>
                </div>
            </section>
        </main>
        <footer role="contentinfo">
            <ul class="social--list">
                <li class="social--item"><a aria-label="facebook" href="#"><i class="bi bi-facebook"></i></a></li>
                <li class="social--item"><a aria-label="instagram" href="#"><i class="bi bi-instagram"></i></a></li>
                <li class="social--item"><a aria-label="twitter" href="#"><i class="bi bi-twitter"></i></a></li>
                <li class="social--item"><a aria-label="youtube" href="#"><i class="bi bi-youtube"></i></a></li>
            </ul>
            <div class="options">
                <ul class="options--list">
                    <li class="options--item"><a href="#">Audiodescription</a></li>
                    <li class="options--item"><a href="#">Investor relations</a></li>
                    <li class="options--item"><a href="#">Legal information</a></li>
                    <li class="options--item"><a href="#">Help Center</a></li>
                    <li class="options--item"><a href="#">Recruitment</a></li>
                    <li class="options--item"><a href="#">Cookie preferences</a></li>
                    <li class="options--item"><a href="#">Gift Cards</a></li>
                    <li class="options--item"><a href="#">Terms of Use</a></li>
                    <li class="options--item"><a href="#">Legal Notice</a></li>
                    <li class="options--item"><a href="#">Press</a></li>
                    <li class="options--item"><a href="#">Confidentiality</a></li>
                    <li class="options--item"><a href="#">Contacts</a></li>
                    <li class="options--item"><a href="#">Informations</a></li>
                </ul>
            </div>
            <button class="service-code-button">Service Code</button>
            <div class="footer-copyright"><span>© 2024 Débora Schaan.</span></div>
        </footer>
    </div>`;

  // Add the full-screen container to the body
  document.body.appendChild(fullScreenContainer);

  // Add event listener to close the full-screen overlay
  document
    .getElementById("closeFullscreen")
    .addEventListener("click", closeFullscreen);

  // Close the full screen when another navigation link is clicked
  const navLinks = document.querySelectorAll(".primary-menu--item a");
  navLinks.forEach((link) => {
    link.addEventListener("click", closeFullscreen);
  });

  function closeFullscreen() {
    // Remove the full-screen container
    const fullScreen = document.querySelector("#fullScreenContainer");
    if (fullScreen) {
      document.body.removeChild(fullScreen);
    }
  }
}

// Add event listeners to navigation links
document.querySelectorAll(".primary-menu--item a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.textContent === "Videos") {
      navigateToVideoPage(event);
    } else {
      const fullScreen = document.querySelector("#fullScreenContainer");
      if (fullScreen) {
        fullScreen.remove();
      }
    }
  });
});

// Function to navigate back to the home screen
function backToHome() {
  const newsFeed = document.querySelector("#newsFeedContainer");

  newsFeed.innerHTML = `
    <div class="card mb-3">
      <div class="card-body">
        <textarea class="form-control mb-2" placeholder="What's on your mind?"></textarea>
        <button class="btn btn-primary w-100">Post</button>
      </div>
    </div>
  `;
}

// Function to restore the original homepage layout
function backToHome() {
  const newsFeed = document.querySelector(".col-md-6");
  history.pushState({ app: "home" }, "", "#home");
  newsFeed.innerHTML = `
    <div class="card mb-3">
     <div id="welcomeQuotes" class="card mb-3">
      <div class="card-body text-center">
      <h3 class="mb-3">Welcome to MovieVerse!</h3>
      <p class="mb-0">
        "Dive into the magic of cinema and explore the latest hits and timeless classics."
      </p>
    </div>
    </div>

    <!-- Atlas -->
    <div class="card mb-3">
      <div class="card-header d-flex align-items-center">
        <img
          src="images/Amir.png"
          alt="User"
          class="rounded-circle me-2"
        />
        <div>
          <strong>Amir Khan</strong>
          <br />
          <small>10 mins ago</small>
        </div>
      </div>
      <div class="card-body">
        <p>Atlas is a 2024 American science fiction action film starring Jennifer Lopez as a skilled 
           counterterrorism analyst, who harbors a profound skepticism towards artificial intelligence, 
           and who comes to realize that it may be her sole recourse following the failure of a mission 
           aimed at apprehending a rogue robot.</p>
        <img
          src="images/atlas.png"
          alt="Post Content"
          class="img-fluid rounded"
        />
      </div>
      <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-outline-primary btn-sm">
          <i class="bi bi-hand-thumbs-up"></i> React
        </button>
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-chat"></i> Review
        </button>
        <button class="btn btn-outline-success btn-sm">
          <i class="bi bi-share"></i> Share
        </button>
      </div>
    </div>

    <!-- God of Gamblers -->
    <div class="card mb-3">
      <div class="card-header d-flex align-items-center">
        <img
          src="images/Ixel.png"
          alt="User"
          class="rounded-circle me-2"
        />
        <div>
          <strong>Jane Doe</strong>
          <br />
          <small>2 hours ago</small>
        </div>
      </div>
      <div class="card-body">
        <p>God of Gamblers is a 1989 movie about a legendary gambler who loses his memory but retains his supernatural gambling abilities: 
           A legendary gambler, Do San, is assigned a bodyguard to help him pay off a debt by beating his friend's card game advisory. However, 
           Do San has an accident that leaves him with partial memory loss and the mental state of a child. A street hustler, Knife, and his girlfriend 
           take care of Do San and discover that he still has some of his powers. They take him to the local gambling halls, where he faces off against 
           Knife's loan-shark and other enemies. </p>
        <img
          src="images/gamblers.png"
          alt="Post Content"
          class="img-fluid rounded"
        />
      </div>
      <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-outline-primary btn-sm">
          <i class="bi bi-hand-thumbs-up"></i> React
        </button>
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-chat"></i> Review
        </button>
        <button class="btn btn-outline-success btn-sm">
          <i class="bi bi-share"></i> Share
        </button>
      </div>
    </div>
    <!-- Juice -->
    <div class="card mb-3">
      <div class="card-header d-flex align-items-center">
        <img
          src="images/Jarad.png"
          alt="User"
          class="rounded-circle me-2"
        />
        <div>
          <strong>Jarad Anthony Higgins</strong>
          <br />
          <small>3 hours ago</small>
        </div>
      </div>
      <div class="card-body">
        <p>Juice is a 1992 American crime drama film about four friends in Harlem, New York City in the early 1990s who are looking for respect and power: 
           The four friends, Q (Omar Epps), Bishop (Tupac Shakur), Raheem, and Steel, are inseparable and spend their days hanging out, skipping school, and 
           dealing with police harassment and rival gangs. After an old friend is killed in a shootout, Bishop tells the group that they have no respect, or "juice". 
           To get some, they rob a corner store, but things take an unexpected turn. </p>
        <img
          src="images/juice.png"
          alt="Post Content"
          class="img-fluid rounded"
        />
      </div>
      <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-outline-primary btn-sm">
          <i class="bi bi-hand-thumbs-up"></i> React
        </button>
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-chat"></i> Review
        </button>
        <button class="btn btn-outline-success btn-sm">
          <i class="bi bi-share"></i> Share
        </button>
      </div>
    </div>
     <div class="card mb-3">
      <div class="card-header d-flex align-items-center">
        <img
          src="images/Naes.png" 
          alt="User"
          class="rounded-circle me-2"
        />
        <div>
          <strong>John Smith</strong>
          <br />
          <small>6 hours ago</small>
        </div>
      </div>
      <div class="card-body">
        <p>Gladiator II is a 2024 movie directed by Ridley Scott that continues the story of vengeance, power, and intrigue in Ancient Rome: 
           Lucius Verus Aurelius, the grandson of Marcus Aurelius, is forced to enter the Colosseum after his home is conquered by the tyrannical 
           emperors Geta and Caracalla. Lucius must use his past to find the strength and honor to return Rome to its glory.  </p>
        <img
          src="images/gladiator.png"
          alt="Post Content"
          class="img-fluid rounded"
        />
      </div>
      <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-outline-primary btn-sm">
          <i class="bi bi-hand-thumbs-up"></i> React
        </button>
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-chat"></i> Review
        </button>
        <button class="btn btn-outline-success btn-sm">
          <i class="bi bi-share"></i> Share
        </button>
      </div>
    </div>
     <div class="card mb-3">
      <div class="card-header d-flex align-items-center">
        <img
          src="images/Malupiton.png" 
          alt="User"
          class="rounded-circle me-2"
        />
        <div>
          <strong>Malupiton Official</strong>
          <br />
          <small>3 hours ago</small>
        </div>
      </div>
      <div class="card-body">
        <p>Comedian and content creator Joel Ravanera, widely known as 'Malupiton,' has confirmed that he will be starring in his own debut film. 
           In an exclusive interview on the latest episode of 'Toni Talks' on December 1, Ravanera shared details about the upcoming project, revealing 
           that filming is already underway.</p>
        <img
          src="images/Lapuk.png"
          alt="Post Content"
          class="img-fluid rounded"
        />
      </div>
      <div class="card-footer d-flex justify-content-around">
        <button class="btn btn-outline-primary btn-sm">
          <i class="bi bi-hand-thumbs-up"></i> React
        </button>
        <button class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-chat"></i> Review
        </button>
        <button class="btn btn-outline-success btn-sm">
          <i class="bi bi-share"></i> Share
        </button>
      </div>
    </div>
  `;
}

// To-Do List initialization to load tasks
function initializeToDoList() {
  const taskList = document.getElementById("taskList");
  const emptyMessage = document.getElementById("emptyMessage");
  const totalCount = document.getElementById("totalCount");
  const savedTasks = JSON.parse(localStorage.getItem("toDoListTasks")) || [];

  taskList.innerHTML = "";

  if (savedTasks.length === 0) {
    emptyMessage.style.display = "block";
    totalCount.textContent = "Total: 0 tasks";
  } else {
    emptyMessage.style.display = "none";
    savedTasks.forEach((task) => {
      addTaskToDOM(task.text, task.completed);
    });
    totalCount.textContent = `Total: ${savedTasks.length} tasks`;
  }
}

// Save tasks to localStorage
function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children).map((taskItem) => ({
    text: taskItem.querySelector(".task-text").textContent,
    completed: taskItem.querySelector("input[type='checkbox']").checked,
  }));
  localStorage.setItem("toDoListTasks", JSON.stringify(tasks));

  const emptyMessage = document.getElementById("emptyMessage");
  const totalCount = document.getElementById("totalCount");

  if (tasks.length === 0) {
    emptyMessage.style.display = "block";
    totalCount.textContent = "Total: 0 tasks";
  } else {
    emptyMessage.style.display = "none";
    totalCount.textContent = `Total: ${tasks.length} tasks`;
  }
}

// Function to add tasks
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToDOM(taskText);
    taskInput.value = "";
    saveTasks();
  }
}

// Function to add a task to the DOM
function addTaskToDOM(taskText, completed = false) {
  const taskList = document.getElementById("taskList");
  const emptyMessage = document.getElementById("emptyMessage");

  const taskItem = document.createElement("li");
  taskItem.className =
    "list-group-item d-flex justify-content-between align-items-center";

  // Checkbox for completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.className = "form-check-input me-2";
  checkbox.onclick = () => {
    taskTextElement.style.textDecoration = checkbox.checked
      ? "line-through"
      : "none";
    saveTasks();
  };

  // Task text
  const taskTextElement = document.createElement("span");
  taskTextElement.className = "task-text";
  taskTextElement.textContent = taskText;
  if (completed) {
    taskTextElement.style.textDecoration = "line-through";
  }

  // Edit button
  const editButton = document.createElement("button");
  editButton.className = "btn btn-warning btn-sm me-2";
  editButton.innerHTML = '<i class="bi bi-pencil"></i>'; // Pencil icon
  editButton.onclick = () => {
    const newText = prompt("Edit your task:", taskTextElement.textContent);
    if (newText !== null && newText.trim() !== "") {
      taskTextElement.textContent = newText.trim();
      saveTasks(); // Save the edited tasks
    }
  };

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm";
  deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; // Trash icon
  deleteButton.onclick = () => {
    taskList.removeChild(taskItem);
    saveTasks();
  };

  // Append elements to the task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskTextElement);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  // Append the task item to the list
  taskList.appendChild(taskItem);

  // Hide empty message when a task is added
  emptyMessage.style.display = "none";
}

// Function to delete all tasks
function deleteAllTasks() {
  const taskList = document.getElementById("taskList");

  if (taskList.children.length === 0) {
    alert("No tasks to delete!");
    return;
  }

  // Show confirmation dialog
  if (confirm("Are you sure you want to delete all tasks?")) {
    taskList.innerHTML = "";
    saveTasks();
  }
}

// Initialize the to-do list on page load
window.onload = initializeToDoList;

let tokens = 10;
let isCooldown = false;
let countdownTimerInterval;

// Function to update the token display
function updateTokenDisplay() {
  const tokenDisplay = document.getElementById("tokenDisplay");
  tokenDisplay.textContent = `Tokens: ${tokens}`;
}

// Function to restore tokens after cooldown and show countdown
function restoreTokens() {
  const slotResult = document.getElementById("slotResult");
  const spinButton = document.getElementById("spinButton");
  const countdown = document.getElementById("countdown");
  const countdownTimer = document.getElementById("countdownTimer");

  // Show cooldown message and countdown
  slotResult.textContent = "No tokens left. Restoring tokens... Please wait.";
  countdown.style.display = "block"; // Show the countdown text
  let timeLeft = 5;
  countdownTimer.textContent = timeLeft; // Set the initial countdown value

  // Disable the Spin button during cooldown
  spinButton.disabled = true;

  // Start the countdown interval
  countdownTimerInterval = setInterval(() => {
    timeLeft--;
    countdownTimer.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdownTimerInterval);
      tokens = 10; // Restore tokens to 10
      updateTokenDisplay();
      slotResult.textContent = "Tokens restored! Spin to play again!";
      countdown.style.display = "none";

      // Re-enable the Spin button after cooldown
      spinButton.disabled = false;
      isCooldown = false;
    }
  }, 1000);
}

// Spin Slot functionality
function spinSlot() {
  if (isCooldown) return; // Prevent spinning while on cooldown

  const slots = ["🍎", "🍒", "🍇", "🍊", "🍉", "🍋"];
  const slotResult = document.getElementById("slotResult");
  const spinButton = document.getElementById("spinButton");

  if (tokens <= 0) {
    // Start the cooldown if no tokens are left
    restoreTokens();
    isCooldown = true;
    return;
  }

  tokens--;
  updateTokenDisplay();

  slotResult.textContent = "Spinning...";

  setTimeout(function () {
    const randomSlots = [
      slots[Math.floor(Math.random() * slots.length)],
      slots[Math.floor(Math.random() * slots.length)],
      slots[Math.floor(Math.random() * slots.length)],
    ];

    // Display the result after the spinning is complete
    slotResult.textContent = randomSlots.join(" | ");

    // Check if the user wins (all slots match)
    if (
      randomSlots[0] === randomSlots[1] &&
      randomSlots[1] === randomSlots[2]
    ) {
      showEmojiRain();

      // Create and display "Congratulations, you win!" message
      const winMessage = document.createElement("p");
      winMessage.textContent = "🎉 Congratulations, you win! 🎉";
      winMessage.style.fontSize = "1.5rem";
      winMessage.style.fontWeight = "bold";
      winMessage.style.color = "#28a745";
      winMessage.style.marginTop = "20px";
      winMessage.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.3)";
      slotResult.appendChild(winMessage);

      // Optionally, award bonus tokens for winning
      tokens += 10;
      updateTokenDisplay();
    } else {
      const tryAgainMessage = document.createElement("p");
      tryAgainMessage.textContent = "Try again!";
      tryAgainMessage.style.fontSize = "1.5rem";
      tryAgainMessage.style.fontWeight = "bold";
      tryAgainMessage.style.color = "#f02849";
      tryAgainMessage.style.marginTop = "20px";
      slotResult.appendChild(tryAgainMessage);
    }
  }, 2000); // Simulate slot spinning for 2 seconds
}

// Initialize the token display when the page loads
function initializeTokens() {
  updateTokenDisplay();
}

// Initialize the token display on page load
window.onload = initializeTokens;

// Function to create emoji rain effect
function showEmojiRain() {
  for (let i = 0; i < 30; i++) {
    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = "🎉";
    emoji.style.left = `${Math.random() * 100}vw`;
    emoji.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 5000);
  }

  setTimeout(() => {
    const emojis = document.querySelectorAll(".emoji");
    emojis.forEach((emoji) => emoji.remove());
  }, 5000);
}

// Function to create emoji rain effect
function showEmojiRain() {
  for (let i = 0; i < 30; i++) {
    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.textContent = "🎉";
    emoji.style.left = `${Math.random() * 100}vw`;
    emoji.style.animationDelay = `${Math.random() * 2}s`;
    document.body.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 5000);
  }

  setTimeout(() => {
    const emojis = document.querySelectorAll(".emoji");
    emojis.forEach((emoji) => emoji.remove());
  }, 5000);
}

// Handle back/forward navigation
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.app) {
    navigateTo(event.state.app);
  }
});

// Initialize the page on load
if (!location.hash || location.hash === "#home") {
  history.replaceState({ app: "home" }, "", "#home");
  backToHome();
} else if (location.hash === "#toDoList") {
  navigateTo("toDoList");
} else if (location.hash === "#slotMachine") {
  navigateTo("slotMachine");
}

document
  .querySelector(".navbar-brand i")
  .addEventListener("click", function () {
    const body = document.body;

    const phrases = [
      "pwede ka ba makasama sa pailaw lods?",
      "tara habol tayo sa pasko lods",
      "i miss you",
      "can we talk again?",
      "saan ba ako nagkulang?",
    ];

    const rainContainer = document.createElement("div");
    rainContainer.id = "rainContainer";
    rainContainer.style.position = "fixed";
    rainContainer.style.top = "0";
    rainContainer.style.left = "0";
    rainContainer.style.width = "100%";
    rainContainer.style.height = "100%";
    rainContainer.style.pointerEvents = "none";
    rainContainer.style.zIndex = "9999";
    body.appendChild(rainContainer);

    const createRandomText = () => {
      const randomText = document.createElement("span");
      randomText.textContent =
        phrases[Math.floor(Math.random() * phrases.length)];
      randomText.className = "raining-text";
      randomText.style.left = `${Math.random() * 100}%`;
      rainContainer.appendChild(randomText);

      setTimeout(() => {
        rainContainer.removeChild(randomText);
      }, 6000);
    };

    const interval = setInterval(createRandomText, 200);

    setTimeout(() => {
      clearInterval(interval);
      body.removeChild(rainContainer);
    }, 6000);
  });

// Function to toggle between Dark Mode and Light Mode
function toggleTheme() {
  const body = document.body;
  const navbar = document.getElementById("navbar");
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme");

  // Toggle the classes based on the current theme in localStorage
  if (currentTheme === "dark") {
    // Switching to Light Mode
    body.classList.remove("dark-mode");
    body.style.backgroundColor = "#ffffff";
    body.style.color = "#000000";
    navbar.classList.remove("bg-dark");
    navbar.classList.add("bg-light");
    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
    localStorage.setItem("theme", "light");
  } else {
    // Switching to Dark Mode
    body.classList.add("dark-mode");
    body.style.backgroundColor = "#18191a";
    body.style.color = "#e4e6eb";
    navbar.classList.remove("bg-light");
    navbar.classList.add("bg-dark");
    themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
    localStorage.setItem("theme", "dark");
  }
}

// Check if the theme is already set in localStorage on page load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  document.body.style.backgroundColor = "#18191a"; // Dark background
  document.body.style.color = "#e4e6eb"; // Light text color
  document.getElementById("navbar").classList.remove("bg-light");
  document.getElementById("navbar").classList.add("bg-dark");
  document.getElementById("themeToggle").innerHTML =
    '<i class="bi bi-sun"></i>';
} else {
  // Default to Light Mode
  document.body.classList.remove("dark-mode");
  document.body.style.backgroundColor = "#ffffff";
  document.body.style.color = "#000000";
  document.getElementById("navbar").classList.remove("bg-dark");
  document.getElementById("navbar").classList.add("bg-light");
  document.getElementById("themeToggle").innerHTML =
    '<i class="bi bi-moon"></i>';
}

// Event listener for toggling theme when the icon is clicked
document.getElementById("themeToggle").addEventListener("click", toggleTheme);

function setActiveNavIcon(iconId) {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));
  document.getElementById(iconId).classList.add("active");
}
