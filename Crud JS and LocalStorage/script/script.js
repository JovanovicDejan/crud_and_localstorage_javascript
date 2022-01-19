//Kada se ucita stranica pokrece se js
window.addEventListener('load', init);

//pravimo globalne promenjive
var tajmer = 0;
var interval;
var filmovi_niz
var div_za_filmove;
var rez;
var racun_greska = document.getElementById('racun_greska');
var za_racunanje = document.getElementById('za_racunanje')
var a = Math.floor(Math.random() * 11)
var b = Math.floor(Math.random() * 11)

//dohvatamo formu iz html-a
var forma = document.getElementById('forma')
var zadatak_tajmer = document.getElementById('zadatak_tajmer')


//pravimo niz filmova
var niz_filmova = [
    {
        'id':1,
        'naziv':'Taxi',
        'zanr':'Action',
        'reziser':'Franck Gastambide',
        'glavnaUloga':'Sami Naseri',
        'imdb':7.0,
        'godina':1998
    },
    {
        'id':2,
         'naziv':'Transporter',
         'zanr':'Action',
         'reziser':'Olivier Megaton',
         'glavnaUloga':'Jason Statham',
         'imdb':6.7,
         'godina':1998
    },
    {
        'id':3,
        'naziv':'The Judge',
        'zanr':'Drama',
        'reziser':'David Dobkin',
        'glavnaUloga':'Robert Dauni',
        'imdb':7.4,
        'godina':2014   
    }
]

function init()
{
    //Proveravamo da li sve radi kako treba
    console.log('Skripta je ucitana');

    //Kupimo sve vrednost iz localstorage-a
    filmovi_niz = JSON.parse(localStorage.getItem('filmovi'))

    //Ako je null 
    if(filmovi_niz == null)
    {
        //Za vrednosti filmova, postavljamo sve iz niza koji smo napravili
        filmovi_niz = niz_filmova
    }
    //U local storage smestano sve iz niza filmova
    localStorage.setItem('filmovi', JSON.stringify(filmovi_niz));
    //Dohvatamo element sa id-em filmovi
    div_za_filmove = document.getElementById('filmovi')
    //Trenutno ga postavljamo na prazan string
    div_za_filmove.innerHTML = ""
    napravi_tabelu(filmovi_niz);
    forma = document.getElementById('forma')
    forma.addEventListener('submit', proveri_film);
    za_racunanje.addEventListener('submit', za_proveru)
    
    zadatak_tajmer.className = "sakriji"

}

function za_proveru_filmova()
{
    var id = document.getElementById('id').value;
    var naziv = document.getElementById('naziv').value;
    var zanr = document.getElementById('zanr').value;
    var reziser = document.getElementById('reziser').value;
    var glavnaUloga = document.getElementById('glavnaUloga').value;
    var imdb = document.getElementById('imdb').value;
    var godina = document.getElementById('godina').value;
    console.log(id,naziv,zanr,reziser,glavnaUloga,imdb,godina);

    //Uzimamo sve vrednosti iz localstorage-a
    niz_filmova = JSON.parse(localStorage.getItem('filmovi'))
    //prolazimo kroz duzinu niza
    for(var i=0; i<niz_filmova.length; i++)
    {
        //proveravamo id
        if(niz_filmova[i].id == id)
        {
            //Ako ID vec postoji vracamo gresku za ID
            var id_error = document.getElementById('id_error')
            id_error.innerText = "ID vec postoji"
            return false;
        }
    }

    //Proveravamo da li je naziv duzi od 2 karaktera
    if(naziv.length < 3)
    {
        //Ako nije vracamo error
        var naziv_error = document.getElementById('naziv_error')
        naziv_error.innerText ="Naziv mora sadrzati vise od 2 karaktera"
        return false;
    }


    //Pravimo tip zanrova
    var tipovi_zanrova = ['akcija','drama','triler','komedija']
    

    //Kupimo promenjivu sa ID-em iz html-a

    //Transforimsemo vrednost koju je korisnik uneo u lowercase da bi lakse poredili
    zanr = zanr.toLowerCase()
    var zanr_error = document.getElementById('zanr_error')
    if(zanr != tipovi_zanrova[0] && zanr != tipovi_zanrova[1] && zanr != tipovi_zanrova[2] && zanr != tipovi_zanrova[3])
    {
        //Ako se razlikuje od bilo kog tipa vracamo gresku
        zanr_error.innerText = "Mora biti akcija drama triler ili komedija";
        return false;
    }

    //Proveravamo da li se space nalazi u reziseru i glavnoj ulozi
    if(reziser.indexOf(' ') <=0 || glavnaUloga.indexOf(' ') <= 0 )
    {
        //Vracamo gresku ako ne sadri space
        var space_error = document.getElementById('space_error_reziser');
        var space_error_glavna = document.getElementById('space_error_glavna');
        space_error.innerText = "Mora sadrzati razmak";
        space_error_glavna.innerText  = "Mora sadrzati razmak";
        return false;
    }

    //Proveravamo da li je opseg imdb-a od 1 do 10
    if(imdb < 1 || imdb > 10)
    {
        //Ako nije u opsegu vracamo gresku
        var imdb_error = document.getElementById('imdb_error')
        imdb_error.innerText = "IMDB mora biti izmedju 1 i 10"
        return false;
    }

    //Proveravamo godinu da li je preko 2022
    if(godina > 2022)
    {
        //Ako jeste vracamo gresku
        var godina_error = document.getElementById('godina_error')
        godina_error.innerText = "Godina ne moze biti veca od 2022"
        return false;
    }
    return true
}


