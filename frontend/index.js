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




  function createLearnerCard(fullName, email, mentorNames) {
    const infoElement = document.querySelector('.info');
    const card = document.createElement('div');
    card.classList.add('card');
    // card.addEventListener('click', function () {
    //   card.classList.toggle('selected');
    //   if (card.classList.contains('selected')) {
    //     infoElement.textContent = `The Selected Learner is ${fullName}`;
    //   } else {
    //     infoElement.textContent = 'No Learner Selected';
    //   }
    // });


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
    mentorsElement.textContent = 'Mentors:';
    card.appendChild(mentorsElement);
    mentorsElement.style.cursor = 'pointer';

    // mentorsElement.addEventListener('click', (event) => {
    //   mentorsElement.classList.toggle('open');
    //   mentorsElement.classList.toggle('closed');
    //   event.stopPropagation();

    // });
    card.addEventListener('click', (evt) => {
      if (evt.target === mentorsElement) {
        mentorsElement.classList.toggle('open');
        mentorsElement.classList.toggle('closed');
      }
      const allCards = document.querySelectorAll('.card');

      // card.classList.toggle('selected');
      const mentorsList = document.createElement('ul');
      card.appendChild(mentorsList);

      mentorNames.forEach((mentorName) => {
        const mentorListItem = document.createElement('li');
        mentorListItem.textContent = mentorName;
        mentorsList.appendChild(mentorListItem);
      });

      // allCards.forEach((c) => {
      //   if (c !== card) {
      //     c.classList.remove('selected');
      //     nameElement.textContent = `${fullName}`
      //   } else if (c.classList.contains('selected')) {
      //     card.classList.remove('selected')
      //     nameElement.textContent = `${fullName}`
      //   } else {
      //     debugger
      //     nameElement.textContent = `${fullName}, ID ${this.id}`
      //     card.classList.add('selected')
      //   }
      // });
    })
    return card;
  }

  function renderLearnerCards(learners, mentors) {
    const matches = {};

    learners.forEach((learner) => {
      const { id, fullName, email, mentors: mentorIds } = learner;

      const mentorNames = mentorIds.map((mentorId) => {
        const matchingMentor = mentors.find((mentor) => mentor.id === mentorId);
        if (matchingMentor) {
          return `${matchingMentor.firstName} ${matchingMentor.lastName}`;
        } else {
          return 'Unknown Mentor';
        }
      });

      matches[id] = mentorNames;

      const card = createLearnerCard(fullName, email, mentorNames);
      const cardContainer = document.querySelector('.cards');
      cardContainer.appendChild(card);
    });

    return matches;
  }



}

// 👆 WORK WORK ABOVE THIS LINE 👆

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
