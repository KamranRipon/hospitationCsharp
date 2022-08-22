using System.Globalization;

namespace Hospitation__Aufgabe
{
    class ToDoList
    {
        public ToDoList() // constractor without parameters
        {
            ToDoEntry toDo = new ToDoEntry();
            bDB = new BuildDB();

            string Title = "Email";
            string Description = "Write Emails to Customer";

            bool dateTimeParse = DateTime.TryParseExact(DateTime.Now.ToString("MM/dd/yyyy"), "MM/dd/yyyy", null, DateTimeStyles.None, out DateTime Date);

            toDo.title = Title;
            toDo.description = Description;
            toDo.date = Date;

            var readDB = bDB.ReadData();

            if (readDB.FirstOrDefault(entry => entry.title == Title) == null)
            {
                toDo.title = Title;
                toDo.description = Description;
                toDo.date = Date;

                bDB.InsertData(toDo);

                Console.WriteLine("{0} ToDos Save to data base", toDo.title);
            }
        }
        public ToDoList(string title, string description, DateTime date) // constractor with parameters
        {
            ToDoEntry toDo = new ToDoEntry();

            string Title = title;
            string Description = description;
            DateTime Date = date;

            toDo.title = Title;
            toDo.description = Description;
            toDo.date = Date;

            bDB.InsertData(toDo);
        }
        private BuildDB bDB;

        public void RequestToDos(string title, string description, DateTime date)
        {
            ToDoEntry toDo = new ToDoEntry();

            var readDB = bDB.ReadData();

            if (readDB.FirstOrDefault(entry => entry.title == title) == null)
            {
                toDo.title = title;
                toDo.description = description;
                toDo.date = date;

                bDB.InsertData(toDo);

                Console.WriteLine("{0} ToDos Save to data base", toDo.title);
            }
        }

        public List<ToDoEntry> ReadElementsFromDB()
        {
            return bDB.ReadData();
        }

        public List<ToDoEntry> ReadCurrentElementsFromDB()
        {
            return bDB.ReadTodaysToDos();
        }

        public List<ToDoEntry> ReadGivenDateElementsFromDB(DateTime givendate)
        {

            return bDB.ReadGivenDateToDos(givendate);
        }

        public void RemoveElementFromDB(string title)
        {
            var readDB = bDB.ReadData();

            var toDoEntry = readDB.First(entry => entry.title == title);

            bDB.RemoveData(toDoEntry);
        }

        public void UpdateElementToDB(string titleOld, string titleNew, string description, DateTime date)
        {
            ToDoEntry toDo = new ToDoEntry();

            var updateDB = bDB.ReadData();

            if (updateDB.FirstOrDefault(entry => entry.title == titleNew) == null)
            {
                toDo.title = titleNew;
                toDo.description = description;
                toDo.date = date;
                bDB.UpdateData(toDo, titleOld);
            }
        }
    }
}