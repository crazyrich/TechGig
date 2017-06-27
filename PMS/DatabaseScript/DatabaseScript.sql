

IF object_id('GetWeekNumber') IS NOT NULL
BEGIN
   DROP FUNCTION [dbo].[GetWeekNumber]
END
GO

Create Function [dbo].[GetWeekNumber](@date datetime)
returns int
As
Begin
Declare @weekNumber int
Set @weekNumber = (select DATEPART(week,@date) - DATEPART(week,cast(cast(year(@date) as varchar(4))+'-' + cast(month(@date) as varchar(2)) + '-01' as datetime))+1)
return @weekNumber
End
GO

---------------------------------------------------------


  Alter Procedure [dbo].[prcGetAllKeyAccomplishment]  
  (  @PID Int  )  
  As  
  Begin  
    
	 Declare @Temp table ([WeeklyStatus_Id] [int] NOT NULL,  
	 [Project_Id] [int] NOT NULL,  
	 [Program_Id] [int] NULL,  
	 [P_Desc] [varchar](max) NULL,  
	 [Resource_Id] [int] NULL,  
	 [Status] [char](10) NULL,  
	 [KeyAccomplishments] [varchar](max) NULL,  
	 [KeyIssues] [varchar](max) NULL,  
	 [FuturePlan] [varchar](max) NULL,  
	 [Comments] [varchar](max) NULL,  
	 [TrDate] [date] NULL,  
	 [WeekStatus]  [varchar](100) NULL,
	 [WeekNumber]  [varchar](3) NULL)  
   
	 Declare @ProgId int ,@ProjId int  
	 Set @ProgId = ( Select Program_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
	 Set @ProjId = ( Select Project_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
   
	  ;With CTEData  
	  As  
	  (  
			 select * ,'CurrentWeek' As WeekStatus ,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from [Weekly_Status] where [TrDate] between dateadd(day, 4-datepart(dw, getdate()), CONVERT(date,getdate()-7))   
			 and GETDATE() and [WeeklyStatus_Id] = @PID  
	  )  
   
		Insert into @Temp  select * from  CTEData  
		Insert into @Temp  select WS.* ,'PreviousWeek' As WeekStatus,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from Weekly_Status WS where WS.Program_Id = @ProgId and WS.Project_Id = @ProjId and WS.WeeklyStatus_Id != @PID  
		select * from @Temp  
  End  
  GO
  ----------------------------------------------------------------------
  
  

ALTER proc [dbo].[prcCreateProgramOrProject] @pname nvarchar(max),@parentid int

as

begin
DECLARE @NewId int
if exists(select * from ProgrammeManager where PName=@pname and ParentID = @parentid )

begin

  if(@parentid='0')

   begin

    return -1;

   end

  else

   begin

    return -2;

   end

end

else if(@parentid='0')

begin

  Insert into ProgrammeManager(PName,ParentID,Status) values(@pname,@parentid,'Y'); --Creating New Program
  set @NewId=@@IDENTITY;
  insert into Weekly_Status(Project_Id,Program_Id,Status) values (0,@NewId,'G');--Setting Default Weekly Status
  
  --Giving  Permissions to All SuperAdmins
  INSERT INTO ProgramUserMapping(PID,CanEdit,UserName) 
  select @NewId,'Y',UserName From aspnet_Users where UserId in (Select UserId From aspnet_UsersInRoles where RoleId=(select RoleId from aspnet_Roles where RoleName='SuperAdmin'))
  return 1;

end

else

begin

  Insert into ProgrammeManager(PName,ParentID,Status) values(@pname,@parentid,'Y'); --Creating New Project
  set @NewId=@@IDENTITY;
  insert into Weekly_Status(Project_Id,Program_Id,Status) values (@NewId,0,'G'); --Setting Default Weekly Status
  
  --giving permissions to All SuperAdmins
  Insert Into ProjectUserMapping(ParentID,PID,CanEdit,CanView,UserName)
  select @parentid,@NewId,'Y',1,UserName From aspnet_Users where UserId in (Select UserId From aspnet_UsersInRoles where RoleId=(select RoleId from aspnet_Roles where RoleName='SuperAdmin'))

  return 2; 
end

end
go
---------------------------------------------------


/****** Object:  StoredProcedure [dbo].[prcDeleteProgramOrProject]    Script Date: 15-06-2016 19:16:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER proc [dbo].[prcDeleteProgramOrProject] @pid int,@parentid int
as
begin
if exists(select * from ProgrammeManager where PID=@pid and ParentID = @parentid )
 begin
  delete from ProgrammeManager where PID=@pid and ParentID = @parentid --delete Program/Project
 
  
 if(@parentid=0) 
 begin 
  delete from Weekly_Status where Program_Id=@pid; --Deleting weekly status for that program
   delete from Weekly_Status where Project_Id in(select PID from ProgrammeManager where ParentID=@pid) --- Deleting weekly status for all projects under this program
  delete From ProgramUserMapping where PID=@pid; --Deleting all User Permissions for that Program and Projects In It
  delete  from ProjectUserMapping where ParentID=@pid;
  return 1 
 end 
 else 
  begin
   delete from Weekly_Status where Project_Id=@pid;
   delete From ProjectUserMapping where PID=@pid and ParentID=@parentid
   return 2 
  end;
  
  
  end
else 
begin
 return -1;
end
end
go

--------------------------------------------------------------------------------------


/*
Declare @MystartDate dateTime 
Declare @MyEndDate dateTime 
execute [dbo].[prcGetFromAndLastDate] @StartDate = @MystartDate OUTPUT,  @EndDate =  @MyEndDate OUTPUT
select @MystartDate , @MyEndDate
*/

Create Procedure [dbo].[prcGetFromAndLastDate]
@StartDate DateTime OUTPUT,
@EndDate DateTime OUTPUT
As
Begin
	declare @MondayDate datetime 
	Declare @DayAdd int
	Set  @DayAdd= (SELECT DATEPART(dw,GETDATE()))
	Set @MondayDate = (SELECT DATEADD(ww, DATEDIFF(ww,0,GETDATE()), 0))
	if(@DayAdd > 4)
	Begin
		Set @MondayDate = (dateadd(day,7,@MondayDate))
	End

	

	Set @StartDate  = (dateadd(day,-4,@MondayDate))
	Set @EndDate = dateadd(day,6,@StartDate)
	print @StartDate
	print @EndDate
End

GO

------------------------------------------------------------

ALTER proc [dbo].[prcCreateProgramOrProject] @pname nvarchar(max),@parentid int
as
begin
if exists(select * from ProgrammeManager where PName=@pname and ParentID = @parentid )
begin
  if(@parentid='0')
   begin
    return -1;
   end
  else
   begin
    return -2;
   end
end
else if(@parentid='0')
begin
  Insert into ProgrammeManager(PName,ParentID,Status) values(@pname,@parentid,'Y'); 
  return 1;
end
else
begin
  Insert into ProgrammeManager(PName,ParentID,Status) values(@pname,@parentid,'Y');
  return 2; 
end
end
GO

-------------------------------------------------------------------------------------------



  ALTER Procedure [dbo].[prcGetAllKeyAccomplishment]  
  (  @PID Int  )  
  As  
  Begin  
    
	 Declare @Temp table ([WeeklyStatus_Id] [int] NOT NULL,  
	 [Project_Id] [int] NOT NULL,  
	 [Program_Id] [int] NULL,  
	 [P_Desc] [varchar](max) NULL,  
	 [Resource_Id] [int] NULL,  
	 [Status] [char](10) NULL,  
	 [KeyAccomplishments] [varchar](max) NULL,  
	 [KeyIssues] [varchar](max) NULL,  
	 [FuturePlan] [varchar](max) NULL,  
	 [Comments] [varchar](max) NULL,  
	 [TrDate] [date] NULL,  
	 [WeekStatus]  [varchar](100) NULL,
	 [WeekNumber]  [varchar](3) NULL)  
   
     Declare @MystartDate dateTime 
     Declare @MyEndDate dateTime 
     execute [dbo].[prcGetFromAndLastDate] @StartDate = @MystartDate OUTPUT,  @EndDate =  @MyEndDate OUTPUT

	 Declare @ProgId int ,@ProjId int  
	 Set @ProgId = ( Select Program_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
	 Set @ProjId = ( Select Project_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
   
	  ;With CTEData  
	  As  
	  (  
			 select * ,'CurrentWeek' As WeekStatus ,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from [Weekly_Status] where [TrDate] 
			 between @MystartDate   
			 and @MyEndDate and [WeeklyStatus_Id] = @PID  
	  )  
   
		Insert into @Temp  select * from  CTEData  
		Insert into @Temp  select WS.* ,'PreviousWeek' As WeekStatus,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from Weekly_Status WS where WS.Program_Id = @ProgId and WS.Project_Id = @ProjId and WS.WeeklyStatus_Id != @PID  
		select * from @Temp  
  End  
  GO

----------------------------------------------------------------


-- execute [dbo].[prcGetProgrammeByUserId] 0 , 'admin'
Alter Procedure [dbo].[prcGetProgrammeByUserId]
@PrgID bigint = NULL,
@UserName nvarchar(256) = null
As
BEGIN
Declare @msg varchar(200)

Declare @MystartDate dateTime 
Declare @MyEndDate dateTime 
execute [dbo].[prcGetFromAndLastDate] @StartDate = @MystartDate OUTPUT,  @EndDate =  @MyEndDate OUTPUT


BEGIN TRY 

 
  ;with CTEProgramme
  As
  (
  SELECT [PID]
   ,[PName]
   ,[ParentID]
   FROM [ProgrammeManager] where  ISNULL(ParentID,0) = ISNULL(@PrgID,0)
  )


  
Select * INTO  #WeeklyStatus from (
  SELECT WS.TrDate,PM.PID,PM.PName,pm.ParentID,CASE WHEN LTRIM(RTRIM(WS.Status)) IS NULL THEN '' ELSE LTRIM(RTRIM(WS.Status)) END AS PROGRAM_WEEKLY_STATUS,
  ISNULL(WS.WeeklyStatus_Id,0) As WeeklyStatus_Id FROM CTEProgramme PM LEFT OUTER JOIN WEEKLY_STATUS WS ON PM.PID= Case When ISNull(@PrgID,0)= 0 Then
   WS.Program_Id else WS.Project_Id end  
   and WS.TRDATE Between  @MystartDate and @MyEndDate
  ) As Temp


   IF ISNULL(@PrgID,0) = 0 
      BEGIN
      Select WS.*,PUM.CanEdit, dbo.GetResourceCount(WS.PID,'0',@UserName) AS 'ResourceCount' , dbo.GetRiskCount(WS.PID,'0',@UserName) AS 'RiskCount' ,  dbo.GetIssueCount(WS.PID,'0',@UserName) AS 'GetIssueCount'
      from #WeeklyStatus WS INNER JOIN ProgramUserMapping PUM ON WS.PID = PUM.PID  INNER JOIN aspnet_Users UM ON 
       PUM.UserName = UM.UserName Inner JOIN aspnet_Membership UMS ON UM.UserId = UMS.UserId  where PUM.UserName = @UserName and UMS.IsApproved = 1 ORDER BY PName
      END
   ELSE
    BEGIN
      print('Projects')
       Select  WS.*,PUM.CanEdit,dbo.GetResourceCount(WS.PID,'1',@UserName) AS 'ResourceCount' , dbo.GetRiskCount(WS.PID,'1',@UserName) AS 'RiskCount' ,  dbo.GetIssueCount(WS.PID,'1',@UserName) AS 'GetIssueCount'
       from #WeeklyStatus WS INNER JOIN ProgrammeManager PM  ON WS.PID = PM.PID 
       INNER JOIN ProjectUserMapping PUM ON PM.PID = PUM.PID  INNER JOIN aspnet_Users UM ON 
         PUM.UserName = UM.UserName Inner JOIN aspnet_Membership UMS ON UM.UserId = UMS.UserId 
         where PUM.UserName = @UserName and UMS.IsApproved = 1 ORDER BY PM.PName
      END
	  
  END TRY 
  BEGIN CATCH
        PRINT 'Error occured that is'
        set @msg=(SELECT ERROR_MESSAGE())
        print @msg
  END CATCH
END

GO

-------------------------------------------------------------------------


  ALTER Procedure [dbo].[prcGetAllKeyAccomplishment]  
  (  @PID Int  )  
  As  
  Begin  
    
	 Declare @Temp table ([WeeklyStatus_Id] [int] NOT NULL,  
	 [Project_Id] [int] NOT NULL,  
	 [Program_Id] [int] NULL,  
	 [P_Desc] [varchar](max) NULL,  
	 [Resource_Id] [int] NULL,  
	 [Status] [char](10) NULL,  
	 [KeyAccomplishments] [varchar](max) NULL,  
	 [KeyIssues] [varchar](max) NULL,  
	 [FuturePlan] [varchar](max) NULL,  
	 [Comments] [varchar](max) NULL,  
	 [TrDate] [date] NULL,  
	 [WeekStatus]  [varchar](100) NULL,
	 [WeekNumber]  [varchar](3) NULL)  
   
     Declare @MystartDate dateTime 
     Declare @MyEndDate dateTime 
     execute [dbo].[prcGetFromAndLastDate] @StartDate = @MystartDate OUTPUT,  @EndDate =  @MyEndDate OUTPUT

	 Declare @ProgId int ,@ProjId int  
	 Set @ProgId = ( Select Program_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
	 Set @ProjId = ( Select Project_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
   
	  ;With CTEData  
	  As  
	  (  
			 select * ,'CurrentWeek' As WeekStatus ,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from [Weekly_Status] where [TrDate] 
			 between @MystartDate   
			 and @MyEndDate and [WeeklyStatus_Id] = @PID  
	  )  
   
		Insert into @Temp  select * from  CTEData  
		Insert into @Temp  select WS.* ,'PreviousWeek' As WeekStatus,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from Weekly_Status WS where WS.Program_Id = @ProgId and WS.Project_Id = @ProjId and WS.WeeklyStatus_Id != @PID  
		select * from @Temp  order by TrDate Desc
  End  
  GO
  
  ---------------------------------------------------------------------------------------------------------------------------
  
   ALTER Procedure [dbo].[prcGetAllKeyAccomplishment]  
  (  @PID Int  )  
  As  
  Begin  
    Begin Transaction
	 Declare @Temp table ([WeeklyStatus_Id] [int] NOT NULL,  
	 [Project_Id] [int] NOT NULL,  
	 [Program_Id] [int] NULL,  
	 [P_Desc] [varchar](max) NULL,  
	 [Resource_Id] [int] NULL,  
	 [Status] [char](10) NULL,  
	 [KeyAccomplishments] [varchar](max) NULL,  
	 [KeyIssues] [varchar](max) NULL,  
	 [FuturePlan] [varchar](max) NULL,  
	 [Comments] [varchar](max) NULL,  
	 [TrDate] [date] NULL,  
	 [WeekStatus]  [varchar](100) NULL,
	 [WeekNumber]  [varchar](3) NULL)  
   
     Declare @MystartDate dateTime 
     Declare @MyEndDate dateTime 
     execute [dbo].[prcGetFromAndLastDate] @StartDate = @MystartDate OUTPUT,  @EndDate =  @MyEndDate OUTPUT

	 Declare @ProgId int ,@ProjId int  
	 Set @ProgId = ( Select Program_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
	 Set @ProjId = ( Select Project_Id from Weekly_Status where WeeklyStatus_Id = @PID)  
     SET DATEFIRST 4;  
	  ;With CTEData  
	  As  
	  (  
			 select * ,'CurrentWeek' As WeekStatus ,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from [Weekly_Status] where [TrDate] 
			 between @MystartDate   
			 and @MyEndDate and [WeeklyStatus_Id] = @PID  
	  )  
   
		Insert into @Temp  select * from  CTEData  
		Insert into @Temp  select WS.* ,'PreviousWeek' As WeekStatus,dbo.GetWeekNumber(TrDate) as 'WeekNumber' from Weekly_Status WS where WS.Program_Id = @ProgId and WS.Project_Id = @ProjId and WS.WeeklyStatus_Id != @PID  
		select * from @Temp  order by TrDate Desc
	SET DATEFIRST 7;  
	Commit  Transaction
  End  
  GO
  

-----------------------------------------------------------------------------------------------------


CREATE TABLE [dbo].[ResourceProjectMaster](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[ResourceId] [bigint] NULL,
	[ProgramId] [bigint] NULL,
	[ProjectId] [bigint] NULL,
 CONSTRAINT [PK_ResourceProjectMaster] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO




USE [ProjectManagement]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create proc [dbo].[prcAssignResourceProject] 

@ResourceId bigint = NULL,

@ProgramId bigint = NULL,

@ProjectId bigint = NULL

 

as

begin

 

if not exists (Select * from ResourceProjectMaster where ResourceId=@ResourceId and ProgramId=@ProgramId and ProjectId=@ProjectId)

begin

insert into ResourceProjectMaster(ResourceId,ProgramId,ProjectId) values(@ResourceId,@ProgramId,@ProjectId)
return 1;

end

else

begin

return 2;

end

 

end

GO



------------------------------ Date : 23 Jun 2016 (Key Accomplishment) -------------------
------------------------------ Purpose : Resolving single quotes issue -------------------


CREATE Procedure [dbo].[prcUpdateFuturePlan]



@WeeklyStatus_Id bigint = NULL,
@FuturePlan nvarchar(max)=null





As

BEGIN

Declare @msg varchar(200);

DECLARE @RID bigint =0; 

      BEGIN TRY


                        BEGIN

                  ---
                  UPDATE WEEKLY_STATUS SET FuturePlan= @FuturePlan WHERE WeeklyStatus_Id = @WeeklyStatus_Id;

                      

                        

                  ---

                        END



          

      END TRY 

      BEGIN CATCH

                  PRINT 'Error occured that is'

                  set @msg=(SELECT ERROR_MESSAGE())

                  print @msg

      END CATCH

END

GO




Create Procedure [dbo].[prcUpdateKeyAccomplishments]



@WeeklyStatus_Id bigint = NULL,
@KeyAccomplishments nvarchar(max)=null





As

BEGIN

Declare @msg varchar(200);

DECLARE @RID bigint =0; 

      BEGIN TRY


                        BEGIN

                  ---
                  UPDATE WEEKLY_STATUS SET KeyAccomplishments= @KeyAccomplishments WHERE WeeklyStatus_Id = @WeeklyStatus_Id;

                      

                        

                  ---

                        END



          

      END TRY 

      BEGIN CATCH

                  PRINT 'Error occured that is'

                  set @msg=(SELECT ERROR_MESSAGE())

                  print @msg

      END CATCH

END

GO





Create Procedure [dbo].[prcUpdateKeyIssues]



@WeeklyStatus_Id bigint = NULL,
@KeyIssues nvarchar(max)=null





As

BEGIN

Declare @msg varchar(200);

DECLARE @RID bigint =0; 

      BEGIN TRY


                        BEGIN

                  ---
                  UPDATE WEEKLY_STATUS SET KeyIssues= @KeyIssues WHERE WeeklyStatus_Id = @WeeklyStatus_Id;

                      

                        

                  ---

                        END



          

      END TRY 

      BEGIN CATCH

                  PRINT 'Error occured that is'

                  set @msg=(SELECT ERROR_MESSAGE())

                  print @msg

      END CATCH

END
GO

CREATE TABLE [dbo].[UserMapModule](
	[ModuleID] [bigint] NULL,
	[UserName] [nvarchar](256) NULL
)

GO



CREATE TABLE [dbo].[Release](
	[ReleaseId] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](250) NULL,
	[ReleaseDate] [datetime] NULL,
	[IsDeleted] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[UpdatedBy] [nvarchar](250) NULL,
	[Description] [nvarchar](1000) NULL,
	[ContactPerson] [nvarchar](250) NULL,
 CONSTRAINT [PK_Release] PRIMARY KEY CLUSTERED 
(
	[ReleaseId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


CREATE TABLE [dbo].[Calender](
	[CalID] [int] IDENTITY(1,1) NOT NULL,
	[CalURL] [nvarchar](max) NULL,
	[CalYear] [nvarchar](4) NULL,
	[CalMonth] [nvarchar](4) NULL,
	[IsDeleted] [int] NULL,
	[UploadedBy] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblCalender] PRIMARY KEY CLUSTERED 
(
	[CalID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO


CREATE TABLE [dbo].[UserMapModule](
	[ModuleID] [bigint] NULL,
	[UserName] [nvarchar](256) NULL
) ON [PRIMARY]

GO


CREATE Procedure [dbo].[prcGetAllReleases]
@ReleaseId bigint,
@Year nvarchar(10),
@Month nvarchar(10)
As
Begin
	SELECT ReleaseId
      ,Title
      ,ReleaseDate
      ,IsDeleted
      ,CreatedDate
      ,ModifiedDate
      ,UpdatedBy
      ,Description
      ,ContactPerson,ReleaseType = Case when ReleaseDate < GETDATE() then 'PreviousRelease' else 'FutureRelease' end
   FROM Release where ((0 = IsNull(@ReleaseId,0)) OR (ReleaseId = @ReleaseId)) 
   And ((datepart(month,ReleaseDate) = @Month) OR (@Month = 0))
   And ((datepart(year,ReleaseDate) = @Year) OR (@Year = 0))
   Order By ReleaseDate Desc
End

GO

Create Procedure [dbo].[prcGetCalender]
(@Year nvarchar(4),
 @Month nvarchar(4))
As
Begin
	select CalID
      ,CalURL
      ,CalYear
      ,CalMonth
      
      ,UploadedBy
      ,CreatedDate
      ,ModifiedDate from  Calender where CalYear = @Year and CalMonth = @Month and IsDeleted = 0 

End

GO

CREATE Procedure [dbo].[prcGetModulesPermissoinByUserName]
(@UserName nvarchar(256))
AS
Begin

 Select * from UserMapModule where UserName = @UserName
End 

GO

----------------------- Upload Data from xls sheet-----------------------


Alter Procedure prcUploadResourceData
@Name varchar(200),
@Designation varchar(200),
@empid varchar(200),
@Skills varchar(200),
@ResourceType varchar(200),
@ResourceLocation varchar(200),
@ProgrameName varchar(200),
@ProjectName varchar(200),
@Result int output
As
Begin
   Begin Transaction
   Declare @DesignationID int 
   Declare @ResourceID bigint 
   Declare @ProjectId bigint 
   Declare @ProgrameId bigint 
   Set @DesignationID = 0 
   Set @ResourceID = 0
   Set @Result = 0
   Begin TRY
   
   If Exists (Select  DesignationId  from Designation  where DesignationName = @Designation)
		Begin
				Set @DesignationID = ( Select  DesignationId  from Designation  where DesignationName = @Designation)
		End 
	Else
		Begin
				INSERT INTO Designation (DesignationName) VALUES (@Designation)
				Set @DesignationID = @@IDENTITY
		End
  
   If Exists( Select Null from ResourceDetails where empid = @empid )
	Begin
	   Update ResourceDetails Set Name = case When LEN(@Name) = 0 Then  Name Else @Name end,
	   Designation = @DesignationID , Skills =  @Skills where empid = @empid
	End
  Else
	Begin
		INSERT INTO ResourceDetails
        (Name ,Designation,Skills,empid)
		VALUES (@Name,@DesignationID,@Skills,@empid)
	End
	
	Set @ResourceID = (Select ResourceID from ResourceDetails where empid = @empid )
	
	--- Check resource Utilisatin Table --------
	
	IF Exists(SELECT ID FROM ResourceMasterUtilization where ResourceMasterId =  @ResourceID)
		Begin
			Update ResourceMasterUtilization Set Year = DATEPART(yyyy,GETDATE()) ,Month = DATEPART(mm,GETDATE()) ,ResourceType = @ResourceType ,ResourceLocation = @ResourceLocation ,PlannedHours = 0 ,
			UtilizedHours = 0 , Status = 'Y' where ResourceMasterId = @ResourceID
		End
    Else
		Begin
		    INSERT INTO ResourceMasterUtilization
           (ResourceMasterId ,Year ,Month ,ResourceType ,ResourceLocation,PlannedHours,UtilizedHours,Status)
     VALUES
           (@ResourceID
           ,2016
           ,7
           ,@ResourceType
           ,@ResourceLocation
           ,0
           ,0
           ,'Y')

		End

  	---End : Check resource Utilisatin Table --------
  	---Start : Project Mapping With Resource -------
  	If(Exists (SELECT PID from ProgrammeManager where PName = @ProgrameName ))
  		Begin
  				Set @ProgrameId = (SELECT PID from ProgrammeManager where PName = @ProgrameName )
  		End
  	Else
  		Begin
  				INSERT INTO ProgrammeManager (PName,ParentID,Status)
  				VALUES (@ProgrameName ,0,'Y')
  					Set @ProgrameId = @@identity
  		End
  		
  		If(Exists (SELECT PID from ProgrammeManager where PName = @ProjectName and ParentID = @ProgrameId))
  		Begin
  				Set @ProjectId = (SELECT PID from ProgrammeManager where PName = @ProjectName and ParentID = @ProgrameId)
  		End
  	Else
  		Begin
  				INSERT INTO ProgrammeManager (PName,ParentID,Status)
  				VALUES (@ProgrameName ,@ProgrameId,'Y')
  					Set @ProjectId = @@identity
  		End
  
  	--- End : Project Mapping With Resource --------
  	
	   Set @Result = 1
	 Commit Transaction
	END TRY
	BEGIN CATCH
		Rollback  Commit Transaction
		  Set @Result = -1
	END CATCH
	 
End  

GO


