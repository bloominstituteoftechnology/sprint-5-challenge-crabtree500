//const { on } = require("nodemon");

async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
const url1 = 'http://localhost:3003/api/learners';
const url2 = 'http://localhost:3003/api/mentors';

 
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
      renderLearnerCards(data1, data2);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
 
    function renderLearnerCards(data1, data2) {
    
   
    const matches = {};
    data1.forEach((learner) => {
      const { id, fullName, email, mentors } = learner;
      const matchingMentor = data2.find((mentor) => mentor.id === id);
      if (matchingMentor) {
        matches[id] = { id: matchingMentor, mentor: matchingMentor.firstName }; 
        
      createLearnerCard(fullName, email, mentors)
      
    }
  });
  }

  
  function createLearnerCard(fullName, email, mentors) {
    const cardContainer = document.querySelector('.cards');
    cardContainer.appendChild(card);
    
    const infoElement = document.querySelector('.info'); 
    const card = document.createElement('div');
    card.classList.add('card');

    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      if (card.classList.contains('selected')) {
        infoElement.textContent = `The Selected Learner is ${fullName}`;
      } else {
        infoElement.textContent = 'No Learner Selected';
      }
    });

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

 }
// ❗ DO NOT CHANGE THE CODE  BELOW
 if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
 else sprintChallenge5()
