import React from "react";
import image1 from "../assets/images/image1.webp";
import image2 from "../assets/images/image2.webp";
import image3 from "../assets/images/image3.webp";
import image4 from "../assets/images/image4.webp";
import image5 from "../assets/images/image5.webp";
import image6 from "../assets/images/image6.webp";
import image7 from "../assets/images/image7.webp";
import image8 from "../assets/images/image8.webp";
import image9 from "../assets/images/image9.webp";

const ArticlesContext = React.createContext();

export const ArticlesProvider = ({ children }) => {
  const articles = [
    {
      title: `AKUŠERSKO NASILJE`,
      desc: `Poslednjih dana zbog tragedije koja je zadesila jednu porodicu u Srbiji pojavila se kao aktuelna tema tzv. akušersko nasilje. Iako je mnogo žena pretrpelo ovakav vid nasilja, u većini slučajeva iste nisu odlučivale da se upuste u sudske procese što zbog odbijanja da se ponovo suoče sa već pretrpljenom traumom, što zbog bojazni da će ih sistem izneveriti. Kako naša advokatska kancelarija smatra da je tema tzv. akušerskog nasilja zaista bitna, odlučili smo da joj se posvetimo i u neku ruku ukažemo na to koliko je neophodno prijaviti svaki vid nasilja što zbog zaštite samog pojedinca, što zbog celokupnog društva kako bi se sprečio ponovni vid bilo kakvog nasilja učinjenog prema drugoj ženi, detetu, porodici.
      Mi ćemo se u ovom tekstu potruditi da vam ukažemo na to po kojim pravnim osnovima biste mogli da se obratite sudovima radi ostvarivanja individualnih prava i kako da prepoznate tzv. akušersko nasilje. Smatramo da nijedna žena ne sme da pristane na to da iskustvo kao što je porođaj započne sa utešnim rečima: „znam da mora biti teško, ali ću izdržati“.
      Svaki vid nasilja je sankcionisan našim Krivičnim zakonikom.
      Pre svega je važno da napomenemo da svako ima pravo na sudsku zaštitu ako mu je povređeno ili uskraćeno neko ljudsko ili manjinsko pravo zajemčeno Ustavom. Ustavom RS je jasno propisano da je ljudsko dostojanstvo neprikosnoveno i da su svi dužni da ga poštuju i štite, kao i da su fizički i psihički integritet nepovredivi, te da niko ne može biti izložen mučenju, nečovečnom ili ponižavajućem postupanju ili kažnjavanju.
      Ono što je možda na početku ovog teksta bitno napomenuti jeste da u sudskoj praksi postoje određene dileme u pogledu toga koji je to momenat kad dete-fetus-nasciturus postaje subjekt prava koji uživa krivičnopravnu zaštitu. Upravo od toga zapravo i zavisi kako na adekvatan način kvalifikovati delo protiv lekara u slučaju kada je zbog, danas popularnog termina, „lekarske greške“ došlo do smrti novorođenčeta. Ukoliko je dete živo rođeno ali je kasnije preminulo usled posledica do kojih je došlo zbog greške lekara, ne postoji problem u pravnoj kvalifikaciji takvog krivičnog dela. U tom slučaju možemo govoriti o teškom delu protiv zdravlja ljudi koje je propisano u čl. 259 st. 2 Krivičnog zakonika, a za koje krivično delo je zaprećena kazna zatvora od 2 do 12 godina.  Ovo krivično delo se goni po službenoj dužnosti, što znači da će usled prijave ovakvog slučaja, Više javno tužilaštvo biti nadležno za pokretanje i vođenje krivičnog postupka. Međutim, ukoliko se dete ne rodi živo usled tzv. lekarske greške, postoji pravna dilema u pogledu toga da li se može govoriti o gore pomenutom krivičnom delu imajući u vidu da je za postojanje tog krivičnog dela neophodno da je došlo do smrti nekog lica, a po nekim shvatanjima nerođeno dete-fetus nije ličnost, te pre svog rođenja ne postoji ni kao subjekt prava. Drugim rečima, prema ovom stanovištu, u slučaju smrtnog ishoda ploda, predmet optužbe jesu samo radnje kojima se povređuju prava trudnice, a ne prava ploda jer ukoliko nije živo rođeno postoji pravna dilema u pogledu toga da li ono može da uživa krivičnopravnu zaštitu koja se formalno stiče rođenjem. Sa druge strane, prema savremenom stanovištu, plod dobija krivičnopravnu zaštitu od trenutka početka porođaja i od tada se smatra nosiocem prava na život, tako da bi trenutak od kog plod stiče svoju krivičnopravnu zaštitu bio početak prvih porođajnih bolova koji vode porođaju.
      Ono što je bitno napomenuti jeste da ukoliko se porođaj završio smrtnim ishodom deteta, isto ne znači nužno i da je trudnica sasvim sigurno bila žrtva tzv. akušerskog nasilja. Termin „akušersko nasilje“ se vezuje za ispoljavanje nekog vida nasilja prema trudnici ili detetu, bilo psihičkog bilo fizičkog. U slučaju da je žena u toku porođaja doživela ovakav vid nasilja, ona, u zavisnosti od svakog konkretnog slučaja ima različita prava i pravne mogućnosti. Pored vođenja krivičnog postupka koji je gore opisan, žena koja je pretrpela akušersko nasilje ima pravo i na naknadu štete.
      Šteta predstavlja umanjenje nečije imovine i sprečavanje njenog povećanja, kao i nanošenje drugome fizičkog ili psihičkog bola ili straha. Dakle, razlikujemo materijalnu i nematerijalnu štetu.
      Naknada štete se može zahtevati za pretrpljene fizičke bolove, za pretrpljene duševne bolove zbog umanjenja životne aktivnosti, naruženosti, zatim zbog smrti bliskog lica, kao i za strah. Imajući u vidu da je svaki konkretan slučaj drugačiji, odnosno da su iskustva trudnica drugačija, možemo govoriti i o različitim osnovima po kojim biste imali pravo na novčanu naknadu.
      Imajući u vidu navedeno, obratite se našem stručnom timu za adekvatan pravni savet.
      `,
      image: image9,
    },
    {
      title: "Ugovor o doživotnom izdržavanju",
      desc: "Jedan od bitnih ugovora u naslednom pravu je svakako ugovor o doživotnom izdržavanju. Zaključenju ovog ugovora, kad je naravno reč o naslednom pravu, pristupa najveći broj ljudi, te se može reći da je ugovor o doživotnom izdržavanju svakako jedan od najznačajnijih i najčešćih ugovora u našem pravu. Isti je regulisan Zakonom o nasleđivanju. Ukoliko želite da obezbedite da se neko brine o vama u starosti i/ili bolesti do kraja vašeg života, svakako biste to ishodovali zaključenjem ove vrste ugovora. U slučaju da se obaveze propisane ugovorom ne izvršavaju na način na koji je to dogovoreno, i ovakav ugovor se može raskinuti, kao i svaki drugi dvostrani ugovor, jer jedna strane neispunjava svoju obavezu. Ono što je prvenstveno bitno napomenuti jeste da Ugovor o doživotnom izdržavanju mora biti zaključen u obliku solemnizovane isprave. Zaključenjem ovog ugovora, obavezuje se primalac izdržavanja da se posle njegove smrti na davaoca izdržavanja prenese svojina tačno određenih stvari ili prava, a davalac izdržavanja se obavezuje da ga, kao naknadu za to, izdržava i da se brine o njemu do kraja njegovog života i da ga posle smrti sahrani. Način na koji će se to činiti, zavisi od volja ugovarača. Vrlo je bitno napomenuti, a što je i javni beležnik posebno dužan da upozori ugovarače prilikom overe ovakvog ugovora, jeste da primalac izdržavanja bude svestan da imovina koja je predmet ovog ugovora ne ulazi u njegovu zaostavštinu i da se njom, nakon njegove smrti, ne mogu namiriti njegovi nužni naslednici. O tome mora da se stavi posebna napomena u klauzuli o potvrđivanju jer bi u suprotnom ugovor bio ništav. Česti su slučajevi u praksi da zakonski naslednici primaoca izdržavanja za postojanje ovakvog ugovora saznaju tek na ostavinskoj raspravi. Ukoliko isti smatraju da postoji neki od razloga za poništaj ugovora o doživotnom izdržavanju, zakonski naslednici primaoca izdržavanja imaju pravo da u roku od godinu dana od dana saznanja za ugovor, a najkasnije u roku od 3 godine od smrti primaoca izdržavanja podnesu zahtev za poništaj ugovora. Ukoliko vam je potrebna pravna pomoć za sastavljanje ugovora o doživotnom izdržavanju, raskid, zastupanje ili pak pravni savet u pogledu toga ko sve može zaključiti ovakav ugovor, pod kojim uslovima ili iz kojih razloga možete tražiti poništaj već zaključenog Ugovora o doživotnom izdržavanju, kontaktirajte nas kako biste na najbolji način zaštitili i ostvarili svoja prava.",
      image: image1,
    },
    {
      title: "Naplata duga po osnovu računa - faktura",
      desc: `Naplata potraživanja po osnovu računa ili faktura za isporučene proizvode ili pruženu uslugu predstavlja u nekim situacijama problem za svako lice koje se bavi prodajom ili pružanjem usluga. Republika Srbija ima određene propise koji regulišu ovu oblast i pružaju okvir za efikasnu naplatu potraživanja.

      Prvi korak u naplati potraživanja je ispostavljanje jasnih i preciznih računa ili faktura drugoj strani, kupcima. Račun ili faktura treba sadržati sve relevantne informacije, kao što su naziv i adresa prodavca i kupca, detaljan opis proizvoda ili usluga, količina, cena, datum izdavanja, rok plaćanja i detalji za uplatu.

      Kada dođe do kašnjenja ili neplaćanja računa, lice koje je isporučilo fakturu treba da preduzme odgovarajuće korake u skladu sa zakonskim propisima kako bi obezbedilo izvršenje obaveze po osnovu isporučenih računa.

      Prva mera koju lice mora da preduzme je da obavesti drugu stranu, kupca da postoji neplaćeni račun. Najčešće se druga strana obaveštava slanjem opomene u pisanoj formi, kojom se ukazuje na dospelu obavezu za plaćanje. Opomena treba biti jasna, mora da sadrži relevantne informacije o potraživanju i mora se ostaviti rok drugoj strani za dobrovoljno izvršenje plaćanja računa.

      Ukoliko druga strana, kupac ne izvrši plaćanje ni nakon opomene, ispunjeni su uslovi i može se pokrenuti sudski postupak radi naplate potraživanja. Sudski postupak može uključivati podnošenje tužbe protiv kupca ili pokretanje izvršnog postupka. U ovoj fazi, važno je imati adekvatnu dokumentaciju, kao što su originalni ugovori, računi, fakture ili druge relevantne dokaze o poslovnoj transakciji.

      Sudska presuda u korist poverioca omogućava sprovođenje izvršnog postupka, koji podrazumeva prinudnu naplatu potraživanja koje se sprovodi putem Javnih izvršitelja. Međutim, postupak naplate potraživanja može da se pokrene i samo na osnovu računa koji su sastavljeni shodno zakonskim propisima, a koji treba da budu u originalu ili kopiji vernoj originalu, jer oni predstavljaju verodostojnu ispravu po osnovu koje je moguće pokrenuti postupak prinudne naplate potraživanja. Na taj način se može izbeći višegodišnje vođenje sudskog postupka i odugvlačenje naplate neplaćenih računa.

      Moramo istaći da brzina i način naplate potraživanja varira od slučaja do slučaja i na isto utiče više faktora.
      Važno je naglasiti da je savetovanje sa advokatom od ključne važnosti u ovom procesu, kako bi se izvršila provera dokumentacije koje poverilac poseduje, dala procena uspešnosti naplate, a sve u cilju osiguranja poštovanja svih zakonskih propisa i pravila koja se odnose na naplatu potraživanja.
      `,
      image: image5,
    },
    {
      title: "Nezakonit otkaz",
      desc: `U Republici Srbiji, Zakon o radu predviđa i reguliše prava i obaveze zaposlenih i poslodavaca u vezi sa prekidom radnog odnosa. Svaki prekid radnog odnosa koji je u suprotnosti sa odredbama Zakona o radu predstavlja „Nezakonit otkaz“.
      Najčešće poslodavci prekidaju radni odnos za zaposlenima na način koji nije predviđen odredbama zakonskih propisa.

      Prema Zakonu o radu, poslodavac može prekinuti radni odnos samo u određenim situacijama koje su predviđene zakonom. Poslodavac je dužan da poštuje propisane procedure i pruži zaposlenom pravnu zaštitu.

      Ukoliko poslodavac prekine radni odnos na nezakonit način, zaposleni ima pravo da pokrene postupak za zaštitu svojih prava. Prvi korak je često pokušaj rešavanja spora kroz mirno i pregovaračko rešenje, kao što je razgovor sa poslodavcem ili posredovanje nadležnih organa. Ukoliko se ne postigne sporazum, zaposleni može pokrenuti radni spor pred nadležnim sudom.

      Moramo napomenuti da je zakonom predviđen rok u kojem mora da se pokrene sudski postupak radi poništaja nezakonitog otkaza. Taj rok iznosi 60 dana od dana prijema rešenja o otkazu ugovora o radu. U slučaju da zaposleni  u roku od 60 dana od dana prijema rešenja o otkazu ugovora o radu ne pokrene odgovarajući sudski postupak radi poništaja otkaza ugovora o radu, zaposleni gubi pravo na sudsku zaštitu.
      U sudskom postupku Sud razmatra sve relevantne činjenice i dokaze u vezi sa otkazom i donosu odluku na osnovu utvrđenih činjeica u skladu sa zakonom. Ukoliko sud utvrdi da je otkaz bio nezakonit, poslodavac može da ima obavezu vraćanja zaposlenog na posao, isplatu odgovarajuće nadoknade za izgubljenu zaradu tokom nezakonitog otkaza, kao i druge pravne ili finansijske obaveze.

      Važno je napomenuti da je svaki slučaj nezakonitog otkaza jedinstven i zahteva individualnu procenu u skladu sa konkretnim okolnostima. Konsultacija sa advokatom specijalizovanim za radno pravo može biti od velike koristi kako bi se ostvarila prava zaposlenog i zaštitilo od nezakonitog postupanja poslodavca.
      `,
      image: image2,
    },
    {
      title: "Otkaz ugovora o radu od strane zaposlenog",
      desc: `Otkaz ugovora o radu od strane zaposlenog predstavlja jedan od načina prestanka radnog odnosa u smislu Zakona o radu Republike Srbije.

      Konkretno u pitanju je jednostrani raskid radnog odnosa od strane zaposlenog. Zaposleni ima pravo da otkaže ugovor o radu u skladu sa Zakonom o radu Republike Srbije i uslovima koji su propisani zakonom,  Opštim aktom poslodavca ili ugovorom o radu koji je zaposleni sklopio sa poslodavcem.

      Način za raskid ugovora o radu od strane zaposlenog je podnošenje pisanog otkaza poslodavcu. 

      Otkaz treba da bude u pisanom obliku i jasno izražen, da sadrži datum podnošenja, razloge otkaza i željeni datum prestanka radnog odnosa. Takođe, preporučljivo je da zaposleni sačuva kopiju otkaza kao i dokaz o podnošenju istog poslodavcu.

      Otkaz od strane zaposlenog mora biti podnet poslodavcu svojevoljno, bez ikakve zablude, prinude ili drugih mana volja.

      Otkaz koji zaposleni daje u pisanoj formi mora da sadrži i „Otkazni rok“. Otkazni rok predstavlja period koji zaposleni mora da nastavi da radi kod poslodavca nakon podnošenja otkaza, a čija dužina trajanja zavisi od više faktora i propisana je zakonom, kolektivnim ugovorom ili ugovorom o radu. Otkazni rok može biti i dogovoren između poslodavca i zaposlenog, ali ne sme biti kraći od zakonom propisanog minimalnog otkaznog roka, niti duži od zakonom propisanog maksimalnog roka.

      Nakon podnošenja otkaza, zaposleni ima pravo na isplatu svih neisplaćenih zarada, godišnjeg odmora, naknade za prekovremeni rad ili druge dospele beneficije. Poslodavac je dužan da izvrši obračun i isplati sve dugove prema zaposlenom u zakonom propisanom roku i shodno pozitivnim propisima.

      Važno je da zaposleni pre odluke o raskidu radnog odnosa bude upoznat sa odredbama ugovora o radu, opštim aktom poslodavca i zakonskim propisima vezanim za otkazivanje ugovora o radu od strane zaposlenog kako bi poznavao i zaštitio svoja prava i obaveze prilikom podnošenja otkaza.

      U ovakvim situacijama se uvek preporučuje konsultovanje advokata kako bi se radnik maksimalno zašitio prilikom raskida radnog odnosa.
      `,
      image: image3,
    },
    {
      title: "Naknada štete u slučaju povrede na radu",
      desc: `Naknada štete u slučaju povrede na radu predstavlja pravo radnika da zahteva nadoknadu za štetu koju je pretrpeo usled povrede ili bolesti nastale na radu ili u vezi sa radom. Ovo pravo je regulisano Zakonom o radu Republike Srbije, Zakonom o zdrastvenom osiguranju Republike Srbije, Zakonom o bezbednosti i zdravlju na radu i drugim pozitivnim propisima.

      Kada radnik pretrpi povredu na radu ili oboli od profesionalne bolesti, prvi korak je prijavljivanje povrede ili bolesti poslodavcu. Poslodavac je dužan da prijavi povredu ili bolest nadležnom organu za radnu inspekciju i osiguravajućem društvu sa kojim ima zaključen ugovor o osiguranju od povreda na radu i profesionalnih bolesti.

      Izveštaj o povredi na radu i profesionalnom oboljenju koji se dogode na radnom mestu, poslodavac je dužan da dostavi zaposlenom koji je pretrpeo povredu, kao i organizacijama nadležnim za zdravstveno i penzijsko i invalidsko osiguranje.
      
      Nakon prijave, radnik ima pravo na lečenje i rehabilitaciju o trošku osiguranja, u skladu sa zakonom i propisima o zdravstvenom osiguranju. Ukoliko povreda na radu ili profesionalna bolest prouzrokuje privremenu sprečenost za rad, radnik ostvaruje pravo na novčanu nadoknadu za vreme privremene sprečenosti, koja se isplaćuje u visini određenoj propisima o osiguranju od povreda na radu.

      Radnik ima pravo na naknadu nematerijalnu štetu za pretrpljene fizičke bolove, duševne bolove, pretrpljeni strah, telesno oštećenje, narušeno zdravlje, smanjenje radne sposobnosti i druge štetne posledice povrede ili bolesti. Visina naknade štete zavisi od težine povrede ili bolesti, stepena invalidnosti, gubitka radne sposobnosti i drugih relevantnih faktora. 

      Da bi ostvario pravo na naknadu štete, radnik treba da podnese zahtev poslodavcu ili direktno osiguravajućem društvu koje pruža osiguranje od povreda na radu i profesionalnih bolesti. Ukoliko postoji spor oko visine ili osnova isplate naknade štete, radnik može se obratiti sudu radi zaštite svojih prava.

      U praksi većina slučajeva naknade štete zbog povrede na radu završi na sudu.
      Važno je napomenuti da je svaki slučaj povrede na radu ili profesionalne bolesti jedinstven, te se uvek preporučuje konsultovanje i angažovanje advokata kako bi radnik maksimalno zaštitio i ostvario svoja prava zbog povrede na radu.
      `,
      image: image4,
    },
    {
      title: "Osnivanje firme",
      desc: `Osnivanje firme predstavlja proces registracije pravnog lica koji ima za cilj obavljanje određene privredne delatnosti i ostvarivanje poslovnih aktivnosti. Ovaj proces uključuje nekoliko koraka i zahteva poštovanje zakonskih propisa i procedura. 
      Naš savet je da pre osnivanja firme detaljno proverite propise koje regulišu oblast u kojoj će firma da posluje, da istražite tržište analizirate konkurenciju, pripremite poslovni plan i obezbediti neophodne resurse i kapital za pokretanje poslovanja.

      Nakon toga, sledeći korak u osnivanju firme je odabir pravne forme preduzeća. U Republici Srbiji postoje različite pravne forme, kao što su društvo sa ograničenom odgovornošću (DOO), akcionarsko društvo (AD), preduzetnik, itd. Ova odluka zavisi od vrste poslovanja kojom žeite da se bavite, ciljeva koje želite da ostvarite, kapitala kojim raspolažete i drugih faktora.

      Važno je napomenuti da svaka forma organizovanja firme nosi određene prednosti i mane, koje morate imati u vidu prilikom odlučivanja o izboru pravne forme u kojoj želite da bude vaša firma. Kada odaberete pravnu formu u kojoj ćete da poslujete sa budućom firmom, sledi registracija firme u Agenciji za privredne registre (APR).Zahtev za registraciju podnosi se elektronski i obuhvata prikupljanje potrebne dokumentacije, kao što su statut preduzeća, osnivački akt, rešenje o imenovanju direktora ili zastupnika, izjava o prihvatanju funkcije direktora/zastupnika, itd. Takođe, potrebno je uplatiti odgovarajuće takse i naknade za registraciju.

      Uz registraciju u APR-u, često je potrebno i ishodovanje drugih dozvola i dozvoljenih dokumenata, u zavisnosti od vrste delatnosti kojom želite da se buduća firma bavi. Na primer, za određene delatnosti može biti potrebna posebna dozvola, poput dozvole za obavljanje medicinske delatnosti ili dozvole za trgovinu određenom robom. Takođe, prilikom osnivanja firme, potrebno je otvoriti poslovni račun kod banke, kao i voditi računovodstvo i izveštavati nadležne organe o finansijskom stanju preduzeća.

      Nakon podnošenja zahteva APR ukoliko je sva dokumentacija pripremljena kako nalažu propisi, u kratkom roku donosi Rešenje o registraciji te možete otpočeti sa Vašim poslovanjem. Važno je napomenuti da za pravna lica u Republici Srbiji važe određene obaveze koje se moraju ispoštovati shodno pozitivnim propisima ( dostavljanje finansijskih, statističkih izveštaja državnim institucijama).
      
      Za praćenje propisa i postupak otvaranje firme je preporuka da se angažuje advokat da bi se postupak sproveo brzo i efikasno.`,
      image: image6,
    },
    {
      title: "Nasilje u porodici",
      desc: `Kada se govori o nasilju u porodici najčešća pomisao je fizičko nasilje jednog člana porodice nad drugim članom. Međutim, bitno je napomenuti da se pod nasiljem u porodici, a u smislu Porodičnog zakona, podrazumeva svako ponašanje kojim jedan član porodice ugrožava telesni integritet, duševno zdravlje ili spokojstvo drugog člana porodice. Dakle, pod nasiljem u porodici podrazumeva se, pored nanošenja ili pokušaja nanošenja telesnih povreda, i izazivanje straha pretnjom ubistva ili nanošenja telesnih povreda članu porodice ili njemu bliskom licu, prisiljavanje na seksualni odnos, navođenje na seksualni odnos ili seksualni odnos sa licem koje nije navršilo 14 godina života ili nemoćnim lice, ograničavanje slobode kretanje ili komuniciranja sa trećim licima, vređanje, kao i svako drugo drsko, bezobzirno i zlonamerno ponašanje.

      Pod članovima porodice ne smatraju se samo supružnici, deca, roditelji i ostali krvni srodnici kao što većina misli, već i bivši supružnici, lica u tazbinskom ili adoptivnom srodstvu, odnosno lica koja vezuje hraniteljstvo, lica koja žive ili su živela u istom porodičnom domaćinstvu, kao i vanbračni ili bivši vanbračni partneri i lica koja su međusobno bila ili su još uvek u emotivnoj ili seksualnoj vezi, odnosno koja imaju zajedničko dete ili je dete na putu da bude rođeno, iako nikad nisu živela u istom porodičnom domaćinstvu. Dakle, sva nabrojana lica čine članove porodice u smislu Porodičnog zakona i ista su jedna od drugih zaštićena od nasilja u porodici, odnosno ista mogu odgovarati za krivično delo nasilje u porodici. Ukoliko trpite bilo koji vid nasilja u porodici prijavite policiji/javnom tužiocu ili kontaktirajte nas kako bismo to učinili umesto Vas i kako bismo vam pružili potrebnu pravnu zaštitu.

      Pored podnošenja krivične prijave protiv lica koje vrši nasilje u porodice, može se voditi i parnični postupak radi zaštite od nasilja u porodici.

      Parnični postupak radi zaštite od nasilja u porodici

      U parničnom postupku Sud na osnovu podnete tužbe može odrediti jednu ili više mera zaštite od nasilja u porodici, i to:
      - izdavanje naloga za iseljenje iz porodičnog stana ili kuće, bez obzira na pravo svojine odnosno zakupa nepokretnosti; 
      - izdavanje naloga za useljenje u porodični stan ili kuću, bez obzira na pravo svojine odnosno zakupa nepokretnosti;
      - zabrana približavanja članu porodice na određenoj udaljenosti;
      - zabrana pristupa u prostor oko mesta stanovanja ili mesta rada člana porodice;
      - zabrana daljeg uznemiravanja člana porodice.

      Ukoliko Vam je radi zaštite od nasilja u porodici neophodno određivanje neke od nabrojanih mera, naš tim advokata Vam može pomoći da takvu zaštitu ishodujete.

      Mera zaštite od nasilja u porodici može trajati najviše godinu dana, s tim što se može produžavati sve dok ne prestanu razlozi zbog određena.

      Takođe, mera zaštite od nasilja u porodici može prestati pre isteka vremena trajanja ako prestanu razlozi zbog kojih je mera bila određena.

      Postupak nakon prijave nasilja u porodici:

      Zakonom o sprečavanju nasilja u porodici propisan je način postupanja svakog organa nakon prijave.
      Policijski službenici su dužni da odmah obaveste nadležnog policijskog službenika o svakom nasilju u porodici ili neposrednoj opasnosti od njega, i imaju pravo da sami ili na zahtev nadležnog policijskog službenika dovedu mogućeg učinioca u nadležnu jedinicu policije radi vođenje postupka.

      Zadržavanje mogućeg učinioca u nadležnoj organizacionoj jedinici policije radi vođenja postupka može trajati najduže osam časova, u toku kojeg zadržavanja mogući učinilac mora biti poučen o pravima, te mu se mora omogućiti kontakt i korićenje pravne pomoći branioca.

      Nadležni policijski službenik mora mogućem učiniocu koji je doveden da pruži priliku da se izjasni o svim bitnim činjenicama, i da odmah proceni rizik neposredne opasnosti od nasilja u porodici. Ukoliko utvrdi da postoji rizik,  može naredbom izreći hitnu meru privremenog udaljenja učinioca iz stana i/ili meru privremene zabrane učiniocu da kontaktira žrtvu nasilja i prilazi joj.

      Javni tužilac vrednuje procenu rizika nadležnog policijskog službenika i donesi odluku o tome da li će podneti predlog sudu da se hitna mera produži, a koji predlog podnosi u roku od 24 časa od uručenja naređenja licu kome je izrečena mera. 

      Hitna mera izrečena od strane nadležnog policijskog službenika traje 48 časova od uručenja naređenja, a na predlog javnog tužioca, Sud može hitnu meru produžiti za još 30 dana.

      Ukoliko je potrebno hitno reagovati, naš tim advokata može Vam pomoći da dobijete neku od hitnih mera za zaštitu od nasilja.

      Ukoliko ranije izrečena mera više nije potrebna, možemo Vam pomoći i u postupku ukidanja iste.
      
      Nakon donošenja Zakona o sprečavanju nasilja u porodici dešavao se i veliki broj zloupotreba i lažnih prijava nasilja u porodici. U krivičnom postupku naš tim advokata može Vam pomoći da se odbranite od lažnih prijava za nasilje u porodici, kao i u parničnom postupku u kom je protiv Vas podneta tužba radi zaštite od nasilja u porodici.

      `,
      image: image7,
    },
    {
      title: "Razvod Braka",
      desc: `Brak je u Republici Srbiji regulisan Porodičnim zakonom, i to kao zakonom uređena zajednica života žene i muškarca koji se može sklopiti samo na osnovu slobodnog pristanka budućih supružnika.

      Brak se sklapa radi ostvarivanja zajednice života. Supružnici su dužni da vode zajednički život i da se uzajamno poštuju i pomažu. Međutim, u praksi to nije uvek slučaj, te neretko dolazi do ozbiljnog i trajnog poremećaja bračnih odnosa između bračnih partnera zbog čega donose odluku o razvodu braka.

      POSTUPAK RAZVODA BRAKA

      Do razvoda braka, prema Porodičnom zakonu koji važi u Republici Srbiji, može doći na dva načina: 
      -Sporazumom o razvodu braka i
      -Razvodom po tužbi
      
      1)  SPORAZUM O RAZVODU BRAKA

      Jednostavniji, ekonomičniji i najbrži način razvoda braka je svakako podnošenjem predloga za sporazumni razvod braka. Osnovni i prvi uslov za sporazumni razvod braka jeste saglasnost bračnih partnera da se brak razvede. Ukoliko jedan od supružnika ne želi razvod, drugi supružnik koji želi je prinuđen da podnese tužbu za razvod braka. Dakle, ključno i osnovno za sporazumni razvod braka jeste saglasnost i sporazum supružnika o svim bitnim pitanjima, pa i o tome da se brak razvede.
      Ono što sporazum o razvodu braka mora obavezno da sadrži jeste:

      - pismeni sporazum o vršenju roditeljskog prava ukoliko supružnici imaju zajedničku maloletnu decu i 
      - pismeni sporazum o deobi zajedničke imovine, ukoliko su u toku trajanja bračne zajednice istu stekli.
      
      a)  Sporazum o vršenju roditeljskog prava

      Jedini način kada supružnici mogu da se dogovore da zajednički vrše roditeljsko pravo je upravo ukoliko se opredele za sporazumni razvod braka, te sporazumno i ugovore da će zajednički vršiti roditeljsko pravo.

      Roditelji imaju pravo i dužnost da čuvaju i podižu dete tako što će se oni lično starati o njegovom životu i zdravlju.

      Sporazum o zajedničkom vršenju roditeljskog prava mora se zaključiti u pismenoj formi gde se roditelji pismeno saglašavaju da će roditeljska prava i dužnosti obavljati zajednički, a sastavni deo sporazuma jeste i sporazum o tome šta će se smatrati prebivalištem deteta. Dakle, ukoliko se opredelite za zajedničko vršenje roditeljskog prava ono svakako mora da podrazumeva da uvek postoji dogovor roditelja oko svih pitanja iz sadržine roditeljskog prava, odnosno u pogledu pitanja koja se odnose o staranju o detetu: čuvanje, podizanje, vaspitavanje, obrazovanje, zastupanje, izdržavanje, te upravljanje i raspolaganje imovinom deteta.

      Sporazumom se roditelji mogu opredeliti i na mogućnost da se jednom roditelju poveri vršenje roditeljskog prava, a koji sporazum mora obuhvatiti i sporazum o visini doprinosa za izdržavanje deteta od drugog roditelja sa kojim dete ne živi, kao i sporazum o načinu održavanja ličnih odnosa deteta i roditelja sa kojim dete ne živi. Drugi roditelj kom nije povereno samostalno vršenje roditeljskog prava svakako ima pravo da o pitanjima koja bitno utiču na život deteta odlučuje zajednički i sporazumno sa roditeljem koji vrši roditeljsko pravo. Pitanja koja bitno utiču na život deteta, u smislu Porodičnog zakona, smatraju se naročito: obrazovanje deteta, preduzimanje većih medicinskih zahvata nad detetom, promena prebivališta deteta i raspolaganje imovinom deteta velike vrednosti.

      b)  Sporazum o deobi zajedničke imovine

      Imovina koju su supružnici stekli radom u toku trajanja zajednice života u braku predstavlja njihovu zajedničku imovinu, osim ako bračnim ugovorom nije uređeno drugačije. U sporazumu je neophodno priložiti dokaze o imovini koja je predmet deobe. Predmeti manje vrednosti kao što su pokućstva, lične stvari, nameštaj itd. može se faktički podeliti, bez njihovog preciziranja u samom sporazumu. Kada se sastavlja sporazum o deobi zajedničke imovine mogu se uzeti u obzir eventualno veća ulaganja jednog supružnika u uvećanju zajedničke imovine od drugog, visina prihoda supružnika, vođenja domaćinstva i staranje o deci, a kako bi se ista podelila na najpravičniji način. Ukoliko se ne postigne sporazum o deobi bračne imovine, svaki bračni supružnik ima pravo da pokrene poseban postupak radi deobe zajedničke imovine u kojoj bi se utvrđivao suvlasnički udeo supružnika u zajedničkoj imovini. Naš tim advokata Vam može pomoći prilikom sastavljanja sporazuma o deobi zajedničke imovine ili eventalnog pokretanja pomenutog postupka radi sudske deobe. Pretpostavlja se da su udeli supružnika u zajedničkoj imovini jednaki. Međutim u postupku pred sudom se može dokazivati da je udeo jednog supružnika u sticanju zajedničke imovine veći ukoliko je isti ostvario veće prihode, imao veću ulogu u vođenju poslova domaćinstva, staranja o deci, staranja o imovini, itd.

      Iako se Sud ne meša u deobu bračne imovine kad o istoj postoji sporazum supružnika, svakako ima pravo da se meša u sporazum o vršenju roditeljskog prava jer je neophodno da se isti donese u najboljem interesu deteta. Upravo zbog toga je neophodno precizirati sve detalje vezane za vršenje roditeljskog prava kako bi se izbegle nesuglasice bivših partnera oko bitnih pitanja. Naš tim advokata će Vam pružiti neophodnu pravnu pomoć prilikom sastavljanja predloga za sporazumni razvod braka, kao i dva obavezna, gore pomenuta, sporazuma koja čine njegov sastavni deo. Ono što je bitno napomenuti jeste da supružnike ne može zastupati isti punomoćnik, te je najefikasniji način da angažujete advokatsku kancelariju u kojoj se nalazi tim advokata koji će na najbolji način štititi interese oba bračna partnera prilikom sastavljanja sporazuma. Što se tiče vremena trajanja sudskog postupka, a kada govorimo o sporazumnom razvodu braka, isti traje svega par meseci i najčešće se završava na prvom ili eventualno drugom ročištu, dok u postupku razvoda braka po tužbi isti može trajati i preko godinu dana.

      2)  RAZVOD BRAKA PO TUŽBI

      Tužba za razvod braka se podnosi kada ne postoji saglasnost supružnika u pogledu bitnih pitanja kao što su sam razvod braka, pitanje vršenja roditeljskog prava ukoliko imaju zajedničku mlt. decu, modela viđanja i održavanja ličnih odnosa deteta i roditelja s kojim dete ne živi, pitanje alimentacije i pitanje deobe zajedničke imovine. Tužba se podnosi zbog ozbiljne i trajne poremećenosti bračnih odnosa i/ili nemogućnosti ostvarivanja zajednice života. Nakon podnošenja tužbe, a pre nego što pristupite na ročište za razvod braka, ukoliko imate maloletnu decu, najpre ćete dobiti poziv iz Centra za socijalni rad čija je osnovna uloga i cilj u čitavom procesu – podrška i zaštita interesa deteta/dece. Nakon obavljenog razgovora sa stručnim licima iz Centra za socijalni rad, isti će sudu proslediti svoje mišljenje i predlog o tome šta je u najboljem interesu deteta, koji roditelj je kompetentniji za samostalno vršenje roditeljskog prava, odnosno koji roditelj je podobniji i ima aktivniju ulogu u adekvatnom vaspitanju i zadovoljenju svih potreba deteta. U postupku pred sudom raspravlja se o pitanjima kome će se poveriti vršenje roditeljskog prava, kakav će biti model viđanja i održavanja odnosa deteta i roditelja sa kojim dete ne živi i koliko će iznositi visina doprinosa za izdržavanje deteta od strane roditelja sa kojim dete neće živeti. 
      Pitanje koliko će trajati postupak pred sudom zavisi najviše od toga oko kojih sve pitanja postoji spor među supružnicima. Postupak se može završiti na prvom ročištu, ali neretke su i situacije kad do ishodovanja pravnosnažne presude prođe i više od godinu dana. Ono što je bitno napomenuti jeste i da ukoliko supružnici ne mogu da se sporazumeju oko podele zajedničke imovine, odluku o tome će svakako doneti sud, ali ne u postupku koji se vodi povodom razvoda braka već u odvojenom postupku. 

      Kako je svaki bračni odnos specifičan, i pitanja koja se mogu pojaviti u postupcima povodom razvoda braka mogu biti različita, manje ili više kompleksna. Odluka o razvodu braka nije laka i prijatna, te i na odluke koje supružnici donose u toku postupka mogu uticati njihove emocije. Ukoliko su Vam potrebni pravni saveti kako da na najadekvatniji način zaštite i ostvarite svoja prava, posavetujte se sa advokatima.
      `,
      image: image8,
    },
  ];

  return (
    <ArticlesContext.Provider value={{ articles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContext;
