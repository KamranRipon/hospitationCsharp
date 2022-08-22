using System.Data.SQLite;

namespace Hospitation__Aufgabe
{
    public class BuildDB
    {
        Database databaseObject = new Database();

        public void InsertData(ToDoEntry toDoEntry)
        {
            string query = "INSERT INTO ToDos (`Title`, `Description`, `Date`) VALUES (@Title, @Description, @Date)";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            myCommand.Parameters.AddWithValue("@Title", toDoEntry.title);
            myCommand.Parameters.AddWithValue("@Description", toDoEntry.description);
            myCommand.Parameters.AddWithValue("@Date", toDoEntry.date);

            myCommand.ExecuteNonQuery();

            databaseObject.myConnection.Close();
        }

        public List<ToDoEntry> ReadData()
        {
            List<ToDoEntry> returnList = new List<ToDoEntry>();
            string query = "SELECT * FROM ToDos";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            SQLiteDataReader result = myCommand.ExecuteReader();

            if (result.HasRows)
            {
                while (result.Read())
                {
                    ToDoEntry toDoEntry = new ToDoEntry();

                    toDoEntry.title = result["Title"] as string;
                    toDoEntry.description = result["Description"] as string;
                    toDoEntry.date = Convert.ToDateTime(result["Date"]);

                    returnList.Add(toDoEntry);
                }
            }
            databaseObject.myConnection.Close();

            return returnList;
        }

        public List<ToDoEntry> ReadTodaysToDos()
        {
            List<ToDoEntry> returnTodaysList = new List<ToDoEntry>();
            string query = "SELECT * FROM ToDos";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            SQLiteDataReader result = myCommand.ExecuteReader();

            if (result.HasRows)
            {
                while (result.Read())
                {
                    ToDoEntry toDoEntry = new ToDoEntry();

                    toDoEntry.title = result["Title"] as string;
                    toDoEntry.description = result["Description"] as string;
                    toDoEntry.date = Convert.ToDateTime(result["Date"]);

                    if (toDoEntry.date == DateTime.Today)
                    {
                        returnTodaysList.Add(toDoEntry);
                    }
                }
            }
            databaseObject.myConnection.Close();

            return returnTodaysList;
        }

        public List<ToDoEntry> ReadGivenDateToDos(DateTime givenDate)
        {
            List<ToDoEntry> returnTodaysList = new List<ToDoEntry>();
            string query = "SELECT * FROM ToDos";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            SQLiteDataReader result = myCommand.ExecuteReader();

            if (result.HasRows)
            {
                while (result.Read())
                {
                    ToDoEntry toDoEntry = new ToDoEntry();

                    toDoEntry.title = result["Title"] as string;
                    toDoEntry.description = result["Description"] as string;
                    toDoEntry.date = Convert.ToDateTime(result["Date"]);

                    if (toDoEntry.date == givenDate)
                    {
                        returnTodaysList.Add(toDoEntry);
                    }
                }
            }
            databaseObject.myConnection.Close();

            return returnTodaysList;
        }

        public void RemoveData(ToDoEntry toDoEntry)
        {
            string query = $"DELETE FROM ToDos WHERE Title == '{toDoEntry.title}'";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            myCommand.ExecuteNonQuery();

            databaseObject.myConnection.Close();
        }
        public void UpdateData(ToDoEntry toDoEntry, string titleOld)
        {
            string query = $"UPDATE ToDos SET Title= '{toDoEntry.title}', Description= '{toDoEntry.description}', Date= '{toDoEntry.date}' WHERE Title == '{titleOld}'";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            myCommand.ExecuteNonQuery();

            databaseObject.myConnection.Close();
        }
    }
}