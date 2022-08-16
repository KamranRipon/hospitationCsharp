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

            toDoList.RequestToDos(toDo.title, toDo.description);
        }
        public void ReadExistingToDos()
        {
            Console.WriteLine("Available ToDos");

            foreach (var item in toDoList.ReadElementsFromDB())
            {
                Console.WriteLine("Title: {0}, Description: {1}", item.title, item.description);
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
            Console.WriteLine("Please Enter a To Do Title to Update");
            Console.WriteLine("Please Enter Old Title to replace");
            string titleOle = Console.ReadLine();

            Console.WriteLine("Please Enter New Title and a description");

            string newTitle = Console.ReadLine();
            string newDescription = Console.ReadLine();

            toDoList.UpdateElementToDB(titleOle, newTitle, newDescription);
        }
    }
}