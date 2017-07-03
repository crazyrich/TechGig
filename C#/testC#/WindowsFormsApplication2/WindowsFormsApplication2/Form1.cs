using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Data.SqlClient;


namespace WindowsFormsApplication2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
       

        private void button1_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok;user id =sa;password=info123!";
            connection.Open();
            MessageBox.Show("Database Connected ");

            SqlCommand command = new SqlCommand("delete  Login set  values(@id, @pass)", connection);


int result = command.ExecuteNonQuery();
            
         
        }

       
    }
}
