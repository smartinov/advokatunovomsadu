# Izvori za kalkulatore

Odakle potiču iznosi u kalkulatorima na sajtu. Kad se propis izmeni, prvo proverite zvanični tekst, zatim ažurirajte kod, test i datum provere.

## Kalkulator sudske takse

Kod: `src/taksa.js`, test: `src/taksa.test.js`, stranica: `/sudska-taksa/`. Provereno 29. 9. 2026.

Propis: Zakon o sudskim taksama, „Sl. glasnik RS“, br. 28/94, 53/95, 16/97, 34/2001 – dr. zakon, 9/2002, 29/2004, 61/2005, 116/2008 – dr. zakon, 31/2009, 101/2011, 93/2012, 93/2014, 106/2015, 95/2018 i 91/2025. Izmena 91/2025 objavljena je 23. 10. 2025. i važi od 31. 10. 2025.

| Šta | Odredba | Izvor |
|---|---|---|
| Razredi i gornje granice (105.000 i 420.000 RSD) | Taksena tarifa, tarifni broj 1 st. 1 i 2 | [PIS, prečišćen tekst (zvanični)](https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/1994/28/8/reg) |
| Polovina / trećina takse (odgovor, izvršenje, obezbeđenje) | TB 1 st. 3 | isto |
| Žalba, revizija | TB 1 st. 4 i 5 | isto |
| Platni nalog | TB 1 napomena 2; TB 2 st. 4 i napomena 8 | isto |
| Presude | TB 2 st. 1 i 2 | isto |
| Sudsko poravnanje | TB 3 st. 1 | isto |
| Privredni sud i fizičko lice koje nije preduzetnik | TB 1 st. 8, TB 2 st. 11, TB 3 st. 2 | isto |
| Oslobođenja | član 9 st. 1 i poslednji stav, član 10 st. 1 | isto |

Pomoćni izvori, korišćeni za unakrsnu proveru:

