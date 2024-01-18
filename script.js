var appScreens = [
    {
        name: "screenOne",
        screenDiv: document.getElementById("screen-one"),
        isVisible: true
    },
    {
        name: "screenTwo",
        screenDiv: document.getElementById("screen-two"),
        isVisible: false
    },
    {
        name: "screenThree",
        screenDiv: document.getElementById("screen-three"),
        isVisible: false
    },
    {
        name: "screenFour",
        screenDiv: document.getElementById("screen-four"),
        isVisible: false
    },
    {
        name: "screenFive",
        screenDiv: document.getElementById("screen-five"),
        isVisible: false
    },
    {
        name: "screenSix",
        screenDiv: document.getElementById("screen-six"),
        isVisible: false
    },
    {
        name: "screenSeven",
        screenDiv: document.getElementById("screen-seven"),
        isVisible: false
    },
    {
        name: "screenEight",
        screenDiv: document.getElementById("screen-eight"),
        isVisible: false
    }

];

var aidStationList = [];
var isMiles = true;
const distanceUnitDisplay = document.getElementById('distanceUnitDisplay'); 
var useBufferTime = true;
let userInput = {
    raceDistance: 0,  
    goalTimeInMinutes: 0,
    bufferTimeInMinutes: 0,
    cutOffInMinutes: 0
};

function showNextScreen() {
    // Find the currently visible screen
    var currentScreen = appScreens.find(screen => screen.isVisible);
    var currentIndex = appScreens.indexOf(currentScreen);

    // Hide the current screen
    currentScreen.isVisible = false;
    currentScreen.screenDiv.classList.remove("active");
    currentScreen.screenDiv.classList.add("screens");

    // Determine the index of the next screen
    var nextIndex = (appScreens.indexOf(currentScreen) + 1) % appScreens.length;

    // Update visibility status in the appScreens array
    appScreens[nextIndex].isVisible = true;

    // Show the next screen
    var nextScreen = appScreens[nextIndex];
    nextScreen.screenDiv.classList.remove("screens");
    nextScreen.screenDiv.classList.add("active");
}

// Function to show the previous screen
function showPreviousScreen() {
    // Find the currently visible screen
    var currentScreen = appScreens.find(screen => screen.isVisible);

    // Find the index of the current screen in the appScreens array
    var currentIndex = appScreens.indexOf(currentScreen);

    // Hide the current screen
    currentScreen.isVisible = false;
    currentScreen.screenDiv.classList.remove("active");
    currentScreen.screenDiv.classList.add("screens");

    // Determine the index of the previous screen
    var previousIndex = (currentIndex - 1 + appScreens.length) % appScreens.length;

    // Show the previous screen
    var previousScreen = appScreens[previousIndex];
    previousScreen.isVisible = true;

    // Make sure to remove "active" before adding "screens"
    previousScreen.screenDiv.classList.remove("screens");
    previousScreen.screenDiv.classList.add("active");
}

function validateDistance(input) {
    // Use a regular expression to check if the input is a valid number
    const isValidNumber = /^-?\d*\.?\d+$/.test(input);

    // Check if the input is not negative
    const isNotNegative = parseFloat(input) >= 0;

    return isValidNumber && isNotNegative;
}



function setIsMiles() {
    // Get the selected value of the radio button
    var selectedValue = document.querySelector('input[name="distanceUnit"]:checked').value;

    // Set the isMiles boolean based on the selected value
    isMiles = (selectedValue === 'miles');
    distanceUnitDisplay.textContent = isMiles ? 'Miles' : 'Kilometers';
}

function validateNumber(input) {
    //Remove non-numeric characters
    input.value = input.value.replace(/[^0-9:]/g, '');
}

function validateTwoDigitInput(inputElement) {
    // Get the input value
    let inputValue = inputElement.value;

    // Validate that the input is a one or two-digit number
    if (/^\d{1,2}$/.test(inputValue)) {
        // Valid input, do something if needed
        console.log('Valid input:', inputValue);
    } else {
        // Invalid input, clear the input or provide feedback
        console.log('Invalid input:', inputValue);
        inputElement.value = '';  // Clear the input
    }
}

function removeLeadingZeros(number) {
    // Convert the number to a string to handle leading zeroes
    const numberString = number.toString();

    // Use parseInt to remove leading zeroes and convert back to a number
    const result = parseInt(numberString, 10);

    return isNaN(result) ? 0 : result; // Return 0 if the result is NaN
}

