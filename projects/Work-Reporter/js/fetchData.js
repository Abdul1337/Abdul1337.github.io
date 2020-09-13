window.sheet_data = '';

function getRecordCard(dataArr){
    let date = dataArr[3],
        c1data = dataArr[0],
        c2data = dataArr[1],
        c3data = dataArr[2];
    let recordItem = document.createElement('DIV');
    recordItem.classList.add('record--item');
    let content = `
    <div class="date">${date}</div>
    <div class="clients">
        <div class="client-data">
            <div class="name">${window.localStorage.getItem('client1')}</div>                    
            <div class="text">${c1data}</div>
        </div>
        <div class="client-data">
            <div class="name">${window.localStorage.getItem('client2')}</div>                    
            <div class="text">${c2data}</div>
        </div>
        <div class="client-data">
            <div class="name">${window.localStorage.getItem('client3')}</div>                    
            <div class="text">${c3data}</div>
        </div>
    </div>
    `
    recordItem.innerHTML = content;
    return recordItem;
}


function prepareRecords(){
    let records_container = document.getElementById('records')
    let sheet = window.sheet_data;
    if(sheet.length < 2){
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';

        records_container.style.textAlign = 'center'
        records_container.style.paddingTop = '30vh'
        records_container.innerHTML = 'Wow, such Empty!'
    }else{
        sheet.slice(1).forEach(elem => {
            let card = getRecordCard(elem);
            records_container.appendChild(card);
        });
    }


    document.getElementById('loadingOverlay').style.display = 'none'
}

(function () {
    var url = "https://script.google.com/macros/s/AKfycbwJ4I8xkiLiJKwIkpTVC568lDzFM55BJrFzqnahHo1i_U_eMcvd/exec";
    $.ajaxSetup({
        async: !0
    }), 
    $.ajax({
        type: "GET",
        url: url,
        success: function (t) {
                window.sheet_data = t.sheet_data;
                if(window.location.search === '?q=download'){          
                    var blob = new Blob([processData(window.sheet_data)], {type: 'text'}),
                    e    = document.createEvent('MouseEvents'),
                    a    = document.createElement('a')
                    a.download = 'data.txt'
                    a.href = window.URL.createObjectURL(blob)
                    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
                    console.log('URL a.dataset.downloadurl', a.dataset.downloadurl)
                    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
                    a.dispatchEvent(e)
                    window.location.replace(window.location.origin);
                }else{
                    prepareRecords();
                }
        }
    });
})();

function processData(arr){
    data = []
    // data[window.localStorage.getItem('client1')] = 'h1';
    // data[window.localStorage.getItem('client2')] = 'h1';
    // data[window.localStorage.getItem('client3')] = 'h1';
    console.log(arr)
    arr.slice(1).forEach((e)=>{
        let a = {}
        let clientData = {}
        clientData[window.localStorage.getItem('client1')] = e[0];
        clientData[window.localStorage.getItem('client2')] = e[1];
        clientData[window.localStorage.getItem('client3')] = e[2];
        a['Date'] = e[3];
        a['Client Data'] = clientData
        data.push(a);
    })
    console.log(data)
    data = JSON.stringify(data, undefined, 4)
    return data
}