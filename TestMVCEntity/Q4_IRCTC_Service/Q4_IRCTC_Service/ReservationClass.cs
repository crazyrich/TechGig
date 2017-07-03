using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace Q4_IRCTC_Service
{
    public class ReservationClass :IReservation
    {
        TestMVCentityEntities db = new TestMVCentityEntities();
        public List<Ticket> AllTicket()
        {
            return db.Tickets.ToList();
        }
        public void BookTicket(Ticket bookTicket)
        {
            Ticket obj = new Ticket()
            {
                SourceStation=bookTicket.SourceStation,
                DestinationStation=bookTicket.DestinationStation,
                Ticket_Count=bookTicket.Ticket_Count,
                Status=bookTicket.Status,
            };
            db.Tickets.Add(obj);
            db.SaveChanges();
        }

        public Ticket CheckStatus(int Id)
        {
            var res = db.Tickets.ToList().Find(x=>x.Id==Id);
            if (res != null)
            {
                return res;
            }
            else
            {
                throw new FaultException("Faulty ! !");            
            }
        }

        public void CancelTicket(int Id)
        {
            var res = db.Tickets.ToList().Find(x => x.Id == Id);
            if (res != null)
            {
                res.SourceStation = res.SourceStation;
                res.DestinationStation = res.DestinationStation;
                res.Ticket_Count = res.Ticket_Count;
                res.Status = "Cancelled";
                db.SaveChanges();

            }
            else
            {
                throw new FaultException("Faulty ! !");
            }
        }
    }
}