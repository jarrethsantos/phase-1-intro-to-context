//Create Employee Record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

//Create Employee Records

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);

}

//Create Time in Event

function createTimeInEvent(employeeRecord, dateStamp) {
    
    const [date, time] = dateStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: `${year}-${month}-${day}`
    };
    
    employeeRecord.timeInEvents.push(timeInEvent);
    
    return employeeRecord;
}

//Create Time Out Event

function createTimeOutEvent(employeeRecord, dateStamp) {
   
    const [date, time] = dateStamp.split(' ');
    const [year, month, day] = date.split('-');
    const [hour, minute] = time.split(':');
    
    
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: `${year}-${month}-${day}`
    };
     
    employeeRecord.timeOutEvents.push(timeOutEvent);
    
    return employeeRecord;
}




//Hours Worked On Date

function hoursWorkedOnDate(employeeRecord, date) {
    let timeIn = employeeRecord.timeInEvents.find(e => e.date === date);
    let timeOut = employeeRecord.timeOutEvents.find(e => e.date === date);

    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100;
    } else {
        return 0; // Handle case where timeIn or timeOut is missing
    }
}


//Wages Earned On Date
function wagesEarnedOnDate (employeeRecord, date) {
    let hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
}

//All Wages For

function allWagesFor (employeeRecord) {
    let datesWorked = employeeRecord.timeInEvents.map(e => e.date);
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
}

//Calculate Payroll

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    employeeRecords.forEach(employeeRecord => {
        let datesWorked = employeeRecord.timeInEvents.map(e => e.date);
        let wagesForEmployee = datesWorked.reduce((total, date) => {
            return total + wagesEarnedOnDate(employeeRecord, date);
        }, 0);

        totalPayroll += wagesForEmployee;
    });

    return totalPayroll;
}
