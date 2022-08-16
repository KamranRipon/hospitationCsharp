using System.Data.SQLite;

namespace Hospitation__Aufgabe
{
    public class BuildDB
    {
        Database databaseObject = new Database();

        public void InsertData(ToDoEntry toDoEntry)
        {
            string query = "INSERT INTO ToDos (`Title`, `Description`) VALUES (@Title, @Description)";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            myCommand.Parameters.AddWithValue("@Title", toDoEntry.title);
            myCommand.Parameters.AddWithValue("@Description", toDoEntry.description);

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

                    returnList.Add(toDoEntry);
                }
            }
            databaseObject.myConnection.Close();

            return returnList;
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
            string query = $"UPDATE ToDos SET Title= '{toDoEntry.title}', Description= '{toDoEntry.description}' WHERE Title == '{titleOld}'";
            SQLiteCommand myCommand = new SQLiteCommand(query, databaseObject.myConnection);

            databaseObject.myConnection.Open();

            myCommand.ExecuteNonQuery();

            databaseObject.myConnection.Close();
        }
    }
}