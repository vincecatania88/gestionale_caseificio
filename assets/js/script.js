/* import { Articolo } from './modules/articolo.js'; // import del modulo di classe */

let articoloInArrivo = document.getElementById('articolo_in_arrivo');
let dataArrivoArticolo = document.getElementById('data_arrivo_articolo');

/* Tab Dati Articolo */
var nome = document.getElementById('nome');
var fornitore= document.getElementById('fornitore');
var codiceArticoloFornitore= document.getElementById('codiceArticoloFornitore');
var codiceArticolo=document.getElementById('codiceArticolo');
var dataRegistrazioneProdotto= document.getElementById('dataRegistrazioneProdotto');
var dataScadenzaProdotto= document.getElementById('dataScadenzaProdotto');
var codiceEanUpc= document.getElementById('codiceEanUpc');
var categoriaMerce= document.getElementById('categoriaMerce');
var sedeMagazzino= document.getElementById('sedeMagazzino');
var ubicazioneMagazzino=document.getElementById('ubicazioneMagazzino');
var espressionePeso=document.getElementById('espressionePeso');
var marca= document.getElementById('marca');
var peso= document.getElementById('peso');
var esporta= document.getElementById('esporta');
var comments= document.getElementById('comments');
var btnCopia=document.getElementById('copia');
/* ////Tab Dati Articolo\\\\ */

/* Tab giacenza */
var giacenza=document.getElementById('giacenza');
var scortaMinima=document.getElementById('scortaMinima');
var quantitativoMinimoOrdinabile=document.getElementById('quantitativoMinimoOrdinabile');
var quantitativoPerOgniCollo=document.getElementById('quantitativoPerOgniCollo');
/* /////Tab giacenza \\\\*/

var btnSalva=document.getElementById('salva_con_nome');
let validazioneCampi=document.getElementById('validazione_campi');
let salva=document.getElementById('salva');
const myModalEl = document.getElementById('myModal');
var lista=[];
validazioneCampi.innerHTML='';
window.addEventListener('load',init);

/* Se, all'avvio, il localstorage contiene oggetti, li stampo in tabella */
function init(){
    if(localStorage.getItem('myForm')!==null){
        lista=JSON.parse(localStorage.getItem('myForm'));
        stampaLista();
    }  
}

/* Abilito il campa date se la checkbox è selezionata */
articoloInArrivo.addEventListener('change', ()=>{
    if(articoloInArrivo.checked){
        dataArrivoArticolo.disabled = false;
    }else{
        dataArrivoArticolo.disabled = true;
    }
})
/* Copio l'articolo da codice articolo fornitore a codice articolo */
btnCopia.addEventListener('click', ()=>{
    if(codiceArticoloFornitore.value===0 || !isNaN(codiceArticoloFornitore.value)){
        alert('Non c\'è nulla da copiare quì !') 
    }else{
        codiceArticolo.value = codiceArticoloFornitore.value;
        codiceArticoloFornitore.value=""; 
    }
    
})
 
function salvaInStorage(){
    /* articolo=new Articolo(nome.value, fornitore.value, codiceArticoloFornitore.value, dataRegistrazioneProdotto.value, dataScadenzaProdotto.value, codiceEanUpc.value,categoriaMerce.value, sedeMagazzino.value,ubicazioneMagazzino.value, marca.value, espressionePeso.value, peso.value, esporta.checked, giacenza.value, scortaMinima.value, quantitivoMinimoOrdinabile.value, quantitativoPerOgniCollo.value, comments.value ); */
    lista.push({
        nome: nome.value,
        fornitore : fornitore.value,
        codiceArticoloFornitore : codiceArticoloFornitore.value,
        codiceArticolo: codiceArticolo.value,
        dataRegistrazioneProdotto : dataRegistrazioneProdotto.value,
        dataScadenzaProdotto : dataScadenzaProdotto.value,
        codiceEanUpc : codiceEanUpc.value,
        categoriaMerce : categoriaMerce.value,
        sedeMagazzino : sedeMagazzino.value,
        ubicazioneMagazzino: ubicazioneMagazzino.value,
        marca: marca.value,
        espressionePeso: espressionePeso.value,
        peso: peso.value,
        scortaMinima: scortaMinima.value,
        esporta: esporta.checked,
        comments: comments.value,
        giacenza: giacenza.value,
        quantitativoMinimoOrdinabile: quantitativoMinimoOrdinabile.value,
        quantitativoPerOgniCollo: quantitativoPerOgniCollo.value

    })
    validazioneCampi.innerHTML='';
    localStorage.setItem('myForm', JSON.stringify(lista));
    /* madeAlert("Dati inviati correttamente", 'success'); */
    stampaLista();
    alert('Dati inviati correttamente!!')
    
}  

