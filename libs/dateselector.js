/* Dateselector for TMG Front End Assesment 
Version: 1.0 Beta
Build: Initial
Developed by Triadi Prabowo (triadiprabowo@gmail.com)
Required jQuery library to use these scripts */

//Global data variables set by default
var dataVar = {
	fullMonthNames: ["January", "February", "March", "April", "May", 
	"June", "July", "August", "September", "October", "November", "December"],
	shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", 
	"Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	fullDayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", 
	"Thursday", "Friday", "Saturday"],
	shortDayNames: ["Sun", "Mon", "Tue", "Wed", 
	"Thu", "Fri", "Sat"],
	currentDate: "",
	getDatesPerMonth: [],
	currentDate: 0,
	currentMonth: 0,
	currentYear: 0,
	fullCurrentDate: 0
};

//Normal function to get current date
function setCurrentDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth();
	var yy = today.getFullYear();

	if(dd < 10) {
		dd = "0" + dd;
	}

	if(mm < 10) {
		mm = "0" + mm;
	}

	today = dd+'/'+mm+'/'+yy;
	
	this.dataVar.currentDate = today.substr(1, 1);
	this.dataVar.currentMonth = today.substr(4, 1);
	this.dataVar.currentYear = today.substr(6);
	this.dataVar.fullCurrentDate = today;
}

//Get 1st day in month of current year
function getFirstDay(year, month) {
	var _first = new Date(year, month, 1);
	return _first.getDay();
}

// Set Dates per Month and verify if it is leap year or not!
function setDatesPerMonth(year) {
	if(year % 4 == 0 || year % 100 == 0 || year % 400 == 0) {
		this.dataVar.getDatesPerMonth = []; //Empty array lists before pushing
		this.dataVar.getDatesPerMonth.push("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30"," 31");
	}
	else {		
		this.dataVar.getDatesPerMonth = []; // Empty array lists before pushing
		this.dataVar.getDatesPerMonth.push("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30"," 31");
	}
}

function monthYearSelector() {
	// Month Selector
	var monthSelector = "<select id=dateselector-ui-monthselector>";
	for(var i=0; i < this.dataVar.fullMonthNames.length; i ++) {
		if(i == this.dataVar.currentMonth) {
			monthSelector += "<option value="+i+" selected=selected>" + this.dataVar.fullMonthNames[i] + "</option>";
		}
		else {
			monthSelector += "<option value="+i+">" + this.dataVar.fullMonthNames[i] + "</option>";
		}

		if(i == this.dataVar.fullMonthNames.length) {
			monthSelector += "</select>";
		}
	}

	// Year Selector
	var yearSelector = "<select id=dateselector-ui-yearselector>";
	for(var j=1970; j <= 2070; j++) {
		if(j == this.dataVar.currentYear) {
			yearSelector += "<option value="+j+" selected=selected>" + j + "</option>";
		}
		else {
			yearSelector += "<option value="+j+">" + j + "</option>";
		}

		if(j == 2070) {
			monthSelector += "</select>";
		}
	}

	$('#wkh').html("");
	$('#wkh').append(monthSelector + yearSelector);
}

function fullPopulateDate() {
	//Call setCurrentDate() function!
	setCurrentDate();
	var content = "<table border=0 class=dateselector-ui-table>" ;
	//Table Header for Current Month and Year
	content += 	"<thead><tr>" +
					"<th colspan=7 id=wkh>" + this.dataVar.fullMonthNames[this.dataVar.currentMonth] + " " + this.dataVar.currentYear + "</th>" +
				"</tr>";

	//Assembling table header for list of days
	content += 	"<tr>" +
					"<th class=disabled>Sun</th>" +
					"<th>Mon</th>" +
					"<th>Tue</th>" +
					"<th>Wed</th>" +
					"<th>Thu</th>" +
					"<th>Fri</th>" +
					"<th>Sat</th>" +
				"</tr></thead>";

	//Close table tags	
	content += "</table>";

	return content;
}


function selectorHandler() {
	var string = "";
	$('.dateselector-ui-table td').click(function () {		
		var monthValue = $('#dateselector-ui-monthselector').val();
		monthValue = parseInt(monthValue) + 1;
		var yearValue = $('#dateselector-ui-yearselector').val();

    	if(parseInt(monthValue) < 10) {
    		monthValue = "0" + monthValue;
    	}

    	var string = $(this).html() + "-" + monthValue + "-" + yearValue;

    	if(parseInt($(this).html()) < 10) {
    		string = "0" + string;
    	}

    	if($(this).hasClass('disabled')) {
    	}

    	else {
    		return string;
    	}
	});
}

