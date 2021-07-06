console.log("Helllllo")

var count = 0
var max = 9999
var increment = 1

document.getElementById("btn").addEventListener("click", ()=>increamentCount());

const increamentCount = () => {
    if(count < max){
        count += increment
        document.getElementById("count").innerHTML = count;
    }else{
        document.getElementById("count").innerHTML = 'MAX';
    }
}

document.getElementById("reset").addEventListener("click", function() {
    count = 0
    document.getElementById("count").innerHTML = count;
});


document.getElementById("control_input").addEventListener("change", function(e) {
    increment = parseInt(e.target.value);
});
