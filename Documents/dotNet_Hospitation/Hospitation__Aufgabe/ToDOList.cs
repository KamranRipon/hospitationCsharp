using System.Text;

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

            toDo.title = Title;
            toDo.description = Description;

            bDB.InsertData(toDo);
        }

        public ToDoList(string title, string description) // constractor with parameters
        {
            ToDoEntry toDo = new ToDoEntry();

            string Title = title;
            string Description = description;

            toDo.title = Title;
            toDo.description = Description;

            bDB.InsertData(toDo);
        }
        private BuildDB bDB;

        public void RequestToDos(string title, string description)
        {
            ToDoEntry toDo = new ToDoEntry();


            toDo.title = title;
            toDo.description = description;

            bDB.InsertData(toDo);
        }

        public List<ToDoEntry> ReadElementsFromDB()
        {
            //return bDB.returnList;

            return bDB.ReadData();
        }

        public void RemoveElementFromDB(string title)
        {
            var readDB = bDB.ReadData();

            var toDoEntry = readDB.First(entry => entry.title == title);

            bDB.RemoveData(toDoEntry);
        }

        public void UpdateElementToDB(string titleOld, string titleNew, string description)
        {
            var updateDB = bDB.ReadData();

            var toDoEntry = updateDB.First(entry => entry.title == titleOld);

            toDoEntry.title = titleNew;
            toDoEntry.description = description;

            bDB.UpdateData(toDoEntry, titleOld);
        }
    }
}