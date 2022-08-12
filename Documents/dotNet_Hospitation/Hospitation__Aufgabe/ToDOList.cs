using System.Text;

namespace Hospitation__Aufgabe
{
    class ToDoList : IToDoList
    {

        public ToDoList() // constractor without parameters
        {
            ToDoEntry toDo = new ToDoEntry();

            string Title = "Email";
            string Description = "Write Emails to Customer";

            toDo.title = Title;
            toDo.description = Description;

            toDoList.Add(toDo);
        }

        public ToDoList(string title, string description) // constractor with parameters
        {
            ToDoEntry toDo = new ToDoEntry();

            string Title = title;
            string Description = description;

            toDo.title = Title;
            toDo.description = Description;

            toDoList.Add(toDo);
        }
        private List<ToDoEntry> toDoList = new List<ToDoEntry>();

        public void RequestToDos(string title, string description)
        {
            ToDoEntry toDo = new ToDoEntry();

            toDo.title = title;
            toDo.description = description;

            toDoList.Add(toDo);
        }

        public List<ToDoEntry> AllToDoList()
        {
            return toDoList;
        }

        // Remove Item From List
        public void RemoveItemInt(int index)
        {
            if (toDoList.Count > 1)
            {
                toDoList.RemoveAt(index);
            }
            else
            {
                toDoList.RemoveAt(0);
            }
        }
        public void RemoveItem(string title)
        {
            var itemIndex = toDoList.FindIndex(toDoEntry => toDoEntry.title == title);

            toDoList.RemoveAt(itemIndex);
        }

        public string CheckItemNameForRemove(string itemTitle)
        {
            foreach (var item in toDoList)
            {
                if (item.title == itemTitle)
                {
                    //toDoList.RemoveItem(itemTitle);
                    continue;
                }
                else
                {
                    itemTitle = "";
                    Console.WriteLine(itemTitle);
                }
            }

            return itemTitle;
        }

        public void GenerateCsv(List<ToDoEntry> listData, string path)
        {
            if (File.Exists(path))
            {
                File.Delete(path);
            }
            using (StreamWriter file = File.CreateText(path))
            {
                foreach (var item in listData)
                {
                    file.WriteLine("{0},{1}", item.title, item.description);
                }
            }
        }
        public void ReadingCSVFile(string filePath)
        {
            if (File.Exists(filePath))
            {
                StreamReader reader = new StreamReader(File.OpenRead(filePath));

                List<string> listOfCSVElement = new List<string>();

                while (!reader.EndOfStream)
                {
                    var readLine = reader.ReadLine();
                    var readElement = readLine.Split(',');
                    foreach (var element in readElement)
                    {
                        listOfCSVElement.Add(element);
                    }
                }
                foreach (var itemInList in listOfCSVElement)
                {
                    Console.Write(itemInList);
                    Console.WriteLine();
                }
            }
            else
            {
                Console.WriteLine("File doesn't exist");
            }
        }
    }
}