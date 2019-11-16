create database MessagerieDB;
use MessagerieDB;
/**/
create table Client(Id_Client int auto_increment primary key,Nom_Client char(15) not null,Prenom_Client char(15) not null,Tel_Client int not null,Fax_Client int,Email_Client char(30) unique,Cin_Client char(10) unique,RaisonSociale_Client char(20),FormeJuridique_Client char(4),Adresse_Client char(30) not null,Login_Client char(15) unique not null,Pass_Client char(25) not null,Id_Comptable int references Comptable);
create table Comptable(Id_Comptable int auto_increment primary key,Nom_Comptable char(15) not null,Prenom_Comptable char(15) not null,Tel_Comptable int not null,Fax_Comptable int,Email_Comptable char(30) unique,Cin_Comptable char(10) unique,RaisonSociale_Comptable char(20),FormeJuridique_Comptable char(4),Adresse_Comptable char(30) not null,Login_Comptable char(15) unique not null,Pass_Comptable char(25) not null);
create table Messages(msgText text,dateMsg datetime,emetteur int not null,emetteurType char(10),Id_Comptable int references Comptable,Id_Client int references Client,msgType char(4));
/**/
create view RefinedComptable
as
select Id_Comptable,Nom_Comptable,Prenom_Comptable,Tel_Comptable,Fax_Comptable,Email_Comptable,RaisonSociale_Comptable,FormeJuridique_Comptable,Cin_Comptable,Adresse_Comptable from Comptable;
/**/
create view RefinedClient
as
select Id_Client,Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client from Client;
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
insert into Client(Nom_Client,Prenom_Client,Tel_Client,Fax_Client,Email_Client,RaisonSociale_Client,FormeJuridique_Client,Cin_Client,Adresse_Client,Login_Client,Pass_Client,Id_Comptable)values('qsdqsdq','qsdqsdlkqs',0405060102,0504010203,'example11@doamin.com','Unknown','SARL','AZERT11','45 sdfsdfsdfs','client999','pass',1);
/**/
insert into Comptable(Nom_Comptable,Prenom_Comptable,Tel_Comptable,Fax_Comptable,Email_Comptable,RaisonSociale_Comptable,FormeJuridique_Comptable,Cin_Comptable,Adresse_Comptable,Login_Comptable,Pass_Comptable)values('Moulay smaile','faroua',0405060102,0504010203,'mailcom@doamin.com','Unknown','SARL','QSD546Q','88 qkjdlqkjlq jlsqdkqls','mylogin','pass');
/**/
select * from Comptable;
/**/
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789'