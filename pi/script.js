const PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"

$keys = document.querySelectorAll('.num');
$input = document.getElementById('input');
$clearBtn = document.getElementById('clearBtn');
$finishBtn = document.getElementById('finishBtn');
$resultsCloseBtn = document.getElementById('resultsCloseBtn');

$score = document.getElementById('score');
$mistakes = document.getElementById('mistakes');
$resultsBox = document.getElementById('resultsBox');


$clearBtn.addEventListener('click', clearAll)
$resultsCloseBtn.addEventListener('click', closeResultBox)
$finishBtn.addEventListener('click', finishAndShowResults)

$keys.forEach(key => {
    key.addEventListener('click', handleNumPress)
});

let current_digit = 2
let current_score = 0
let current_mistakes = 0

function handleNumPress(e){
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

function clearAll(){
    if (confirm('Are you sure you want to clear?')) {
        $input.innerHTML = "3."
        current_digit = 2
        current_score = 0;
        current_mistakes = 0;
        updateScore({current_score, current_mistakes})
    }
}

function finishAndShowResults(){
    if (current_score > 0){
        let accuracy = (100 - (current_mistakes/(current_score + current_mistakes))*100).toFixed(2)
        $resultsBox.querySelector('#stats_score>span.value').innerHTML = current_score + ' digits'
        $resultsBox.querySelector('#stats_mistakes>span.value').innerHTML = current_mistakes
        $resultsBox.querySelector('#stats_accuracy>span.value').innerHTML = accuracy >= 0 ? accuracy + '%' : '0%' 
        $resultsBox.style.transform = 'translate(-50%, -50%)'
    }else{
        alert('Score should be atleat 1')
    }
}

function closeResultBox(){
    $resultsBox.style.transform = 'translate(-50%, -500%)'
}