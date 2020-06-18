
// Form Submission
var url = "https://script.google.com/macros/s/AKfycbxIUzIISoEQNM2rCCdkmm432CkkUf2DKiat4RzYAbKmuVIEM8g/exec";
$.ajaxSetup({
    async: !0
})

const handleReffFormSubmit = t => {
    t.preventDefault();
    const e = formToJSON(reff.elements);
    console.log("Data : ",e)

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: e,
        error: function () {
            // alert('Error');
            document.querySelector('.form-progress').style.bottom = '0px';
            document.querySelector('.form-progress').style.background = '#f32f2f';
            document.querySelector('.form-progress').style.color = 'white';
            $('#form-state').html('Somthing Went Wrong, Please Try Again !');
        },
        success: function () {
            // alert('Success');
            document.querySelector('.form-progress').style.bottom = '0px';
            document.querySelector('.form-progress').style.background = '#00d079';
            document.querySelector('.form-progress').style.color = 'white';
            $('#form-state').html('Thank You, Your response has been submitted!');
        }
    });
    return false;
}

formToJSON = t => [].reduce.call(t, (t, e) => (t[e.name] = e.value, t), {}),
reff = document.getElementById("reg-form");
function resetForm(t) {
    // console.log("t",t);
    for (i in t){t[i].value = ""}
}
reff.addEventListener("submit", handleReffFormSubmit);