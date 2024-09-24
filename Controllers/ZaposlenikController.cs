using EdunovaAPP.Data;
using EdunovaAPP.Models;
using Microsoft.AspNetCore.Mvc;

namespace EdunovaAPP.Controllers
{

    [ApiController]
    [Route("api/v1/[controller]")]
    public class ZaposlenikController:ControllerBase
    {

        // dependecy injection
        // 1. definiraš privatno svojstvo
        private readonly EdunovaContext _context;


        // dependecy injection
        // 2. proslijediš instancu kroz konstruktor
        public ZaposlenikController(EdunovaContext context)
        {
            _context = context;
        }


        // RUTE
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Zaposlenici);
        }


        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra) 
        {
            return Ok(_context.Zaposlenici.Find(sifra));
        }

        [HttpPost]
        public IActionResult Post(Zaposlenik e) 
        {
            _context.Zaposlenici.Add(e);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, e);
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Zaposlenik e) 
        { 
            var eIzBaze = _context.Zaposlenici.Find(sifra);

            // za sada ručno, kasnije Mapper
            eIzBaze.Ime = e.Ime;
            eIzBaze.Prezime = e.Prezime;
            eIzBaze.Strucnost = e.Strucnost;
           

            _context.Zaposlenici.Update(eIzBaze);
            _context.SaveChanges();

            return Ok(new {poruka= "Uspješno promjenjeno" });
        
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            var eIzBaze = _context.Zaposlenici.Find(sifra);
            _context.Zaposlenici.Remove(eIzBaze);
            _context.SaveChanges();
            return Ok(new { poruka = "Uspješno obrisano" });
        }



    }
}
