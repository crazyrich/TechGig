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


namespace Same_As_Sir
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }
      
        private void btnSearch_Click(object sender, EventArgs e)
        {
           
            SqlConnection connection=new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();
           // MessageBox.Show("CONNECTED");

            SqlCommand command = new SqlCommand("SELECT * FROM Employee where EmpID=@id",connection);
            command.Parameters.Add("@id",txtEmpID.Text);
            dataGridView1.DataSource = "Employee";

            SqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                txtName.Text = (string)reader[1];
                txtSalary.Text = ((int)reader[2]).ToString();
                txtLocation.Text = (string)reader[3];
            }
            else {
                MessageBox.Show("Record Not Found");
            }


        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();
           // MessageBox.Show("CONNECTED");

            SqlCommand command = new SqlCommand("Update Employee set EmpName=@name,Salary=@salary,Address=@location", connection);
            command.Parameters.Add("@name", txtName.Text);
            command.Parameters.Add("@salary", txtSalary.Text);
            command.Parameters.Add("@location", txtLocation.Text);

            int records = command.ExecuteNonQuery();
            if (records>0)
            {
                MessageBox.Show("Record Updated!");
                txtEmpID.Clear();
                txtName.Clear();
                txtSalary.Clear();
                txtLocation.Clear();
            }
            else
            {
                MessageBox.Show("Record Not Updated");
            }
            connection.Close();
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();
            // MessageBox.Show("CONNECTED");

            SqlCommand command = new SqlCommand("Delete Employee where EmpID=@id", connection);
            command.Parameters.Add("@id", txtEmpID.Text);
            int records = command.ExecuteNonQuery();
            if (records > 0)
            {
                MessageBox.Show("Record Deleted!");
                txtEmpID.Clear();
                txtName.Clear();
                txtSalary.Clear();
                txtLocation.Clear();
            }
            else
            {
                MessageBox.Show("Record Not Deleted");
            }
            connection.Close();
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();
            // MessageBox.Show("CONNECTED");

            SqlCommand command = new SqlCommand("Insert into Employee values(@id,@name,@salary,@location)", connection);
            command.Parameters.Add("@id", txtEmpID.Text);
            command.Parameters.Add("@name", txtName.Text);
            command.Parameters.Add("@salary", txtSalary.Text);
            command.Parameters.Add("@location", txtLocation.Text);
            int records = command.ExecuteNonQuery();
            if (records > 0)
            {
                MessageBox.Show("Record Inserted!");
                txtEmpID.Clear();
                txtName.Clear();
                txtSalary.Clear();
                txtLocation.Clear();
            }
            else
            {
                MessageBox.Show("Record Not Inserted");
            }
            connection.Close();
        }
    }
}
