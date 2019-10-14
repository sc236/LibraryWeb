
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
          createInnerHTML(data,renderDom);
        });
      });
}
    

function createInnerHTML(apidata,element){
  apidata.items.forEach(function(book){
    // console.log(`Book: ${book.volumeInfo.title}`);
    element.innerHTML+=`
      <div class="col-sm-12 col-md-6 col-lg-3 p-3 mb-5 mx-3 bg-light border red-border-hov" data-toggle="modal" data-target="#${book.id}" >
        <img class="d-block mx-auto" style="height: 10em;" src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="thumbnail" />
        <hr />
        <h6 class="text-center">${book.volumeInfo.title}</h6>
        <p class="text-center">Author: ${book.volumeInfo.authors[0]}</p>
        <span class="float-left"><i class="material-icons" style="color: rgb(248, 211, 0);">star</i> ${book.volumeInfo.averageRating!=undefined?book.volumeInfo.averageRating+"/5":"N/A"}</span>
        <span class="badge badge-danger badge-pill float-right">Pages: ${book.volumeInfo.pageCount!=undefined?book.volumeInfo.pageCount:"Unknown"}</span>
      </div>
        
      <div class="modal" id="${book.id}" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger">Check Out</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    `;
  });


}

  