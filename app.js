// Data storage
let markedDates = [];

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

const goPrev = () => {
  date.setMonth(date.getMonth() - 1);
  outputCal();

  btnPrev.classList.add("anim-prev");
  setTimeout(() => {
    btnPrev.classList.remove("anim-prev");
  }, 300);
};

const goNext = () => {
  date.setMonth(date.getMonth() + 1);
  outputCal();

  btnNext.classList.add("anim-next");
  setTimeout(() => {
    btnNext.classList.remove("anim-next");
  }, 300);
};

btnPrev.addEventListener("click", (e) => {
  goPrev();
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft") {
    goPrev();
  }
});

btnNext.addEventListener("click", (e) => {
  goNext();
});

window.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    goNext();
  }
});

//
// Date management
const date = new Date();

const outputCal = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".cal-body-daynums");
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();
  // Modify next line to set week's first day //
  const firstDayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  let nextDays;
  if (date.getDay() === 0) {
    nextDays = 7 - lastDayIndex - 1;
  } else {
    nextDays = 7 - lastDayIndex;
  }

  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const daynames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const month = date.getMonth();

  document.querySelector(".cal-header-month").innerHTML =
    months[date.getMonth()];
  document.querySelector(".cal-header-year").innerHTML = date.getFullYear();

  let days = [];

  for (let x = firstDayIndex; x > 0; x--) {
    const pPast = document.createElement("P");
    pPast.classList.add("pastdaynum");
    pPast.innerHTML = prevLastDay - x + 1;
    days.push(pPast);
  }

  for (let i = 1; i <= lastDay; i++) {
    const pCurrent = document.createElement("P");

    pCurrent.dataset.date = `${date.getFullYear()}-${date.getMonth()}-${i}`;

    if (markedDates[pCurrent.dataset.date]) {
      pCurrent.classList.value =
        "daynum" + " " + markedDates[pCurrent.dataset.date];
    } else {
      pCurrent.classList.add("daynum");
    }

    pCurrent.innerHTML = i;
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      pCurrent.id = "today";
    }

    days.push(pCurrent);
  }

  for (let j = 1; j <= nextDays; j++) {
    if (nextDays !== 7) {
      const pNext = document.createElement("P");
      pNext.classList.add("futuredaynum");
      pNext.innerHTML = j;
      days.push(pNext);
    }
  }

  monthDays.innerHTML = "";
  days.forEach((day) => monthDays.append(day));

  // Get marked dates
  const daynums = document.querySelectorAll(".daynum");
  daynums.forEach((item) => {
    if (markedDates.find((obj) => obj.date === item.dataset.date)) {
      item.classList.add("clrBlue");
    }
  });
};

//
// Gestion d'agenda
//

let currentCalMode;

const uiHomescreen = document.querySelector(".homescreen");
const uiFormCreate = document.querySelector("form#create");
const uiCalendar = document.querySelector(".cal");
const uiScheduleModal = document.querySelector(".scheduleModal");
const uiScheduleModalDate = document.querySelector(".modalDate");
const uiScheduleModalForm = document.querySelector(".scheduleModal form");

uiFormCreate.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(uiFormCreate.title.value + ", " + uiFormCreate.description.value);
  initCalCreation();
  uiHomescreen.classList.add("d-none");
  uiFormCreate.reset();
});

const initCalCreation = () => {
  currentCalMode = "creation";

  uiCalendar.classList.remove("d-none");

  outputCal();
};

uiCalendar.addEventListener("click", (e) => {
  if (e.target.classList.contains("daynum") && timeDefined) {
    if (!markedDates[e.target.dataset.date]) {
      const newDayMark = (markedDates[e.target.dataset.date] = {});
      newDayMark.time = [];
      newDayMark.time.push(timeDefined);
    } else if (!markedDates[e.target.dataset.date].time.includes(timeDefined)) {
      console.log("time added : " + timeDefined);
      markedDates[e.target.dataset.date].time.push(timeDefined);
    }
  }
});

let timeDefined;

uiScheduleModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  timeDefined = {};
  timeDefined.start = e.target.timeStart.value;
  timeDefined.end = e.target.timeEnd.value;
});

//
//
//
outputCal();
