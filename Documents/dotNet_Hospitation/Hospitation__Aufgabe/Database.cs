using System.Data.SQLite;
using System.IO;

namespace Hospitation__Aufgabe
{
    public class Database
    {
        public SQLiteConnection myConnection;

        public Database()
        {
            myConnection = new SQLiteConnection("Data Source=database.sqlite3");
            if (!File.Exists("./database.sqlite3"))
            {
                SQLiteConnection.CreateFile("database.sqlite3");

                Console.WriteLine("Database File Created");
            }
        }
    }
}

