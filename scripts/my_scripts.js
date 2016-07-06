
$(document).ready(function(){

	showFrequency();
	getXMLRacers(); // initial call
	startAJAXcalls(); // begin repeat cycle

	// handlers to start and resume updates
	$('#btnStop').click(function(){
		repeat = false;
		$('#freq').text('Updates Paused...');

	});
	$('#btnStart').click(function(){
		repeat = true;
		startAJAXcalls();
		showFrequency();
	});

});

var FREQ = 10000;
var repeat = true; // updates will repeat if true

// var getInfo = true;
// startAJAXcalls insert conditional that if (getInfo) ...
// button stop .click(function(){ getInfo = false; }) // will put brakes on startAJAXcalls
// button resume .click(function(){ getInfo = true; startAJAXcalls(); })


// self referencing function prevents buildups
// wait 10 sec, call function, repeat by calling self
function startAJAXcalls(){
	if (repeat) {
		setTimeout(
			function(){
				getXMLRacers();
				startAJAXcalls();
			},
			FREQ
		);
	}
}

// execute ajax call, success f. empties finisher ul's, finds each runner, extracts info to build info string, appends string to DOM, calls getTime
function getXMLRacers(){
	$.ajax({
		url: 'finishers.xml',
		cache: false,
		dataType: 'xml',
		success: function(xml){
			$('#finishers_m').empty();
			$('#finishers_f').empty();
			$('#finishers_all').empty();

			// iterate runners, extracting & appending info
			$(xml).find('runner').each(function(){
				var info = '<li>Name: ' + $(this).find('fname').text() + ' ' + $(this).find('lname').text() + '. Time: ' + $(this).find('time').text() + '</li>';
				if ( $(this).find('gender').text() == 'm' ){
					$('#finishers_m').append(info);
				} else if ( $(this).find('gender').text() == 'f' ){
					$('#finishers_f').append(info);
				} else { }
				$('#finishers_all').append(info);
			});

			getTimeAjax();
		} // end success
	}); // end ajax
} // end getXMLRacers

function showFrequency(){
	$('#freq').text('Page refreshes every ' + FREQ/1000 + ' second(s).');
}

function getTimeAjax(){
	// load is a jquery ajax convenience method to load the file
	$('#updatedTime').load('time.php');
}



// REPLACED WITH GETTIMEAJAX FUNCTION
// function getTime(){
//     var a_p = "";
//     var d = new Date();
//     var curr_hour = d.getHours();
//     (curr_hour < 12) ? a_p = "AM" : a_p = "PM";
//     (curr_hour == 0) ? curr_hour = 12 : curr_hour = curr_hour;
//     (curr_hour > 12) ? curr_hour = curr_hour - 12 : curr_hour = curr_hour;
//     var curr_min = d.getMinutes().toString();
//     var curr_sec = d.getSeconds().toString();
//     if (curr_min.length == 1) { curr_min = "0" + curr_min; }
//     if (curr_sec.length == 1) { curr_sec = "0" + curr_sec; }
//     $('#updatedTime').html(curr_hour + ":" + curr_min + ":" + curr_sec + " " + a_p );
// }