function stampaLista(){
    let listaTxt=document.getElementById('lista');
    let lista_due_txt=document.getElementById('lista_due');
    let elenco='';
    let elenco_due=''
    lista.forEach(el=>{
        elenco+=`<tr class="align-bottom"><td>${el.nome}</td><td>${el.fornitore}</td><td>${el.
            codiceArticoloFornitore}</td><td>${el.codiceArticolo}</td>
            <td>${el.dataRegistrazioneProdotto}</td><td>${el.dataScadenzaProdotto}</td><td>${el.codiceEanUpc}</td><td>${el.categoriaMerce}</td><td>${el.sedeMagazzino}</tr>`;
    });

    lista.forEach(el=>{
        elenco_due+=`<tr></td>
        <td>${el.ubicazioneMagazzino}</td><td>${el.marca}</td><td>${el.espressionePeso}</td>
        <td>${el.peso}</td><td>${el.giacenza}</td><td>${el.scortaMinima}</td><td>${el.quantitativoMinimoOrdinabile}</td><td>${el.quantitativoPerOgniCollo}</td><td>${el.comments}</td></tr>`
    })

    listaTxt.innerHTML=elenco;
    lista_due_txt.innerHTML=elenco_due;

}

/* madeAlert=(message,type)=>{
    const alertPlaceholder=document.getElementById('alertPlaceholder');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
      
    alertPlaceholder.append(wrapper);
     
      
} */
      

(()=>{
  'use strict'
  
    const forms=document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form=>{
        form.addEventListener('submit', (event)=>{
            if (!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
                validazioneCampi.innerHTML='I campi contrassegnati in rosso, sono richiesti!';
            }else{
           salvaInStorage();
                
         }
            form.classList.add('was-validated');
        },false);
    }); 
     
})()

//INSERITO DA PEPPE PER FUNZIONALITA FINESTRA DI STAMPA
//variabili che definiscono i dati dell'articolo
const DATI_ARTICOLO = {
    nome: "",
    fornitore: "",
    codiceArtcoloFornitore: null,
    dataRegistrazioneProdotto: "",
    dataScadenzaProdotto: "",
    codiceArticolo: null,
    codiceEANUPC: null,
    categoriaMerce: "",
    sedeMagazzino: "",
    ubicazioneMagazzino: "",
    marca: "",
    pesoInGrammi: null,
  };

  //MAPPATURA NOMI PERSONALIZZATI DA MANDARE A SCHERMO
