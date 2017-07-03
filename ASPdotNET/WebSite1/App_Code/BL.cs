using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

/// <summary>
/// Summary description for BL
/// </summary>
public class BL
{
    SqlConnection con;
    public SqlCommand cmd;
    SqlDataReader dr;
    DataSet dataSet;
    SqlDataAdapter adapter;
	public BL()
	{
        con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
	}
    public void openCon()
    {
        if (ConnectionState.Closed==con.State)
        {
            con.Open();
        }
    }
    public void closeCon()
    {
         if(con.State==ConnectionState.Open)
        {
            con.Close();
        }
    }
    public int ExecuteNonQuery(SqlCommand cmd1)
    {
        openCon();
        cmd = cmd1;
        cmd.Connection = con;
        int x= cmd.ExecuteNonQuery();
        closeCon();
        return x;
    }
    public SqlDataReader ExecuteReader(SqlCommand cmd1)
    {
        openCon();
        cmd =cmd1;
        cmd.Connection = con;
        dr = cmd.ExecuteReader();
        return dr;
    }
    public DataSet ExecuteDataSet(string query)
    {
        cmd = new SqlCommand(query,con);
        adapter = new SqlDataAdapter(cmd);
        adapter.Fill(dataSet);
        return dataSet;
    
    }
}

