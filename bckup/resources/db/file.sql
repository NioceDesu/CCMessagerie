create database test;
use test;
/**/
drop table Client;
drop table Comptable;
drop table Messages;
/**/
create table Client(Id_Client int auto_increment primary key,Nom_Client char(15) not null,Prenom_Client char(15) not null,Tel_Client int not null,Fax_Client int,Email_Client char(30) unique,Cin_Client char(10) unique,RaisonSociale_Client char(20),FormeJuridique_Client char(4),Adresse_Client char(30) not null,Login_Client char(15) unique not null,Pass_Client char(25) not null,Id_Comptable int references Comptable);
create table Comptable(Id_Comptable int auto_increment primary key,Nom_Comptable char(15) not null,Prenom_Comptable char(15) not null,Tel_Comptable int not null,Fax_Comptable int,Email_Comptable char(30) unique,Cin_Comptable char(10) unique,RaisonSociale_Comptable char(20),FormeJuridique_Comptable char(4),Adresse_Comptable char(30) not null,Login_Comptable char(15) unique not null,Pass_Comptable char(25) not null);
create table Messages(msg text,dateMsg datetime,sender int not null,senderType char(10),Id_Comptable int references Comptable,Id_Client int references Client);
/**/
drop view RefinedComptable;
create view RefinedComptable
as
select Id_Comptable,Nom_Comptable,Prenom_Comptable,Tel_Comptable,Fax_Comptable,Email_Comptable,RaisonSociale_Comptable,FormeJuridique_Comptable,Cin_Comptable,Adresse_Comptable from Comptable;
/**/
drop view RefinedClient;
create view RefinedClient
as
select Id_Client,Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client from Client;
/**/
select * from RefinedClient where Id_Client = 8;
/**/
alter table Messages add msgType char(4);
/**/
delete from Messages;
/**/
insert into Messages values('alahalah',null,1,'Client',1,1);
select * from Messages where Id_Comptable = 1 and Id_Client = 1;
/**/
alter table Client drop Tel_Client;
/**/
alter table Client add Nom_Client char(15) not null;
alter table Client add Prenom_Client char(15) not null;
alter table Client add Tel_Client int not null;
/**/
update Client set Nom_Client = 'alal',Prenom_Client = 'L9adouse',Tel_Client = 0605040102 where Id_Client = 1;
/**/
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 01','PRENOM 01',0405060102,0504010203,'example01@doamin.com','Unknown','SARL','AZERT1','45 sdfsdfsdfs','client1','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 02','PRENOM 02',0405060102,0504010203,'example02@doamin.com','Unknown','SARL','AZERT2','45 sdfsdfsdfs','client2','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 03','PRENOM 03',0405060102,0504010203,'example03@doamin.com','Unknown','SARL','AZERT3','45 sdfsdfsdfs','client3','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 04','PRENOM 04',0405060102,0504010203,'example04@doamin.com','Unknown','SARL','AZERT4','45 sdfsdfsdfs','client4','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 05','PRENOM 05',0405060102,0504010203,'example05@doamin.com','Unknown','SARL','AZERT5','45 sdfsdfsdfs','client5','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 06','PRENOM 06',0405060102,0504010203,'example06@doamin.com','Unknown','SARL','AZERT6','45 sdfsdfsdfs','client6','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 07','PRENOM 07',0405060102,0504010203,'example07@doamin.com','Unknown','SARL','AZERT7','45 sdfsdfsdfs','client7','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 08','PRENOM 08',0405060102,0504010203,'example08@doamin.com','Unknown','SARL','AZERT8','45 sdfsdfsdfs','client8','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 09','PRENOM 09',0405060102,0504010203,'example09@doamin.com','Unknown','SARL','AZERT9','45 sdfsdfsdfs','client9','pass',1);
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('NOM 10','PRENOM 10',0405060102,0504010203,'example10@doamin.com','Unknown','SARL','AZERT10','45 sdfsdfsdfs','client10','pass',1);
/**/
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('qsdqsdq','qsdqsdlkqs',0405060102,0504010203,'example11@doamin.com','Unknown','SARL','AZERT11','45 sdfsdfsdfs','client999','pass',1);
/**/
update Client set Nom_Client = 'MODJQSD',Prenom_Client = 'QSDQ',Tel_Client = '405060102',Email_Client = 'example03@doamin.com',Fax_Client = '504010203',Cin_Client = 'QSDQS',RaisonSociale_Client = 'Unknown',FormeJuridique_Client = 'SARL',Adresse_Client = '12 kjsdfhk sqkdjhqkf' where Id_Client = 3;
/**/
alter table Client add Cin_Client char(10) unique;
alter table Client add Adresse_Client char(30) not null;
/**/
update Client set FormeJuridique_Client ='QSDG' where Id_Client = 1;
update Client set Nom_Client = 'Mahmed', Prenom_Client = 'barakat' where Id_Client = 2;
/**/
select * from Client where Id_Client = 1;
select * from Client where (Nom_Client like '%j%' ||Nom_Client like '%j%');
/**/
insert into Client(Login_Client,Pass_Client,Id_Comptable)values('client','pass',1);
/**/
insert into Comptable(Nom_Comptable,Prenom_Comptable,Tel_Comptable,Fax_Comptable,Email_Comptable,RaisonSociale_Comptable,FormeJuridique_Comptable,Cin_Comptable,Adresse_Comptable,Login_Comptable,Pass_Comptable)values('Moulay smaile','lhabad',0405060102,0504010203,'comptableEmail@doamin.com','Unknown','SARL','QSD546Q','88 qkjdlqkjlq jlsqdkqls','mylogin','pass');
/**/
select * from Comptable;
/**/
select count(*) from Comptable where Login_Comptable = '' and Pass_Comptable = '';