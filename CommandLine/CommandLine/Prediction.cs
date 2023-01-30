using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Newtonsoft.Json;

namespace CommandLine
{
    public class Prediction
    {
        public string ImageChecksum { get; set; }
        public DateTime Timestamp { get; set; }
        public string PredictionName { get; set; }
        public decimal PredictionScore { get; set; }
        public string ExactLink { get; set; }
        public string SearchLink { get; set; }

        public Prediction()
        {
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this, Newtonsoft.Json.Formatting.Indented);
        }
    }
}
