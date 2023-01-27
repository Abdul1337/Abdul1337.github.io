const VERSION = '2.0' // Update manually


let viz_array = []
let sound_effects = {}
let sound_effects_enabled = true
let stats_for_nerds = false
let player_vs_player = true
function simulateHumanMove(column){
    var td = document.getElementById('game_board').getElementsByTagName("td");
    if(td[column]){
        td[column].click();
    }
}


// document.getElementById('difficulty').addEventListener('change', (e)=>{
//     Game.restartGame(after_select=true);
// })

if(document.getElementById('difficulty_slider')){
    document.getElementById('difficulty_slider').addEventListener('input', (e)=>{
        setEmoji(e.target.value - 1)
        document.getElementById('slider_value').innerHTML = e.target.value
        playSound('slider')
        showResultAlert('Click Start to play with Level ' + e.target.value)
    })
}


function setEmoji(emoji){
    let difficulty_emoji = document.getElementById('difficulty_emoji')
    if (typeof emoji == 'number'){
        difficulty_emoji.innerHTML = that.emojis[emoji]
    }else{
        difficulty_emoji.innerHTML = emoji
    }
}

function showResultAlert(msg){
    let alertBox = document.querySelector('.result_alert');
    alertBox.innerHTML = msg
    alertBox.style.display = 'block'
}

function hideResultAlert(){
    let alertBox = document.querySelector('.result_alert');
    alertBox.style.display = 'none'
}

function getVisualzedGameBoardString(field){
    let str = (field.map(arr => (arr.map(elem=>elem != null ? (elem == 0 ? '🔴' : '🔵') : '⚪')).join(''))).join('<br>')
    return str
}

function updateExtraInfo(info, append = false){
    let extra_info = document.querySelector('#extra_info')
    let info_html_template = '<span>key:value</span>'
    let info_html = Object.keys(info).map(key => info_html_template.replace('key', key).replace('value', info[key])).join('<br>')
    
    if(append){
        extra_info.innerHTML += info_html
    }else{
        extra_info.innerHTML = info_html
    }
}

function startVisualizing(){
    if(viz_array.length > 0){
        updateVizArea()
    }
}

// function updateVizArea(position){
//     let viz_area_html = document.querySelector('#viz_area')
//     let interval = setInterval(function() {
//         viz_area_html.innerHTML = position
//         console.log('Interval')
//     },1000)
//     clearInterval(interval)
// }
let viz_iteration = 0
let viz_timeout = null
function updateVizArea() {
    let viz_area_html = document.querySelector('#viz_area')
    viz_timeout = setTimeout(function() {
      viz_area_html.innerHTML = viz_array[viz_iteration]
      updateVizGameBoardPositionCount(viz_iteration)
      viz_iteration++;
      if (viz_iteration < viz_array.length) {
        updateVizArea();
      }
    }, 10)
  }

function playSound(sound_name){
    if(sound_effects_enabled){
        switch (sound_name) {
            case 'winner':
                setTimeout(()=>{
                    if(sound_effects.win){
                        sound_effects.win.play();
                    }
                },100)
                break;
            case 'looser':
                setTimeout(()=>{
                    if(sound_effects.laugh){
                        sound_effects.laugh.play();
                    }
                },100)
                break;
            case 'hit':
                setTimeout(()=>{
                    if(sound_effects.hit){
                        sound_effects.hit.play();
                    }
                },400)
                break;
            case 'click':
            setTimeout(()=>{
                if(sound_effects.click){
                    sound_effects.click.play();
                }
            },10)
            break;
            case 'slider':
            setTimeout(()=>{
                if(sound_effects.slider){
                    sound_effects.slider.play();
                }
            },15)
            break;
            default:
                break;
        }
    }
 
}


function stopVisualizing(){
    console.log(viz_timeout)
    clearTimeout(viz_timeout);
}

function updateVizGameBoardPositionCount(count){
    let viz_count_html = document.querySelector('#viz_count');
    viz_count_html.innerHTML = `${count+1}/${viz_array.length}`
}

function toggleSound(){
    sound_effects_enabled = !sound_effects_enabled
    let icon = document.getElementById('setting_sound')
    if(sound_effects_enabled){
        icon.innerHTML = '🔊'
        playSound('click')
    }else{
        icon.innerHTML = '🔇'
    }
}

function toggleStatsForNerds(){
    stats_for_nerds = !stats_for_nerds
    let sfn_block = document.getElementById('stats_for_nerds')
    if(stats_for_nerds){
        sfn_block.style.display = 'block'
        playSound('click')
    }else{
        sfn_block.style.display = 'none'
        playSound('click')
    }
}

function togglePvsP(){
    player_vs_player = !player_vs_player
    let sfn_block = document.getElementById('stats_for_nerds')
    if(player_vs_player){
        sfn_block.style.display = 'block'
        playSound('click')
    }else{
        sfn_block.style.display = 'none'
        playSound('click')
    }
}

function setVersion(){
    document.getElementById('version').innerText = VERSION
}