document.addEventListener('DOMContentLoaded', function () {
    console.log("the doc loaded");
    if(localStorage.getItem('TeacherName') !==''){
        $('#teacherid').val(localStorage.getItem('TeacherName'))
        chrome.storage.local.set({"TeacherName": localStorage.getItem('TeacherName')}, function() {
            console.log('Value is set to ' + localStorage.getItem('TeacherName'));
          });
    }
    var form = document.getElementById("teacher-form");
    console.log(form);
    form.addEventListener('submit',function(e){
        e.preventDefault();
        localStorage.setItem('TeacherName',$('#teacherid').val());
        chrome.storage.local.set({"TeacherName": localStorage.getItem('TeacherName')}, function() {
            console.log('Value is set to ' + localStorage.getItem('TeacherName'));
          });
        console.log("added to the form");
    })
});

var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
  var status = xhr.status;
  if (status === 200) {
      callback(null, xhr.response);
  } else {
      callback(status, xhr.response);
  }
  };
  xhr.send();
};

// You will need to change the getJSON line on 22 to match your details.
// getJSON('https://sheets.googleapis.com/v4/spreadsheets/{spreadsheetId}/values/{sheetName}!{cellRange}?key={yourAPIKey}',

/*getJSON('https://sheets.googleapis.com/v4/spreadsheets/1JnZDu6ur5Isfwuof2JYKz92hjTvGiM5F95CABMxBgHg/values/'+localStorage.getItem("TeacherName")+'!A2:C2?key=AIzaSyCsTLbuwfafm1IDgTttXlAsIRcijbTQrYk',
function(err, data) {
if (err !== null) {
      // alert('Something went wrong: ' + err);
  } else {
      // alert('Your query count: ' + data);
      console.log(data.values.toString());
      document.getElementById("thehours").value = data.values.toString();
      var d = new Date();
      document.getElementById("thedate").value = d.toLocaleString();
      
  }
  
});*/

getJSON('https://sheets.googleapis.com/v4/spreadsheets/1bUkTWGnG-GesotQxMaNJg4aRXAKB3GJXWb05PCyCj2E/values/'+localStorage.getItem("TeacherName")+'!A2:C2?key=AIzaSyCsTLbuwfafm1IDgTttXlAsIRcijbTQrYk',
function(err, data) {
if (err !== null) {
      // alert('Something went wrong: ' + err);
  } else {
      // alert('Your query count: ' + data);
      console.log(data.values.toString());
      document.getElementById("thehours").value = data.values.toString();
      var d = new Date();
      document.getElementById("thedate").value = d.toLocaleString();
      
  }
  
});

