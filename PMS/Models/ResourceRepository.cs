using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Web.Http;

namespace PortfolioWebApp.Models
{
    public class ResourceRepository : IResource
    {
        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        //Get all resources 
        public IEnumerable<ViewModelResource> GetAll(string userid)
        {
            List<ViewModelResource> resourceData = new List<ViewModelResource>();

            string query = " SELECT a.PID,a.PName,sum(f.resourceCount) as ResourceCount , sum(f.utilization)/count(utilization) as Utilization " +
                             " FROM ProgrammeManager a INNER JOIN ( select b.ParentID,count(c.ResourceID) as resourceCount, " +
                             " ((sum(UsedHours)*100)/RevisedEstimatedHours) as utilization from ProgrammeManager b,Resource c,ProjectResourceMapping d, " +
                               " ProjectHoursEstimates e where b.PID=d.ProjectID and c.ResourceID=d.ResourceID and e.ProjectID=d.ProjectID  " +
                             " group by b.ParentID,RevisedEstimatedHours) f on a.PID=f.ParentID group by a.PID,a.PName";



            // string query = " proPorfolioLevel "; 



            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(query);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.Text;

            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ViewModelResource resourceNew = new ViewModelResource();

                    resourceNew.PID = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
                    resourceNew.PName = reader["PName"] == System.DBNull.Value ? default(string) : (string)reader["PName"];
                    resourceNew.ResourceCount = reader["ResourceCount"] == System.DBNull.Value ? default(Int32) : (Int32)reader["ResourceCount"];
                    resourceNew.Utilization = reader["Utilization"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Utilization"];
                    //resourceNew.AvailableHours = reader["AvailableHours"] == System.DBNull.Value ? default(Int64) : (Int64)reader["AvailableHours"];
                    //resourceNew.UsedHours = reader["UsedHours"] == System.DBNull.Value ? default(Int64) : (Int64)reader["UsedHours"];

                    resourceData.Add(resourceNew);
                }

                return resourceData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }
        [HttpPost]
        public IEnumerable<ResourceForModal> GetResourceDetailsForModal([FromBody]ResourceForModalArgs Args)
        {
            List<ResourceForModal> resourceData = new List<ResourceForModal>();

            int ParentId = Args.ParentID;
            int year = Args.Year;
            int month = Args.Month;
            string userid = Args.UserId;
            string query = string.Empty;
            query = "ResourceDetailsForGrid";

            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(query);
            // SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ParentId", Convert.ToInt32(ParentId));
            cmd.Parameters.AddWithValue("@year", Convert.ToInt32(year));
            cmd.Parameters.AddWithValue("@month", Convert.ToInt32(month));
            cmd.Parameters.AddWithValue("@userid", Convert.ToString(userid));
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ResourceForModal resourceNew = new ResourceForModal();

                    if (ParentId == 0)
                    {
                        resourceNew.ProgramID = Convert.ToInt32(reader["ProgramID"]);
                        resourceNew.ProgramName = Convert.ToString(reader["ProgramName"]);
                    }
                    else
                    {
                        resourceNew.ProjectID = Convert.ToInt32(reader["ProjectID"]);
                        resourceNew.ProjectName = Convert.ToString(reader["ProjectName"]);
                    }
                    //  resourceNew.Role = reader["Role"] == System.DBNull.Value ? default(string) : (string)reader["Role"];
                    // resourceNew.TotalOnsiteResources = reader["TotalOnsiteResources"] == System.DBNull.Value ? default(Int32) : (Int32)reader["TotalOnsiteResources"];
                    //resourceNew.TotalOffshoreResources = reader["TotalOffshoreResources"] == System.DBNull.Value ? default(Int32) : (Int32)reader["TotalOffshoreResources"];
                    resourceNew.TotalResources = Convert.ToInt32(reader["TotalResources"]);

                    resourceNew.TotalPlannedHours = Convert.ToInt32(reader["TotalPlannedHours"]);
                    resourceNew.TotalUtilizedHours = Convert.ToInt32(reader["TotalUtilizedHours"]);


                    resourceData.Add(resourceNew);
                }