- [Paragraf Lex, prečišćen tekst](https://www.paragraf.rs/propisi/zakon_o_sudskim_taksama.html)
- [Paragraf Lex, Zakon o izmenama i dopunama (91/2025)](https://www.paragraf.rs/izmene_i_dopune/231025-zakon-o-izmenama-i-dopunama-zakona-o-sudskim-taksama.html)
- [propisi.net](https://propisi.net/zakon-o-sudskim-taksama/)

Otvoreno pitanje za kancelariju: po TB 2 st. 4 i napomeni 8, pri podnošenju tužbe sa predlogom za platni nalog verovatno se plaća i taksa na rešenje o platnom nalogu, dakle ukupno cela taksa. Kalkulator sada prikazuje polovinu.

## Kalkulator advokatske tarife

Kod: `src/advokatska.js`, test: `src/advokatska.test.js`, stranica: `/advokatska-tarifa/`. Provereno 29. 9. 2026.

Propis: Tarifa o nagradama i naknadama troškova za rad advokata, „Sl. glasnik RS“, br. 43/2023 i 56/2025. Izmenom 56/2025 (odluka UO AKS od 21. 6. 2025, na snazi od 5. 7. 2025) vrednost poena je podignuta sa 45 na 50 dinara. Nagrade i granice vrednosti spora su u tarifi izražene u poenima, pa nova vrednost poena menja i jedno i drugo.

Zvanični prečišćen tekst: [Pravno-informacioni sistem RS](https://pravno-informacioni-sistem.rs/eli/rep/sgrs/drugeorganizacije/tarifa/2023/43/1/reg).

| Šta | Odredba | Izvor |
|---|---|---|
| Vrednost poena 50 RSD | član 15 | [Paragraf Lex, prečišćen tekst](https://www.paragraf.rs/propisi/tarifa_o_nagradama_i_naknadama_troskova_za_rad_advokata.html) |
| Razredi po vrednosti spora (200–1.500 poena, do 667.000 poena) | TB 13 st. 1 | isto |
| Odgovor na tužbu i obrazloženi podnesci puna nagrada, ostali podnesci 50% | TB 13 | isto |
| Održano ročište puna nagrada, neodržano 50%, 100 poena po započetom satu | TB 15 | isto |
| Žalba, revizija i odgovor na njih +100% | TB 16 | isto |
| Više stranaka +50% za svaku narednu | TB 17 | isto |
| Krivični postupak po zaprećenoj kazni (600–2.500 poena) | TB 1 | isto |
| Glavni pretres: održan puna nagrada, neodržan 50% | TB 3 | isto |
| Krivična prijava, privatna tužba, pismena odbrana; ostali podnesci 50% | TB 4 | isto |
| Žalba protiv presude +100% | TB 5 | isto |
| PDV samo za advokata obveznika PDV-a | član 13 | isto |
| Ugovorena nagrada najmanje 50% tarifne | član 4 | isto |

Pomoćni izvori, korišćeni za unakrsnu proveru:

- [AKS, tabelarni prikaz tarife](https://aks.org.rs/sr_lat/tabelarni-prikaz-tarife-o-nagradama-i-naknadama-troskova-za-rad-advokata/) (sajt AKS se tokom provere nije otvarao, TLS greška)
- [Pravni portal, odluka o izmeni tarife (56/2025)](https://www.pravniportal.com/odluka-o-izmeni-tarife-o-nagradama-i-naknadama-troskova-za-rad-advokata-2/)
- [Poslovni portal, izmena tarife](https://www.poslovniportal.rs/index.php/cat-vesti/17-srbija/578-izmena-tarife-o-nagradama-i-naknadama-troskova-za-rad-advokata)
- [AdvokatX, kalkulator advokatske tarife](https://advokatx.rs/alati/advokatska-tarifa) (samo za poređenje iznosa u dinarima)

Otvorena pitanja za kancelariju:

- Iznosi su provereni na zvaničnom prečišćenom tekstu (PIS); u registru posle 56/2025 nema izmena. Sajt AKS-a se tokom provere nije otvarao.
- Za spor preko 33.350.000 RSD (667.000 poena) tarifa dodaje po 1 poen na započetih 10.000, 30.000 i 150.000 poena, ukupno najviše 1.000 poena, a nije jasno od kog iznosa se koraci računaju. Kalkulator zato iznad te vrednosti upućuje na advokata.
- Da li je vrednost tačno na granici razreda u nižem razredu (npr. 50.000 RSD = 200 poena)? Kalkulator tako računa.
- Da li je kancelarija u sistemu PDV-a? Kalkulator prikazuje iznos bez PDV-a.

## Kalkulator javnoizvršiteljske tarife

Kod: `src/izvrsitelj.js`, test: `src/izvrsitelj.test.js`, stranica: `/javnoizvrsiteljska-tarifa/`. Provereno 29. 9. 2026.

Propis: Javnoizvršiteljska tarifa, „Sl. glasnik RS“, br. 93/2019 i 15/2023. Osnovni tekst važi od 1. 1. 2020, a izmena 15/2023 od 4. 3. 2023, za postupke pokrenute od tog dana. Izmena je podigla vrednost boda sa 120 na 150 dinara bez PDV-a.

Zvanični prečišćen tekst: [Pravno-informacioni sistem RS](https://pravno-informacioni-sistem.rs/eli/rep/sgrs/ministarstva/drugiakt/2019/93/1/reg).

| Šta | Odredba | Izvor |
|---|---|---|
| Vrednost boda 150 dinara, PDV ako je izvršitelj obveznik | član 18 | [Paragraf Lex, prečišćen tekst](https://www.paragraf.rs/propisi/javnoizvrsiteljska_tarifa.html) |
| Priprema, vođenje i arhiviranje predmeta, najviše 250.000 RSD | Tarifni broj 1, član 9 | isto |
| Nagrada za uspešnost, najviše 2.000.000 RSD, računa se od naplaćenog iznosa | Tarifni broj 3, član 12 | isto |
| Najviše 415 bodova za zaradu, 200 bodova za račun budžeta | član 13 (i član 10 za Tarifni broj 1) | isto |
| Umanjenje 60% i 30% | član 14 | isto |
| Bez nagrade ako dužnik plati pre prijema rešenja | član 15 | isto |
| Predujam plaća poverilac, troškove snosi dužnik | članovi 2 i 4 | isto |
| Iznosi iz Tarifnog broja 2 u napomenama (525, 1.125 RSD, 20% TB1) | Tarifni broj 2 | isto |
| Opšta stopa PDV-a 20% | Zakon o PDV-u, član 23 st. 1 | [Paragraf Lex](https://www.paragraf.rs/propisi/zakon_o_porezu_na_dodatu_vrednost.html) |

Pomoćni izvori:

- [Paragraf Lex, vest o izmeni 15/2023](https://paragraflex.rs/dnevne-vesti/030323/030323-vest3.html)
- [Paragraf Co, vest o dostavljanju poštom 3,5 boda](https://www.paragrafco.co.rs/dnevne-vesti/070323/070323-vest3.html)

Otvorena pitanja za kancelariju:

- Iznosi su provereni na zvaničnom prečišćenom tekstu (PIS); u registru posle 15/2023 nema izmena. Bod od 150 dinara važi za postupke pokrenute od 4. 3. 2023, a kalkulator ga primenjuje na sve.
- Tarifa ne kaže da li se gornja granica (415 ili 200 bodova) primenjuje pre ili posle umanjenja iz člana 14. Kalkulator prvo primenjuje granicu, pa umanjenje.
- Procenat u redovima Tarifnih brojeva 1 i 3 računamo u dinarima i dodajemo bodovima pretvorenim u dinare. Dobro bi bilo potvrditi na jednom stvarnom obračunu izvršitelja.
- Drugi red Tarifnog broja 3 glasi „do 12.000“; čitamo ga kao „preko 6.000 do 12.000“.
- Jedna vest navodi „150 odsto“ za dobrovoljno namirenje, a tekst tarife 50%. Kalkulator dobrovoljno namirenje ne računa.
- Kalkulator pretpostavlja da se naplati ceo glavni dug; nenovčana potraživanja (iseljenje, predaja nepokretnosti) nisu obuhvaćena.

## Kalkulator naknada APR

Kod: `src/apr.js`, test: `src/apr.test.js`, stranica: `/apr-naknade/`. Provereno 29. 9. 2026.

Propis: Odluka o naknadama za poslove registracije i druge usluge koje pruža Agencija za privredne registre, „Sl. glasnik RS“, br. 95/2025. Primenjuje se od 1. 1. 2026. (član 44) i zamenila je Odluku 131/22 i 80/25 (član 43). Iznosi se usklađuju jednom godišnje sa indeksom potrošačkih cena (član 42).

Zvanični prečišćen tekst: [Pravno-informacioni sistem RS](https://pravno-informacioni-sistem.rs/eli/rep/sgrs/drugidrzavniorganiorganizacije/odluka/2025/95/1/reg).

| Šta | Odredba | Izvor |
|---|---|---|
| Osnivanje privrednog društva i udruženja (8.000) | član 2 | [Paragraf Lex, tekst Odluke](https://www.paragraf.rs/propisi/odluka_o_naknadama_za_poslove_registracije_i_druge_usluge_koje_pruza_agencija_za_privredne_registre.html), [APR, privredna društva](https://www.apr.gov.rs/registri/privredna-drustva/naknade.2044.html), [APR, udruženja](https://apr.gov.rs/registri/udru%C5%BEenja/naknade.2224.html) |
| Promena podataka (4.000 + 3.000 po predmetu) i kasna prijava (6.260) | član 3 | isto |
| Upis vlasništva na udelu (500 po članu) | član 4 tač. 6 | Paragraf Lex |
| Rezervacija naziva (2.000), brisanje (4.000) | član 4 | Paragraf Lex |
| Izvod o privrednom društvu (2.500) | član 7 | Paragraf Lex |
| Osnivanje preduzetnika (2.500) | član 8 | Paragraf Lex, [APR, preduzetnici](https://www.apr.gov.rs/registri/preduzetnici/naknade.4864.html) |
| Promena (1.400 + 700), brisanje (1.400) i rezervacija naziva preduzetnika (1.400) | član 9 | isto |
| Izvod o preduzetniku (1.500) | član 10 | Paragraf Lex |
| Upis zaloge (3.000 / 7.000 / 14.000 po visini potraživanja u evrima) | član 11 | Paragraf Lex, [APR, založno pravo](https://www.apr.gov.rs/registri/založno-pravo/naknade.2193.html) |
| Izmena zaloge (3.000) | član 15 | Paragraf Lex |
| Svaki sledeći subjekt ili stvar u prijavi zaloge (+300) | član 16 | Paragraf Lex |
| Brisanje zaloge (1.500) | član 18 | Paragraf Lex |
| Neblagovremena prijava izmene ili brisanja zaloge (3.130) | član 21 | Paragraf Lex |
| Račun 840-1308664-17, model 97 | član 39 st. 4 i 5 (račune objavljuje APR); broj računa sa stranica APR-a za privredna društva, preduzetnike, udruženja i založno pravo | APR |

Pomoćni izvori, korišćeni za unakrsnu proveru:

- [Poslovni portal: od 1. januara 2026. nove naknade APR-a](https://www.poslovniportal.rs/index.php/cat-vesti/17-srbija/735-od-1-januara-2026-godine-pocele-sa-primenom-nove-naknade-agencije-za-privredne-registre)
- [APR, vest o usklađenim iznosima prethodne odluke](https://www.apr.gov.rs/vesti.2428.html?newsId=3869)

Otvorena pitanja za kancelariju:

- Iznosi su provereni na zvaničnom tekstu (PIS); u registru posle 95/2025 nema izmena ni usklađivanja. Proveriti posle svakog godišnjeg usklađivanja (član 42).
- Ortačko i komanditno društvo nisu posebno navedeni u Odluci; kalkulator ih računa kao „privredno društvo“ (član 2).
- Likvidacija nema posebnu naknadu u Odluci; prijave u likvidaciji verovatno idu kao promena podataka (4.000). Kalkulator to ne prikazuje posebno.
- Kalkulator navodi da se dodatna naknada za kasnu prijavu (6.260) ne plaća za promene koje nastaju upisom, na primer prenos udela. To pravilo je sa stranice APR-a, ne iz teksta Odluke; potvrdite ga.
- Dodatnu naknadu od 3.130 dinara (član 21) kalkulator nudi samo za izmenu i brisanje zaloge. Potvrdite za koje prijave zaloge rok postoji.
- Račun za uplatu naknade za registar zaloge nije potvrđen, pa ga kalkulator ne navodi.
- Kalkulator ne sadrži naknade za finansijske izveštaje, stečaj, statusne promene, ogranke i potvrde.

## Kalkulator taksi za katastar

Kod: `src/katastar.js`, test: `src/katastar.test.js`, stranica: `/katastar-takse/`. Provereno 29. 9. 2026.

Propis: Zakon o republičkim administrativnim taksama, tarifni broj 1 (zahtev) i tarifni broj 215b (katastar nepokretnosti), sa usklađenim dinarskim iznosima iz „Sl. glasnika RS“, br. 54/2026, koji se primenjuju od 1. 7. 2026. Izmena 109/2025 promenila je samo reč „od“ u „preko“ u razredima za hipoteku, ne iznose. Iznosi se usklađuju jednom godišnje.

Zvanični prečišćen tekst: [Pravno-informacioni sistem RS](https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2003/43/2/reg).

| Šta | Odredba | Izvor |
|---|---|---|
| Taksa za zahtev (430) | tarifni broj 1 | [Paragraf Lex, prečišćen tekst (PDF)](https://www.paragraf.rs/propisi_download/zakon_o_republickim_administrativnim_taksama.pdf) |
| Upis svojine (7.010 + 2.100 po sledećoj ispravi) | TB 215b st. 5 t. 12 | isto |
| Susvojina supružnika, osobe sa invaliditetom (420) | TB 215b st. 5 t. 13 | isto |
| Upis hipoteke (29.390 / 73.490 / 146.930 / 220.390) | TB 215b st. 5 t. 16 | isto; [izmene 109/2025](https://www.paragraf.rs/izmene_i_dopune/041225-zakon-o-izmenama-i-dopunama-zakona-o-republickim-administrativnim-taksama.html) |
| Zabeležbe (4.210 / 1.010 / 4.830), po ispravi | TB 215b st. 5 t. 19 | isto |
| Brisanje hipoteke (4.830) i zabeležbe (1.200), po ispravi | TB 215b st. 5 t. 20 | isto |
| Upis objekta (7.710) | TB 215b st. 5 t. 3 | isto |
| Poseban deo objekta (6.290 + 2.100 po sledećem) | TB 215b st. 5 t. 5 | isto |
| List nepokretnosti (710 po nepokretnosti) | TB 215b st. 3 t. 1 i 1a | isto |
| Kopija plana (1.010 + 430 po susednoj parceli) | TB 215b st. 3 t. 2 | isto |
| Uverenja (1.310 / 5.900 / 9.450) | TB 215b st. 3 t. 3 i 4 | isto |

Pomoćni izvori, korišćeni za unakrsnu proveru:

- [ePreduzetnik: od 1. jula 2026. novi iznosi republičkih administrativnih taksi](https://epreduzetnik.rs/od-1-jula-2026-vaze-novi-iznosi-republickih-administrativnih-taksi/)
- [Pravni portal: od 1. jula 2026. izmenjeni iznosi](https://www.pravniportal.com/od-1-jula-2026-izmenjeni-iznosi-republicke-administrativne-takse/)
- [RGZ, upis imaoca prava](https://www.rgz.gov.rs/upis-imaoca-prava-na-nepokretnost), samo za postupak; iznosi na sajtu RGZ-a su zastareli.

Otvorena pitanja za kancelariju:

- Iznosi su provereni na zvaničnom prečišćenom tekstu (PIS) i u usklađenim iznosima iz „Sl. glasnika RS“ 54/2026 (važe od 1. 7. 2026). Proveriti posle svakog usklađivanja.
- Da se taksa za zahtev (430) plaća uz taksu iz TB 215b zaključeno je iz prakse RGZ-a opisane na njegovom (zastarelom) sajtu. Proveriti da li važi i za zahteve preko eŠaltera i za izvode i uverenja.
- Kalkulator ne sadrži geodetske radove (parcelacija i slično), služnosti, garaže, garažna mesta ni promene podataka o imaocu prava.

## Kalkulator poreza na prenos, nasleđe i poklon

Kod: `src/porez.js`, test: `src/porez.test.js`, stranica: `/porez-na-prenos-i-nasledje/`. Provereno 29. 9. 2026.

Propis: Zakon o porezima na imovinu, „Sl. glasnik RS“, br. 26/2001, 45/2002 – odluka SUS, 80/2002, 80/2002 – dr. zakon, 135/2004, 61/2007, 5/2009, 101/2010, 24/2011, 78/2011, 57/2012 – odluka US, 47/2013, 68/2014 – dr. zakon, 95/2018, 99/2018 – odluka US, 86/2019, 144/2020, 118/2021, 138/2022, 92/2023 i 94/2024. Prijavu prima i rešenje donosi nadležni poreski organ (članovi 35, 36 i 40); stope i oslobođenja propisuje samo zakon.

Zvanični prečišćen tekst: [Pravno-informacioni sistem RS](https://pravno-informacioni-sistem.rs/eli/rep/sgrs/skupstina/zakon/2001/26/1/reg).

| Šta | Odredba | Izvor |
|---|---|---|
| Stopa poreza na prenos 2,5% | član 30 | [Paragraf Lex, prečišćen tekst](https://www.paragraf.rs/propisi/zakon_o_porezima_na_imovinu.html) |
| Osnovica: ugovorena cena, tržišna ako je cena niža | član 27 | isto |
| Obveznik: prodavac; kupac jemči | članovi 25 i 42 | isto |
| Promet sa PDV-om ne podleže porezu na prenos | član 24a tačka 1 | isto |
| Kupac prvog stana (40 m² + 15 m² po članu domaćinstva) | član 31a | isto |
| Stope poreza na nasleđe i poklon 1,5% i 2,5% | član 19 | isto |
| Oslobođenja: prvi nasledni red, bračni drug, roditelj ostavioca; stan za drugi nasledni red | član 21 st. 1 tačke 1 i 3 | isto |
| Osnovica nasleđa i poklona | član 16 | isto |
| Prag od 100.000 dinara za novac i pokretne stvari | član 14 | isto |
| Bez poreske prijave za isprave javnog beležnika; rok plaćanja 15 dana | članovi 34 i 40 | isto |
| Nasledni redovi | Zakon o nasleđivanju, članovi 9, 12, 13 i 16 | [Paragraf Lex](https://www.paragraf.rs/propisi/zakon_o_nasledjivanju.html) |

Pomoćni izvori:

- [Paragraf Lex, Zakon o izmenama i dopunama (94/2024)](https://www.paragraf.rs/izmene_i_dopune/281124-zakon-o-izmenama-i-dopunama-zakona-o-porezima-na-imovinu.html)
- [Gradska poreska uprava Novi Sad](https://novisad.rs/lat/gradska-poreska-uprava)

Otvorena pitanja za kancelariju:

- Provereno na zvaničnom prečišćenom tekstu (PIS): posle 94/2024 nema izmena.
- Roditelj koji prima poklon od deteta: kalkulator računa 1,5% (drugi nasledni red), jer član 21 oslobađa roditelja samo kao naslednika. Potvrditi.
- Pastorčad se ne smatra potomkom ako nije usvojena; kalkulator to ne navodi posebno.
- Oslobođenje za prvi stan i oslobođenje poljoprivrednika (član 21 tačka 2) samo su opisani, ne računaju se.
