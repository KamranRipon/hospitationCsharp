using System.Data.SQLite;
using System;
namespace Hospitation__Aufgabe
{
    public class Program
    {
        public static void Main(String[] args)
        {
            // Clear Console
            Console.Clear();

            // Instance of Class CheckToDos

            //IToDoList toDoList = new ToDoList();

            Console.WriteLine("Please Enter a Number to Chose.");
            Console.WriteLine();
            Console.WriteLine("[0] Add a ToDo: ");
            Console.WriteLine("[1] Check Existing ToDos: ");
            Console.WriteLine("[2] Remove a ToDo: ");

            CheckToDos checkToDos = new CheckToDos(); // this is a variables
            // Test if input arguments were supplied:
            if (args[0] == "add" || args[0] == "Add")
            {
                Console.WriteLine("Here You can Add your ToDos.");

                checkToDos.AddItemToList();
            }

            else if (args[0] == "Remove" || args[0] == "remove")
            {
                Console.WriteLine("Here You can Remove ToDos.");

                checkToDos.RemoveCompletedToDos();

                // Remove ToDos 
                //checkToDos.RemoveCompletedToDos();
            }

            else if (args[0] == "read" || args[0] == "Read")
            {
                Console.WriteLine("Here You can Read your ToDos as CSV.");

                checkToDos.ReadExistingToDos();

                // Save ToDos 
                //checkToDos.ReadCSVFile();
            }

            else if (args[0] == "update" || args[0] == "Update")
            {
                Console.WriteLine("Update Your Database.");

                checkToDos.UpdateToDos();

                // Save ToDos 
                //checkToDos.ReadCSVFile();
            }
        }
    }
}