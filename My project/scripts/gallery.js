const accessKey = 'DvHmw2aOozeOlN2qEr323JJk_aMM0F8K5rGhzR-6sRs';
const galleryGrid = document.getElementById('gallery-grid');
const loadMoreBtn = document.getElementById('load-more-btn');

const keywords = [
    "Maco Philippines travel",
    "Maco Philippines culture",
    "Maco Philippines food",
    "Maco Philippines beach",
    "Maco Philippines people",
    "Maco Philippines festivals",
    "Maco Philippines town",
    "Maco Philippines landscape",
    "Maco Philippines nature",
    "Maco Davao de Oro"
];


const query = keywords[Math.floor(Math.random() * keywords.length)];

let page = 1;
const perPage = 12;

function fetchImages() {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading...';

    fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&client_id=${accessKey}`)
        .then(res => res.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                loadMoreBtn.textContent = "No More Images";
                loadMoreBtn.disabled = true;
                return;
            }

            data.results.forEach(photo => {
                const wrapper = document.createElement('div');
                wrapper.classList.add('image-wrapper');

                const loader = document.createElement('div');
                loader.classList.add('loader');
                wrapper.appendChild(loader);

                const img = document.createElement('img');
                img.src = photo.urls.regular;
                img.alt = photo.alt_description || 'Maco';
                img.classList.add('gallery-image');
                img.style.display = 'none';

                img.addEventListener('load', () => {
                    loader.remove();
                    img.style.display = 'block';
                });

                img.addEventListener('error', () => {
                    loader.remove();
                    const errorText = document.createElement('p');
                    errorText.textContent = "Image failed to load.";
                    errorText.style.color = "#999";
                    wrapper.appendChild(errorText);
                });

                img.addEventListener('mouseover', () => img.style.transform = 'scale(1.05)');
                img.addEventListener('mouseout', () => img.style.transform = 'scale(1)');

                wrapper.appendChild(img);
                galleryGrid.appendChild(wrapper);
            });

            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More';
            page++;
        })
        .catch(err => {
            console.error('Error fetching images:', err);
            loadMoreBtn.textContent = "Error Loading";
        });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchImages();
    loadMoreBtn.addEventListener('click', fetchImages);
});
