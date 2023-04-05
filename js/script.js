import DoctorAPIService from "./doctor_api_service.js";
async function ok() {
  const request = new DoctorAPIService();
  const token = await request.getToken("poladikksp@gmail.com", "12345");
  console.log(token);

  const allCards = await request.qetAllCards(token);
  console.log(allCards);
}
ok();
const searchInput = document.getElementById('searchInput');
const list = document.querySelector('.visit-wrap');
const selectStatus = document.querySelector('.select-options');
const selectUrgency = document.querySelector('.select-urgency');
const visitCards = document.querySelectorAll('.visit-wrap .visit-card');
const moreBtn = document.querySelectorAll('.more-btn ');
const statusWrap = document.querySelectorAll('.status-wrap ');
const defaultStatus = 'Статус визита';
const defaultUrgency = 'Срочность визита';

const filters = {
  searchText: '',
  status: defaultStatus,
  urgency: defaultUrgency
};

searchInput.addEventListener('input', function () {
  filters.searchText = searchInput.value.toLowerCase().replace(/\s/g, '');
  applyFilters();
});

selectStatus.addEventListener('change', function () {
  filters.status = selectStatus.value;
  applyFilters();
});

selectUrgency.addEventListener('change', function () {
  filters.urgency = selectUrgency.value;
  applyFilters();
});

function applyFilters() {
  visitCards.forEach(function (card) {
    const cardStatus = card.querySelector('.visit-status').textContent.trim();
    const cardUrgency = card.querySelector('.visit-urgency').textContent.trim();
    const cardName = card.querySelector('p').textContent.toLowerCase().replace(/\s/g, '');

    const isNameMatch = cardName.includes(filters.searchText);

    const isStatusMatch = filters.status === defaultStatus || filters.status === '' || filters.status === cardStatus;


    const isUrgencyMatch = filters.urgency === defaultUrgency || filters.urgency === '' || filters.urgency === cardUrgency;

    if (isNameMatch && isStatusMatch && isUrgencyMatch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}