//function setVariables() {
function setRaceDistance() {
    const distance = document.getElementById("raceDistance").value;
    userInput.raceDistance = distance;

    raceDistanceDisplay.textContent = distance;
}

function setGoalTimeInMinutes() {
    const hours = removeLeadingZeros(document.getElementById("goalTimeHours").value);
    const minutes = removeLeadingZeros(document.getElementById("goalTimeMinutes").value);
    userInput.goalTimeInMinutes = convertHHMMToMinutes(hours, minutes);
}

function setBufferTimeInMinutes() {
    const hours = removeLeadingZeros(document.getElementById("bufferTimeHours").value);
    const minutes = removeLeadingZeros(document.getElementById("bufferTimeMinutes").value);
    userInput.bufferTimeInMinutes = convertHHMMToMinutes(hours, minutes);
    if (userInput.bufferTimeInMinutes === 0 || isNaN(userInput.bufferTimeInMinutes)) {
        useBufferTime = false;
    }
  }

  function setCutoffTimeInMinutes() {
      const hours = removeLeadingZeros(document.getElementById("cutoffTimeHours").value);
      const displayMinutes = document.getElementById("cutoffTimeMinutes").value;
      const minutes = removeLeadingZeros(displayMinutes);
      userInput.cutOffInMinutes = convertHHMMToMinutes(hours, minutes);
      finalCutOffDisplay.textContent = `${hours}:${displayMinutes}`;
      console.log(userInput.cutOffInMinutes)
  }

function convertMinutesToHHMM(minutes) {
    if (typeof minutes !== 'number' || minutes < 0) {
        console.error('Invalid input. Please provide a positive number of minutes.');
        return;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.floor(minutes % 60);
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    return `${formattedHours}:${formattedMinutes}`;
}

function convertHHMMToMinutes(hours, minutes) {
    timeInMinutesOnly = hours * 60 + minutes;
    
    return timeInMinutesOnly;
}

function addRow() {
    var table = document.getElementById("myTable");
    var firstRow = table.rows[1]; 
    var newRow = firstRow.cloneNode(true);
    var inputFields = newRow.getElementsByTagName("input");

    for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].value = '';
    }

    var lastRow = table.tBodies[0].rows[table.tBodies[0].rows.length - 1];
    table.tBodies[0].insertBefore(newRow, lastRow);
    aidStationList.push({});
}

function deleteRow() {
    var table = document.getElementById("myTable");
    var lastRow = table.tBodies[0].rows[table.tBodies[0].rows.length - 1];
    if (table.rows.length > 2) {
        table.tBodies[0].removeChild(lastRow);
        aidStationList.pop();
    } else {
        console.log("Cannot delete the last row. At least one row must be present.");
    }
}

function createAidStations() {
    var rows = document.getElementById("myTable").rows;

    for (var i = 1; i < rows.length; i++) {
        var aidStation = {
            Name: getValue(rows[i].cells[0], ".nameField"),
            Distance: getValue(rows[i].cells[1], ".distanceField"),
            GoalTime: 0,
            BufferPace: 0,
            CutOffHours: getValue(rows[i].cells[2], ".asCutoffHours"),
            CutOffMinutes: getValue(rows[i].cells[3], ".asCutOffMinutes"),
            DisplayCutOff: 0,
            HardCutOff: true
        };

        aidStationList[i - 1] = aidStation;
        console.log("just made aidstations with entered info")
        console.log(aidStationList)
    }
}

function getValue(cell, className) {
    if (!cell) {
        return '';
    }

    var inputField = cell.querySelector(className);
    if (inputField) {
        return inputField.value;
    }

    return cell.textContent.trim();
}

function calculateFinishTimeColumn(aidStationList) {
    var targetPace = userInput.cutOffInMinutes / userInput.raceDistance;
        console.log("starting to calculate finish column")
     aidStationList.forEach((aidStation) => {
        if ((aidStation.CutOffHours === null || aidStation.CutOffHours === '') &&
            (aidStation.CutOffMinutes === null || aidStation.CutOffMinutes === '')) {
        // Calculate goal time in minutes for each aid station
        const goalTimeInMinutes = aidStation.Distance * targetPace;
        //Convert minutes to HHMM
        aidStation.DisplayCutOff = convertMinutesToHHMM(goalTimeInMinutes);
        aidStation.HardCutOff = false;
        console.log("aid station had a time set by user")
        }
        else {
            var hours = removeLeadingZeros(aidStation.CutOffHours);
            var minutes = removeLeadingZeros(aidStation.CutOffMinutes)
            var totalMinutes = convertHHMMToMinutes(hours, minutes);
            aidStation.DisplayCutOff = convertMinutesToHHMM(totalMinutes);
            console.log("aidstation did not have a time entered by user")
        }
    });
}

