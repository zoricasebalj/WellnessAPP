

-- Zamjeniti db_a98acf_edunovawp4 s imenom svoje baze

SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_aad92f_wellness SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_aad92f_wellness COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_aad92f_wellness SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

use wellness;
create table klijenti(
sifra int not null primary key identity (1,1),
ime varchar(20)not null,
prezime varchar(30) not null,
email varchar (50) not null
);

create table termini(
sifra int not null primary key identity(1,1),
datum datetime not null,
klijent int not null,
usluga int not null,
zaposlenik int);

create table usluge(
sifra int not null primary key identity(1,1),
vrstausluge varchar(50)not null,
trajanje int not null,
cijena decimal(18,2)not null,
);
create table zaposlenici(
sifra int not null primary key identity (1,1),
ime varchar(20)not null,
prezime varchar(30)not null,
strucnost varchar(50),
);

alter table termini add foreign key (klijent) references klijenti(sifra);
alter table termini add foreign key (usluga) references usluge(sifra);
alter table termini add foreign key (zaposlenik) references zaposlenici(sifra);


insert into klijenti(ime,prezime,email)
values ('Ivan','Horvat','ivanhorvat@gmail.com'),
('Ana','Marić','anamaric@gmail.com'),
('Stjepan','Ðuričić','stjepanduricic@gmail.com'),
('Anita','hvastek','anitahvastek@.com');


insert into usluge(vrstausluge,trajanje,cijena)
values ('masaža',1,49.99),
('sportskamasaža',1,49.99),
('masazascetiriruke',1,99.99),
('masazasvrucimkamenjem',1,99.99);

insert into zaposlenici(ime,prezime,strucnost)
values ('Pero','Perić','fizioterapetut'),
('Marija','Babić','fizioterapeut'),
('Ivona','Papić','fizioterapeut'),
('Marina','Šarić','fizioterapeut');

insert into termini(datum,klijent,usluga,zaposlenik)

values ('2024-05-21 16:00',1,1,1),
('2024-06-06 17:00',1,2,2),
('2024-06-21 12:00',2,3,3),
('2024-07-25 13:00',4,4,4);