function proveri_film(e)
{
    //Sprecavamo ponasanje forme kao GET metod
    e.preventDefault();
    console.log('Iz proveri film');

    var nesto = za_proveru_filmova()
    console.log("OVDE PISE NESTO",nesto)
    if(nesto == false)
    {
        zadatak_tajmer.className = "sakriji"
        console.log("DESILA SE GRESKA");
        return false
    }
    za_proveru_filmova();
    zadatak_tajmer.className = "prikazi"
    console.log("VREDNOST ZA PROVERU" ,za_proveru_filmova())

    //Kada se submituje forma dodeljuje se klasa koja prikazuje skrivnu formu
    //Dohvatamo elemente sa stranice u koje cemo upisivati random vrednosti od 1 do 10
    var za_a = document.getElementById('za_a')
    var za_b = document.getElementById('za_b')
    //Pravimo random vrednosti od 1 do 10
    //Pravimo niz znakova koje cemo dobiti preko random funkcije
    var znak = ["+","-","*","/"];
    var za_znak = document.getElementById('znak');
    //Pravimo random znak preko random funckije
    var random_znak = Math.floor(Math.random() * znak.length);
    // console.log(znak.length)
    // console.log(random_znak)
    var znak_operacije

    //Sa if-om proveravamo koji je random znak i taj znak cuvamo u promenjivu znak operacije
    //Ujedno vrsimo matematicke operacije preko funkcija koje su napravljenje
    if(random_znak == 0)    
    {
        rez = sabiranje(a,b)
        znak_operacije = "+"
    }
    else if(random_znak == 1)
    {
        rez = oduzimanje(a,b)
        znak_operacije = "-"
    }
    else if(random_znak == 2)
    {
        rez = mnozenje(a,b)
        znak_operacije = "*"
    }
    else{
        rez = deljenje(a,b)
        znak_operacije = "/"
    }
    
    //Upisujemo vrednost iz a na stranici
    za_a.innerText = a;
    //Upisjemo znak na stranicu
    za_znak.innerText = znak_operacije;
    //Upisujemo vrednosti iz b na stranicu
    za_b.innerText = b;
    console.log(korisnikov_racun)
    console.log(rez)
    racun_greska.innerText = "";
    console.log("Korisnikov racun",korisnikov_racun)
    console.log("rezultat", rez);

    interval = setInterval(otkucaj,1000)
    console.log()
}

function ugasi_vreme()
{
    clearInterval(interval);
}
function za_proveru(e)
{
    e.preventDefault();
    var korisnikov_racun = document.getElementById('korisnikov_racun').value;
    if(korisnikov_racun != rez)
    {
        racun_greska.innerText = "Pogresan odgovor"
    }
    else if(za_proveru_filmova() == false)
    {
        console.log("Greska se desila za proveru")
    }
    else{
        napravi_film();
    }
}



