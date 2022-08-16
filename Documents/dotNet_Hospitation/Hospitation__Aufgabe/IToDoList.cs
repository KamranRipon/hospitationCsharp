namespace Hospitation__Aufgabe
{
    public interface IToDoList
    {
        //public void RequestToDos(string title, string description);
        public void RequestToDos(string title, string description);
        public List<ToDoEntry> AllToDoList();
        //public void RemoveItem(string title);

        //public string CheckItemNameForRemove(string itemTitle);

        //public void GenerateCsv(List<ToDoEntry> listData, string path);


        public void ReadingCSVFile(string filePath);

    }
}