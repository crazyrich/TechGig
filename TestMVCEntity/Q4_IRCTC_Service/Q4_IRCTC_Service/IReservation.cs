using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace Q4_IRCTC_Service
{
    [ServiceContract]
    public interface IReservation
    {
        [OperationContract]
        List<Ticket> AllTicket();
        [OperationContract]
        void BookTicket(Ticket bookTicket);

        [OperationContract]
        Ticket CheckStatus(int Id);

        [OperationContract]
        void CancelTicket(int Id);

    }
}
