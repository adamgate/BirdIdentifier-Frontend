namespace CommandLine
{
    public class Program
    {
        private static string baseUrl = @"https:/localhost:7110";

        static void Main(string[] args)
        {
            string option ="-1";

            PrintMenu();

            while (!option.Equals("0"))
            {
                Console.Write("Please select an option: ");
                option = Console.ReadLine();

                switch (option)
                {
                    case "0":
                        Console.WriteLine("Closing program...");
                        System.Threading.Thread.Sleep(3000);
                        break;

                    case "1":
                        PrintMenu();
                        break;

                    case "2":
                        IdentifyBird();
                        break;

                    default:
                        Console.WriteLine($"\"{option}\" is not a valid option. Please try again.");
                        Console.WriteLine();
                        break;
                }
            }
        }

        public static void PrintMenu()
        {
            Console.WriteLine("--------------------------------------------------------------------------------");
            Console.WriteLine("Welcome to BirdIdentifier. Please select an option:");
            Console.WriteLine("0: Quit program.");
            Console.WriteLine("1: See menu.");
            Console.WriteLine("2: Identify a bird in an image.");
            Console.WriteLine("--------------------------------------------------------------------------------");
            Console.WriteLine();
        }

        public static void CheckBackendStatus()
        { 
            //ping backend (maybe the heartbeat?) to see if it's available. Print an error message if not.
        }

        public static void IdentifyBird()
        {
            Console.WriteLine();
            Console.WriteLine("Identifying Bird!");

            //load image 

            //convert image to proper format

            //create request and send it in

            //print out the information for the user
        }
    }
}