var tempo = 5000;
var lista_chamados = [];
var chamados = [];
var itemSelecionado = 0;
var runEverySecond = function () {
    var chamados = angular.element(document.getElementById('service-request-incident-container')).scope().requests

    if (lista_chamados.length === 0) {
        console.log(chamados);
        for(c of chamados){
            if(c.idStatus === 1){
                lista_chamados.push(c.id);
                AdicionaCollapse(c);
            }            
        }
        
    } else {
        var r2 = [];
        for(c of chamados){
            if(c.idStatus === 1){
                r2.push(c.id);
            }
        }
        var aux = validarDiferenca(lista_chamados, r2);

        if(aux.length > 0){
            notificacao();
            for(i of aux){
                console.log(i);
            }
        }
        lista_chamados = r2;
    }
};

function AdicionaCollapse(chamado){
    var item = document.getElementById('list-item-'+chamado.id)
        item.setAttribute('data-toggle', 'collapse');
        item.setAttribute('data-target', '#collapse-'+chamado.id);
        item.setAttribute('aria-expanded', 'true');
        item.setAttribute('aria-controls', '#collapse-'+chamado.id);
        //item.setAttribute('onclick','MostraDetalhes('+chamado.id+')')

        var div1 = document.createElement('div');
        div1.className="col";
        div1.innerHTML = "Telefone: "+chamado.telefone;
        var div2 = document.createElement('div');
        div2.className="col";
        div2.innerHTML = "E-mail: "+chamado.email;

        var div3 = document.createElement('div');
        div3.className="row";
        div3.innerHTML = "Descrição: <br>"+chamado.descricao;

        var divRow = document.createElement('div');
        divRow.className="row";
        divRow.appendChild(div1);
        divRow.appendChild(div2);
        divRow.appendChild(div3);

        var novaDiv = document.createElement('div');
        novaDiv.className="collapse";
        novaDiv.id="collapse-"+chamado.id;
        novaDiv.style.width = "100%";
        novaDiv.appendChild(divRow);


        var referenceNode = document.querySelector('#list-item-'+chamado.id);
        referenceNode.after(novaDiv);
}

function validarDiferenca(r1, r2) {

    var apenasNoR1 = r1.filter(function (element, index, array) {
        if(r2.indexOf(element) == -1)
            return element;
    });

    return apenasNoR1;
}

function notificacao() {
    var audio = new Audio('https://proxy.notificationsounds.com/standard-ringtones/here-i-am-449/download/file-4f_here-I-am.mp3');
    audio.play();
}

function muda_cor(id) {
    $(id).children('div').css('background', '#8ec252')
}

function MostraDetalhes(id){

    var detalhes = ChamadoById(id);
    var novaDiv = document.createElement('div');
    novaDiv.id = "it-"+id;
    novaDiv.style.height = "100px";
    
    if(itemSelecionado === 0){
        var referenceNode = document.querySelector('#list-item-'+id);
        referenceNode.after(novaDiv);
    } else {
        var node = document.getElementById("it-"+itemSelecionado);
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        var referenceNode = document.querySelector('#list-item-'+id);
        referenceNode.after(novaDiv);
    }
    
    itemSelecionado = id;
}

function ChamadoById(id) {
    for (c of chamados){
        if(c.id === id)
            return c;
    }
    return;
}

$(document).ready(function () {
    setInterval(runEverySecond, tempo);
});