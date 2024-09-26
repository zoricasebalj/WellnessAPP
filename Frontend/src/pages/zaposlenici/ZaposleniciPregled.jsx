import { Button, Container, Table } from "react-bootstrap";
import ZaposlenikService from "../../services/ZaposlenikService";
import { useEffect, useState } from "react";
import { RoutesNames } from "../../constants";
import { Link, useNavigate } from "react-router-dom";



export default function ZaposleniciPregled(){

    const[zaposlenici,setZaposlenici] = useState();

    const navigate = useNavigate();

    async function dohvatiZaposlenike() {

        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        
        await ZaposlenikService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setZaposlenici(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    useEffect(()=>{
        dohvatiZaposlenike();
    },[]);

   

    async function obrisiAsync(sifra) {
        const odgovor = await ZaposlenikService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiZaposlenike();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <Container>
            <Link to={RoutesNames.ZAPOSLENIK_NOVI}>Dodaj novog zaposlenika</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Stručnost</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {zaposlenici && zaposlenici.map((zaposlenik,index)=>(
                        <tr key={index}>
                            <td>{zaposlenik.ime}</td>
                            <td>{zaposlenik.prezime}</td>
                            <td>{zaposlenik.strucnost}</td>
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/zaposlenici/${zaposlenik.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>obrisi(zaposlenik.sifra)}>
                                    Obriši
                                </Button>

                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}