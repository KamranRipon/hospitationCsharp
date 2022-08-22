using System.Data.SQLite;
using System;

using System.Globalization;
namespace Hospitation__Aufgabe
{
    public class Program
    {
        public static void Main(String[] args)
        {
            // Clear Console
            //Console.Clear();


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
            }

            // else if (args[0] == "read" || args[0] == "Read")
            // {
            //     Console.WriteLine("Here You can Read your ToDos as CSV.");

            //     checkToDos.ReadExistingToDos();
            // }

            else if (args[0] == "today")
            {
                Console.WriteLine("Here You can Read your ToDos as CSV.");

                checkToDos.ReadCurrentToDos();
            }

            else if (args[0] == "read")
            {
                if (args.Length > 1)
                {
                    DateTime date;
                    bool dateTimeParse;
                    string newDate = args[1];
                    // do
                    // {
                    //     Console.WriteLine("Please Enter a date in this formate 'MM-dd-yyyy'");
                    //     Console.Write("Date: ");
                    //     //string newDate = Console.ReadLine();

                    //     dateTimeParse = DateTime.TryParseExact(newDate, "MM-dd-yyyy", null, DateTimeStyles.None, out date);
                    // } while (!dateTimeParse);

                    dateTimeParse = DateTime.TryParseExact(newDate, "MM-dd-yyyy", null, DateTimeStyles.None, out date);

                    if (dateTimeParse)
                    {
                        DateTime.TryParseExact(newDate, "MM-dd-yyyy", null, DateTimeStyles.None, out date);
                        checkToDos.ReadgivendateToDos(date);
                    }

                    else
                    {
                        Console.WriteLine("Date formate is wrong, please enter a date as 'MM-dd-yyyy'");
                    }
                }

                else
                {
                    Console.WriteLine("Here You can Read your ToDos as CSV.");

                    checkToDos.ReadExistingToDos();
                }
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