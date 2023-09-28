const { on } = require("nodemon");

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
const url1 = 'http://localhost:3003/api/learners';
const url2 = 'http://localhost:3003/api/mentors';
document.addEventListener(onload, () => document.info.textContent = 'No Learner Selected'  )

Promise.all([fetch(url1), fetch(url2)])
  .then((responses) => {
    const [response1, response2] = responses;
    if (response1.ok && response2.ok) {
      return Promise.all([response1.json(), response2.json()]);
    } else {
      throw new Error('One or both requests failed');
    }
  })
  .then((data) => {
    const [data1, data2] = data;
    console.log('Data from endpoint1:', data1);
    console.log('Data from endpoint2:', data2);

    renderLearnerCards(data1, data2);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

function renderLearnerCards(data1, data2) {
  const cardContainer = document.getElementById('cards');


  const matches = {};

   data1.forEach((learner) => {
    const { id, fullName, email, mentors } = learner;

    const matchingMentor = data2.find((mentor) => mentor.id === id);

    if (matchingMentor) {
      matches[id] = { id: id, mentor: matchingMentor };
      const card = createLearnerCard(fullName, email, mentors);
      cardContainer.appendChild(card);
    }
  });
}

function createLearnerCard(fullName, email, mentors) {
  const card = document.createElement('div');
  card.classList.add('card');
 
  card.addEventListener('click', () => {
    card.classList.toggle('selected');
  });
  if (card.selected) {document.info.textContent = `The Selected Learner is ${fullName}`}

  const nameElement = document.createElement('h3');
  nameElement.classList.add('name');
  nameElement.textContent = fullName;
  card.appendChild(nameElement);

  const emailElement = document.createElement('div');
  emailElement.classList.add('email');
  emailElement.textContent = email;
  card.appendChild(emailElement);

  const mentorsElement = document.createElement('h4');
  mentorsElement.classList.add('closed');
  mentorsElement.textContent = mentors;

  mentorsElement.addEventListener('click', () => {
    mentorsElement.classList.toggle('open');
  });

  card.appendChild(mentorsElement)
  const listElement = document.createElement('ul');
  card.appendChild(listElement);

  return card;
}

  // 👆 WORK WORK ABOVE THIS LINE 👆


// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
}