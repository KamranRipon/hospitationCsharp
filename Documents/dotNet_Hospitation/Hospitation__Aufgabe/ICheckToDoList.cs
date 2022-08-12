namespace Hospitation__Aufgabe
{
    public interface ICheckToDoList
    {
        public void ReadExistingToDos();
        public void RemoveCompletedToDos();

        public void AddItemToList();
        public void SaveToCSV();
        public void ReadCSVFile();
    }
}