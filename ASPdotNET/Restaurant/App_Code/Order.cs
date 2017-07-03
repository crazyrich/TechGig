using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Order
/// </summary>
public class Order
{
    public int orderId;
    public DateTime orderDate;
    public List<Items> orderCart = new List<Items>();
	public Order()
	{

	}
}