const form = document.getElementById("contact-form");
let currentPage = 0;

function extractInfoFromAsmensKodas(obj) {
  let year = obj.asmensKodas.slice(1, 3);
  let month = obj.asmensKodas.slice(3, 5);
  let day = obj.asmensKodas.slice(5, 7);
  let firstNumber = obj.asmensKodas.slice(0, 1);

  let gender;
  switch (firstNumber) {
    case "1":
      gender = "M";
      year = "18" + year;
      break;
    case "2":
      gender = "F";
      year = "18" + year;
      break;
    case "3":
      gender = "M";
      year = "19" + year;
      break;
    case "4":
      gender = "F";
      year = "19" + year;
      break;
    case "5":
      gender = "M";
      year = "20" + year;
      break;
    case "6":
      gender = "F";
      year = "20" + year;
      break;
  }
  obj.dataOfBirth = year + "-" + month + "-" + day;
  obj.gender = gender;
}

function submissionHandler(e) {
  // prevent default form behavior
  e.preventDefault();
  // extract data from a form
  const formData = new FormData(e.target);
  const obj = Object.fromEntries(formData.entries());
  extractInfoFromAsmensKodas(obj);

  // output collected data
  console.log(obj);
  document.getElementById("contact-form").remove();
  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(obj, undefined, 2);
  document.body.appendChild(pre);
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
          <input type="text" name="spouseFirstname" id="spouse-firstname" required placeholder="Vardenis" />

          <label for="spouse-middlename">Sutuoktinio(-ės) antrasis vardas</label>
          <input type="text" name="spouseMiddlename" id="spouse-middlename" placeholder="DeMarcus" />

          <label for="spouse-lastname">Sutuoktinio(-ės) pavardė*</label>
          <input type="text" name="spouseLastname" id="spouse-lastname" required placeholder="Pavardenis" />
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
          <input type="text" name="${div.id}Name" placeholder="James" id="${div.id}-name" required />
          <label for="${div.id}-lastname">Vaiko pavardė</label>
          <input type="text" name="${div.id}Lastname" placeholder="Jameson" id="${div.id}-lastname" required />
          <div> 
            <button type="button" class="kill-kid" onclick="changeKids(this)">Ištrinti</button>
          </div>
`;
    container.appendChild(div);
  } else if (button.classList.contains("kill-kid")) {
    const el = button.parentElement.parentElement;
    el.remove();
  }
}

function changeEducation() {
  if (document.getElementById("education-additional-container")) {
    document.getElementById("education-additional-container").remove();
  }

  let container = document.getElementById("education");
  let select = document.getElementById("education-level");

  if (select.value === "aukstasis-kolegijinis") {
    let div = document.createElement("div");
    div.id = "education-additional-container";
    div.innerHTML = `
          <label for="qualifications">Laipsnis</label>
          <select name="qualifications" id="qualifications" required>
            <option value="profesinis-bakalauras">Profesinis bakalauras</option>
          </select>
  `;
    container.appendChild(div);
  } else if (select.value === "aukstasis-universitetinis") {
    let div = document.createElement("div");
    div.id = "education-additional-container";
    div.innerHTML = `
          <label for="qualifications">Laipsnis</label>
          <select name="qualifications" id="qualifications" required>
            <option value="bakalauras">Bakalauras</option>
            <option value="magistras">Magistras</option>
            <option value="daktaras">Daktaras</option>
          </select>

          <label for="degree">Mokslo laipsnis</label>
          <input type="text" name="degree" id="degree" placeholder="Mokslų daktaras" />
  `;
    container.appendChild(div);
  }
}

function changeParentalLeave() {
  if (document.getElementById("parental-leave-start-container")) {
    document.getElementById("parental-leave-start-container").remove();
    return;
  }

  let container = document.getElementById("parental-leave-container");
  let div = document.createElement("div");
  div.id = "parental-leave-start-container";
  div.innerHTML = `
          <label for="parental-leave-start-date">Atostogų pradžia</label>
          <input type="date" name="parentalLeaveStartDate" id="parental-leave-start-date" />
  `;
  container.appendChild(div);
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
          <select name="studyDegree" id="study-degree">
            <option value="bachelors">Bakalaurantūra</option>
            <option value="masters">Magistrantūra</option>
            <option value="doctoral">Doktorantūra</option>
          </select>

          <label for="study-year">Kursas*</label>
          <input type="number" name="studyYear" id="study-year" required max="4" min="1" step="1" placeholder="1"/>

          <label for="study-institution">Įstaiga*</label>
          <input type="text" name="studyInstitution" id="study-institution" required placeholder="Vilniaus Universitetas"/>
  `;
    container.appendChild(div);
  } else if (select.value === "works") {
    let div = document.createElement("div");
    div.id = "works-container";
    div.innerHTML = `
          <label for="work-institution">Darbo įstaiga*</label>
          <input type="text" name="workInstitution" id="work-institution" required />

          <label for="work-functions">Darbo pareigos*</label>
          <input type="text" name="workFunctions" id="work-functions" required/>

          <label for="years-of-experience">Darbo patirtis (metais)*</label>
          <input type="number" name="yearsOfExperience" min="0" max="100" step="1" id="years-of-experience" required/>

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

        <div id="parental-leave-container">
          <label for="parental-leave-status">Esate motinystės/tėvystės atostogose</input>
          <input onchange="changeParentalLeave()" id="parental-leave-status" name="parentalLeaveStatus" type="checkbox" value="true" required/>
        </div>

        <label for="work-status-end">Tikėtina profesinės padėties pabaiga*</label>
        <input type="date" name="workStatusEnd" id="work-status-end" required/>
  `;
    container.appendChild(div);
  } else if (select.value === "not-working") {
    let div = document.createElement("div");
    div.id = "not-working-container";
    div.innerHTML = `
          <label for="not-working-reason">Nedarbo priežastis</label>
          <input type="text" name="notWorkingReason" id="not-working-reason" />
  `;
    container.appendChild(div);
  }
}

function createPages() {
  [...form.children].forEach((page) => {
    let div = document.createElement("div");
    div.classList.add("page-control-container");
    if (page.querySelector("#work-related") != null) {
      div.innerHTML = `
          <button type="button" onclick="previousPage()">Atgal</button>
          <button type="submit" class="submit-button">Pateikti</button>
  `;
    } else if (page.querySelector("#general-information") != null) {
      div.innerHTML = `
          <button type="button" disabled>Atgal</button>
          <button type="button" onclick="nextPage()">Kitas puslapis</button>
  `;
    } else {
      div.innerHTML = `
          <button type="button" onclick="previousPage()">Atgal</button>
          <button type="button" onclick="nextPage()">Kitas puslapis</button>
  `;
    }
    page.appendChild(div);
  });
  updatePages();
}

function updatePages() {
  for (let i = 0; i < form.children.length; i++) {
    form.children[i].classList.add("hidden");
    if (i === currentPage) {
      form.children[i].classList.remove("hidden");
    }
  }
}

function previousPage() {
  currentPage--;
  updatePages();
}

function nextPage() {
  currentPage++;
  updatePages();
}

// run it to change the default value
form.addEventListener("submit", submissionHandler);
createPages();
changeWorkStatus();
changeMaritalStatus();
changeEducation();
