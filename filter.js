document.addEventListener("DOMContentLoaded", () => {
  const animalList = document.getElementById("animal-list");
  const animalSearch = document.getElementById("animal-search");
  const animalCards = document.getElementById("animal-cards");

  const renderAnimalCards = (data) => {
      animalCards.innerHTML = "";
      data.forEach((animal) => {
          const card = `
              <div class="card shadow-sm cardwidth">
                  <img src="../../img/Zoo.png" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="${animal.animal}" />
                  <div class="card-body">
                      <p class="card-text">
                          The scientific name of ${animal.animal} is ${animal.breed} which has ${animal.legs} legs and ${animal.head} heads and makes the sound ${animal.sound}
                      </p>
                      <small class="sc text-body-secondary">Added by Drashya Patel</small>
                  </div>
              </div>
          `;
          animalCards.innerHTML += card;
      });
  };
  
  const fetchFilteredData = async (filter) => {
      try {
          const response = await fetch(`/api/filter?tag=${encodeURIComponent(filter)}`);
          const data = await response.json();
          renderAnimalCards(data);
      } catch (error) {
          console.error("Error fetching filtered data:", error);
      }
  };

  animalList.addEventListener("click", (event) => {
      if (event.target.classList.contains("animal-item")) {
          const animalName = event.target.getAttribute("data-name");
          fetchFilteredData(animalName);
      }
  });

  animalSearch.addEventListener("input", (event) => {
      const searchTerm = event.target.value.trim().toLowerCase();
      fetchFilteredData(searchTerm);
  });
});
