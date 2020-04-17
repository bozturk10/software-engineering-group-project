console.log("event.js is fetched");

var xhttp = new XMLHttpRequest();
  
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
    console.log("INFO LEVEL:   ", data);

    var row = document.createElement('div');

    data.forEach(function(event){

        var col = document.createElement('div');
        col.setAttribute('class', 'col-md-4');
        
            var card = document.createElement('div');
            card.setAttribute('class', 'card mb-4 box-shadow');

                var card_img = document.createElement('img');
                card_img.setAttribute('class', 'card-img-top');
                card_img.setAttribute('src', '');

                var card_body = document.createElement('div');
                card_body.setAttribute('class', 'card-body');

                    var p = document.createElement('p');
                    p.setAttribute('class', 'card-text');
                    p.innerText = event.title;

                card_body.appendChild(p);

            card.appendChild(card_img);
            card.appendChild(card_body);

        col.append(card);

        row.append(col);  


    })

    document.getElementById("events").appendChild(row);
  }
}

xhttp.open("GET", "/api/events", true)
xhttp.send()