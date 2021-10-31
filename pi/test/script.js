$startBtn = document.getElementById('startBtn')

$startBtn.addEventListener('click', handleStart)
// target selection link
localStorage.setItem('target', document.querySelector('.selected_target').dataset.targetValue)
for(let i = 0; i < document.querySelectorAll('span.target_btn').length; i++) {
    const target = document.getElementById(`target${i}`);
    console.log('Element : ', target)
    target.addEventListener('click', handleTargetSelect)
}

function handleTargetSelect(e){
    let target_value = e.target.dataset.targetValue
    console.log('Target Value : ', target_value)
    document.querySelector('.selected_target').classList.remove('selected_target')
    e.target.classList.add('selected_target')
    localStorage.setItem('target', target_value)
}

function handleStart(){
    window.location.href = "/pi/test/test.html"
}
