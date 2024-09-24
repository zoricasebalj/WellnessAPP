using System.ComponentModel.DataAnnotations.Schema;

namespace EdunovaAPP.Models
{
    public class Zaposlenik: Entitet
    {
        public string? Ime { get; set; }
        public string? Prezime { get; set; }
        public string? Strucnost { get; set; }
    }
}
