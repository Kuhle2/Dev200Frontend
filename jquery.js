var ProvidedArray = [{
        "Date": "2016-05-18",
        "HoursAvailable": [9, 10, 11, 12, 13, 14, 17]
    },
    {
        "Date": "2016-05-19",
        "HoursAvailable": [9, 10, 11, 12, 13, 14, 15, 16, 17]
    },
    {
        "Date": "2016-05-20",
        "HoursAvailable": [9, 10, 14, 15, 16, 17]
    },
    {
        "Date": "2016-05-21",
        "HoursAvailable": [9, 10, 11, 12, 13]
    },
    {
        "Date": "2016-05-23",
        "HoursAvailable": [13, 14, 15, 16]
    },
    {
        "Date": "2016-05-24",
        "HoursAvailable": [11, 12, 15, 16, 17]
    }

];

var status;

//Function to store the selected hours 

function selectHours() {
    sessionStorage.setItem("hours", slider.value);

    if (sessionStorage.getItem("hours") === null) {

    } else {

        tableRender(sessionStorage.getItem("hours"));
    }
}

/**
 * Will take in the following values
 * Loop through the availability array 
 * Compare the provided date
 * Store the values for hours available according to the date 
 * Compares the time slots 
 * @param {int} time 
 * @param {int} joblength 
 * @param {string} date 
 * @param {string array} availability 
 */
function checkSlotAvailability(time, joblength, date, availability) {


    /**
     * ProvidedData - Stores the Provided Associative array
     * ProvidedDate - Stores a single date provided 
     * Status - Stroes if the employees slots is AVAILABLE, UNAVAILABLE, FULL 
     * ProvidedSlots - Store the Hours Available 
     * tempArray - Temporaily stores the Hours Available 
     */
    var ProvidedDate, ProvidedSlots, ProvidedData, tempArray, length, bufferTime, buffedTime;

    bufferTime = checkBuffer(time, date);



    for (let key in availability) {

        ProvidedData = availability[key];
        ProvidedDate = ProvidedData.Date;
        //Temporary store array of Hours available 
        tempArray = ProvidedData.HoursAvailable;
        //Convert Hourse available to array
        ProvidedSlots = Array.from(tempArray);

        if (ProvidedDate === date) {

            //Add the start time with the job lenth to check if employee slot is open 
            length = time + joblength;
            buffedTime = bufferTime + length;

            //Check for available condition if the Hours available includes both the time & the length 
            if ((ProvidedSlots.includes(time) && ProvidedSlots.includes(length) && ProvidedSlots.includes(buffedTime))) {

                return "Available";


            } else if ((ProvidedSlots.includes(time) && !ProvidedSlots.includes(length)) ||
                (ProvidedSlots.includes(time) && !ProvidedSlots.includes(time - bufferTime)) ||
                (ProvidedSlots.includes(time) && !ProvidedSlots.includes(bufferTime))) {

                return "Unavailable";



            } else if (!ProvidedSlots.includes(time) && !ProvidedSlots.includes(length)) {

                return "Full";



            } else {

                return "Full"
            }
        }

    }


}


/**
 * Checks the buffer time according to the given date 
 * Checks the buffer according to the time 
 * @param {int} time 
 * @param {int} joblength 
 * @param {string} date 
 * @returns 2- 2 hour buffer or 1- 1 hour buffer or 0 - no buffer
 */
function checkBuffer(time, date) {

    //switch case statements to verify time within buffer 

    switch (date) {
        case "2016-05-18":

            switch (time) {
                case 9:

                    return 0;
                    break;
                case 17:
                    return 0;

                default:

                    return 2
                    break;
            }
        default:
            switch (time) {
                case 9:

                    return 0;
                    break;
                case 17:
                    return 0;

                default:

                    return 1
                    break;
            }

    }
}

/**
 * 
 * @param {int} jLength - length of the job
 * 
 * Takes in the length of the job
 * DIsplays the table according to the job lenght 
 */
function tableRender(jLength) {

    let jobValue = parseInt(jLength);
    let table = document.querySelector('#table2');
    let thead = table.createTHead();
    let row = thead.insertRow(0);
    let th = document.createElement('th');
    let dates = [];
    let rowValues2 = [];
    let text = document.createTextNode("");
    th.appendChild(text);
    row.appendChild(th);

    let cols = ProvidedArray.length;

    //Printing the Table Headings
    for (let key in ProvidedArray) {
        dateName = ['Wednesday 18th', 'Thursday 19th', 'Friday 20th', 'Saturday 21st', 'Monday 23rd', 'Tuesday 24th'];
        // dateValues = ProvidedArray[key];
        dates.push(ProvidedArray[key].Date)
        rowValues2.push(ProvidedArray[key].HoursAvailable);
        th = document.createElement('th');
        let text = document.createTextNode(dateName[key]);
        th.appendChild(text);
        row.appendChild(th);

    }

    let tbody = document.createElement('tbody');
    table.appendChild(tbody);

    let rowValues = ['9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00'];
    let arryV = rowValues2[2];
    let timeArray = [9, 10, 11, 12, 13, 14, 15];


    for (let r = 0; r < rowValues.length; r++) {

        //Create the row time numbering 
        let rows = document.createElement('tr');

        let rowData = document.createElement('td');
        rowData.setAttribute("class", "set-time");
        let textRow = document.createTextNode(rowValues[r]);
        rowData.appendChild(textRow);
        rows.appendChild(rowData);
        tbody.appendChild(rows);


        //Insert data per colum row
        for (let c = 0; c < ProvidedArray.length; c++) {

            let rowData2 = document.createElement('td');

            /*rowData2.setAttribute("onclick", "setBacks()");*/
            rowData2.onclick = setBacks;

            let id = "setBack" + r + c;
            rowData2.setAttribute("id", id);
            rowData2.setAttribute("value", "setBack" + r + c);
            let status = checkSlotAvailability(timeArray[r], jobValue, dates[c], ProvidedArray);
            rowData2.setAttribute("class", status);
            let textRowr = document.createTextNode(status);
            rowData2.appendChild(textRowr);
            rows.appendChild(rowData2);
            tbody.appendChild(rows);

        }



    }



    sessionStorage.clear();
}