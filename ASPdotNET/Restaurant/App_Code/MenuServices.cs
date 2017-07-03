using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for MenuServices
/// </summary>
public class MenuServices
{
    public Items[] itemMenu;
	public MenuServices()
	{
        
        DataBase db = new DataBase();
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "SELECT * FROM menu";
        SqlDataReader reader=db.ExecuteReader(cmd);
        itemMenu = new Items[5];
        int count=0;
        while(reader.Read())
        {
            itemMenu[count] = new Items();
            itemMenu[count].itemID =Convert.ToInt32(reader[0].ToString());
            itemMenu[count].itemName=reader[1].ToString();
            itemMenu[count].itemPrepTime=Convert.ToInt32(reader[2].ToString());
            itemMenu[count].itemPrice = Convert.ToDouble(reader[3].ToString());
            count++;
        }
        
	}
}