$('body').on('click', '*', function(event) {
    
    $('#newform').remove();
    //if ($(this).attr('class') == 'scheduleWidget__eventName') {
    if ($(this).attr('class') == 'confirm') {
      //if ($(this).attr('id') == 'wow-modal-close-2') {
      
        // ng-click="classDetails.activityInfoService.getClassDataAndShowActivityInfo(classDetails.classData.classId).opened"
        window.alert('Thank you for submitting your class results. Your payroll will be updated immediately. Have a great day!');
        var classtimeslot =  $('time').html();
        var classinfo = $('tr[ng-if="classDetails.classData.isClassFromSnB"] .wse-typo-body').html() + ' ' + $('tr[ng-if="classDetails.classData.isClassFromSnB"] td:nth-child(2)').html();

        if($('.class-details__header__info_item span').html() !== '' && $('.wse-typo-body').html() !== ''){
          var classdate = $('.class-details__header__info_item span').html().replace('<small class="wse-typo-body">Date</small>','');
        } else { 
          var classdate = "Date Info Missing";
        }
        
        // set the target on the form to point to a hidden iframe 
    // some browsers need the target set via JavaScript, no idea why...

    chrome.storage.local.get(['TeacherName'], function(result) {
        console.log('Value currently is' + result.TeacherName);
        localStorage.setItem('TeacherName',result.TeacherName);
      });


   /*$("body").append('<form id="newform" target="_blank" action="https://docs.google.com/forms/u/1/d/e/1FAIpQLScPrfP8Ocg3zgiY38GjAIig_f73rAi77lpvxIP7BUbFIxdEtw/formResponse" method="POST">');
   $("body #newform").append('<div class="appm">Save this</div>');
   $("body #newform").append('<input type="text" placeholder="Time" name="entry.1883641894" value="'+classtimeslot+'" id="fid-time"/>');
   $("body #newform").append('<input type="text" placeholder="Date" id="fid-date" name="entry.1943528712" value="'+classdate+'" class="address"/>');
   $("body #newform").append('<input type="text" placeholder="Class Info" id="fid-cinfo" name="entry.81292956" value="'+classinfo+'"/>');
   $("body #newform").append('<input type="text" placeholder="Teacher Name" id="fid-tinfo" name="entry.604884945" value="'+localStorage.getItem('TeacherName')+'"/>');
   $("body #newform").append('<input type="text" placeholder="Amount paid" id="fid-pinfo" name="entry.632266737" value="14"/>');
   $("body #newform").append('<br><input type="submit" id="savebutton" value="Save" />');
    
   $('#newform').submit();*/
    
   $("body").append('<form id="newform" target="_blank" action="https://docs.google.com/forms/u/0/d/1eBmrlBqXs3jpNxnk8N0cB8ScxVCtZ0mYVc97dXkkdEs/formResponse" method="POST">');
   $("body #newform").append('<div class="appm">Save this</div>');
   $("body #newform").append('<input type="text" placeholder="Time" name="entry.1940378278" value="'+classtimeslot+'" id="fid-time"/>');
   $("body #newform").append('<input type="text" placeholder="Date" id="fid-date" name="entry.360878562" value="'+classdate+'" class="address"/>');
   $("body #newform").append('<input type="text" placeholder="Class Info" id="fid-cinfo" name="entry.1007262389" value="'+classinfo+'"/>');
   $("body #newform").append('<input type="text" placeholder="Teacher Name" id="fid-tinfo" name="entry.1805194290" value="'+localStorage.getItem('TeacherName')+'"/>');
   $("body #newform").append('<input type="text" placeholder="Amount paid" id="fid-pinfo" name="entry.382019728" value="14"/>');
   $("body #newform").append('<br><input type="submit" id="savebutton" value="Save" />');
    
   $('#newform').submit();
   
    /*document.getElementById('my-form').target = 'my-response-iframe';
    // detect when the iframe reloads
    var iframe = document.getElementById('my-response-iframe');
    if (iframe) {
      iframe.onload = function () {
        // now you can do stuff, such as displaying a message or redirecting to a new page.
        alert('I think this works too');
      }
    }*/

       // $.post( "https://docs.google.com/forms/u/0/d/e/1FAIpQLScPrfP8Ocg3zgiY38GjAIig_f73rAi77lpvxIP7BUbFIxdEtw/formResponse", { 'entry.604884945': "John", 'entry.1943528712': "2pm" } );
    }

    //window.alert('ID of Parent element=' + $(this).attr('ng-click'));
});

//ng-click="feedback.finishClass()"
//https://docs.google.com/forms/u/0/d/e/1FAIpQLScPrfP8Ocg3zgiY38GjAIig_f73rAi77lpvxIP7BUbFIxdEtw/formResponse 
//name="entry.604884945" time
//name="entry.1943528712" date
//name="entry.81292956" class info
//https://docs.google.com/forms/u/0/d/1pMtOTx8v7c82_JW_XL-TM4hfXU_8YI15TELoCailXP4/prefill


    

if (window.parent.$("#my-response-iframe").length > 0) {
    window.parent.$("#my-response-iframe")[0].contentDocument.forms[0].submit();
}