                return resourceData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }


        }

        #region COMMENTED
        //public IEnumerable<ViewModelResource> GetAll()
        //{
        //    List<ViewModelResource> resourceData = new List<ViewModelResource>();
        //    //DataTable dt = new DataTable();
        //    //string query = " select  prog.Program_Id,prog.Program_Name,COUNT(res.ResourceID) as Resource_Count, " +
        //    //                " ((sum(UsedHours)*100)/ sum(RevisedEstimatedHours)) as Utilization FROM Resource res  join ProjectResourceMapping prm " +
        //    //                " on res.ResourceID = prm.ResourceID join Project_Master pm   on prm.ProjectID = pm.Project_Id	" +
        //    //                " join ProjectHoursEstimates phe on phe.ProjectID=pm.Project_Id    join Program_Master prog " +
        //    //                " on prog.Program_Id=pm.Program_Id Group BY prog.Program_Id,prog.Program_Name ";

        //    SqlConnection con = new SqlConnection(connectionString);
        //    SqlCommand cmd = new SqlCommand("procProgramRes");
        //    SqlDataAdapter sda = new SqlDataAdapter();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Connection = con;
        //    try
        //    {
        //        con.Open();
        //        //sda.SelectCommand = cmd;
        //        //sda.Fill(dt);
        //        ////resourceData = dt.AsEnumerable().ToList();



        //        SqlDataReader reader = cmd.ExecuteReader();
        //        while (reader.Read())
        //        {
        //            ViewModelResource resourceNew = new ViewModelResource();

        //            resourceNew.PID = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
        //            resourceNew.PName = reader["PName"] == System.DBNull.Value ? default(string) : (string)reader["PName"];
        //            // resourceNew.Resource_Count = reader["Resource_Count"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Resource_Count"];
        //            //resourceNew.Utilization = reader["Utilization"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Utilization"];

        //            resourceData.Add(resourceNew);
        //        }

        //        return resourceData;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        con.Close();
        //        sda.Dispose();
        //        con.Dispose();
        //    }
        //}

        //        public Weeklystatus Get(string ID)
        //        {
        //            Weeklystatus weeklystatus = new Weeklystatus();

        //            string query = @"SELECT 
        //                            W.WeeklyStatus_Id,
        //                            W.Project_Id,
        //                            W.Program_Id,
        //                            W.P_Desc,
        //                            W.Resource_Id,
        //                            W.Status,
        //                            W.KeyAccomplishments,
        //                            W.KeyIssues,
        //                            W.FuturePlan,
        //                            W.Comments,
        //                            PRG.Program_Name,
        //                            PRJ.Project_Name,
        //                            RM.Name,
        // REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, W.TRDATE,   1), 111), '/', '-') TRDATE,
        //                            (case when W.TRDATE >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND W.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'CurrentWeek' WHEN W.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'PreviousWeek' WHEN W.TRDATE >  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'PostWeek' end) WEEKSTATUS
        //                            FROM WEEKLY_STATUS W LEFT JOIN Program_Master PRG ON W.PROGRAM_ID=PRG.PROGRAM_ID
        //                             LEFT JOIN PROJECT_MASTER PRJ ON W.PROJECT_ID=PRJ.PROJECT_ID
        //                             LEFT JOIN Resource RM ON W.RESOURCE_ID=RM.ResourceID " +
        //                "  WHERE WeeklyStatus_Id = '" + ID + "'";

        //            using (SqlConnection con =
        //                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
        //            {
        //                using (SqlCommand cmd = new SqlCommand(query, con))
        //                {
        //                    con.Open();
        //                    SqlDataReader reader = cmd.ExecuteReader();

        //                    while (reader.Read())
        //                    {
        //                        weeklystatus.WeeklyStatus_Id = reader["WeeklyStatus_Id"] == System.DBNull.Value ? default(int) : (int)reader["WeeklyStatus_Id"];

        //                        weeklystatus.Project_Id = reader["Project_Id"] == System.DBNull.Value ? default(int) : (int)reader["Project_Id"];

        //                        weeklystatus.Program_Id = reader["Program_Id"] == System.DBNull.Value ? default(int) : (int)reader["Program_Id"];

        //                        weeklystatus.Project_Name = reader["Program_Name"] == System.DBNull.Value ? null : (string)reader["Program_Name"];

        //                        weeklystatus.Project_Desc = reader["P_Desc"] == System.DBNull.Value ? null : (string)reader["P_Desc"];

        //                        weeklystatus.Resource_Id = reader["Resource_Id"] == System.DBNull.Value ? default(int) : (int)reader["Resource_Id"];

        //                        weeklystatus.Resource_Name = reader["Name"] == System.DBNull.Value ? null : (string)reader["Name"];

        //                        weeklystatus.Status = reader["Status"] == System.DBNull.Value ? null : (string)reader["Status"];

        //                        weeklystatus.KeyAccomplishments = reader["KeyAccomplishments"] == System.DBNull.Value ? null : (string)reader["KeyAccomplishments"];

        //                        weeklystatus.KeyIssues = reader["KeyIssues"] == System.DBNull.Value ? null : (string)reader["KeyIssues"];

        //                        weeklystatus.FuturePlan = reader["FuturePlan"] == System.DBNull.Value ? null : (string)reader["FuturePlan"];

        //                        weeklystatus.Comments = reader["Comments"] == System.DBNull.Value ? null : (string)reader["Comments"];

        //                        weeklystatus.TRDATE = reader["TRDATE"] == System.DBNull.Value ? null : (string)reader["TRDATE"];
        //                        weeklystatus.WEEKSTATUS = reader["WEEKSTATUS"] == System.DBNull.Value ? null : (string)reader["WEEKSTATUS"];
        //                    }
        //                    con.Close();
        //                }
        //            }
        //            return weeklystatus;


        //        }

        //GET resource by ID
        //public Resource Get(string ID)
        //{
        //    Resource resourceNew = new Resource();

        //    string query = "SELECT r.ResourceID,r.Name,r.Designation,r.Skills,r.CreatedDate,r.UpdatedDate FROM Resource r,ProjectResourceMapping p WHERE r.ResourceID = p.ResourceID and p.ProjectID = " + ID + " ";

        //    SqlConnection con = new SqlConnection(connectionString);
        //    SqlCommand cmd = new SqlCommand(query);
        //    SqlDataAdapter sda = new SqlDataAdapter();
        //    cmd.CommandType = CommandType.Text;
        //    cmd.Connection = con;
        //    try 
        //    {
        //        con.Open();
        //        SqlDataReader reader = cmd.ExecuteReader();

        //        while (reader.Read())
        //        {

        //            resourceNew.CreatedDate = reader["CreatedDate"] == System.DBNull.Value ? default(DateTime) : (DateTime)reader["CreatedDate"];
        //            resourceNew.Designation = reader["Designation"] == System.DBNull.Value ? default(string) : (string)reader["Designation"];
        //            resourceNew.Name = reader["Name"] == System.DBNull.Value ? default(string) : (string)reader["Name"];
        //            resourceNew.ResourceID = reader["ResourceID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ResourceID"];
        //            resourceNew.Skills = reader["Skills"] == System.DBNull.Value ? default(string) : (string)reader["Skills"];
        //            resourceNew.UpdatedDate = reader["UpdatedDate"] == System.DBNull.Value ? default(DateTime) : (DateTime)reader["UpdatedDate"];

        //        }

        //    }
        //    catch(Exception ex)
        //    {
        //        throw ex;
        //    }
        //    return resourceNew;
        //}
        #endregion

        public IEnumerable<ViewModelResource> Get(string ID, string userid)
        {
            List<ViewModelResource> resourceData = new List<ViewModelResource>();
            //string query = " proProgLevel " + ID;
            SqlConnection con = new SqlConnection(connectionString);

            //SqlDataAdapter sda = new SqlDataAdapter();
            string query = string.Empty;
            //Int64 id = Convert.ToInt64(ID);
            query = "proProgLevel";

            SqlCommand cmd = new SqlCommand(query);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Parameters.AddWithValue("@userid", userid);


            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ViewModelResource resourceNew = new ViewModelResource();

                    resourceNew.PID = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
                    resourceNew.PName = reader["PName"] == System.DBNull.Value ? default(string) : (string)reader["PName"];
                    resourceNew.ResourceCount = reader["ResourceCount"] == System.DBNull.Value ? default(Int32) : (Int32)reader["ResourceCount"];
                    resourceNew.Utilization = reader["Utilization"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Utilization"];

                    resourceData.Add(resourceNew);
                }

                return resourceData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }

        }

        public IEnumerable<GetAllResourceForEdit> GetDataForModification(int ID, string userid)
        {
            List<GetAllResourceForEdit> resourceData = new List<GetAllResourceForEdit>();
            DataTable dt = new DataTable();

            //string query = "SELECT PRM.ProjectID,(select PID from ProgrammeManager PM2 Where PM2.PID = PM.ParentID) AS ParentID,(select PName from ProgrammeManager PM2 Where PM2.PID = PM.ParentID) AS ParentName,PRM.ResourceID, RES.Name, RES.Designation, RES.Skills, PM.PName, PRM.UsedHours FROM ProgrammeManager PM INNER JOIN PROJECTRESOURCEMAPPING PRM ON PRM.PROJECTID=PM.PID INNER JOIN Resource RES ON RES.ResourceID=PRM.ResourceID";

            string query = "procResourceUtilization";
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(query);
            SqlDataAdapter sda = new SqlDataAdapter();

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@PrgID", Convert.ToInt32(ID));
            cmd.Parameters.AddWithValue("@UserName", Convert.ToString(userid));

            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    GetAllResourceForEdit resourceNew = new GetAllResourceForEdit();

                    resourceNew.ID = reader["ID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ID"];
                    resourceNew.ProgramID = reader["ProgramID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ProgramID"];
                    resourceNew.ProgramName = reader["ProgramName"] == System.DBNull.Value ? default(string) : (string)reader["ProgramName"];
                    resourceNew.ProjectID = reader["ProjectID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ProjectID"];
                    resourceNew.ProjectName = reader["ProjectName"] == System.DBNull.Value ? default(string) : (string)reader["ProjectName"];
                    resourceNew.ResourceID = reader["ResourceID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ResourceID"];
                    resourceNew.ResourceName = reader["ResourceName"] == System.DBNull.Value ? default(string) : (string)reader["ResourceName"];
                    resourceNew.Year = reader["Year"] == System.DBNull.Value ? default(Int64) : (Int64)reader["Year"];
                    resourceNew.Month = reader["Month"] == System.DBNull.Value ? default(Int64) : (Int64)reader["Month"];
                    resourceNew.ResourceType = reader["ResourceType"] == System.DBNull.Value ? default(string) : (string)reader["ResourceType"];
                    resourceNew.ResourceLocation = reader["ResourceLocation"] == System.DBNull.Value ? default(string) : (string)reader["ResourceLocation"];
                    resourceNew.PlannedHours = reader["PlannedHours"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PlannedHours"];
                    resourceNew.UtilizedHours = reader["UtilizedHours"] == System.DBNull.Value ? default(Int64) : (Int64)reader["UtilizedHours"];
                    resourceNew.Designation = reader["Designation"] == System.DBNull.Value ? default(string) : (string)reader["Designation"];
                    resourceNew.ResourceLocation = reader["ResourceLocation"] == System.DBNull.Value ? default(string) : (string)reader["ResourceLocation"];
                    resourceNew.ResourceType = reader["ResourceType"] == System.DBNull.Value ? default(string) : (string)reader["ResourceType"];



                    resourceData.Add(resourceNew);
                }

                return resourceData.ToArray();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                sda.Dispose();
                con.Dispose();
            }
        }

        public IEnumerable<GetResourceType> GetDataForresourceType()
        {
            List<GetResourceType> resourcetype = new List<GetResourceType>();
            string query = "SELECT * from ResourceTypes";
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(query);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.Text;

            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    GetResourceType resourceNew = new GetResourceType();

                    resourceNew.ID = reader["ResourceTypeId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ResourceTypeId"];
                    resourceNew.ResourceType = reader["ResourceType"] == System.DBNull.Value ? default(string) : (string)reader["ResourceType"];
                    resourcetype.Add(resourceNew);
                }

                return resourcetype;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }

        }

        public IEnumerable<GetResourceLocation> GetDataForresourceLocation()
        {
            List<GetResourceLocation> resourcelocation = new List<GetResourceLocation>();
            string query = "SELECT * from ResourceLocation";
            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(query);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.Text;

            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    GetResourceLocation resourceNew = new GetResourceLocation();

                    resourceNew.ID = reader["ResourceLocationId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ResourceLocationId"];
                    resourceNew.ResourceLocation = reader["ResourceLocation"] == System.DBNull.Value ? default(string) : (string)reader["ResourceLocation"];
                    resourcelocation.Add(resourceNew);
                }

                return resourcelocation;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        public IEnumerable<ResourceDetails> GetResourceDetail(string userid)
        {
            List<ResourceDetails> resourceData = new List<ResourceDetails>();

            string query = "SELECT ResourceID,Name,Designation,Skills from ResourceDetails";

            // string query = " proPorfolioLevel "; 



            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(query);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.Text;

            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ResourceDetails resourceNew = new ResourceDetails();

                    resourceNew.ResourceID = reader["ResourceID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ResourceID"];
                    resourceNew.Name = reader["Name"] == System.DBNull.Value ? default(string) : (string)reader["Name"];
                    resourceNew.Designation = reader["Designation"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Designation"];
                    resourceNew.Skills = reader["Skills"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Skills"];
                    resourceData.Add(resourceNew);
                }

                return resourceData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        //
        public IEnumerable<ResourceProjectDetails> GetResourceProjectDetail(string userid)
        {
            List<ResourceProjectDetails> resourceData = new List<ResourceProjectDetails>();


            string query = "procGetResourceProjectDetail";

            SqlConnection con = new SqlConnection(connectionString);
            SqlCommand cmd = new SqlCommand(query);
            SqlDataAdapter sda = new SqlDataAdapter();
            cmd.CommandType = CommandType.Text;

            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ResourceProjectDetails resourceNew = new ResourceProjectDetails();

                    resourceNew.ResourceType = reader["resourceType"] == System.DBNull.Value ? default(string) : (string)reader["resourceType"];
                    resourceNew.ResourceLocation = reader["resourcelocation"] == System.DBNull.Value ? default(string) : (string)reader["resourcelocation"];
                    resourceNew.Designation = reader["Designation"] == System.DBNull.Value ? default(string) : (string)reader["Designation"];
                    resourceNew.ProgramName = reader["ProgramName"] == System.DBNull.Value ? default(string) : (string)reader["ProgramName"];
                    resourceNew.Year = reader["Year"] == System.DBNull.Value ? default(Int64) : (Int64)reader["Year"];
                    resourceNew.Month = reader["Month"] == System.DBNull.Value ? default(Int64) : (Int64)reader["Month"];

                    resourceData.Add(resourceNew);
                }

                return resourceData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        //UPDATE resource
        public bool UpdateResource(Resource item)
        {
            string query = string.Empty;

            Int64 ID = Convert.ToInt64(item.ID);
            Int64 ProgramID = item.ProgramID;
            Int64 ProjectID = item.ProjectID;
            Int64 ResourceID = item.ResourceID;
            Int64 Year = item.Year;
            Int64 Month = item.Month;
            Int64 PlannedHours = item.PlannedHours;
            Int64 UtilizedHours = item.UtilizedHours;
            string ResourceType = item.ResourceType;
            string ResourceLocation = item.ResourceLocation;


            //Procedure Works As IF-ELSE
            query = "prcAddResource";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Programid", Convert.ToInt32(ProgramID));
                    cmd.Parameters.AddWithValue("@Projectid", Convert.ToInt32(ProjectID));
                    cmd.Parameters.AddWithValue("@Resourceid", Convert.ToInt32(ResourceID));
                    cmd.Parameters.AddWithValue("@ResourceType", Convert.ToString(ResourceType));
                    cmd.Parameters.AddWithValue("@ResourceLocation", Convert.ToString(ResourceLocation));
                    cmd.Parameters.AddWithValue("@Year", Convert.ToInt32(Year));
                    cmd.Parameters.AddWithValue("@Month", Convert.ToInt32(Month));
                    cmd.Parameters.AddWithValue("@Plannedhours", Convert.ToInt32(PlannedHours));
                    cmd.Parameters.AddWithValue("@Utilizedhours", Convert.ToInt32(UtilizedHours));
                    cmd.Parameters.AddWithValue("@Id", ID);

                    cmd.Connection = con;

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;

        }

        public bool DeleteResource(Resource item)
        {
            string query = string.Empty;


            //query = @"DELETE FROM ResourceMasterUtilization " +
            //    " WHERE ID = " + item.ID + " ";
            query = "procDeleteResourceData";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@id", Convert.ToInt32(item.ID));
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;
        }

        public IEnumerable<Designation> GetDesignation()
        {
            List<Designation> designationData = new List<Designation>();

            SqlConnection con = new SqlConnection(connectionString);


            string query = string.Empty;

            query = "select DesignationID,DesignationName from Designation ";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Designation designation = new Designation();

                    designation.DesignationID = reader["DesignationID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["DesignationID"];
                    designation.DesignationName = reader["DesignationName"] == System.DBNull.Value ? default(string) : (string)reader["DesignationName"];

                    designationData.Add(designation);
                }

                return designationData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        public IEnumerable<Skill> GetSkill()
        {
            List<Skill> skillData = new List<Skill>();

            SqlConnection con = new SqlConnection(connectionString);


            string query = string.Empty;

            query = "select SkillID,SkillName from Skill ";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Skill skill = new Skill();

                    skill.SkillID = reader["SkillID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["SkillID"];
                    skill.SkillName = reader["SkillName"] == System.DBNull.Value ? default(string) : (string)reader["SkillName"];

                    skillData.Add(skill);
                }

                return skillData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        public Resource GetResourceCount(string level, string UserName)
        {
            Resource oResource = new Resource();
            string strQuery = "prcGetResourceCount";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQuery, con))
                {

                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Level", Convert.ToString(level));
                    cmd.Parameters.AddWithValue("@UserName", Convert.ToString(UserName));

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        //oResource.ResourceCount = "0"; //Convert.ToString(reader["ResourceCount"]);
                        oResource.ResourceCount = Convert.ToString(reader["ResourceCount"]);
                    }
                }

            }

            return oResource;

        }


        public bool AddResource(ResourceDetails item)
        {
            string query = string.Empty;

            Int64 ResourceEmpID = Convert.ToInt64(item.ResourceID);
            Int32 Designation = item.Designation;
            Int32 Skills = item.Skills;
            string ResourceName = item.Name;


            //Procedure Works As IF-ELSE
            query = "prcAddNewResource";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand(query))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@ResourceEmpID", Convert.ToInt64(ResourceEmpID));
                        cmd.Parameters.AddWithValue("@Designation", Convert.ToInt32(Designation));
                        cmd.Parameters.AddWithValue("@Skills", Convert.ToInt32(Skills));
                        cmd.Parameters.AddWithValue("@ResourceName", Convert.ToString(ResourceName));
                        cmd.Connection = con;
                        con.Open();
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                                    return true;
                }
                catch
                {
                    return false;
                }

            }


        }

        public IEnumerable<ResourceDetails> GetResourceDetails()
        {
            List<ResourceDetails> allResource = new List<ResourceDetails>();

            SqlConnection con = new SqlConnection(connectionString);


            string query = string.Empty;

            query = "select * from ResourceDetails ";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ResourceDetails resource = new ResourceDetails();

                    resource.ResourceID = reader["ResourceID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ResourceID"];
                    resource.Name = reader["Name"] == System.DBNull.Value ? default(string) : (string)reader["Name"];
                    resource.Designation = reader["Designation"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Designation"];
                    resource.Skills = reader["Skills"] == System.DBNull.Value ? default(Int32) : (Int32)reader["Skills"];
                    resource.ResourceEmpID = reader["empid"] == System.DBNull.Value ? default(Int64) : (Int64)reader["empid"];

                    allResource.Add(resource);
                }

                return allResource;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }


        }

        public int AssignResourceProject(ResourceProject item)
        {
            string query = string.Empty;

            Int64 ResourceId = Convert.ToInt64(item.ResourceId);
            Int64 ProgramId = item.ProgramId;
            Int64 ProjectId = item.ProjectId;


            //Procedure Works As IF-ELSE
            query = "prcAssignResourceProject";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                try
                {
                    using (SqlCommand cmd = new SqlCommand(query))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@ResourceId", Convert.ToInt64(ResourceId));
                        cmd.Parameters.AddWithValue("@ProgramId", Convert.ToInt32(ProgramId));
                        cmd.Parameters.AddWithValue("@ProjectId", Convert.ToInt32(ProjectId));
                        IDbDataParameter returnvalue = cmd.CreateParameter();
                        returnvalue.Direction = ParameterDirection.ReturnValue;
                        cmd.Parameters.Add(returnvalue);

                        
                        cmd.Connection = con;
                        con.Open();
                        cmd.ExecuteNonQuery();
                        con.Close();
                        return Convert.ToInt32(returnvalue.Value);
                    }
                   
                }
                catch
                {
                    return 0;
                }

            }


        }

        public IEnumerable<ResourceProgramProjectDetails> GetResourceProgramProjectList()
        {
            List<ResourceProgramProjectDetails> resourceDetails = new List<ResourceProgramProjectDetails>();

            SqlConnection con = new SqlConnection(connectionString);


            string query = string.Empty;

            query = "prcGetResourceProgramProjectList";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ResourceProgramProjectDetails resource = new ResourceProgramProjectDetails();

                    resource.Id = reader["Id"] == System.DBNull.Value ? default(Int64) : (Int64)reader["Id"];
                    resource.ProgramId = reader["ProgramId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ProgramId"];
                    resource.ProjectId = reader["ProjectId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ProjectId"];
                    resource.EmpId = reader["EmpId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["EmpId"];
                    resource.Name = reader["Name"] == System.DBNull.Value ? default(string) : (string)reader["Name"];
                    resource.ProgramName = reader["ProgramName"] == System.DBNull.Value ? default(string) : (string)reader["ProgramName"];
                    resource.ProjectName = reader["ProjectName"] == System.DBNull.Value ? default(string) : (string)reader["ProjectName"];
                    resource.Role = reader["Role"] == System.DBNull.Value ? default(string) : (string)reader["Role"];

                    resourceDetails.Add(resource);
                }

                return resourceDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }


        }

        public int DeleteResourceProject(string Id)
        {
            string query = string.Empty;


            //query = @"DELETE FROM ResourceMasterUtilization " +
            //    " WHERE ID = " + item.ID + " ";
            query = "procDeleteResourceProject";
            try
            {
                using (SqlConnection con =
                        new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", Convert.ToInt32(Id));
                        con.Open();
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                }
                return 1;
            }
            catch
            {
                return 0;
            }

            
        }
    }

}