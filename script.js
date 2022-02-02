// Classe account figlio
var Account = /** @class */ (function () {
    function Account(_saldo) {
        this.operazioni = [];
        this.saldo = _saldo;
    }
    ;
    Account.prototype.operazione = function (ammontare, tipo) {
        if (ammontare <= 0 || isNaN(ammontare)) { // Faccio un controllo sui valori
            erroreI.innerHTML = "Inserisci un quantitativo valido";
            return;
        }
        erroreI.innerHTML = ""; // Svuoto i campi di errore e di input
        sommaIn.value = "";
        if (tipo === "deposito") {
            this.saldo += ammontare; // Aggiorno il valore del saldo
            var nuovaOperazione = {
                tipo: "deposito",
                somma: ammontare
            };
            this.operazioni.push(nuovaOperazione); // Inserisco l'operazione nell'array operazioni
        }
        else if (tipo === "prelievo") {
            if (this.saldo < ammontare) { // Controllo che ci siano abbastanza soldi
                erroreI.innerHTML = "Impossibile ritirare la somma richiesta";
                return;
            }
            this.saldo -= ammontare; // Aggiorno il valore del saldo
            var nuovaOperazione = {
                tipo: "prelievo",
                somma: ammontare
            };
            this.operazioni.push(nuovaOperazione); // Inserisco l'operazione nell'array operazioni
        }
        ;
        document.getElementById("saldoAttuale").innerHTML = // Aggiorno il saldo disponibile
            this.saldo.toString();
        this.stampaOperazioni();
    };
    ;
    Account.prototype.stampaOperazioni = function () {
        elencoOperazioni.innerHTML = "";
        for (var i = 0; i < this.operazioni.length; i++) {
            elencoOperazioni.innerHTML += "<li>".concat((i + 1), ". ").concat(this.operazioni[i].tipo, ": ").concat(this.operazioni[i].somma, "\u20AC</li>");
        }
    };
    ;
    return Account;
}());
;
// Inizializzo gli elementi HTML
var prelievoBtn = document.getElementById("prelievoBtn");
var depositoBtn = document.getElementById("depositoBtn");
var erroreI = document.getElementById("erroreI");
var utenteS = document.getElementById("utenteS");
var elencoOperazioni = document.getElementById("elencoOperazioni");
var sommaIn = document.getElementById("sommaIn");
// Creo il conto
var account1 = new Account(0);
//let account2: Account = new Account(0);
// Select
utenteS.addEventListener("change", function () {
    sommaIn.disabled = false;
    prelievoBtn.disabled = false;
    depositoBtn.disabled = false;
    if (utenteS.value === "account1") {
        // Aggiorno il saldo disponibile
        document.getElementById("saldoAttuale").innerHTML =
            account1.saldo.toString();
        // Btn Deposito
        depositoBtn.addEventListener("click", function () {
            var newDeposito = document.getElementById("sommaIn").value;
            account1.operazione(parseFloat(newDeposito), "deposito");
        });
        // Btn Prelievo
        prelievoBtn.addEventListener("click", function () {
            var newPrelievo = document.getElementById("sommaIn").value;
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
