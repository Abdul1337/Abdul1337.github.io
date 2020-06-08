$(".slick-carousal").slick(
    {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        accessibility : false,
        dots : true,
    }
);


$(".institutes_list").slick(
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
// var url = "https://script.google.com/macros/s/AKfycbwMaBN1Eq3xPikGUCKQuk8IzjGtc6Mga8nhQoJZcl-WkjAElLvj/exec";
// $.ajaxSetup({
//     async: !0
// }), 
// $.ajax({
//     type: "GET",
//     url: url,
//     success: function (t) {
//         setTimeout(() => {
//             $(".loading").css("display", "none"), $("#subCount").html(t.Stats.TotalSubmissions), $("#submissions").html(t.Stats.TotalSubmissions + (0 == t.Stats.TotalSubmissions ? "" : "+")), $("#directors").html(t.Stats.directors + (0 == t.Stats.directors ? "" : "+")), $("#principals").html(t.Stats.principals + (0 == t.Stats.principals ? "" : "+"))
//         }, 500)
//     }
// });
const handleReffFormSubmit = t => {
        t.preventDefault();
        const e = formToJSON(reff.elements);
        console.log("Data : ",e)
        alert("SUb")
        // $.ajax({
        //     url: url,
        //     method: "GET",
        //     dataType: "json",
        //     data: e,
        //     error: function () {
        //         console.log("Error"), $("#refFormSubmitBtn").html("Not Submitted! :("), setTimeout(() => {
        //             $("#refFormSubmitBtn").html("Submit")
        //         }, 2e3)
        //     },
        //     success: function () {
        //         resetForm(reff.elements), $("#successAnimation").css("display", "block"), $("#refFormSubmitBtn").html("Thank You :)"), console.log("Success"), $("#refferal_form").trigger("reset")
        //     }
        // });
        // $("#refFormSubmitBtn").html("Submitting...")

        return false;
    }

formToJSON = t => [].reduce.call(t, (t, e) => (t[e.name] = e.value, t), {}),
reff = document.getElementById("BookForm");
console.log("reff");
function resetForm(t) {
    for (i in t) console.log(t[i]), t[i].value = ""
}
reff.addEventListener("submit", handleReffFormSubmit);