// code-block:  Get Story IDs Array
async function getNewsStoryIds(fetchedIds) {
  const newsUrl =
    'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';

  try {
    let response = await fetch(newsUrl);
    let newsIds = await response.json();
    fetchedIds(newsIds);
  } catch (error) {
    console.log('An error occurred while fetching data');
  }
}

// code-block:  Pull Story Details based on Id
async function getStoryDetails(url, fetchedDetails) {
  try {
    let response = await fetch(url);
    let storyDetails = await response.json();
    fetchedDetails(storyDetails);
  } catch (error) {
    console.log('An error occurred while fetching data');
  }
}

// code-block:  Template for Displaying Story Details
function displayNewsStories(storyDetails) {
  newsSection.insertAdjacentHTML(
    'beforeend',
    `
        <article class = "newsStory">
            <span class = "title">${storyDetails.title}</span>
            <span class = "url">${storyDetails.url}</span>
            <span class = "author">${storyDetails.by}</span>
            <span class = "time">${storyDetails.time}</span>
        </article>
        `
  );
}

// code-block:  Pull together details for ALL stories
function pullAllStoriesDetails(storyIdArr) {
  for (let i = 0; i < storyIdArr.length; i++) {
    let storiesUrl = `https://hacker-news.firebaseio.com/v0/item/${storyIdArr[i]}.json?print=pretty`;

    getStoryDetails(storiesUrl, function (details) {
      displayNewsStories(details);
    });
  }
}

// code-block:  HTML Section for adding display templates
const newsSection = document.getElementById('newsSection');

// code-block:  Calling functions
getNewsStoryIds(function (newsIds) {
  pullAllStoriesDetails(newsIds);
});
