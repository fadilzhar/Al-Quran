function getURL(e){
    const pageURL= window.location.search.substring(1);
    const urlVariable= pageURL.split('&');

    for(let i = 0; i < urlVariable.length; i++){
        const parameterName =urlVariable[i].split('=');
        if (parameterName [0] == e){
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');
//console.log(nomorsurat);


function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(response => response.json())
    .then(response => {
        //title surat
        const titleSurat = document.querySelector('#title-surat');
        titleSurat.textContent= `surat ${response.nama}`;
        
        // judul surat
        const judulSurat = document.querySelector('.judul-surat');
        const cardjudulSurat =`
        <strong> ${response.nama_latin}- ${response.nama} </strong>
        <p> Jumlah ayat: ${response.jumlah_ayat} <br> arti: ${response.arti} (Pembukaan) </p>
        <button class="btn btn-primary audio-button-play"> 
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
               <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
             </svg>
           Play 
       </button>
       <button class="btn btn-danger audio-button-pause hidden-button"> 
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/>
</svg>
       Stop
   </button>
       <audio id="audio-tag" src="${response.audio}"> </audio>`;
       judulSurat.innerHTML= cardjudulSurat;
        console.log(judulSurat);

// judul surat
// isi surat 

        const surat = response.ayat;
        let isiSurat = '';
        surat.forEach(s => {
            isiSurat+=`
            <div class="card mb-4 mt-4">
                        <div class="card-body">
                          <p> ${s.nomor}</p>
                          <h3 class="text-end"> ${s.ar} </h3>
                          <p> ${s.tr} </p>
                          <p> ${s.idn} </p>
                          </div>
                      </div>`

        });
        const cardIsiSurat = document.querySelector('.card-isi-surat');
        cardIsiSurat.innerHTML = isiSurat;

        //play & pause 
        const buttonPlay = document.querySelector('.audio-button-play');
        const buttonPause = document.querySelector('.audio-button-pause');
        const audioSurat = document.querySelector('#audio-tag');

        //play 
        buttonPlay.addEventListener('click', function(){
            audioSurat.play();
        })
        console.log(surat);
        
        //pause 
    buttonPlay.addEventListener('click',function(){
        audioSurat.pause();
    })


    });

    
}
getSurat();
