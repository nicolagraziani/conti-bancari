// Classe account figlio
class Account {
    saldo: number;
    operazioni: object[] = [];

    constructor(_saldo: number) {
        this.saldo = _saldo;
    };

    public operazione(ammontare: number, tipo: string): void {
        if (ammontare <= 0 || isNaN(ammontare)) {                               // Faccio un controllo sui valori
            erroreI.innerHTML = "Inserisci un quantitativo valido";
            return;
        }
        erroreI.innerHTML = "";                                                 // Svuoto i campi di errore e di input
        sommaIn.value = "";
        if (tipo === "deposito") {
            this.saldo += ammontare;                                            // Aggiorno il valore del saldo
            let nuovaOperazione: object = {                                     // Inizializzo un oggetto operazione 
                tipo: "deposito",                                               // ??? Come li tipizzo?
                somma: ammontare
            };
            this.operazioni.push(nuovaOperazione);                              // Inserisco l'operazione nell'array operazioni
        } else if (tipo === "prelievo") {
            if (this.saldo < ammontare) {                                       // Controllo che ci siano abbastanza soldi
                erroreI.innerHTML = "Impossibile ritirare la somma richiesta";
                return;
            }
            this.saldo -= ammontare;                                            // Aggiorno il valore del saldo
            let nuovaOperazione: object = {                                     // Inizializzo un oggetto operazione
                tipo: "prelievo",
                somma: ammontare
            };
            this.operazioni.push(nuovaOperazione);                              // Inserisco l'operazione nell'array operazioni
        };
        (<HTMLElement>document.getElementById("saldoAttuale")).innerHTML =      // Aggiorno il saldo disponibile
            this.saldo.toString();
        this.stampaOperazioni();
    };

    public stampaOperazioni(): void {
        elencoOperazioni.innerHTML = "";
        for (let i: number = 0; i < this.operazioni.length; i++) {
            elencoOperazioni.innerHTML += `<li>${(i + 1)}. ${this.operazioni[i].tipo}: ${this.operazioni[i].somma}€</li>`;
        }
    };
};

// Inizializzo gli elementi HTML
let prelievoBtn = document.getElementById("prelievoBtn")! as HTMLButtonElement;
let depositoBtn = document.getElementById("depositoBtn")! as HTMLButtonElement;
let erroreI = document.getElementById("erroreI")! as HTMLElement;
let utenteS = document.getElementById("utenteS")! as HTMLInputElement;
let elencoOperazioni = document.getElementById("elencoOperazioni")! as HTMLElement;
let sommaIn = document.getElementById("sommaIn")! as HTMLInputElement;

// Creo il conto
let account1: Account = new Account(0);
//let account2: Account = new Account(0);

// Select
utenteS.addEventListener("change", function (): void {
    sommaIn.disabled = false;
    prelievoBtn.disabled = false;
    depositoBtn.disabled = false;

    if (utenteS.value === "account1") {
        // Aggiorno il saldo disponibile
        (<HTMLElement>document.getElementById("saldoAttuale")).innerHTML =
            account1.saldo.toString();

        // Btn Deposito
        depositoBtn.addEventListener("click", function (): void {
            let newDeposito = (<HTMLInputElement>document.getElementById("sommaIn")).value;
            account1.operazione(parseFloat(newDeposito), "deposito");
        });

        // Btn Prelievo
        prelievoBtn.addEventListener("click", function (): void {
            let newPrelievo = (<HTMLInputElement>document.getElementById("sommaIn")).value;
            account1.operazione(parseFloat(newPrelievo), "prelievo");
        });
    } /*else if (utenteS.value === "account2") {
        (<HTMLElement>document.getElementById("saldoAttuale")).innerHTML =
            account2.saldo.toString();

        depositoBtn.addEventListener("click", function (): void {
            let newDeposito = (<HTMLInputElement>document.getElementById("sommaIn")).value;
            account2.operazione(parseFloat(newDeposito), "deposito");
        });

        prelievoBtn.addEventListener("click", function (): void {
            let newPrelievo = (<HTMLInputElement>document.getElementById("sommaIn")).value;
            account2.operazione(parseFloat(newPrelievo), "prelievo");
        });
    }*/
});