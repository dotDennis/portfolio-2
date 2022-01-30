/* Target nav items */
const workAnchor = document.querySelector("#aWork");
const skillsAnchor = document.querySelector("#aSkills");
const contactAnchor = document.querySelector("#aContact");

/* Select sections */
const workSection = document.querySelector("#work");
const skillsSection = document.querySelector("#skills");
const contactSection = document.querySelector("#contact");

/* Color values */
const yellow = "#ffbc6b";
const light = "#ededec";

function checkY(el) {
  const yCoord = el.getBoundingClientRect().top + window.pageYOffset - 50;
  return yCoord;
}

const workCoord = checkY(workSection);
const skillsCoord = checkY(skillsSection);
const contactCoord = checkY(contactSection);

document.addEventListener("scroll", function (e) {
  const offset = window.pageYOffset;
  if (offset > workCoord && offset < skillsCoord) {
    workAnchor.style.color = yellow;
  } else {
    workAnchor.style.color = light;
  }
  if (offset > skillsCoord && offset < contactCoord) {
    skillsAnchor.style.color = yellow;
  } else {
    skillsAnchor.style.color = light;
  }
  if (offset > contactCoord) {
    contactAnchor.style.color = yellow;
  } else {
    contactAnchor.style.color = light;
  }
});
