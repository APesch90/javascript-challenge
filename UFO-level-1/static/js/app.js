// Get a reference to the table body.
var tbody = d3.select("tbody");

// Iterate through the JS objects in the data.js array.
data.forEach(function(ufoData){
    // Use d3 to append on table row for each object.
    var row = tbody.append("tr");
    // Now add the row data - use Object.entries.
    Object.entries(ufoData).forEach(function ([key,value]){
        // Use d3 to append 1 cell per value.
        var cell = row.append("td");
        cell.text(value);
    
    })

});

// Getting a reference to the "Filter" button.
var filterButton = d3.select("#filter-btn");

// Getting a reference to the input element.
var formDate = d3.select("#datetime");

// Set up action once event happens.
filterButton.on("click",runFilter);
formDate.on("submit", runFilter);

// Initiate a function to be used when the "Filter" button is clicked.
function runFilter() {
    // Prevent the page from refreshing.
    d3.event.preventDefault();
    
    /* Turn inputDate into an array separated into Year, Month, and Day.
       Our data doesn't pad single digit month or day values with a zero, so we 
       remove zero padding and reassemble the date in the same format as our data.
       This ensures we are able to get an exact match against our data.*/

    var inputDate = d3.select("#datetime").property("value");
    var dateSplit = inputDate.split("-") 
    var year = dateSplit[0]
    var month = dateSplit[1]
    if (parseInt(month) < 10) {
      var month = month[1]
    }
    var day = dateSplit[2]
    if (parseInt(day) < 10) {
      var day = day[1]
    }
    var newDate = month + "/" + day + "/" + year
    
    // Use getElementById function to grab the ufo-table element, store in variable.
    // Use getElementsByTagName to grab tr element, store in variable.
    table = document.getElementById("ufo-table");
    tr = table.getElementsByTagName("tr");
    
    // Create an arrow function to filter all dates that match between the table and input date.
    var filteredData = data.filter(filteredData => filteredData.datetime === newDate)
    // Iterate through the rows of table data to hide the table rows based on the input filter criteria.
    // i FOR LOOP is iterating through the table data, one row at a time.
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        // Get the date value from our table.
        dateValue = td.innerText;
        // j FOR LOOP is iterating through the FILTERED data object array, one at a time. 
        for(j=0; j<filteredData.length; j++) {
            if (dateValue.indexOf(filteredData[j].datetime) > -1 ) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
            }
        }
    }        
};
