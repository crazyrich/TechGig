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

namespace WindowsFormsApplication2
{
    public partial class Operations : Form
    {
        public Operations()
        {
            InitializeComponent();
        }

        SqlConnection connection;
        SqlCommand command;

        private void btnSearch_Click(object sender, EventArgs e)
        {
            
            connection.Open();
            //MessageBox.Show("Connected");

            if (txtEmpID.Text.Length > 0)
            {
                  command = new SqlCommand("select * from Employee where EmpID=@id", connection);
                command.Parameters.Add("@id", txtEmpID.Text);

                SqlDataReader reader = command.ExecuteReader();
                if (reader.Read())
                {
                    txtEmpName.Text = (string)reader[1];
                    txtSalary.Text = ((int)reader[2]).ToString();
                    txtAddress.Text = (string)reader[3];
                    btnInsert.Enabled = false;
                    btnUpdate.Enabled = true;
                    btnDelete.Enabled = true;
                }
                else
                    MessageBox.Show("No Record Found for this  ID");

                connection.Close();
            }
        }

        private void Operations_Load(object sender, EventArgs e)
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=master;user id =sa;password=info123!";
            btnDelete.Enabled = false;
            btnUpdate.Enabled = false;
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
          
            connection.Open();
            //MessageBox.Show("Connected");

            if (txtEmpID.Text.Length > 0)
            {
                command = new SqlCommand("Update Employee set EmpName=@name, Salary=@sal, Address=@add where EmpID=@id", connection);
                command.Parameters.Add("@name", txtEmpName.Text);
                command.Parameters.Add("@sal", txtSalary.Text);
                command.Parameters.Add("@add",txtAddress.Text);
                command.Parameters.Add("@id", txtEmpID.Text);

                int recordsEffected = command.ExecuteNonQuery();
                
                if (recordsEffected>0)
                {
                    MessageBox.Show("Record Updated");
                    txtEmpID.Clear(); txtAddress.Clear(); txtEmpName.Clear(); txtSalary.Clear();
                    btnInsert.Enabled = true;
                    btnUpdate.Enabled = false;
                    btnDelete.Enabled = false;
                }
                else
                    MessageBox.Show("Record Not Updated ");

                connection.Close();
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
          
            connection.Open();
            //MessageBox.Show("Connected");

            if (txtEmpID.Text.Length > 0)
            {
                  command = new SqlCommand("delete Employee where EmpID=@id", connection);               
                command.Parameters.Add("@id", txtEmpID.Text);

                int recordsEffected = command.ExecuteNonQuery();

                if (recordsEffected > 0)
                {
                    MessageBox.Show("Record Deleted");
                    txtEmpID.Clear(); txtAddress.Clear(); txtEmpName.Clear(); txtSalary.Clear();
                    btnInsert.Enabled = true;
                    btnUpdate.Enabled = false;
                    btnDelete.Enabled = false;
                }
                else
                    MessageBox.Show("Record Not Deleted ");

                connection.Close();
            }
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
          
            connection.Open();
            //MessageBox.Show("Connected");

            if (txtEmpID.Text.Length > 0)
            {
                  command = new SqlCommand("insert into Employee values(@id,@name,@sal,@add)", connection);
                command.Parameters.Add("@name", txtEmpName.Text);
                command.Parameters.Add("@sal", txtSalary.Text);
                command.Parameters.Add("@add", txtAddress.Text);
                command.Parameters.Add("@id", txtEmpID.Text);

                int recordsEffected = command.ExecuteNonQuery();

                if (recordsEffected > 0)
                {
                    MessageBox.Show("Record Inserted");
                    txtEmpID.Clear(); txtAddress.Clear(); txtEmpName.Clear(); txtSalary.Clear();
                    btnInsert.Enabled = true;
                    btnUpdate.Enabled = false;
                    btnDelete.Enabled = false;
                }
                else
                    MessageBox.Show("Record Not Inserted ");

                connection.Close();
            }
        }
    }
}
