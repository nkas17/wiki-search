
/**
 * set up the event handlers on load of the window
 */
window.onload = function () {
	// click event listener for random article
	const randomElement = document.getElementById('random');
	randomElement.addEventListener('click', function (e) {
		e.preventDefault();
		window.open('https://en.wikipedia.org/wiki/Special:Random');
	});

	// click event listener for search submit
	const submitSearch = document.getElementById('submit-search');
	submitSearch.addEventListener('click', function (e) {

		clearSearchResults();

		const loader = document.getElementById('loader');
		loader.style.display = "block";

		const searchByVal = document.getElementById('search-by').value;
		if (!searchByVal) return;

		const searchResults = document.getElementById('search-results');
		searchResults.style.display = 'block';
		searchResults.style.margin = '1rem 1rem 0 1rem';

		getWikiData(searchByVal);
	});

	document.getElementById('clear-search').addEventListener('click', clearSearch);
};

/**
 * clear the search results
 */
const clearSearchResults = function () {
	const searchResults = document.getElementById('search-results');
	searchResults.style.display = 'none';
	searchResults.style.margin = '0 1rem';

	const searchResultArray = document.querySelectorAll('.search-result');
	searchResultArray.forEach(element => element.remove());
};

/**
 * clear the search by text box
 */
const clearSearchBy = function () {
	const searchBy = document.getElementById("search-by");
	searchBy.value = "";
};

/**
 * clear all - search by text box and search results
 */
const clearSearch = function () {
	clearSearchBy();
	clearSearchResults();
};

/**
 * display the search results 
 */
const displayResults = function (data) {
	console.log(data);
	const searchResults = document.getElementById('search-results');
	data.query.search.forEach(item => {
		// set html
		searchResults.innerHTML = `${searchResults.innerHTML}<a class="search-result" target="_blank" href="https://en.wikipedia.org/wiki/${item.title}" ><div class="result result-${item.pageid}"><p>${item.title}</p>
		 <p>${item.snippet}...</p></div></a>`;

		const loader = document.getElementById('loader');
		loader.style.display = "none";
	});
};

/** 
 * get the search results from the wikipedia search api
 */
function getWikiData(searchBy) {
	// $.ajax({
	// 	url: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchBy}&format=json`,
	// 	data: {
	// 		origin: "*"
	// 	},
	// 	success: data => displayResults(data),
	// 	cache: false
	// });

	httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	httpRequest.onreadystatechange = () => {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			if (httpRequest.status === 200) {
				console.log('vanilla ajax success');
				displayResults(httpRequest.response);
			} else {
				alert('There was a problem with the request.');
			}
		}
	};

	httpRequest.open('GET', `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchBy}&format=json&origin=*`);
	httpRequest.responseType = "json";
	httpRequest.send();
}
