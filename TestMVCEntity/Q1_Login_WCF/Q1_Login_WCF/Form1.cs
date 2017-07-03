using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Q1_Login_WCF
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            ServiceReference1.Interface1Client client = new ServiceReference1.Interface1Client();
            if (client.Login(textBox1.Text, textBox2.Text))
            {
                MessageBox.Show("SUCCESS !");
            }
            else
            {
                MessageBox.Show("FAILURE !");
            }
        }
    }
}
