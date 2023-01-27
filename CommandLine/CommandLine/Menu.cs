using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualBasic.FileIO;

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
            client.BaseAddress = new Uri(baseUrl);
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
                        System.Threading.Thread.Sleep(2000);
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

        private void PrintMenu()
        {
            Console.WriteLine("--------------------------------------------------------------------------------");
            Console.WriteLine("Welcome to BirdIdentifier. Please select an option:");
            Console.WriteLine("0: Quit program.");
            Console.WriteLine("1: Print menu.");
            Console.WriteLine("2: Identify a bird in an image.");
            Console.WriteLine("3: Check BirdIdentifier's backend status.");
            Console.WriteLine("--------------------------------------------------------------------------------");
            Console.WriteLine();
        }

        private async Task CheckBackendStatus()
        {
            Console.WriteLine("Talking to BirdIdentifier backend...");

            //ping backend heartbeat endpoint to see if it's available.
            try
            {
                HttpResponseMessage response = await client.GetAsync($"{baseUrl}/heartbeat");

                if (response.StatusCode.ToString().Equals("OK"))
                {
                    Console.Write($"Status {response.StatusCode}: Success while talking to BirdIdentifier backend.");
                    Console.WriteLine();
                }
                else
                {
                    Console.Write($"Status {response.StatusCode}");
                    Console.WriteLine();
                }
            }
            catch (HttpRequestException e)
            {
                Console.Write($"Error while talking to BirdIdentifier backend: {e.Message}");
                Console.WriteLine();
            }
        }

        private string GetImagePath()
        {
            string filePath = "";
            bool acceptable = false;

            while (acceptable.Equals(false))
            {
                Console.Write("Please enter the image's file path: ");
                filePath = Console.ReadLine();

                if (filePath == null || filePath.Equals(""))
                {
                    Console.WriteLine("The file path cannot be empty. Please try again.");
                    Console.WriteLine();
                    continue;
                }
                else
                {
                    var image = new System.IO.FileInfo(filePath);

                    if (!image.Exists)
                    {
                        Console.WriteLine($"Unable to access image at location \"{filePath}\"");
                        break;
                    }

                    if (image.Extension != ".jpg" &&
                        image.Extension != ".jpeg" &&
                        image.Extension != ".png")
                    {
                        Console.WriteLine("File is not of type .png, .jpg, or .jpeg.");
                        break;
                    }
                }

                acceptable = true;
            }

            return filePath;
        }

        //private FileInfo LoadImage(string imagePath)
        //{
        //    FileInfo image;

        //    return image;
        //}

        private async Task IdentifyBird()
        {
            //get image path
            string imagePath = GetImagePath();

            //load image

            //convert image to proper format

            //create request and send it in

            //print out the information for the user
        }
    }
}
