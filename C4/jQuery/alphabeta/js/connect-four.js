/**
 * Minimax (+Alpha-Beta) Implementation 
 * @jQuery version
 */


function Game() {
    this.rows = 6; // Height
    this.columns = 7; // Width
    this.status = 0; // 0: running, 1: won, 2: lost, 3: tie
    this.depth = 4; // Search depth
    this.score = 100000, // Win/loss score
    this.round = 0; // 0: Human, 1: Computer
    this.winning_array = []; // Winning (chips) array
    this.iterations = 0; // Iteration count
    this.emojis = ["🙂","🤨","🤓","😠","😡", "😈", "💀", "👽"]
    that = this;

    that.init();
}

Game.prototype.init = function() {
    // Generate 'real' board
    // Create 2-dimensional array
    var game_board = new Array(that.rows);
    for (var i = 0; i < game_board.length; i++) {
        game_board[i] = new Array(that.columns);

        for (var j = 0; j < game_board[i].length; j++) {
            game_board[i][j] = null;
        }
    }

    // Create from board object (see board.js)
    this.board = new Board(this, game_board, 0);

    // Generate visual board
    var game_board = "<col/><col/><col/><col/><col/><col/><col/>";
    for (var i = 0; i < that.rows; i++) {
        game_board += "<tr>";
        for (var j = 0; j < that.columns; j++) {
            game_board += "<td class='empty'></td>";
        }
        game_board += "</tr>";
    }

    document.getElementById('game_board').innerHTML = game_board;

    // Action listeners
    var td = document.getElementById('game_board').getElementsByTagName("td");

    for (var i = 0; i < td.length; i++) {
        if (td[i].addEventListener) {
            td[i].addEventListener('click', that.act, false);
        } else if (td[i].attachEvent) {
            td[i].attachEvent('click', that.act)
        }
    }

    // Set Helper Text and Emoji
    setEmoji(that.depth - 1)
    showResultAlert('Your Turn')
}

/**
 * On-click event
 */
Game.prototype.act = function(e) {
    var element = e.target || window.event.srcElement;

    // Check if not in animation and start with human
    if (!($('#coin').is(":animated"))) {
        if (that.round == 0) {
            that.place(element.cellIndex);
            playSound('hit');
        }
    }
}

/**
 * Place coin
 */
Game.prototype.place = function(column) {
    // If not finished
    // let size_multiplier = 51
    console.log({Game, board: that.board})
    let animationSpeed = 800
    if (that.board.score() != that.score && that.board.score() != -that.score && !that.board.isFull()) {
        for (var y = that.rows - 1; y >= 0; y--) {
            if (document.getElementById('game_board').rows[y].cells[column].className == 'empty') {
                let placing_cell = document.getElementById('game_board').rows[y].cells[column]
                let cellRect = placing_cell.getBoundingClientRect()
                let firstRowCellRect = document.querySelector('#game_board tr').childNodes[column].getBoundingClientRect()
                let coin_x = cellRect.left;
                let coin_y = cellRect.top;
                let coin_start_y = firstRowCellRect.top;
                
                if (that.round == 1) {
                    $('#coin').attr('class', 'cpu-coin').css({'left': coin_x, 'top': coin_start_y}).fadeIn('fast').animate({'top': coin_y + 'px'}, animationSpeed, 'easeOutBounce', function() {
                        document.getElementById('game_board').rows[y].cells[column].className = 'coin cpu-coin';
                        $('#coin').hide().css({'top': '0px'});
                        if (!that.board.place(column)) {
                            return alert("Invalid move!");
                        }

                        that.round = that.switchRound(that.round);
                        that.updateStatus();
                    });
                } else {
                    $('#coin').attr('class', 'human-coin').css({'left': coin_x, 'top': coin_start_y}).fadeIn('fast').animate({'top': coin_y + 'px'}, animationSpeed, 'easeOutBounce', function() {
                        document.getElementById('game_board').rows[y].cells[column].className = 'coin human-coin';
                        $('#coin').hide().css({'top': '0px'});
                        that.generateComputerDecision();
                        
                        if (!that.board.place(column)) {
                            return alert("Invalid move!");
                        }

                        that.round = that.switchRound(that.round);
                        that.updateStatus();
                    });
                }
                break;
            }
        }
    }
}


Game.prototype.generateComputerDecision = function() {
    if (that.board.score() != that.score && that.board.score() != -that.score && !that.board.isFull()) {
        that.iterations = 0; // Reset iteration count
        // AI is thinking
        setTimeout(function() {
            // Debug time
            var startzeit = new Date().getTime();

            // Clean Viz Array
            viz_array = []
            // Algorithm call
            var ai_move = that.maximizePlay(that.board, that.depth);
            console.log('AI Move : ', ai_move)
            console.log('Iterations : ', that.iterations)
            var laufzeit = new Date().getTime() - startzeit;
            // document.getElementById('ai-time').innerHTML = laufzeit.toFixed(2) + 'ms';

            // Place ai decision
            that.place(ai_move[0]);
            playSound('hit')
            updateVizGameBoardPositionCount(0);
            updateExtraInfo({
                next_move : 'Col ' + (ai_move[0] + 1),
                score : ai_move[1],
                iterations : that.iterations,
                current_depth : that.depth
            })
            
            // // Debug
            // document.getElementById('ai-column').innerHTML = 'Column: ' + parseInt(ai_move[0] + 1);
            // document.getElementById('ai-score').innerHTML = 'Score: ' + ai_move[1];
            // document.getElementById('ai-iterations').innerHTML = that.iterations;

        }, 100);
    }
}

