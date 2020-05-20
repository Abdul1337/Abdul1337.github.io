var url = 'https://script.google.com/macros/s/AKfycbwMaBN1Eq3xPikGUCKQuk8IzjGtc6Mga8nhQoJZcl-WkjAElLvj/exec'
$.ajaxSetup({async: true});  
$.ajax({     
    type: "GET",
    url: url,
    success: function (data) {
        // console.log("Dataaaa : ",data);
        setTimeout(()=>{
            $(".loading").css("display","none");
            $("#subCount").html(data.Stats.TotalSubmissions); //n + (10 - n % 10)
            $("#submissions").html(data.Stats.TotalSubmissions + (data.Stats.TotalSubmissions==0 ? "" : "+"));
            $("#directors").html(data.Stats.directors + (data.Stats.directors==0 ? "" : "+"));
            $("#principals").html(data.Stats.principals + (data.Stats.principals==0 ? "" : "+"));    
        },500)
        
    },
});




const handleReffFormSubmit = event => {
    // Stop the form from submitting since we’re handling that with AJAX.
    event.preventDefault();
    // Call our function to get the form data.
    const data = formToJSON(reff.elements);
    // console.log("Data : ",data);
    
    var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: data,
        error : function(){
            console.log("Error");
            $("#refFormSubmitBtn").html("Not Submitted! :(");
            setTimeout(()=>{$("#refFormSubmitBtn").html("Submit");},2000);
        }, // On Error

        success : function (){
            resetForm(reff.elements)
            $("#successAnimation").css("display","block");
            $("#refFormSubmitBtn").html("Thank You :)");
            console.log("Success");
            $("#refferal_form").trigger("reset");
        }
    });
    $("#refFormSubmitBtn").html("Submitting...");

};

  
  const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
  }, {});

const reff = document.getElementsByClassName('refferal_form')[0];
reff.addEventListener('submit', handleReffFormSubmit);

function resetForm(elem){
    for (i in elem) {
        console.log(elem[i])
        elem[i].value = ""
    }
}