var searchInput = document.getElementById('search-input');

function submitSearch(keyword) {
    // submit search keyword and show the result...
}

searchInput.addEventListener('keypress', (ev) => {
    if (ev.code = 'Enter') {
        submitSearch(ev.target.value);
    }
})
