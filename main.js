
async function getBookData(){
  const searchInput = document.getElementById('search').value;
  if(searchInput===""){
    alert('Please enter a search value..');
    return;
  }

  const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?`;
  const googleBooksApiKey = `AIzaSyDYQ1fCLq04fuQOeP24PiDYWYlydcuMBNU`;
  let renderDom = document.getElementById('render-dom');
  renderDom.innerHTML = "";

  await fetch(
    `${googleBooksApiUrl}key=${googleBooksApiKey}&q=${searchInput}`)
    .then(function(response) {
      response.json()
      .then(function(data) {
        data.items.forEach(function(book){
          console.log(`Book: ${book.volumeInfo.title}`);
          renderDom.innerHTML+=`

          <div class="col-sm-12 col-md-6 col-lg-4">
            <img class="d-block mx-auto" style="height: 10em;" src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="thumbnail" />
            <hr />
            <h6>${book.volumeInfo.title}</h6>
            <p>Author: ${book.volumeInfo.authors[0]}</p>
          </div>

          `;
        });
      });
  });




}
    
function testAlert(){
  alert('test');
}



  