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
    public partial class DisconnectedConnection : Form
    {
        public DisconnectedConnection()
        {
            InitializeComponent();
        }

        SqlConnection connection;
        SqlCommand command;
        SqlDataAdapter adapter;
        DataSet dataSet;
        DataTable dataTable;
        DataRow dataRow;


        private void DisconnectedConnection_Load(object sender, EventArgs e)
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id =sa;password=info123!";
            adapter = new SqlDataAdapter("select *  from Employee", connection);
            dataSet = new DataSet();
            adapter.Fill(dataSet, "Employee");
            dataTable = dataSet.Tables[0];

            dataGridView1.DataSource = dataTable;
        }

        private void btnSearch_Click(object sender, EventArgs e)
        {           
            int counter = 0;
            bool flag = false;
            while (counter < dataTable.Rows.Count)
            {
                if (txtEmpID.Text.Equals(dataTable.Rows[counter][0].ToString()))
                {
                    flag = true;    
                    txtEmpName.Text = dataTable.Rows[counter][1].ToString();
                    txtSalary.Text = dataTable.Rows[counter][2].ToString();
                    txtAddress.Text = dataTable.Rows[counter][3].ToString();

                    dataRow = dataTable.Rows[counter];
                }
                counter++;
            }

            if (flag)
                MessageBox.Show("Record Found ");
            else
                MessageBox.Show("Record Not Found ");

        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            dataRow[1] = txtEmpName.Text;
            dataRow[2] = txtSalary.Text;
            dataRow[3] = txtAddress.Text;

           // dataTable.Rows.Add(dataRow);
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            //dataSet.Tables[0].Rows.Remove(dataRow);
            dataTable.Rows.Remove(dataRow);
            MessageBox.Show(
                "Row Removed ");
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
            dataRow = dataTable.NewRow();
            dataRow[0] = txtEmpID.Text;
            dataRow[1] = txtEmpName.Text;
            dataRow[2] = Convert.ToInt32(txtSalary.Text);
            dataRow[3] = txtAddress.Text;

            dataTable.Rows.Add(dataRow);

        }

        private void btnSaveChanges_Click(object sender, EventArgs e)
        {
          SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Employee");
            MessageBox.Show("Changes Saved Permanently");
        }
    }
}
