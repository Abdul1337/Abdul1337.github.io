$(".slick-feature").slick(
    {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        accessibility : false,
        dots : true,
    }
);



$(".slick-institute").slick(
    {
        slidesToShow: 10,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 3000,
        cssEase: 'linear',
    }
);


// Form Submission
var url = "https://script.google.com/macros/s/AKfycbxWQfbWKf9QyROa6SBHsxXvn5_YFSiu-h9n7ssPhB6IpWC6stqv/exec";
$.ajaxSetup({
    async: !0
})

const handleReffFormSubmit = t => {
    t.preventDefault();
    const e = formToJSON(reff.elements);
    // console.log("Data : ",e)

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: e,
        error: function () {
            setTimeout(() => {
                $('#form_status').css({"color" : "#f00"})
                $('#form_status').html("Somthing Went Wrong! Please Try again later");
                $("#form_submit_btn").html("Submit");
                resetForm(t.target);
            }, 500)
        },
        success: function () {
            setTimeout(() => {
                $('#form_status').css({"color" : "#16d316"})
                $('#form_status').html("Thank You! Your Response has been Submitted");
                $("#form_submit_btn").html("Submitted");
                resetForm(t.target);

            }, 500)
        }
    });

    $("#form_submit_btn").html("Submitting Please Wait");

    return false;
}

formToJSON = t => [].reduce.call(t, (t, e) => (t[e.name] = e.value, t), {}),
reff = document.getElementById("BookForm");
function resetForm(t) {
    // console.log("t",t);
    for (i in t){t[i].value = ""}
}
reff.addEventListener("submit", handleReffFormSubmit);