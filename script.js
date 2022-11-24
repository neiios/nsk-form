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
          <input type="text" id="${div.id}-name" required />
          <label for="${div.id}-lastname">Vaiko pavardė</label>
          <input type="text" id="${div.id}-lastname" required />
          <button id="kill-kid" type="button" onclick="changeKids(this)">Ištrinti</button>
`;
    container.appendChild(div);
  } else if (button.id === "kill-kid") {
    const el = button.parentElement;
    el.remove();
  }
}

function changeEducation() {
  if (document.getElementById("education-additional-container")) {
    document.getElementById("education-additional-container").remove();
  }

  let container = document.getElementById("education");
  let select = document.getElementById("education-level");

  if (
    select.value === "aukstasis-kolegijinis" ||
    select.value === "aukstasis-universitetinis"
  ) {
    let div = document.createElement("div");
    div.id = "education-additional-container";
    div.innerHTML = `
          <label for="qualifications">Kvalifikacija / Laipsnis (išvardyti visus)*</label>
          <input name="qualifications" required id="qualifications" placeholder="Magistras"></input>

          <label for="degree">Mokslo laipsnis</label>
          <input type="text" id="degree" placeholder="Daktaras" />
  `;
    container.appendChild(div);
  }
}

function changeWorkStatus() {
  if (document.getElementById("study-container")) {
    document.getElementById("study-container").remove();
  }
  // parental leave matches this as well
  if (document.getElementById("works-container")) {
    document.getElementById("works-container").remove();
  }
  if (document.getElementById("not-working-container")) {
    document.getElementById("not-working-container").remove();
  }

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
  } else if (select.value === "works" || select.value === "parental-leave") {
    let div = document.createElement("div");
    div.id = "works-container";
    if (select.value === "parental-leave") {
      div.innerHTML = `
          <label for="parental-leave-start-date">Atostogų pradžia</label>
          <input type="date" id="parental-leave-start-date" />
  `;
    }
    div.innerHTML += `
          <label for="work-institution">Darbo įstaiga*</label>
          <input type="text" id="work-institution" required />

          <label for="work-functions">Darbo pareigos*</label>
          <input type="text" id="work-functions" required/>

          <label for="years-of-experience">Darbo patirtis (metais)*</label>
          <input type="number" id="years-of-experience" required/>

          <label for="nature-of-work">Darbo pobūdis*</label>
          <select name="nature-of-work" id="nature-of-work" required>
            <option value="executive">Vadovas</option>
            <option value="specialist">Specialistas</option>
            <option value="self-employed">Individuali veikla</option>
          </select>

          <label for="work-field">Darbo sritis*</label>
          <select name="work-field" id="work-field" required>
            <option value="law">Teisė</option>
            <option value="public-sector">Viešasis sektorius</option>
            <option value="health">Sveikatos apsauga</option>
            <option value="pharmacy">Farmacija</option>
            <option value="industrial">Pramonė/Gamyba</option>
            <option value="it">IT</option>
            <option value="marketing">Prekyba</option>
            <option value="national-defence">Krašto apsauga</option>
            <option value="internal-affairs">Vidaus reikalų sistema</option>
            <option value="customer-service">Klientų aptarnavimas</option>
            <option value="transport">Transportas</option>
            <option value="entertainment">Kultūra ir pramogos</option>
            <option value="education">Švietimas/Studijos</option>
          </select>
        </div>

        <label for="work-status-end">Tikėtina profesinės padėties pabaiga*</label>
        <input type="date" id="work-status-end" required/>
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
  }
}

form.addEventListener("submit", submissionHandler);
// run it to change the default value
changeWorkStatus();
changeMaritalStatus();
changeEducation();
