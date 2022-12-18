using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommandLine
{
    public class Menu
    {
        private string baseUrl;
        private readonly HttpClient client;

        public Menu()
        {
            baseUrl = @"https://localhost:7110";
            client = new HttpClient();
        }

        public async Task Run()
        {
            string option = "";

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

                    case "3":
                        await CheckBackendStatus();
                        break;

                    default:
                        Console.WriteLine($"\"{option}\" is not a valid option. Please try again.");
                        Console.WriteLine();
                        break;
                }

                Console.WriteLine();
            }
        }

        public void PrintMenu()
        {
            Console.WriteLine("--------------------------------------------------------------------------------");
            Console.WriteLine("Welcome to BirdIdentifier. Please select an option:");
            Console.WriteLine("0: Quit program.");
            Console.WriteLine("1: See menu.");
            Console.WriteLine("2: Identify a bird in an image.");
            Console.WriteLine("3: Check BirdIdentifier backend's status.");
            Console.WriteLine("--------------------------------------------------------------------------------");
            Console.WriteLine();
        }

        public async Task CheckBackendStatus()
        {
            Console.WriteLine("Talking to BirdIdentifier backend...");

            //ping backend heartbeat endpoint to see if it's available.
            try
            {
                HttpResponseMessage response = await client.GetAsync($"{baseUrl}/heartbeat");

                if (response.StatusCode.ToString().Equals("OK"))
                    Console.WriteLine($"Status {response.StatusCode}: Success while talking to BirdIdentifierBackend.");
                else
                    Console.WriteLine($"Status {response.StatusCode}");
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine("Error while talking to BirdIdentifier backend:");
                Console.WriteLine(e.Message);
            }
        }

        public void IdentifyBird()
        {
            //load image 

            //convert image to proper format

            //create request and send it in

            //print out the information for the user
        }
    }
}
