console.log("Helllllo")

count = 0

document.getElementById("btn").addEventListener("click", function() {
    count += 1
    document.getElementById("count").innerHTML = count;
});

document.getElementById("reset").addEventListener("click", function() {
    count = 0
    document.getElementById("count").innerHTML = count;
});