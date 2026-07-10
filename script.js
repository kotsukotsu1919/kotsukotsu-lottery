const entryList = document.getElementById("entryList");
const winnerCount = document.getElementById("winnerCount");

const drawButton = document.getElementById("drawButton");
const againButton = document.getElementById("againButton");

const result = document.getElementById("result");
const participantInfo = document.getElementById("participantInfo");
const history = document.getElementById("history");

let participants = [];
let winners = [];


// 応募人数表示

entryList.addEventListener("input",()=>{

    participants =
    entryList.value
    .split("\n")
    .map(v=>v.trim())
    .filter(v=>v);


    participantInfo.textContent =
    `応募者数：${participants.length}名`;

});


// 抽選

function lottery(){


    if(participants.length===0){

        alert("応募者を入力してください🙏");
        return;

    }


    let count =
    Number(winnerCount.value);


    let copy =
    [...participants]
    .sort(()=>Math.random()-0.5);


    winners =
    copy.slice(0,count);


    showResult();

    saveHistory();

    confetti();

}



// 表示

function showResult(){

    result.innerHTML =
    "🎉 当選おめでとうございます！<br><br>" +
    winners.join("<br>");

}



// 再抽選

function reLottery(){


    if(participants.length===0){

        alert("先に抽選してください🙏");
        return;

    }


    lottery();

}



// 履歴

function saveHistory(){


    const li =
    document.createElement("li");


    li.textContent =
    new Date()
    .toLocaleString("ja-JP")
    +" → "
    +winners.join(" / ");


    history.prepend(li);

}



// 紙吹雪

function confetti(){


    for(let i=0;i<60;i++){


        const c =
        document.createElement("div");


        c.className="confetti";


        c.style.left =
        Math.random()*100+"vw";


        c.style.background =
        [
        "#ff595e",
        "#ffca3a",
        "#8ac926",
        "#1982c4"
        ]
        [
        Math.floor(Math.random()*4)
        ];

        document.body.appendChild(c);


        setTimeout(()=>{

            c.remove();

        },3000);


    }

}



drawButton.addEventListener(
"click",
lottery
);


againButton.addEventListener(
"click",
reLottery
);