function appendDates() {
	var monthValue = $('#dateselector-ui-monthselector').val();
	var yearValue = $('#dateselector-ui-yearselector').val();
	setDatesPerMonth(yearValue);
	var firstDay = getFirstDay(yearValue, monthValue);
	var totalDates = this.dataVar.getDatesPerMonth[monthValue];
	var content = "<tr>";
	var pastValue = this.dataVar.getDatesPerMonth[parseInt(monthValue) - 1] - (parseInt(firstDay) + 1);

	if(monthValue == 0) {
		pastValue = this.dataVar.getDatesPerMonth[11] - firstDay + 1;
	}

		for(var j=1; j <= totalDates; j++) {
			var date = j;
			var month = monthValue;
			var year = yearValue;

			if(date < 10) {
				date = "0" + date;
			}
			else {
				date = j;
			}

			if(month < 10) {
				month = "0" + month;
			}
			else {
				month = monthValue;
			}

			var currDate =  date + "/" + month + "/" + year;

			var pastMonth = parseInt($('#dateselector-ui-monthselector').val()) - 1;
			if(pastMonth < 0) {
				pastMonth = 11;
			}

			//Add blank space before first day
			if(j <= firstDay) {
				content += "<td class='past'>" + pastValue++ + "</td>";
				totalDates++;
			}
			//Else statement
			else {
				// if 'j' equals with current date
				if(currDate == this.dataVar.fullCurrentDate) {
					content += "<td class='current disabled'>" + (j - firstDay) + "</td>";
				}
				else if(j == 1) {
					content += "<td id=month"+this.dataVar.shortMonthNames[monthValue]+">" + (j - firstDay) + "</td>";
				}
				else {
					content += "<td>" + (j - firstDay) + "</td>";
				}
			}

			if(j % 7 == 0 || j == totalDates) {
				content += "</tr><tr>";				
			}			
		}

	$('.dateselector-ui-table').append(content).show('slow');	
	$('.past:first-child').attr('id', 'month' + this.dataVar.shortMonthNames[pastMonth]);
	fillLastRow();
}

function fillLastRow() {
	var done = false;
	var i = 1;
	var monthValue = parseInt($('#dateselector-ui-monthselector').val()) + 1;

	if(monthValue > 11) {
		monthValue = 0;
	}	

	while(!done) {
		if($('.dateselector-ui-table tbody tr:nth-last-child(2) td').length < 7) {
			if(i == 1) {
				$('.dateselector-ui-table tbody tr:nth-last-child(2)').append("<td id=month"+ this.dataVar.shortMonthNames[monthValue] + ">" + i++ + "</td>");		
			}
			else {
				$('.dateselector-ui-table tbody tr:nth-last-child(2)').append("<td>" + i++ + "</td>");		
			}
		}
		else {		
			done = true;		
		}
	}
}

//Remove Element Function
function removeDateSelector() {
	$('.dateselector-ui-table').each(function() {
		$(this).detach();		
	});
}

//Function disable past
function disablePast() {
	var month = $('.dateselector-ui-monthselector').val();
	var year = $('.dateselector-ui-yearselector').val();

	if(month < this.dataVar.currentMonth || year < this.dataVar.currentYear) {
		$('.dateselector-ui-table tbody td').addClass('disabled');
	}
}

function scrollHandler() {
	$('.dateselector-ui-table tbody tr:first-child').append('<td id=dateselector-ui-backward class=disabled>&#9650;</td>');
	$('.dateselector-ui-table tbody tr:nth-last-child(2)').append('<td id=dateselector-ui-forward class=disabled>&#9660;</td>');

	var monthval = parseInt($('#dateselector-ui-monthselector').val());
	
	$('#dateselector-ui-backward').click(function() {
		if(monthval > 0) {
			$('#dateselector-ui-monthselector').prop('selectedIndex', monthval = monthval -1).change();
		}
		else if(monthval <= 0) {
			$(this).addClass('dateselector-ui-max');
		}


		//Disabling date before current date
		$(".dateselector-ui-table tbody td:first").nextUntil('td.current').addClass('disabled');
	});		

	$('#dateselector-ui-forward').click(function() {
		if(monthval < 11) {
			$('#dateselector-ui-monthselector').prop('selectedIndex', monthval = monthval+1).change();
		}
		else if(monthval >= 11) {
			$(this).addClass('dateselector-ui-max');
		}

		//Disabling date before current date
		$(".dateselector-ui-table tbody td:first").nextUntil('td.current').addClass('disabled');
	});		
}

