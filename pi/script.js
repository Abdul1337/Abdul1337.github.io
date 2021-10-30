const PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
var timerIsActive = false;

$keys = document.querySelectorAll('.num');
$input = document.getElementById('input');
$clearBtn = document.getElementById('clearBtn');
$finishBtn = document.getElementById('finishBtn');
$resultsCloseBtn = document.getElementById('resultsCloseBtn');
$score = document.getElementById('score');
$mistakes = document.getElementById('mistakes');
$resultsBox = document.getElementById('resultsBox');

// Adding Events
$clearBtn.addEventListener('click', clearAll)
$resultsCloseBtn.addEventListener('click', closeResultBox)
$finishBtn.addEventListener('click', finishAndShowResults)

$keys.forEach(key => {
    key.addEventListener('click', handleNumPress)
});

// Score/Mistakes Update Handling
let current_digit = 2
let current_score = 0
let current_mistakes = 0

function handleNumPress(e){
    if(!timerIsActive){
        startTimer();
    }
    console.log({
        current_score, current_mistakes
    })
    digit = e.target.dataset['number']
    if (PI[current_digit] === digit){
        $input.innerHTML += digit
        current_digit += 1
        current_score += 1
    }else{
        current_mistakes += 1
    }
    updateScore({
        current_score,
        current_mistakes
    })
}

function updateScore(score){
    $score.innerHTML = score.current_score;
    $mistakes.innerHTML = score.current_mistakes;
}

// Score/Mistakes Reset
function clearAll(){
    if (confirm('Are you sure you want to clear?')) {
        $input.innerHTML = "3."
        current_digit = 2
        current_score = 0;
        current_mistakes = 0;
        updateScore({current_score, current_mistakes})
        resetTimer();
    }
}

// Results Display
function finishAndShowResults(){
    time = getTimerTime()
    if (current_score > 0){
        let accuracy = (100 - (current_mistakes/(current_score + current_mistakes))*100).toFixed(2)
        $resultsBox.querySelector('#stats_time>span.value').innerHTML = time.text;
        $resultsBox.querySelector('#stats_speed>span.value').innerHTML = getSpeed(time, current_score);
        $resultsBox.querySelector('#stats_score>span.value').innerHTML = current_score + ' digits'
        $resultsBox.querySelector('#stats_mistakes>span.value').innerHTML = current_mistakes
        $resultsBox.querySelector('#stats_accuracy>span.value').innerHTML = accuracy >= 0 ? accuracy + '%' : '0%' 
        $resultsBox.style.transform = 'translate(-50%, -50%)'
    }else{
        alert('Score should be atleat 1')
    }
    resetTimer();
}
function closeResultBox(){
    $resultsBox.style.transform = 'translate(-50%, -500%)'
}

// Calculations
function getSpeed(time, score){
    s = time.seconds;
    ts = time.tens;

    speed = (s + (0.1 * tens))/score
    return `${speed.toFixed(2)} digits/s`
}

// Timer Handling

var seconds = 00; 
var tens = 00; 
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var buttonStart = document.getElementById('button-start');
var buttonStop = document.getElementById('button-stop');
var buttonReset = document.getElementById('button-reset');
var Interval ;
// buttonStart.onclick = startTimer
// buttonStop.onclick = stopTimer
// buttonReset.onclick = resetTimer

// Start Timer
function startTimer(){
    timerIsActive = true
    console.log("Function Called StartTimer")
    clearInterval(Interval);
    Interval = setInterval(updateTime, 10);
}
// Stop Timer
function stopTimer(){
    timerIsActive = false
    clearInterval(Interval);
}
// Reset Timer
function resetTimer(){
    stopTimer();
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
}

// Get Timer Time

function getTimerTime(){
    return {
        tens, seconds, text : `${seconds}.${tens} sec`
    }
}

function updateTime () {
    tens++;
    if(tens <= 9){
    appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
    appendTens.innerHTML = tens;
    
    } 
    
    if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
    appendSeconds.innerHTML = seconds;
    }

}