function napravi_film()
{
    var id = document.getElementById('id').value;
    var naziv = document.getElementById('naziv').value;
    var zanr = document.getElementById('zanr').value;
    var reziser = document.getElementById('reziser').value;
    var glavnaUloga = document.getElementById('glavnaUloga').value;
    var imdb = document.getElementById('imdb').value;
    var godina = document.getElementById('godina').value;

    //pravimo kolekciju filmova sa vrednostima koje smo pokupili iz forme
    var novi_film = {
        'id':id,
        'naziv':naziv,
        'zanr':zanr,
        'reziser':reziser,
        'glavnaUloga':glavnaUloga,
        'imdb':imdb,
        'godina':godina
    }
    console.log("Ovde je film koji smo napravili" ,novi_film);

    //Dodajemo novi film koji smo napravili u niz filmova
    niz_filmova.push(novi_film)
    console.log('Svi filmovi ', niz_filmova)
    //Pravimo tabelu za upis novog filma
    var tabela_za_upis = document.getElementById('tabela')
    console.log(tabela_za_upis);

    //Dodajemo red za novi film
    var dodaj_red = document.createElement('tr')

    //pravimo niz vrednsti filma da bi znali koliko td-a da napravimo
    var dodaj_vrednosti = [id,naziv,zanr,reziser,glavnaUloga,imdb,godina]
    for(var i=0; i<dodaj_vrednosti.length; i++)
    {
        //pravimo td
        var td_za_upis = document.createElement('td');
        //U svaki td upisjemo vrednost 
        td_za_upis.innerText = dodaj_vrednosti[i]
        //dodeljujemo className
        td_za_upis.className = "napravi_border"
        //Dodajemo td u red
        dodaj_red.appendChild(td_za_upis)
    }

    //Nako for petlje dodjamo ceo red u tabelu 
    tabela_za_upis.append(dodaj_red)
    //Vrednosti smestamo u LocalStorage
    localStorage.setItem('filmovi', JSON.stringify(niz_filmova));
    ugasi_vreme();
    tajmer = 0;
}


//Pravimo funkcije za matematicke operacije
function sabiranje(a,b)
{
    return a+b
}
function oduzimanje(a,b)
{
    return a-b
}
function mnozenje(a,b)
{
    return a * b
}
function deljenje(a,b)
{
    return parseInt(a/b);
}

//Pravljenje tabele
function napravi_tabelu(filmovi_niz)
{
    console.log('Napravi tabelu test');
    //pravimo element tipa table
    var tabela = document.createElement('table')
    //dodeljujemo id 
    tabela.id = "tabela"
    //pravimo niz koji ce sadrzati nazive kolona
    var nazivi_kolona = ["ID","Naziv","Zanr","reziser","Glavna uloga", "IMDB", "godina"];
    //pravimo element tipa tr
    var napravi_tr = document.createElement('tr')
    //za svaku kolonu u nazivu kolona
    for (const kolone of nazivi_kolona) {
        //pravimo th
        var napravi_th = document.createElement('th')
        //svaki th upisujemo u kolonu
        napravi_th.innerText = kolone;
        napravi_th.className = "napravi_border";
        //na red dodajemo th
        napravi_tr.appendChild(napravi_th)
    }
    //u tabelu dodajemo tr
    tabela.appendChild(napravi_tr)
    console.log('Uspesno napravljen prvi red');

    //Uzimamo niz filmova i prolazimo kroz duzinu niza
    for(var i=0; i<filmovi_niz.length; i++)
    {
        //svaki put pravimo novi tr
        var novi_red = document.createElement('tr')
        //dodajemo id 
        novi_red.id = "novi_red"
        //pravimo vrednost za td koji ce biti iz filmovi niz-a
        var vrednosti_za_td = [filmovi_niz[i].id, filmovi_niz[i].naziv, filmovi_niz[i].zanr, filmovi_niz[i].reziser, filmovi_niz[i].glavnaUloga, filmovi_niz[i].imdb, filmovi_niz[i].godina]

        //za duzinu tih vrednosti
        for(var j=0; j<vrednosti_za_td.length; j++)
        {
            //pravimo novi td svaki put
            var novi_td = document.createElement('td')
            // dodjemo id
            novi_td.id = 'novi_td'
            // upisejmo vrednost od j
            novi_td.innerText = vrednosti_za_td[j]
            //dodajemo class name
            novi_td.className = "novi_td"
            //svaki td dodajemo na red
            novi_red.appendChild(novi_td)
        }
        novi_red.addEventListener('click', oboji_red)
        //sve to dodjaemo u tabelu
        tabela.appendChild(novi_red)
    }
    //kupimo id iz html-a 
    var tab = document.getElementById('filmovi');
    //upisujemo sve vrednosti preko appenchChild-a
    tab.appendChild(tabela)
}


//Kreiranje tajmera
function otkucaj()
{
    var brojac = document.getElementById('tajmer')
    brojac.innerText = tajmer;
    tajmer++;
    prikazi_vreme(tajmer);
    if(tajmer >= 11)
    {
        alert("Vreme je isteklo, stranica ce se restartovati")
        ugasi_vreme();
        window.location = 'index.html'
    }
    return tajmer;
}
function prikazi_vreme(tajmer)
{
    var sekunde = parseInt(tajmer % 3600 / 60)
    console.log(sekunde)
}

var za_oboji_red = 0;
function oboji_red(e){
    var meta = e.target;
    za_oboji_red++;
    if(za_oboji_red % 2 == 0)
    {
        meta.style.backgroundColor = "white"
    }
    else
    {
        meta.style.backgroundColor = "gray";
    }
}