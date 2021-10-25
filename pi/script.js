const PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"

$keys = document.querySelectorAll('.num');
$input = document.getElementById('input');

$keys.forEach(key => {
    key.addEventListener('click', handleNumPress)
});

let current_digit = 2

function handleNumPress(e){
    console.log(e)
    digit = e.target.dataset['number']
    console.log(digit)
    console.log("Curr PI : ", PI[current_digit])
    if (PI[current_digit] === digit){
        $input.innerHTML += digit
        current_digit += 1
    }else{
        alert('Wrong!')
    }
}