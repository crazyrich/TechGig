using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Linq.Mapping;

/// <summary>
/// Summary description for LoginClass
/// </summary>
/// 
[Table(Name="SignUp")]
public class LoginClass
{
    private string UserName;
    private string Password;
    private string Name;
    private int Age;
    private string DOB;
    private int Contact;
    private string Email;
    private string Gender;
    [Column(Storage = "UserName", Name = "UserName", IsPrimaryKey = true)]
    public string Username
    {
        set
        {
            this.UserName = value;
        }
        get
        {
            return UserName;
        }
    }
    [Column(Storage = "Password", Name = "Password")]
    public string PAssword
    {
        set
        {
            this.Password = value;
        }
        get
        {
            return Password;
        }
    }
    [Column(Storage = "Name", Name = "Name")]
    public string NAme
    {
        set
        {
            this.Name = value;
        }
        get
        {
            return Name;
        }
    }
    [Column(Storage = "Age", Name = "Age")]
    public int AGe
    {
        set
        {
            this.Age = value;
        }
        get
        {
            return Age;
        }
    }
    [Column(Storage = "DOB", Name = "DOB")]
    public string Dob
    {
        set
        {
            this.DOB = value;
        }
        get
        {
            return DOB;
        }
    }
    [Column(Storage = "Contact", Name = "Contact")]
    public int COntact
    {
        set
        {
            this.Contact = value;
        }
        get
        {
            return Contact;
        }
    }
    [Column(Storage = "Email", Name = "Email")]
    public string EMail
    {
        set
        {
            this.Email = value;
        }
        get
        {
            return Email;
        }
    }
    [Column(Storage = "Gender", Name = "Gender")]
    public string GEnder
    {
        set
        {
            this.Gender = value;
        }
        get
        {
            return Gender;
        }
    }
}