$.fn.extend({
	dateSelector: function() {	
		$(this).attr('readonly', true);
		$(this).prop('readonly', true);
		$(this).wrap('<div class=dateselector-ui-wrapper></div>');

		var count = 0;
		
		$(this).click(function() {						
			if($('body').hasClass('.dateselector-ui-table') == false) {
				removeDateSelector();
				var a = this;
				if(count == 0) {
					$(fullPopulateDate()).insertAfter(this).toggle("slow");
					//Add monthyear selector to table header
					//Append Month Year Selector	
					monthYearSelector();
					appendDates();					
					scrollHandler();
					//Add class to first column
					$(".dateselector-ui-table td:first-child").addClass("disabled");

					//Disabling date before current date
					$(".dateselector-ui-table tbody td:first").nextUntil('td.current').addClass('disabled');
					
					// Selector Month onChange
					$('#dateselector-ui-monthselector').on('change', function() {
						//Replace table date contents
						$('.dateselector-ui-table tbody tr').replaceWith(appendDates()).show('slow');
						//Add class to first column
						$(".dateselector-ui-table td:first-child").addClass("disabled");	
						scrollHandler();						
						//Disabling date before current date
						$(".dateselector-ui-table tbody td:first").nextUntil('td.current').addClass('disabled');
						// Disable past dates
						if(parseInt(this.value) < parseInt(dataVar.currentMonth)) {
							$('.dateselector-ui-table tbody td').addClass('disabled');
						}

						// Select Date Function
						$('.dateselector-ui-table td').click(function () {		
							var monthValue = $('#dateselector-ui-monthselector').val();
							monthValue = parseInt(monthValue) + 1;
							var yearValue = $('#dateselector-ui-yearselector').val();

					    	if(parseInt(monthValue) < 10) {
					    		monthValue = "0" + monthValue;
					    	}

					    	var string = $(this).html() + "-" + monthValue + "-" + yearValue;

					    	if(parseInt($(this).html()) < 10) {
					    		string = "0" + string;
					    	}

					    	if($(this).hasClass('disabled')) {
					    		//Do Nothing
					    	}

					    	else {
					    		$(a).val(string);
					    		removeDateSelector();
					    	}
						});
						
						fillLastRow();
					});

					// Selector Year onChange
					$('#dateselector-ui-yearselector').on('change', function() {
						//Replace table date contents
						$('.dateselector-ui-table tbody tr').replaceWith(appendDates());						
						//Add class to first column
						$(".dateselector-ui-table td:first-child").addClass("disabled");
						scrollHandler();						
						//Disabling date before current date
						$(".dateselector-ui-table tbody td:first").nextUntil('td.current').addClass('disabled');
						// Disable past dates
						if(parseInt(this.value) < parseInt(dataVar.currentYear)) {
							$('.dateselector-ui-table tbody td').addClass('disabled');
						}

						// Select Date Function	if Year Changed		
						$('.dateselector-ui-table td').click(function () {		
							var monthValue = $('#dateselector-ui-monthselector').val();
							monthValue = parseInt(monthValue) + 1;
							var yearValue = $('#dateselector-ui-yearselector').val();

					    	if(parseInt(monthValue) < 10) {
					    		monthValue = "0" + monthValue;
					    	}

					    	var string = $(this).html() + "-" + monthValue + "-" + yearValue;

					    	if(parseInt($(this).html()) < 10) {
					    		string = "0" + string;
					    	}

					    	if($(this).hasClass('disabled')) {
					    		//Do Nothing
					    	}

					    	else {
					    		$(a).val(string);
					    		removeDateSelector();
					    	}
						});
						fillLastRow();						
					});

					$('.dateselector-ui-table').scroll(function() {
						var y = $(this).scrollTop();

						if(y > 1) {
							//$('.dateselector-ui-monthselector option:eq('+ parseInt($('.dateselector-ui-monthselector').val()) + 1 +')').prop('selected', true);
							alert(123);
						}
					});

					$('.dateselector-ui-table td').click(function () {		
						var monthValue = $('#dateselector-ui-monthselector').val();
						monthValue = parseInt(monthValue) + 1;
						var yearValue = $('#dateselector-ui-yearselector').val();

				    	if(parseInt(monthValue) < 10) {
				    		monthValue = "0" + monthValue;
				    	}

				    	var string = $(this).html() + "-" + monthValue + "-" + yearValue;

				    	if(parseInt($(this).html()) < 10) {
				    		string = "0" + string;
				    	}

				    	if($(this).hasClass('disabled')) {
				    		//Do Nothing
				    	}

				    	else {
				    		$(a).val(string);
				    		removeDateSelector();
				    	}
					});

					count++;	
				}
				// Else count not zero
				else {
					$(document).mouseup(function (e) {
					    var container = $(".dateselector-ui-table");

					    if (!container.is(e.target) // if the target of the click isn't the container...
					        && container.has(e.target).length === 0) {
					        removeDateSelector();
					    }
					});	

					$(document).keyup(function(event) {
					    if(event.which === 27) {
					        removeDateSelector();
					    }
					});
					count = 0;
				}
			}

			//If document has dateselector
			else {
				removeDateSelector();
			}		
		});	
	}
});