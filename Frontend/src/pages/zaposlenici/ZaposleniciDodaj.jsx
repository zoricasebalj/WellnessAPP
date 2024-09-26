import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ZaposlenikService from "../../services/ZaposlenikService";



export default function ZaposleniciDodaj(){

    const navigate = useNavigate();

    async function dodaj(zaposlenik){
        const odgovor = await ZaposlenikService.dodaj(zaposlenik);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.ZAPOSLENIK_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            strucnost: podaci.get('strucnost')
        });

    }

    return(
        <Container>
            Dodavanje novog zaposlenika
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required />
                </Form.Group>

                <Form.Group controlId="strucnost">
                    <Form.Label>Stručnost</Form.Label>
                    <Form.Control type="text" name="strucnost" required />
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
                        Dodaj novog zaposlenika
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}