const NOMI_PERSONALIZZATI = {
    nome: "NOME",
    fornitore: "FORNITORE",
    codiceArtcoloFornitore: "CODICE ARTICOLO FORNITORE",
    dataRegistrazioneProdotto: "DATA REGISTRAZIONE PRODOTTO",
    dataScadenzaProdotto: "DATA SCADENZA ",
    codiceArticolo: "CODICE ARTICOLO",
    codiceEANUPC: "CODICE EANUPC",
    categoriaMerce: "CATEGORIA MERCE",
    sedeMagazzino: "SEDE MAGAZZINO",
    ubicazioneMagazzino: "UBICAZIONE MAGAZZINO",
    marca: "MARCA",
    pesoInGrammi: "PESO IN GRAMMI",
  };

  let bnt = document.getElementById("stampa");
  bnt.addEventListener("click", () => {
    //aggiunta overlay al body
    let overlay = document.createElement("div");
    overlay.classList.add("overlay-body");
    document.body.insertAdjacentElement("afterbegin", overlay);
    // Disabilita lo scroll della pagina
    document.body.style.overflow = "hidden";
    
    
 //creazione della finestra di stampa
let finestraDiStampa = document.createElement("div");
document.body.appendChild(finestraDiStampa);
finestraDiStampa.classList.add("popup_di_stampa");
let titoloPopupStampa = document.createElement("h4");
titoloPopupStampa.textContent = "DETTAGLI ETICHETTA";
finestraDiStampa.appendChild(titoloPopupStampa);
titoloPopupStampa.classList.add("etichetta");

DATI_ARTICOLO.nome = nome.value;
DATI_ARTICOLO.fornitore = fornitore.value;
DATI_ARTICOLO.codiceArtcoloFornitore = codiceArticoloFornitore.value;
DATI_ARTICOLO.dataRegistrazioneProdotto = dataRegistrazioneProdotto.value;
DATI_ARTICOLO.dataScadenzaProdotto = dataScadenzaProdotto.value;
DATI_ARTICOLO.codiceArticolo = codiceArticolo.value;
DATI_ARTICOLO.codiceEANUPC = codiceEanUpc.value;
DATI_ARTICOLO.categoriaMerce = categoriaMerce.value;
DATI_ARTICOLO.sedeMagazzino = sedeMagazzino.value;
DATI_ARTICOLO.ubicazioneMagazzino = ubicazioneMagazzino.value;
DATI_ARTICOLO.marca = marca.value;
DATI_ARTICOLO.pesoInGrammi = peso.value;

for (let nome in NOMI_PERSONALIZZATI) {
    let contenitoreEtichetta = document.createElement("div");
    contenitoreEtichetta.classList.add("contenitore-etichetta");
    finestraDiStampa.appendChild(contenitoreEtichetta);
    let checkboxPopupStampa = document.createElement("input");
    checkboxPopupStampa.type = "checkbox";
    checkboxPopupStampa.name = nome;
    contenitoreEtichetta.appendChild(checkboxPopupStampa);
    checkboxPopupStampa.classList.add("checkbox-etichetta");

    let nomePersonalizzato = NOMI_PERSONALIZZATI[nome];
    let datoDaStampare = document.createElement("label");
    datoDaStampare.style.marginLeft = "5px";
    datoDaStampare.textContent = nomePersonalizzato;
    contenitoreEtichetta.appendChild(datoDaStampare);
  }
  let contenitoreAzioniEtichetta = document.createElement("div");
  contenitoreAzioniEtichetta.classList.add("contenitore-cta-etichetta");
  finestraDiStampa.appendChild(contenitoreAzioniEtichetta);

  //creazione bottoni per l'etichetta di stampa
  let btnStampa = document.createElement("button");
  btnStampa.classList.add("btn", "btn-success");
  btnStampa.textContent = "STAMPA ETICHETTA";
  contenitoreAzioniEtichetta.appendChild(btnStampa);

  let btnAnnullaStampaEtichetta = document.createElement("button");
  btnAnnullaStampaEtichetta.classList.add("btn", "btn-secondary");
  btnAnnullaStampaEtichetta.textContent = "ANNULLA ETICHETTA";
  contenitoreAzioniEtichetta.appendChild(btnAnnullaStampaEtichetta);

  //funzione annulla etichetta stampa
  btnAnnullaStampaEtichetta.addEventListener("click", () => {
    overlay.classList.remove("overlay-body");
    document.body.style.overflow = "auto";
    finestraDiStampa.remove();
  });

  //funzione di stampa dell'etichetta
    btnStampa.addEventListener("click", () => {
    let checkboxs = document.getElementsByClassName("checkbox-etichetta");
    let contenioreValoriEtichettaDaStampare = document.createElement('div');
  
    for (let i = 0; i < checkboxs.length; i++) {
      if (checkboxs[i].checked) {
        console.log(
          `${checkboxs[i].name}: ${DATI_ARTICOLO[checkboxs[i].name]}`
        );
        
        let nomeSuEtichetta = document.createElement('p');
        let valoreSuEtichetta = document.createElement('p');
        nomeSuEtichetta.textContent = `${NOMI_PERSONALIZZATI[checkboxs[i].name]}:`;
        valoreSuEtichetta.textContent =` ${DATI_ARTICOLO[checkboxs[i].name]}`;
        contenioreValoriEtichettaDaStampare.appendChild(nomeSuEtichetta);
        contenioreValoriEtichettaDaStampare.appendChild(valoreSuEtichetta);
        contenioreValoriEtichettaDaStampare.classList.add('etichetta-da-stampare')
      }
    }
    
    document.body.appendChild(contenioreValoriEtichettaDaStampare);
    
    // Nascondi gli altri elementi della pagina
    let elementiDaNascondere = document.querySelectorAll('body > *:not(.etichetta-da-stampare)');
    elementiDaNascondere.forEach(function(elemento) {
      elemento.style.display = 'none';
    });
  
    // Stampa l'etichetta
    window.print();
  
    // Ripristina la visualizzazione degli elementi nascosti e rimuovi l'etichetta
    elementiDaNascondere.forEach(function(elemento) {
      elemento.style.display = '';
    });
    contenioreValoriEtichettaDaStampare.remove();
  });
  
});   
