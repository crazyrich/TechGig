using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class Form1 : Form
    {
        int username;
        int password;
        public Form1()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            //
        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {
            //password = Convert.ToInt32(textBox2);
        }

        private void button1_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString="Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();
            MessageBox.Show("Database Connected");

            SqlCommand command = new SqlCommand("select * from Login where LoginID=@loginid and Password=@pass",connection);
            command.Parameters.Add("@loginid",textBox1.Text);
             command.Parameters.Add("@pass",textBox2.Text);

            SqlDataReader reader=command.ExecuteReader();
            if(reader.Read())
            {
                MessageBox.Show("User Valid");
            }
            else
            {
             MessageBox.Show("User inValid");
            }


            //string username = textBox1.Text;
            //string password = textBox2.Text;
            //textBox2.MaxLength=8;
            //if (username.Equals("123") && password.Equals("123"))
            //{
            //    MessageBox.Show("LOGED IN");
            //    Form2 obj = new Form2();
            //    //obj.Show();
            //    this.Hide();
            //    //obj.ShowDialog();

            //}
            //else {
            //MessageBox.Show("FAILED");
            //}

          
        }
    }
}
