const greetingCloseButton = document.querySelector('.greeting_closer');
const loader = document.querySelector('.loading_quotes');
const prevButton = document.querySelector('.prev_button');
const nextButton= document.querySelector('.next_button');
const quotesDisplayer = document.querySelector('.quotes');
const greetingShowerPortion = document.querySelector('.greeting_provider');
const meta_info_avail_page = document.querySelector('.we_have');
const meta_info_yo_in = document.querySelector('.you_in');
let quotesFetched = [];

// DUMMY COMMENTS //

// By Doing Set Time out get the info async way : 
setTimeout(() => {
    console.log("SET TIME OUT IS WRKING")
    fetchQuotesForUser();
} , 1000);
// 
console.log('SET TIME OUT IS TRIGGERED');

// [ ------------ SERVICE CALLS ---------------- ]
async function fetchQuotesForUser() {
    const quotes = await fetch('https://type.fit/api/quotes').then((response) => response.json());
    //console.log(quotes);// array 
    quotesFetched = [...quotes];
    meta_info_avail_page.textContent = 'We have : ' + quotesFetched.length;
    // Now start wrk : 
    displayQuote(quotesFetched[0] , 0); // showing the first quotes
}
// [ ---------------------------- ]

// [ ------------- NORMAL FUNCTION --------------- ]
function displayQuote(quoteToShow , index) {
    //We want to off the loader : 
    loader.style.display = 'none';
    
    // We want to make the quotesDisplayer to visible
    quotesDisplayer.style.display = 'unset';
    quotesDisplayer.textContent = quoteToShow.text;
    quotesDisplayer.setAttribute('showing_quotes_index' , index);

    //We have to update the meta ibnfo : 
    meta_info_yo_in.textContent = 'You in : ' + (index + 1) ;
}
// [ ---------------------------- ]

function prev() {
    // we want to check where is user : 
    const showingIndex = quotesDisplayer.getAttribute('showing_quotes_index');
    if(showingIndex > 0 ) {
        const newQuotes = quotesFetched[Number(showingIndex) - 1]; 
        displayQuote(newQuotes , Number(showingIndex) - 1);
    }
}

function next() {
    const showingIndex = quotesDisplayer.getAttribute('showing_quotes_index');
    if(showingIndex < quotesFetched.length - 1) {
        const newQuotes = quotesFetched[Number(showingIndex) + 1]; 
        displayQuote(newQuotes , Number(showingIndex) + 1);
    }
}

function greetinCloser() {
    greetingShowerPortion.style.display = 'none';
}

//Event Listeners Function: 
nextButton.addEventListener('click' , next , false);
prevButton.addEventListener('click' , prev , false);
greetingCloseButton.addEventListener('click', greetinCloser , false);
//Event Listerners End : 

