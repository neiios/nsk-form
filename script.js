const form = document.getElementById("contact-form");
const familyStatus = document.getElementById("family-status");
// data from a form
const data = {};

function checkValidity() {
  return true;
}

function submissionHandler(e) {
  // prevent default form behavior
  e.preventDefault();
  const valid = checkValidity;
  if (valid) {
    console.log("Form is valid.");
  }
}

function changeMaritalStatus() {
  if (document.getElementById("spouse-info")) {
    document.getElementById("spouse-info").remove();
  }

  let container = document.getElementById("marital-container");
  let select = document.getElementById("marital-status");

  if (select.value === "married") {
    let div = document.createElement("div");
    div.id = "spouse-info";
    div.innerHTML = `
          <label for="spouse-firstname">Sutuoktinio(-ės) vardas*</label>
          <input type="text" id="spouse-firstname" required placeholder="Vardenis" />

          <label for="spouse-middlename">Sutuoktinio(-ės) antrasis vardas</label>
          <input type="text" id="spouse-middlename" placeholder="DeMarcus" />

          <label for="spouse-lastname">Sutuoktinio(-ės) pavardė*</label>
          <input type="text" id="spouse-lastname" required placeholder="Pavardenis" />
  `;
    container.appendChild(div);
  }
}

function changeKids(button) {
  let container = document.getElementById("kid-container");

  if (button.id === "add-kid") {
    let div = document.createElement("div");
    div.id = "kid" + container.children.length;
    div.classList.add("kid");
    div.innerHTML = `
          <label for="${div.id}-name">Vaiko vardas</label>
          <input type="text" id="${div.id}-name" />
          <label for="${div.id}-lastname">Vaiko pavardė</label>
          <input type="text" id="${div.id}-lastname" />
          <button id="kill-kid" type="button" onclick="changeKids(this)">Ištrinti vaiką</button>
`;
    container.appendChild(div);
  } else if (button.id === "kill-kid") {
    const el = button.parentElement;
    el.remove();
  }
}

function changeWorkStatus() {
  if (document.getElementById("works-container")) {
    document.getElementById("works-container").remove();
  }
  // add 3 more ifs here

  let container = document.getElementById("work-status-container");
  let select = document.getElementById("work-status");

  if (select.value === "studying") {
    let div = document.createElement("div");
    div.id = "study-container";
    div.innerHTML = `
          <label for="study-degree">Studijų pakopa</label>
          <select name="study-degree" id="study-degree">
            <option value="bachelors">Bakalaurantūra</option>
            <option value="masters">Magistrantūra</option>
            <option value="doctoral">Doktorantūra</option>
          </select>

          <label for="study-year">Kursas</label>
          <input type="number" id="study-year" />

          <label for="study-institution">Įstaiga</label>
          <input type="text" id="study-institution" />
  `;
    container.appendChild(div);
  } else if (select.value === "works") {
    let div = document.createElement("div");
    div.id = "works-container";
    div.innerHTML = `
          <label for="work-institution">Darbo įstaiga</label>
          <input type="text" id="work-institution" />

          <label for="work-functions">Darbo pareigos</label>
          <input type="text" id="work-functions" />
  `;
    container.appendChild(div);
  } else if (select.value === "not-working") {
    let div = document.createElement("div");
    div.id = "not-working-container";
    div.innerHTML = `
          <label for="not-working-reason">Nedarbo priežastis</label>
          <input type="text" id="not-working-reason" />
  `;
    container.appendChild(div);
  } else if (select.value === "parental-leave") {
    let div = document.createElement("div");
    div.id = "parental-leave-container";
    div.innerHTML = `
          <label for="parental-leave-start-date">Atostogų pradžia</label>
          <input type="date" id="parental-leave-start-date" />
  `;
    container.appendChild(div);
  }
}

form.addEventListener("submit", submissionHandler);
changeWorkStatus();
