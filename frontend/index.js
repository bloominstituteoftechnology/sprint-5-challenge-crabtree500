/* eslint-disable no-inner-declarations */
async function sprintChallenge5() {
  // 👇 WORK WORK BELOW THIS LINE 👇

  // nodes of interest
  const info = document.querySelector('.info')
  const cardsContainer = document.querySelector('.cards')

  // existing code to set the year
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // data fetching
  try {
    let resLearners = await axios.get('/api/learners') // eslint-disable-line
    let resMentors = await axios.get('/api/mentors') // eslint-disable-line
    // formatting the data
    let formattedData = []
    resLearners.data.forEach(learner => {
      let cardData = {}
      // props on learner card
      cardData.id = learner.id
      cardData.fullName = learner.fullName
      cardData.email = learner.email
      cardData.mentors = []
      // populating the mentors array
      learner.mentors.forEach(mentorId => {
        let mentor = resMentors.data.find(m => m.id === mentorId)
        const mentorName = `${mentor.firstName} ${mentor.lastName}`
        cardData.mentors.push(mentorName)
      })
      // putting the finalized learner into the array
      formattedData.push(cardData)
    })

    // putting the cards in the DOM
    info.textContent = 'No learner is selected'
    formattedData.forEach(learner => {
      const card = cardComponent(learner)
      cardsContainer.appendChild(card)
    })

    function cardComponent(data) {
      // creating the elements
      const card = document.createElement('div')
      const name = document.createElement('h3')
      const email = document.createElement('div')
      const mentors = document.createElement('h4')
      const mentorsList = document.createElement('ul')

      // creating the hierarchy of elements
      card.appendChild(name)
      card.appendChild(email)
      card.appendChild(mentors)
      card.appendChild(mentorsList)

      // populating the list of mentors
      data.mentors.forEach(mentorName => {
        const li = document.createElement('li')
        li.textContent = mentorName
        mentorsList.appendChild(li)
      })

      // adding initial class names
      card.classList.add('card')
      mentors.classList.add('closed')

      // adding text content of the remaining elements
      name.textContent = data.fullName
      email.textContent = data.email
      mentors.textContent = 'Mentors'

      // helper functions
      function selectCard() {
        info.textContent = `The selected learner is ${data.fullName}`
        const cards = document.querySelectorAll('.card')
        cards.forEach(c => {
          const name = c.querySelector('h3')
          name.textContent = name.textContent.split(',')[0]
          c.classList.remove('selected')
        })
        card.classList.add('selected')
        name.textContent = `${data.fullName}, ID ${data.id}`
      }
      function deselectCard() {
        info.textContent = 'No learner is selected'
        card.classList.remove('selected')
        name.textContent = name.textContent.split(',')[0]
      }

      // adding the click event on the card
      card.addEventListener('click', evt => {
        const isSelected = card.classList.contains('selected')
        const isMentorsVisible = mentors.classList.contains('open')

        if (evt.target !== mentors) { // the straightforward case
          if (isSelected) deselectCard()
          else selectCard()
        } else if (evt.target === mentors) { // the involved case
          if (!isSelected) selectCard()
          if (isMentorsVisible) mentors.classList.replace('open', 'closed')
          else mentors.classList.replace('closed', 'open')
        }
      })
      return card
    }
  } catch (err) {
    // Axios/fetch always crash with a Network error in the tests
    // despite Mock Service Worker. TODO: investigate further
    info.textContent = 'Something went wrong'
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
