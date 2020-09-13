var url = "https://script.google.com/macros/s/AKfycbwJ4I8xkiLiJKwIkpTVC568lDzFM55BJrFzqnahHo1i_U_eMcvd/exec";
var clientNames = [];

function getFullDate() {
    let d = new Date();
    var DWEEKS = ["Sunday", "Monday", "Tuesday", "Wedensday", "Thursday", "Friday", "Saturday"];
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = DWEEKS[d.getDay()],
        date = d.getDate(),
        month = MONTHS[d.getMonth()],
        year = d.getFullYear();
    let full_date = `${month} ${date}, ${year} (${day})`
    return full_date;
}

function setupClientNames(){
    let client1 = prompt('Enter the Name of First Client', window.localStorage.getItem('client1') ? window.localStorage.getItem('client1') : '' );
    let client2 = prompt('Enter the Name of Second Client', window.localStorage.getItem('client2') ? window.localStorage.getItem('client2') : '' );
    let client3 = prompt('Enter the Name of Third Client', window.localStorage.getItem('client3') ? window.localStorage.getItem('client3') : '' );
    if(client1 && client2 && client3){
        clientNames = [client1, client2, client3];
        window.localStorage.setItem('client1', client1);
        window.localStorage.setItem('client2', client2);
        window.localStorage.setItem('client3', client3);
        window.localStorage.setItem('initialSetup', 'done');
        document.getElementById('firstTimeSetupOverlay').style.display = 'none';
        window.location.reload();
    }else{
        alert('Please Fill the Client Names Correctly');
        setupClientNames();
    }
}

function init() {
    document.getElementById('date').innerHTML = getFullDate();
    if(!window.localStorage.getItem('initialSetup')){
        document.getElementById('firstTimeSetupOverlay').style.display = 'flex'
    }else{
        document.getElementById('client1').innerHTML = window.localStorage.getItem('client1');
        document.getElementById('client2').innerHTML = window.localStorage.getItem('client2');
        document.getElementById('client3').innerHTML = window.localStorage.getItem('client3');
    }
}
init();
const handleReffFormSubmit = e => {
    e.preventDefault();
    const t = formToJSON(reff.elements);
    t.date = getFullDate();
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: t,
        error: function () {
            alert("Error")
        },
        success: function (res) {
            alert(`Data for ${getFullDate()}, Submitted`)
            window.location.reload();
        }
    }), !1
};
formToJSON = (e => [].reduce.call(e, (e, t) => (e[t.name] = t.value, e), {})), reff = document.getElementById("client-form"), reff.addEventListener("submit", handleReffFormSubmit);

