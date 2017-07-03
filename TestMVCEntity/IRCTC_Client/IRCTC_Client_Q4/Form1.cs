using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using IRCTC_Client_Q4.ServiceReference1;

namespace IRCTC_Client_Q4
{
    public partial class Form1 : Form
    {
        ReservationClient client = new ReservationClient();
        //SqlConnection con;
        //SqlDataAdapter adapter;
        //DataSet dataSet;
        //DataRow dataRow;
        public Form1()
        {
            InitializeComponent();
        }

        private void label4_Click(object sender, EventArgs e)
        {

        }
        private void Form1_Load(object sender, EventArgs e)
        {
            dataGridView1.DataSource = client.AllTicket();
           
        }

        private void label5_Click(object sender, EventArgs e)
        {

        }
        private void button1_Click(object sender, EventArgs e)
        {
            Ticket tkt = new Ticket()
            {
                SourceStation = txt_source.Text,
                DestinationStation = txt_dest.Text,
                Ticket_Count = Convert.ToInt32(txt_count.Text),
                Status = txt_status.Text,
            };
            client.BookTicket(tkt);
            dataGridView1.DataSource = client.AllTicket();

        }

        private void button2_Click(object sender, EventArgs e)
        {
            var res=client.CheckStatus(Convert.ToInt32(txt_id.Text));
            txt_count.Text = res.Ticket_Count.ToString();
            txt_dest.Text = res.DestinationStation;
            txt_source.Text = res.SourceStation;
            txt_status.Text = res.Status;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            client.CancelTicket(Convert.ToInt32(txt_id.Text));
            dataGridView1.DataSource = client.AllTicket();

        }

        private void button4_Click(object sender, EventArgs e)
        {
            this.Hide();
            Form2 form = new Form2();
            form.Show();
        }
    }
}