/**
 * Algorithm
 * Minimax principle
 */
Game.prototype.maximizePlay = function(board, depth, alpha, beta) {
    // Call score of our board
    var score = board.score();
    viz_array.push(getVisualzedGameBoardString(board.field));
    // Break
    if (board.isFinished(depth, score)) return [null, score];

    // Column, Score
    var max = [null, -99999];

    // For all possible moves
    for (var column = 0; column < that.columns; column++) {
        var new_board = board.copy(); // Create new board

        if (new_board.place(column)) {

            that.iterations++; // Debug
            var next_move = that.minimizePlay(new_board, depth - 1, alpha, beta); // Recursive calling
            // Evaluate new move
            if (max[0] == null || next_move[1] > max[1]) {
                max[0] = column;
                max[1] = next_move[1];
                alpha = next_move[1];
            }

            if (alpha >= beta) return max;
        }
    }

    return max;
}

Game.prototype.minimizePlay = function(board, depth, alpha, beta) {
    var score = board.score();
    if (board.isFinished(depth, score)) return [null, score];

    // Column, score
    var min = [null, 99999];

    for (var column = 0; column < that.columns; column++) {
        var new_board = board.copy();

        if (new_board.place(column)) {

            that.iterations++;

            var next_move = that.maximizePlay(new_board, depth - 1, alpha, beta);

            if (min[0] == null || next_move[1] < min[1]) {
                min[0] = column;
                min[1] = next_move[1];
                beta = next_move[1];
            }

            if (alpha >= beta) return min;
        }
    }
   
    return min;
}

Game.prototype.switchRound = function(round) {
    let ai_bg_color = getComputedStyle(document.documentElement).getPropertyValue('--human-turn-bg-color');
    let human_bg_color = getComputedStyle(document.documentElement).getPropertyValue('--ai-turn-bg-color');
    // 0 Human, 1 Computer
    if (round == 0) {
        showResultAlert("Computer is thinking 🤔")
        document.getElementsByTagName('body')[0].style.background = human_bg_color
        return 1;
    } else {
        showResultAlert('Your Turn')
        // that.generateComputerDecision();
        document.getElementsByTagName('body')[0].style.background = ai_bg_color
        return 0;
    }
}

Game.prototype.updateStatus = function() {
    // Human won
    if (that.board.score() == -that.score) {
        that.status = 1;
        that.markWin();
        playSound('winner');
        setEmoji('😭')
        showResultAlert("You won!");
    }

    // Computer won
    if (that.board.score() == that.score) {
        that.status = 2;
        that.markWin();
        setEmoji('😎')
        playSound('looser');
        showResultAlert("You lost!");
    }

    // Tie
    if (that.board.isFull()) {
        that.status = 3;
        setEmoji('🤝')
        showResultAlert("Draw");
    }
    // var html = document.getElementById('status');
    // if (that.status == 0) {
    //     html.className = "status-running";
    //     html.innerHTML = "running";
    // } else if (that.status == 1) {
    //     html.className = "status-won";
    //     html.innerHTML = "won";
    // } else if (that.status == 2) {
    //     html.className = "status-lost";
    //     html.innerHTML = "lost";
    // } else {
    //     html.className = "status-tie";
    //     html.innerHTML = "tie";
    // }
}

Game.prototype.markWin = function() {
    let root = document.querySelector(':root')
    let ai_bg_color = getComputedStyle(root).getPropertyValue('--ai-turn-bg-color');
    let human_bg_color = getComputedStyle(root).getPropertyValue('--human-turn-bg-color');
    
    for (var i = 0; i < that.winning_array.length; i++) {
        var name = document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className;
        if(name.includes('cpu')){
            root.style.setProperty('--win-coin-color', ai_bg_color)
        }else{
            root.style.setProperty('--win-coin-color', human_bg_color)
        }
        document.getElementById('game_board').rows[that.winning_array[i][0]].cells[that.winning_array[i][1]].className = name + " win";
    }
}

Game.prototype.restartGame = function(after_select=false) {
    
    let difficulty = document.getElementById('difficulty_slider');
    let depth = difficulty.value;
    document.getElementById('diff_level').innerHTML = depth
    let confirmation_msg = after_select ? `Updated Level to ${depth} and Restart` : 'Game is going to be Restarted.'

    if (confirm(confirmation_msg + '\nAre you sure?')) {
        // Dropdown value
        that.depth = depth;
        that.status = 0;
        that.round = 0;
        that.init();
        that.updateStatus();

        // Re-assign hover
        $('td').hover(function() {
            $(this).parents('table').find('col:eq('+$(this).index()+')').toggleClass('hover');
        });
        setEmoji(that.depth - 1)
    }else{
        difficulty.selectedIndex = that.depth - 1
    }
}


/**
 * Start game
 */
function Start() {
    window.Game = new Game();
}

window.onload = function() {
    setVersion();
    Start();
    loadSounds();
};


function loadSounds(){
    sound_effects.hit = new Audio('assets/hit_2.wav');
    sound_effects.win = new Audio('assets/win_1.wav');
    sound_effects.laugh = new Audio('assets/laugh_2.wav');
    sound_effects.click = new Audio('assets/click_1.wav');
    sound_effects.slider = new Audio('assets/click_short.wav');
}