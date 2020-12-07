const pitanja = [
  {
    oblast: "Pogodite grad u Crnoj Gori",
    ponudjeno: [
      "podgorica",
      "budva",
      "bar",
      "kolašin",
      "danilovgrad",
      "tivat",
      "kotor"
    ]
  },
  {
    oblast: "Pogodite programski jezik",
    ponudjeno:[
      "javascript",
      "php",
      "python",
      "cpp",
      "csharp"
    ]
  }
];

let odgovor = "";
let brGresaka = 0;
let maksBrGresaka = 6;
let pogodjenaSlova = [];
let trenutnaRijec = null;

function nasumicanOdgovor(){
  // 0 <= n < 1
  let oblast = pitanja[Math.floor( Math.random() * pitanja.length)];
  odgovor = oblast.ponudjeno[Math.floor( Math.random() * oblast.ponudjeno.length)];
  document.getElementById('oblastNaziv').innerHTML = oblast.oblast;
  zadajTrazenuRijec();
}

function zadajTrazenuRijec(){
  let rijecTemp = "";
  for(let i = 0; i < odgovor.length; i++){
    rijecTemp += "_";
  }
  document.getElementById('trazenaRijec').innerHTML = rijecTemp;
}

function generisiDugmad(){
  let abeceda = ['a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj','m','n','nj','o','p','r','s','š','t','u','v','z','ž'];
  let dugmadHTML = [];
  abeceda.forEach( slovo => {
    dugmadHTML.push(
      `<button id="${slovo}" class="btn btn-lg m-2 btn-primary" onClick="pokusajSlovo('${slovo}')" > ${slovo} </button>`
    );
  });
  document.getElementById('tastatura').innerHTML = dugmadHTML.join('');
}

function pokusajSlovo(odabranoSlovo){
  pogodjenaSlova.push(odabranoSlovo);
  document.getElementById(odabranoSlovo).setAttribute('disabled', true);
  // ako je slovo pogodjeno
  if(odgovor.indexOf(odabranoSlovo) >= 0 ){
    pogodjenoSlovo();
    provjeriPobjedu();
  }else{
    brGresaka++;
    azurirajGreske();
    provjeriPoraz();
    azurirajSliku();
  }
}

function pogodjenoSlovo(){
  trenutnaRijec = "";
  let odgovorTemp = odgovor.split(''); // niz

  odgovorTemp.forEach(slovo => {
    if(pogodjenaSlova.indexOf(slovo) >= 0) trenutnaRijec += slovo;
    else trenutnaRijec += "_";
  });
  document.getElementById('trazenaRijec').innerHTML = trenutnaRijec;
}

function provjeriPobjedu(){
  if(trenutnaRijec === odgovor){
    document.getElementById('tastatura').innerHTML = "<h2>BRAVO!!! Pobijedili ste.<h2>";
  }
}

function azurirajGreske(){
  document.getElementById('brGresaka').innerHTML = brGresaka;
}

function provjeriPoraz(){
  if(brGresaka === maksBrGresaka){
    document.getElementById('trazenaRijec').innerHTML = `Tacan odogovor je: <b>${ odgovor }</b>`;
    document.getElementById('tastatura').innerHTML = `Izgubio si!!!`;
  }
}

function azurirajSliku(){
  document.getElementById('vjesalaSlika').src = './img/'+brGresaka+'.png';
}

function reset(){

  location.reload();

  /* brGresaka = 0;
  pogodjenaSlova = [];
  document.getElementById('vjesalaSlika').src = './img/0.png';

  nasumicanOdgovor();
  azurirajGreske(); */
}

nasumicanOdgovor();
generisiDugmad();


