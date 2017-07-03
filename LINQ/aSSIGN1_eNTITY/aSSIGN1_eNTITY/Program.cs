using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Linq;

namespace aSSIGN1_eNTITY
{
    class Program
    {
        static void Main(string[] args)
        {
            DataContext db = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!");
            Table<BidDetail> table = db.GetTable<BidDetail>();
            BidDetail bd = new BidDetail()
            {
                BID=1001,
                Domain="I",
                Name="Alpha",
                ProjectDuration=30,
                TeamRequired=10,
            };
            table.InsertOnSubmit(bd);
            db.SubmitChanges();
        }
    }
}
