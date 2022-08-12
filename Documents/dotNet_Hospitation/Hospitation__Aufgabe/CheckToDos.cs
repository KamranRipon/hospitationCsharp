namespace Hospitation__Aufgabe
{
    public class CheckToDos : ICheckToDoList
    {
        IToDoList toDoList = new ToDoList();

        public void AddItemToList()
        {
            ToDoEntry toDo = new ToDoEntry();

            Console.WriteLine("Please Enter Your Request: ");
            Console.Write("Title: ");
            toDo.title = Console.ReadLine();
            Console.Write("Description: ");
            toDo.description = Console.ReadLine();

            toDoList.RequestToDos(toDo.title, toDo.description);

            //toDoList.AllToDoList().Add(toDo);
        }
        public void ReadExistingToDos()
        {
            foreach (var item in toDoList.AllToDoList())
            {
                Console.WriteLine("List Title: {0}, Descripton: {1}", item.title, item.description);
            }
        }
        public void RemoveCompletedToDos()
        {
            Console.WriteLine("Which Todos You have Completed ");

            var itemTitle = Console.ReadLine();

            // Check Item Title name
            toDoList.CheckItemNameForRemove(itemTitle);

            do
            {
                if (itemTitle == "Quit" || itemTitle == "quit")
                {
                    break;
                }
                else
                {
                    Console.WriteLine("Please enter a title of ToDos");
                    Console.WriteLine("Here is the list of Existing ToDos");
                    Console.WriteLine();
                    ReadExistingToDos();

                    Console.WriteLine();
                    Console.WriteLine("Write \"Quit\" to exit");

                    itemTitle = Console.ReadLine();
                    toDoList.CheckItemNameForRemove(itemTitle);
                }
            } while (itemTitle == "");

            Console.WriteLine("Remaining ToDos are: ");
            Console.WriteLine();

            toDoList.RemoveItem(itemTitle);

            // Remove an Item from List
            ReadExistingToDos();
        }

        public void SaveToCSV()
        {
            toDoList.GenerateCsv(toDoList.AllToDoList(), @"csvFile2.csv");
        }

        public void ReadCSVFile()
        {
            toDoList.ReadingCSVFile(@"csvFile.csv");
        }
    }
}