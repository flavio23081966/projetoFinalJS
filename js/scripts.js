
const dataAtual = new Date();
const dataHoje = new Date();
const mesano = dataAtual.toLocaleDateString('pt-br', { month: 'long' }) + ' ' + dataAtual.getFullYear();
const diaDisponivel = [11, 13, 14];
const diaSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
const horarios = ["14:00", "14:30", "15:00", "15:30"];

function nextMonth() {

    let proximoMes = new Date(dataAtual.setMonth(dataAtual.getMonth() + 1));
    let mesAnoCalendario = document.getElementById("mesano");

    //let teste = proximoMes.getFullYear() == dataHoje.getFullYear();

    mesAnoCalendario.innerText = proximoMes.toLocaleDateString('pt-br', { month: 'long' }) + ' ' + proximoMes.getFullYear();

    carregaCalendario();
    let agendar = document.getElementsByClassName("agendar")[0];
    agendar.innerHTML = '';
}

function previousMonth() {

    let anteriorMes = new Date(dataAtual.setMonth(dataAtual.getMonth() - 1));
    let mesAnoCalendario = document.getElementById("mesano");
    mesAnoCalendario.innerText = anteriorMes.toLocaleDateString('pt-br', { month: 'long' }) + ' ' + anteriorMes.getFullYear();

    carregaCalendario();
    let agendar = document.getElementsByClassName("agendar")[0];
    agendar.innerHTML = '';
}

//construção painel esquerdo
const panelLeft = document.querySelector(".panelLeft");
panelLeft.innerHTML += `<h1>Book a Court</h1>`;
panelLeft.innerHTML += `<label for="location">Location</label>`;
panelLeft.innerHTML += `<br>`;
panelLeft.innerHTML += `<select class="combo" name="location" id="location"><option value="Brasil">Brasil</option><option value="Portugal">Portugal</option></select>`;
panelLeft.innerHTML += `<br>`;
panelLeft.innerHTML += `<label for="duration">Duration</label>`;
panelLeft.innerHTML += `<br>`;
panelLeft.innerHTML += `<select class="combo" name="duration" id="duration"><option value="30">30 min</option><option value="60">60 min</option></select>`;

//construção painel centro 
let calendar = document.querySelector(".calendar");
calendar.innerHTML += `<div class="calendarcabecalho"></div>`;
calendar.innerHTML += `<div class="calendardias"></div>`;

let calendarcabecalho = document.querySelector(".calendarcabecalho");
calendarcabecalho.innerHTML += `<div id="mesano">${mesano}</div>`;
calendarcabecalho.innerHTML += `<div class="btnnextprevious"></div>`;

let btnnextprevious = document.querySelector(".btnnextprevious");

btnnextprevious.innerHTML += `<span><img src="./img/previous.svg" alt="mes anterior" onclick="previousMonth()"/></span>`;
btnnextprevious.innerHTML += `<span><img src="./img/next.svg" alt="mes posterior" onclick="nextMonth()"/></span>`;

const calendardias = document.querySelector(".calendardias");

function agendar(nLugar) {
    const dias = document.querySelectorAll(".dia");
    const dia = dias[nLugar];

    dia.classList.add("reservado");
}

function selecionarDia(nLugar) {



    const dias = document.querySelectorAll(".dia");
    const dia = dias[nLugar];

    //dia.className

    if (dia.className == 'dia') {
        alert("Este dia não está disponível para agendamento");
    } else {
        dias.forEach((dia) => {
            dia.classList.remove("selecionado");
        });

        dia.classList.add("selecionado");

        dataAtual.setDate(nLugar + 1);

        //panelRight
        const agendar = document.getElementsByClassName("agendar")[0];
        const duracao = document.getElementById("duration").value;

        agendar.innerHTML = '<h1>Agenda</h1><p>' + diaSemana[(dataAtual.getDay())] + ', ' + dataAtual.getDate() + ' de ' + dataAtual.toLocaleDateString('pt-br', { month: 'long' });

        if (duracao == '30') {
            for (let i = 0; i < horarios.length; i++) {
                agendar.innerHTML += `<div class="horarios" onclick="agendar(${nLugar})">` + horarios[i] + '</div>';
            }
        } else {
            for (let i = 0; i < horarios.length; i += 2) {
                agendar.innerHTML += `<div class="horarios" onclick="agendar(${nLugar})">` + horarios[i] + '</div>';
            }
        }
    }
}

carregaCalendario();

function carregaCalendario() {

    calendardias.innerHTML = `<div>DOM</div>`;
    calendardias.innerHTML += `<div>SEG</div>`;
    calendardias.innerHTML += `<div>TER</div>`;
    calendardias.innerHTML += `<div>QUA</div>`;
    calendardias.innerHTML += `<div>QUI</div>`;
    calendardias.innerHTML += `<div>SEX</div>`;
    calendardias.innerHTML += `<div>SAB</div>`;

    dataAtual.setDate(1);

    let ondeComeca = dataAtual.getDay();

    for (let i = 0; i < ondeComeca; i++) {
        calendardias.innerHTML += `<div></div>`;
    }

    let mesTotalDias = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();

    for (let i = 0; i < mesTotalDias; i++) {
        if ((dataAtual.getFullYear() == dataHoje.getFullYear()) && (dataAtual.getMonth() == dataHoje.getMonth())) {
            if (i + 1 == dataHoje.getDate()) {
                calendardias.innerHTML += `<div onclick="selecionarDia(${i})" class="dia hoje">${i + 1
                    }
                </div>`;
            } else {
                if (diaDisponivel.indexOf(i + 1) > -1) {
                    calendardias.innerHTML += `<div onclick="selecionarDia(${i})" class="dia livre">${i + 1
                        }</div>`;
                } else {
                    calendardias.innerHTML += `<div onclick="selecionarDia(${i})" class="dia">${i + 1
                        }</div>`;
                }

            }

        } else {
            calendardias.innerHTML += `<div onclick="selecionarDia(${i})" class="dia">${i + 1
                }</div>`;
        }
    }
}