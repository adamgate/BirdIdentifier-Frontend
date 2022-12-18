namespace CommandLine
{
    public class Program
    {
        private static Menu _menu = new Menu();

        static async Task Main(string[] args)
        {
            await _menu.Run();
        }
    }
}