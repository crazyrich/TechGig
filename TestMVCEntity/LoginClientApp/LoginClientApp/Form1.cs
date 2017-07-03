using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace LoginClientApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            ServiceReference1.HelloServiceClient client = new ServiceReference1.HelloServiceClient();
            if (client.Login(txt_username.Text, txt_pwd.Text))
            {
                MessageBox.Show("Loged In !");
            }
            else
            {
                MessageBox.Show("Failure ! ");
            
            }
           
        }
    }
}
