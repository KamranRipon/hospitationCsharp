namespace Hospitation__Aufgabe
{
    public class Program
    {
        public static void Main(String[] args)
        {
            // Clear Console
            Console.Clear();

            // Instance of Class CheckToDos
            ICheckToDoList checkToDos = new CheckToDos();
            //IToDoList toDoList = new ToDoList();

            Console.WriteLine("Please Enter a Number to Chose.");
            Console.WriteLine();
            Console.WriteLine("[0] Add a ToDo: ");
            Console.WriteLine("[1] Check Existing ToDos: ");
            Console.WriteLine("[2] Remove a ToDo: ");


            // Test if input arguments were supplied:
            if (args[0] == "add" || args[0] == "Add")
            {
                Console.WriteLine("Here You can Add your ToDos.");

                checkToDos.AddItemToList();

                checkToDos.SaveToCSV();
            }

            else if (args[0] == "check" || args[0] == "Check")
            {
                Console.WriteLine("Here You can Check your all Availible ToDos.");

                checkToDos.ReadExistingToDos();
            }

            else if (args[0] == "Remove" || args[0] == "remove")
            {
                Console.WriteLine("Here You can Remove ToDos.");

                // Remove ToDos 
                checkToDos.RemoveCompletedToDos();
            }

            else if (args[0] == "read" || args[0] == "Read")
            {
                Console.WriteLine("Here You can Read your ToDos as CSV.");

                // Save ToDos 
                checkToDos.ReadCSVFile();
            }
        }
    }
}