using System.Globalization;
namespace Hospitation__Aufgabe
{
    public class CheckToDos
    {
        ToDoList toDoList = new ToDoList();
        public void AddItemToList()
        {
            ToDoEntry toDo = new ToDoEntry();

            Console.WriteLine("Please Enter Your Request: ");
            Console.Write("Title: ");
            toDo.title = Console.ReadLine();
            Console.Write("Description: ");
            toDo.description = Console.ReadLine();

            DateTime date;

            bool dateTimeParse;
            do
            {
                Console.WriteLine("Please Enter a date in this formate 'MM-dd-yyyy'");
                Console.Write("Date: ");
                string newDate = Console.ReadLine();
                dateTimeParse = DateTime.TryParseExact(newDate, "MM-dd-yyyy", null, DateTimeStyles.None, out date);
            } while (!dateTimeParse);

            toDo.date = date;

            toDoList.RequestToDos(toDo.title, toDo.description, toDo.date);
        }
        public void ReadExistingToDos()
        {
            Console.WriteLine("Available ToDos");


            foreach (var item in toDoList.ReadElementsFromDB())
            {
                Console.WriteLine("Title: {0}, Description: {1}, Date: {2}", item.title, item.description, item.date);
            }
        }
        public void ReadCurrentToDos()
        {
            Console.WriteLine("Available ToDos");


            foreach (var item in toDoList.ReadCurrentElementsFromDB())
            {
                Console.WriteLine("Title: {0}, Description: {1}, Date: {2}", item.title, item.description, item.date);
            }
        }

        public void ReadgivendateToDos(DateTime GivenDate)
        {
            Console.WriteLine("Available ToDos");


            foreach (var item in toDoList.ReadGivenDateElementsFromDB(GivenDate))
            {
                Console.WriteLine("Title: {0}, Description: {1}, Date: {2}", item.title, item.description, item.date);
            }
        }




        public void RemoveCompletedToDos()
        {
            Console.WriteLine("Please Enter a To Do Title to Remove");

            string toDoTitle = Console.ReadLine();

            toDoList.RemoveElementFromDB(toDoTitle);

            ReadExistingToDos();
        }

        public void UpdateToDos()
        {
            Console.WriteLine("Please Enter Old Title to replace");
            string titleOle = Console.ReadLine();

            Console.WriteLine("Please Enter New Title, a description and a date in this formate 'dd/mm/yyy'");

            string newTitle = Console.ReadLine();
            string newDescription = Console.ReadLine();
            string newDate = Console.ReadLine();

            DateTime date;

            bool dateTimeParse = DateTime.TryParseExact(newDate, "MM-dd-yyyy", null, DateTimeStyles.None, out date);

            toDoList.UpdateElementToDB(titleOle, newTitle, newDescription, date);
        }
    }
}