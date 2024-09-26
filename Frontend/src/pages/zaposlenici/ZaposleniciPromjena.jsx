import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../../constants";
import moment from "moment";
import ZaposlenikService from "../../services/ZaposlenikService";
import { useEffect, useState } from "react";



export default function ZaposleniciPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [zaposlenik,setZaposlenik] = useState({});

    async function dohvatiZaposlenike(){
        const odgovor = await ZaposlenikService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setZaposlenik(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiZaposlenike();
    });

    async function promjena(zaposlenik){
        const odgovor = await ZaposlenikService.promjena(routeParams.sifra,zaposlenik);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.ZAPOSLENIK_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            strucnost: podaci.get('strucnost')
        });

    }

    return(
        <Container>
            Promjena zaposlenika
            
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required defaultValue={zaposlenik.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required defaultValue={zaposlenik.prezime}/>
                </Form.Group>

                <Form.Group controlId="strucnost">
                    <Form.Label>Stručnost</Form.Label>
                    <Form.Control type="text" name="strucnost" required defaultValue={zaposlenik.strucnost}/>
                </Form.Group>


                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.ZAPOSLENIK_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni zaposlenika
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}