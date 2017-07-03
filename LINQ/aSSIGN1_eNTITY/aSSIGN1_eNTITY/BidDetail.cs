using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Linq.Mapping;

namespace aSSIGN1_eNTITY
{
    [Table(Name = "bidDetails")]
    class BidDetail
    {
        private int bID;
        private string name;
        private string domain;
        private int projectDuration;
        private int teamRequired;

        [Column(Storage="bID",Name="bID",IsPrimaryKey=true)]
        public int BID
        {
            set 
            {
                this.bID = value;
            }
            get
            {
                return bID;
            }
        
        }
        [Column(Storage = "name", Name = "name")]
        public string Name
        {
            set
            {
                this.name = value;
            }
            get
            {
                return name;
            }

        }
        [Column(Storage = "domain", Name = "domain")]
        public string Domain
        {
            set
            {
                this.domain = value;
            }
            get
            {
                return domain;
            }

        }
        [Column(Storage = "projectDuration", Name = "projectDuration")]
        public int ProjectDuration
        {
            set
            {
                this.projectDuration = value;
            }
            get
            {
                return projectDuration;
            }

        }
        [Column(Storage = "teamRequired", Name = "teamRequired")]
        public int TeamRequired
        {
            set
            {
                this.teamRequired = value;
            }
            get
            {
                return teamRequired;
            }

        }
    }
}
