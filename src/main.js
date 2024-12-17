import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

let lightbox = new SimpleLightbox('.gallery a');
const form = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more');
const loadingMessage = document.getElementById('loading-message');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', event => {
  event.preventDefault();
  currentQuery = event.target.elements.query.value.trim();
  if (!currentQuery) {
    iziToast.error({ message: 'Please enter a search term.' });
    return;
  }
  resetSearch();
  fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', () => {
  currentPage += 1;
  fetchAndRenderImages(true);
});

function resetSearch() {
  currentPage = 1;
  totalHits = 0;
  clearGallery();
  loadMoreBtn.classList.add('hidden');
}

async function fetchAndRenderImages(isLoadMore = false) {
  loadingMessage.classList.remove('hidden');

  try {
    const images = await fetchImages(currentQuery, currentPage);

    if (images.length === 0 && !isLoadMore) {
      iziToast.warning({
        message: 'No images found. Please try a different query.',
      });
      loadMoreBtn.classList.add('hidden');
    } else {
      renderGallery(images);
      lightbox.refresh();
      totalHits += images.length;

      if (images.length < 15) {
        iziToast.info({ message: "You've reached the end of search results." });
        loadMoreBtn.classList.add('hidden');
      } else {
        loadMoreBtn.classList.remove('hidden');
      }

      if (isLoadMore) {
        smoothScroll();
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      message:
        'An error occurred while fetching images. Please try again later.',
    });
  } finally {
    loadingMessage.classList.add('hidden');
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