function calculateGoalTimeColumn(aidStationList) {;
    var targetPace = userInput.goalTimeInMinutes / userInput.raceDistance;
    aidStationList.forEach((aidStation) => {
        const targetTimeInMinutes = aidStation.Distance * targetPace;
        aidStation.GoalTime = convertMinutesToHHMM(targetTimeInMinutes);
    });
}

function calculateBufferTimeColumn(aidStationList) {
    var targetPace = userInput.bufferTimeInMinutes / userInput.raceDistance;
       aidStationList.forEach((aidStation) => {
        const targetTimeInMinutes = aidStation.Distance * targetPace;
        aidStation.BufferPace = convertMinutesToHHMM(targetTimeInMinutes);
    });
    console.log("calculating buffer time")
    console.log(aidStationList)
}

function calculateBufferTimeColumn(aidStationList) {
    var targetPace = userInput.bufferTimeInMinutes / userInput.raceDistance;
    aidStationList.forEach((aidStation) => {
        const targetTimeInMinutes = aidStation.Distance * targetPace;
        aidStation.BufferPace = convertMinutesToHHMM(targetTimeInMinutes);
    });
    console.log("calculating buffer time");
    console.log(aidStationList);
}

function createAidStationTable() {
    var table = document.getElementById("paceChart");
    aidStationList.forEach((aidStation) => {
        const row = table.insertRow();
        const excludedProperties = ['CutOffHours', 'CutOffMinutes'];
        for (const prop in aidStation) {
            if (aidStation.hasOwnProperty(prop) && !excludedProperties.includes(prop)) {
                const cell = row.insertCell();
                cell.textContent = aidStation[prop];
                if (prop === 'BufferPace' && !useBufferTime) {
                    cell.classList.add('bufferPaceFalse');
                }
            }
        }
    });
    const columnWidths = ['18%', '5%', '7%', '7%', '7%'];
    const cells = document.querySelectorAll('#paceChart th, #paceChart td');
    cells.forEach((cell, index) => {
        cell.style.width = columnWidths[index];
    });
}

function clearAidStationTable() {
    var table = document.getElementById("paceChart");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    const cells = document.querySelectorAll('#paceChart th, #paceChart td');
    cells.forEach((cell) => {
        cell.style.width = ''; // Reset width to default or remove the style attribute
    });
    const cellsWithClass = document.querySelectorAll('.bufferPaceFalse');
    cellsWithClass.forEach((cell) => {
        cell.classList.remove('bufferPaceFalse');
    });
}

function generatePDF() {
    const pdf = new jsPDF();
    pdf.text('Pace Chart', 20, 10);
    const wrapperDiv = document.getElementById('paceChart');
    const clonedDiv = wrapperDiv.cloneNode(true);
    clonedDiv.id = 'clonedDiv';
    document.body.appendChild(clonedDiv);
    setTimeout(() => {
        html2canvas(clonedDiv).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 20);
            document.body.removeChild(clonedDiv);
            pdf.save('PaceChart.pdf');
        });
    }, 0);
}

function makeHardCutoffsRedAndBold() {
    var table = document.getElementById("paceChart");
    for (let i = 1; i < table.rows.length; i++) {
        const hardCutoffCellValue = table.rows[i].cells[5].textContent;
        if (hardCutoffCellValue.toLowerCase() === 'true') {
            table.rows[i].cells[4].style.color = 'red';
            table.rows[i].cells[4].style.fontWeight = 'bold';
        }
    }
}

function hideTableColumn(columnIndex) {
    var table = document.getElementById("paceChart");
    for (let i = 0; i < table.rows.length; i++) {
        const cell = table.rows[i].cells[columnIndex];
        cell.classList.add('hide');
    }
}

function newChart() {
    location.reload();
}

function makeThePaceChart() {
    createAidStations()
    if (useBufferTime) { calculateBufferTimeColumn(aidStationList); }
    calculateGoalTimeColumn(aidStationList);
    calculateFinishTimeColumn(aidStationList);
    createAidStationTable();
    makeHardCutoffsRedAndBold()
    hideTableColumn(5);
    if (!useBufferTime)hideTableColumn(3)
}





     

