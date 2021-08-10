//Initialize Tables Commands
const eventsTblCmd = "CREATE TABLE IF NOT EXISTS Events(EventID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, EventName TEXT, EventType TEXT, StartDateTime TEXT, EndDateTime TEXT)"
const membersTblCmd = "CREATE TABLE IF NOT EXISTS Members(MemberID INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL, Name TEXT, JoinedDate TEXT, Status TEXT)"
const attendanceTblCmd = "CREATE TABLE IF NOT EXISTS Attendance(AttendanceID INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL, TimeIn TEXT, TimeOut TEXT, EventID INTEGER NOT NULL, MemberID INTEGER NOT NULL)"

export const initializeTables = (tableName) => {
    switch (tableName) {
        case 'events':
            return eventsTblCmd
        case 'members':
            return membersTblCmd
        case 'attendance':
            return attendanceTblCmd
        default:
            break;
    }
}


//Event Table Queries/Commands
export const getAllEventsCmd = "SELECT * FROM Events"
export const getByEventIDCmd = "SELECT EV.*, MEM.MemberID, MEM.Name, ATT.TimeIn, ATT.TimeOut FROM Events EV LEFT JOIN Attendance ATT ON ATT.EventID = EV.EventID LEFT JOIN Members MEM ON ATT.MemberID = MEM.MemberID WHERE EV.EventID = ?"
export const getMemberAttendanceByIDCmd = "SELECT MEM.Name AS [Member Name], ATT.TimeIn AS [Time-In], ATT.TimeOut AS [Time-Out] FROM Events EV LEFT JOIN Attendance ATT ON ATT.EventID = EV.EventID LEFT JOIN Members MEM ON ATT.MemberID = MEM.MemberID WHERE EV.EventID = ? ORDER BY ATT.TimeIn"
export const searchEventCmd = "SELECT * FROM Events WHERE EventName = ? AND date(StartDateTime) = date(?) AND date(EndDateTime) = date(?)"
export const insertEventCmd = "INSERT INTO Events(EventName, EventType, StartDateTime, EndDateTime) VALUES(?, ?, DATETIME(?), DATETIME(?))"
export const updateEventCmd = "UPDATE Events SET EventName = ?, EventType = ?, StartDateTime = datetime(?), EndDateTime = datetime(?) WHERE EventID = ?"
export const deleteEventCmd = "DELETE FROM Events WHERE EventID = ?"


//Member Table Queries/Commands
export const getByMemberIDCmd = "SELECT MEM.*, EV.EventName, ATT.TimeIn, ATT.TimeOut FROM Members MEM LEFT JOIN Attendance ATT ON ATT.MemberID = MEM.MemberID LEFT JOIN Events EV ON ATT.EventID = EV.EventID WHERE MEM.MemberID = ? "
export const searchMemberCmd = "SELECT * FROM Members WHERE Name = ? AND Status = ?"
export const insertMemberCmd = "INSERT INTO Members(Name, JoinedDate, Status) VALUES(?, DATETIME(?), ?)"
export const updateMemberCmd = "UPDATE Members SET Name = ?, JoinedDate = datetime(?), Status = ? WHERE MemberID = ?"
export const deleteMemberCmd = "DELETE FROM Members WHERE MemberID = ?"



//Attendance Table Queries/Commands
export const getByAttendanceIDCmd = "SELECT * FROM Attendance WHERE AttendanceID = ?"
export const searchAttendanceCmd = "SELECT * FROM Attendance WHERE MemberID = ? AND EventID = ?"
export const insertAttendanceCmd = "INSERT INTO Attendance(TimeIn, TimeOut, MemberID, EventID) VALUES(DATETIME(?), DATETIME(?), ?, ?)"
export const updateAttendanceCmd = "UPDATE Attendance SET TimeIn = DATETIME(?), TimeOut = DATETIME(?) WHERE AttendanceID = ?"
export const deleteAttendanceCmd = "DELETE FROM Attendance WHERE AttendanceID = ?"
