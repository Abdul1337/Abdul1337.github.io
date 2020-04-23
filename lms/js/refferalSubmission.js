var url = 'https://script.google.com/macros/s/AKfycbyN87qlUkDn0jVXcy_gvxi7tryag-GPX-PZlpm43qmdI88rKHo/exec';
const handleReffFormSubmit = event => {
// Stop the form from submitting since we’re handling that with AJAX.
event.preventDefault();
// Call our function to get the form data.
const data = formToJSON(reff.elements);
var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: data,
    error : function(){$("#querySubmitting").css("display","none");$("#querySubmitBtn").html("Error!");setTimeout(()=>{$("#querySubmitBtn").html("Send");},2000)} // On Error
});
$("#refFormSubmitting").css("display","block");
$("#refFormSubmitBtn").html("Submitting");

};
  $(document).ajaxSuccess(()=>{
    // alert("Success");
    // alert('Thank You! We will get back to you soon! success');
    $("#refFormSubmitting").css("display","none");
    $("#refFormSubmitBtn").html("Submitted");
    setTimeout(()=>{$("#refFormSubmitBtn").html("Submit");},2000);
    document.getElementById("refForm").reset();
    setTimeout(()=>{
      document.getElementsByClassName('refferal_form_section')[0].style.display = 'none';
      document.getElementsByClassName('reff_section_overlay')[0].style.display = 'none';
    },2000);
    // document.getElementsByClassName('refferal_form_section')[0].style.display = 'none';
    // document.getElementsByClassName('reff_section_overlay')[0].style.display = 'none'
  })    
const reff = document.getElementsByClassName('refferal_form')[0];
reff.addEventListener('submit', handleReffFormSubmit);