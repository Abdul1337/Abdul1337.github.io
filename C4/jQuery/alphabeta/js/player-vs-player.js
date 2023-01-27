// let PVSP = true

// Start();



Game.prototype.act_pvsp = function(e) {
    // console.log('In act_pvsp');
    var element = e.target || window.event.srcElement;

    // Check if not in animation and start with human
    if (!($('#coin').is(":animated"))) {
        // if (that.round == 0) {
            that.place_pvsp(element.cellIndex);
            playSound('hit');
        // }
    }
}



/**
 * Place coin
 */
Game.prototype.place_pvsp = function(column, player) {
    // console.log('In place_pvsp');

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
                
                // Player 1 Move
                if (that.round == 1) {
                    $('#coin').attr('class', 'cpu-coin').css({'left': coin_x, 'top': coin_start_y}).fadeIn('fast').animate({'top': coin_y + 'px'}, animationSpeed, 'easeOutBounce', function() {
                        document.getElementById('game_board').rows[y].cells[column].className = 'coin cpu-coin';
                        $('#coin').hide().css({'top': '0px'});
                        if (!that.board.place(column)) {
                            return alert("Invalid move!");
                        }

                        that.round = that.switchRound_pvsp(that.round);
                        that.updateStatus_pvsp();
                    });
                } 
                
                if (that.round == 0) {
                    $('#coin').attr('class', 'human-coin').css({'left': coin_x, 'top': coin_start_y}).fadeIn('fast').animate({'top': coin_y + 'px'}, animationSpeed, 'easeOutBounce', function() {
                        document.getElementById('game_board').rows[y].cells[column].className = 'coin human-coin';
                        $('#coin').hide().css({'top': '0px'});
                        // that.generateComputerDecision();
                        
                        if (!that.board.place(column)) {
                            return alert("Invalid move!");
                        }

                        that.round = that.switchRound_pvsp(that.round);
                        that.updateStatus_pvsp();
                    });
                }
                break;
            }
        }
    }
}


Game.prototype.switchRound_pvsp = function(round) {
    let ai_bg_color = getComputedStyle(document.documentElement).getPropertyValue('--human-turn-bg-color');
    let human_bg_color = getComputedStyle(document.documentElement).getPropertyValue('--ai-turn-bg-color');
    // 0 Human, 1 Computer
    if (round == 0) {
        showResultAlert("Blue's Turn")
        document.getElementsByTagName('body')[0].style.background = human_bg_color
        return 1;
    } else {
        showResultAlert("Red's Turn")
        // // that.generateComputerDecision();
        document.getElementsByTagName('body')[0].style.background = ai_bg_color
        return 0;
    }
}



Game.prototype.updateStatus_pvsp = function() {
    // Human won
    if (that.board.score() == -that.score) {
        that.status = 1;
        that.markWin();
        playSound('looser');
        // setEmoji('😭')
        showResultAlert("Red is Winner!");
    }

    // Computer won
    if (that.board.score() == that.score) {
        that.status = 2;
        that.markWin();
        // setEmoji('😎')
        playSound('looser');
        showResultAlert("Blue is Winner!");
    }

    // Tie
    if (that.board.isFull()) {
        that.status = 3;
        // setEmoji('🤝')
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
