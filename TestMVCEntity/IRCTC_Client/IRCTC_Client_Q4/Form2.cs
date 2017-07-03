using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using IRCTC_Client_Q4.ServiceReference1;

namespace IRCTC_Client_Q4
{
    public partial class Form2 : Form
    {
        ReservationClient client = new ReservationClient();
        public Form2()
        {
            InitializeComponent();
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void Form2_Load(object sender, EventArgs e)
        {
            List<int>list = new List<int>();
            var res = client.AllTicket();
            foreach(var i in res)
            {
                list.Add(i.Id);
                
            }
            comboBox1.DataSource = list;
            
        }
    }
}
