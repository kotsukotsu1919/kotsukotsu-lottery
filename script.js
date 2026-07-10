
// ==========================
// 🐣‪こつこつってぃ〜🐣‪
// script.js
// ==========================


const entryList =
document.getElementById("entryList");


const winnerCount =
document.getElementById("winnerCount");


const drawButton =
document.getElementById("drawButton");


const againButton =
document.getElementById("againButton");


const result =
document.getElementById("result");


const participantInfo =
document.getElementById("participantInfo");


const history =
document.getElementById("history");


let participants = [];

let winners = [];




// 応募者入力

entryList.addEventListener(
"input",
()=>{


    participants =
    [...new Set(

        entryList.value
        .split("\n")
        .map(v=>v.trim())
        .filter(v=>v)

    )];


    participantInfo.textContent =
    `応募者数：${participants.length}名`;


});





// 抽選

function lottery(){


    if(participants.length===0){

        alert("応募者を入力してください🙏");

        return;

    }



    const count =
    Math.min(
        Number(winnerCount.value),
        participants.length
    );



    result.innerHTML =
    `
    🎲 抽選中…<br><br>
    ✨公平に選んでいます✨
    `;



    drawButton.disabled=true;



    setTimeout(()=>{


        const shuffled =
        [...participants]
        .sort(
            ()=>Math.random()-0.5
        );



        winners =
        shuffled.slice(0,count);



        showWinner();



        saveHistory();


        createConfetti();


        drawButton.disabled=false;



    },1500);



}





// 当選表示

function showWinner(){


result.innerHTML =

`

<div class="winner-card">


<div class="winner-title">

🎉 当選おめでとうございます 🎉

</div>


<br>


<div>

🎁 🐣‪こつこつってぃ〜🐣‪

</div>


<br>


${
winners.map(
(w,i)=>

`

<div class="winner-name">

🏆 ${i+1}位

</div>


<div class="winner-name">

${w}

</div>


<br>


`
).join("")
}



<div>

✨ 素敵なご縁がありますように ✨

</div>


</div>


`;



}


// 再抽選

function reLottery(){

    if(participants.length===0){

        alert("応募者を入力してください🙏");

        return;

    }


    lottery();

}




// 履歴保存

function saveHistory(){


    const li =
    document.createElement("li");


    li.textContent =

    new Date()
    .toLocaleString("ja-JP")

    +

    " → "

    +

    winners.join(" / ");



    history.prepend(li);


}





// 紙吹雪

function createConfetti(){


    for(let i=0;i<100;i++){


        const c =
        document.createElement("div");


        c.className =
        "confetti";


        c.style.left =
        Math.random()*100+"vw";



        c.style.backgroundColor =

        [
        "#ff595e",
        "#ffca3a",
        "#8ac926",
        "#1982c4",
        "#6a4c93"

        ]
        [
        Math.floor(
        Math.random()*5
        )
        ];



        c.style.animationDuration =

        (
        Math.random()*2+2
        )
        +"s";



        document.body.appendChild(c);



        setTimeout(()=>{

            c.remove();

        },4000);



    }


}





// 結果コピー

document
.getElementById("copyButton")
.addEventListener(
"click",
()=>{


    if(winners.length===0){

        alert("先に抽選してください🙏");

        return;

    }



    const eventName =
    document
    .getElementById("eventName")
    .value;



    const prizeName =
    document
    .getElementById("prizeName")
    .value;



    const text =


`🎉当選者発表🎉


🎯企画名
${eventName || "こつこつ企画"}


🎁賞品
${prizeName || "素敵なプレゼント"}


🏆当選者

${winners.join("\n")}


✨おめでとうございます✨


🐣こつこつってぃ〜🐣‪`;




navigator.clipboard.writeText(text);



alert(
"📋コピーしました！"
);



});


// X投稿用カード更新

function updateShareCard(){


    const shareCard =
    document.getElementById("shareCard");


    shareCard.style.display =
    "block";



    const eventName =
    document
    .getElementById("eventName")
    .value;



    const prizeName =
    document
    .getElementById("prizeName")
    .value;



    document
    .getElementById("shareEvent")
    .textContent =

    eventName ||
    "こつこつ企画";



    document
    .getElementById("sharePrize")
    .textContent =

    prizeName ||
    "素敵なプレゼント";



    document
    .getElementById("shareWinner")
    .innerHTML =

    winners.join("<br>");



}






// 抽選ボタン

drawButton.addEventListener(
"click",
lottery
);




// 再抽選ボタン

againButton.addEventListener(
"click",
reLottery
);






// 画像作成

document
.getElementById("imageButton")
.addEventListener(
"click",
()=>{


    if(winners.length===0){

        alert("先に抽選してください🙏");

        return;

    }



    updateShareCard();



    const card =
    document.getElementById("shareCard");



    html2canvas(card)
    .then(canvas=>{


        const image =
        canvas.toDataURL(
            "image/png"
        );



        const win =
        window.open();



        win.document.write(

        `

        <img
        src="${image}"
        style="width:100%;">

        `

        );



    });



});