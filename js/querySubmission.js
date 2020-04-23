const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    data[element.name] = element.value;
    return data;
  }, {});


var url = 'https://script.google.com/macros/s/AKfycbxWQfbWKf9QyROa6SBHsxXvn5_YFSiu-h9n7ssPhB6IpWC6stqv/exec';
const handleFormSubmit = event => {
// Stop the form from submitting since we’re handling that with AJAX.
event.preventDefault();
// Call our function to get the form data.
const data = formToJSON(form.elements);
var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: data,
    error : function(){$("#querySubmitting").css("display","none");$("#querySubmitBtn").html("Error!");setTimeout(()=>{$("#querySubmitBtn").html("Send");},2000)} // On Error
});
$("#querySubmitting").css("display","block");
$("#querySubmitBtn").html("Submitting");

};
  $(document).ajaxSuccess(()=>{
    // alert("Success");
    // alert('Thank You! We will get back to you soon! success');
    $("#querySubmitting").css("display","none");
    $("#querySubmitBtn").html("Submitted");
    setTimeout(()=>{$("#querySubmitBtn").html("Send");},2000)


  })    
const form = document.getElementsByClassName('product-enquery')[0];

form.addEventListener('submit', handleFormSubmit);