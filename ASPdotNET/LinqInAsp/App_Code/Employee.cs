using System;
using System.Collections.Generic;
using System.Data.Linq.Mapping;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Employee
/// </summary>
/// 
[Table(Name="Emp")]
public class Employee
{
    private string empId;
    private string empName;
    private string phone;
    private string email;
    private double salary;//(int HERE money in DataBase Not Working)
    [Column(Storage="empId",Name="empId",IsPrimaryKey=true)]
    public string Id
    {
        set 
        {
            this.empId = value;
        }
        get
        {
            return empId;
        }
    }
    [Column(Storage = "empName", Name = "empName")]

    public string Name
    {
        set
        {
            this.empName = value;
        }
        get
        {
            return empName;
        }
    }

    [Column(Storage = "phone", Name = "phone")]
    public string Phone
    {
        set
        {
            this.phone = value;
        }
        get
        {
            return phone;
        }
    }

    [Column(Storage = "email", Name = "email")]
    public string Email
    {
        set
        {
            this.email = value;
        }
        get
        {
            return email;
        }
    }

    [Column(Storage = "salary", Name = "salary")]
    public double Salary
    {
        set
        {
            this.salary = value;
        }
        get
        {
            return salary;
        }
    }
}