using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

/// <summary>
/// Summary description for DataBase
/// </summary>
public class DataBase
{
    //SqlCommand cmd;
    SqlConnection con;
    SqlDataReader reader;
	public DataBase()
	{
        con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
	}
    public void conOpen()
    { 
        if(con.State==ConnectionState.Closed)
        {
            con.Open();
        }
    }
    public void conClose()
    {
        if(con.State==ConnectionState.Open)
        {
            con.Close();
        }
       
    }

    public SqlDataReader ExecuteReader(SqlCommand cmd)
    {
        conOpen();
        cmd.Connection = con;
        reader=cmd.ExecuteReader();
        return reader;
    }

    public int ExecuteNonQuery(SqlCommand cmd)
    {
        conOpen();
        cmd.Connection = con;
        int result = cmd.ExecuteNonQuery();
        return result;
    }
}

