import { HttpService } from "./HttpService"


async function get(){
    return await HttpService.get('/Zaposlenik')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra){
    return await HttpService.get('/Zaposlenik/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Ne postoji Zaposlenik!'}
    })
}

async function obrisi(sifra) {
    return await HttpService.delete('/Zaposlenik/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
       return odgovor;
    })
    .catch((e)=>{
        //console.log(e);
        return {greska: true, poruka: 'Zaposlenik se ne može obrisati!'}
    })
}

async function dodaj(smjer) {
    return await HttpService.post('/Zaposlenik',smjer)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Zaposlenik se ne može dodati!'}
    })
}

async function promjena(sifra,smjer) {
    return await HttpService.put('/Zaposlenik/' + sifra,smjer)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Zaposlenik se ne može promjeniti!'}
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}