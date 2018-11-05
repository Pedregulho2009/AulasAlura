var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(document).ready(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);//atalho para a função click em on
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numeroPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");


    tamanhoFrase.text(numeroPalavras);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        var qtdCaracteres = conteudo.length;

        $("#contador-palavras").text(qtdPalavras);
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function () {
        var cronometroId = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.addClass("campo-desativado");
    inserirPlacar();
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    campo.css("background-color", "white");
    campo.removeClass("campo-desativado");
    campo.removeClass("campo-correto");
    campo.removeClass("compo-errado");
    inicializaCronometro();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if (digitado == comparavel) {
            campo.addClass("campo-correto");
            campo.removeClass("compo-errado");
        } else {
            campo.addClass("compo-errado");
            campo.removeClass("campo-correto");
        }
    });
}