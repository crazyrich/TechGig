CREATE DATABASE CaseStudyApp;
USE CaseStudyApp;
GO  


Drop Table Users;

CREATE TABLE [dbo].[Users] (
    [userid]    VARCHAR (30) NOT NULL,
    [name]      VARCHAR (30) NOT NULL,
    [password]  VARCHAR (30) NULL,
    [usertype]  VARCHAR (30) NULL,
    [address]   VARCHAR (30) NULL,
    [contactno] VARCHAR (30) NULL,
    PRIMARY KEY CLUSTERED ([userid] ASC)
);


Insert into Users values('Admin1001', 'John Douglas', 'infogain', 'Admin', 'NOIDA', '1234567890'); 
Insert into Users values('Client4004', 'Jacky Chain', 'NOIDA','Client', 'NOIDA','9812345434'); 


Drop Table Products;

Create Table Products ( 
Productid varchar(30) primary key, 
name varchar(30), 
unitprice int,                                         
quantity int);  

insert into products values('p1001','CPU',12600.90,2); 
insert into products values('p1011','RAM',2600.50,5); 
insert into products values('p1101','Mother Board',112600.00,2);

Create Table TransactionTable( 
transactionid varchar(30) primary key, 
productid varchar(30) references products(productid), 
name varchar(30), 
unitprice int, 
quantity int, 
totalprice int, 
userid varchar(30) references users(userid), 
dop date);  