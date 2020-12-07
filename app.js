// niz objekata koji predstavljaju oblast i ponudjene rijeci
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
      "csharp",
      "kotlin"
    ]
  }
];

let odgovor = ""; // rijec koju treba pogoditi
let brGresaka = 0; // do sad napravljeno gresaka
let maksBrGresaka = 6; // maksimalan broj dozvoljenih pokusaja
let pokusanaSlova = []; // slova koja su do sad pokusana
let trenutnaRijec = null; // rijec sastavljena od pogodjenih slova i od karaktera "_" za ona koja nisu poznata

// iz niza biramo nasumican pojam koji treba pogoditi
function nasumicanOdgovor(){
  // Math.random() vraca broj n koji je 0 <= n < 1
  // prvo biramo nasumicno oblast
  let oblast = pitanja[Math.floor( Math.random() * pitanja.length)];
  // onda biramo nasumicno pojam iz oblasti
  odgovor = oblast.ponudjeno[Math.floor( Math.random() * oblast.ponudjeno.length)];
  // popunjavamo paragraf nazivom oblasti
  document.getElementById('oblastNaziv').innerHTML = oblast.oblast;
  // kad sve zavrsimo, pozivamo metod koji od rijeci pravi string sa donjim crtama 
  zadajTrazenuRijec();
}

// metod koji za svako slovo zadate rijeci dodijeljuje po jednu donju crtu
function zadajTrazenuRijec(){
  let rijecTemp = "";
  for(let i = 0; i < odgovor.length; i++){
    rijecTemp += "_";
  }
  // prikazujemo zadatu rijec na ekranu
  document.getElementById('trazenaRijec').innerHTML = rijecTemp;
}

// generisemo dugmad za izbor slova
function generisiDugmad(){
  let abeceda = ['a','b','c','č','ć','d','dž','đ','e','f','g','h','i','j','k','l','lj','m','n','nj','o','p','r','s','š','t','u','v','z','ž'];
  let dugmadHTML = [];
  // u niz dodajemo po dugme za svako slovo koje ima jedninstven id i metod koji se poziva na klik
  abeceda.forEach( slovo => {
    dugmadHTML.push(
      `<button id="${slovo}" class="btn btn-lg m-2 btn-primary" onClick="pokusajSlovo('${slovo}')" > ${slovo} </button>`
    );
  });
  // prikazujemo svu dugmad na ekranu
  document.getElementById('tastatura').innerHTML = dugmadHTML.join('');
}

// metod koji se poziva kad igrac klikne neko slovo
function pokusajSlovo(odabranoSlovo){
  // smjesti slovo u niz pokusanih
  pokusanaSlova.push(odabranoSlovo);
  // postavi dugme na disabled da se ne bi moglo opet kliknuti
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

// metod koji rijesava situaciju kad je slovo pogodjeno
function pogodjenoSlovo(){
  trenutnaRijec = ""; // postavljam trenutnu rijec na prazan string
  let odgovorTemp = odgovor.split(''); // niz svih slova stringa odgovor

  // za svako slovo rijeci koju treba pogoditi, provjerimo je li ga korisnik vec pokusao
  odgovorTemp.forEach(slovo => {
    // ako jeste, prikazujemo na ekranu
    if(pokusanaSlova.indexOf(slovo) >= 0) trenutnaRijec += slovo;
    // ako nije, umjesto tog slova prikazujemo donju crtu
    else trenutnaRijec += "_";
  });
  // tako nastalu rijec prikazujemo na ekranu
  document.getElementById('trazenaRijec').innerHTML = trenutnaRijec;
}

// provjeravamo da li je korisnik pobijedio
function provjeriPobjedu(){
  if(trenutnaRijec === odgovor){
    document.getElementById('tastatura').innerHTML = "<h2>BRAVO!!! Pobijedili ste.<h2>";
  }
}

// azuriramo broj pogresnih pokusaja na ekranu
function azurirajGreske(){
  document.getElementById('brGresaka').innerHTML = brGresaka;
}

// provjeravamo da li je korisnik izgubio
function provjeriPoraz(){
  if(brGresaka === maksBrGresaka){
    document.getElementById('trazenaRijec').innerHTML = `Tacan odogovor je: <b>${ odgovor }</b>`;
    document.getElementById('tastatura').innerHTML = `Izgubio si!!!`;
  }
}

// azuriramo sliku vjesala
function azurirajSliku(){
  document.getElementById('vjesalaSlika').src = './img/'+brGresaka+'.png';
}

// metod koji se poziva na klik za ponovni pocetak igre
function reset(){

  // mozemo reload-ovati ekran
  // location.reload();

  // ili mozemo postaviti igricu na pocetno stanje
  brGresaka = 0;
  pokusanaSlova = [];
  document.getElementById('vjesalaSlika').src = './img/0.png';

  nasumicanOdgovor();
  azurirajGreske();
}

// kad se ucita stranica, pozovi metode za generisanje odgovora i prikaz tastature
nasumicanOdgovor();
generisiDugmad();


