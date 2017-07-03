namespace RestaurantMVC.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MenuServiceDBs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        itemName = c.String(),
                        itemPrepTime = c.Int(nullable: false),
                        itemPrice = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MenuServiceDBs");
        }
    }
}
