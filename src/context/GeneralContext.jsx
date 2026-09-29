import React from "react";
import davor from "../assets/images/davor-maric.webp";
import milan from "../assets/images/milan-nedic.webp";
import dijana from "../assets/images/dijana-biro.webp";
import logoDavor from "../assets/images/logo-davor-maric.webp";
import logoMilan from "../assets/images/logo-milan-nedic.webp";
import logoDijana from "../assets/images/logo-dijana-biro.webp";
import greekInterior from "../assets/images/greek-interior.webp";
import ladyJustice from "../assets/images/lady-justice.webp";
import library from "../assets/images/library.webp";
import skupstina from "../assets/images/skupstina.webp";
// Icons Import
import contract from "../assets/images/contract.svg";
import damage from "../assets/images/damage.svg";
import work from "../assets/images/work.svg";
import economy from "../assets/images/economy.svg";
import pedestrian from "../assets/images/pedestrian.svg";
import criminal from "../assets/images/criminal.svg";
import administrative from "../assets/images/administrative.svg";
import search from "../assets/images/search.svg";
import cadastre from "../assets/images/cadastre.svg";
import megaphone from "../assets/images/megaphone.svg";
import other from "../assets/images/message-text.svg";

const GeneralContext = React.createContext();

export const GeneralProvider = ({ children }) => {
  const ourTeam = [
    {
      title: "Advokat",
      name: "Davor Marić",
      logo: logoDavor,
      img: davor,
      desc: `Advokat Davor Marić je rođen 1989. godine u Sarajevu. Nakon završene Gimnazije „Jovan Jovanović Zmaj“ u Novom Sadu upisuje Pravni Fakultet Univerziteta u Novom Sadu 2008. Godine – smer opšti, na kojem i diplomira 08.02.2013. godine.
      Pripravničku vežbu je obavljao u u advokatskoj kancelariji od 2013. godine do 2016. godine
      Zvanje Master pravnika stiče 2014. godine nakon što je odbranio završni master rad na temu „Pozitivne obaveze država u pogledu zaštite prava na život“ na Pravnom fakultetu Univerziteta u  Novom Sadu.
      Pravosudni ispit je položio 2016. godine. 
      Advokatski ispit je položio 2016. godine.
      Od 14.02.2017. godine je upisan u imenik advokata i član je Advokatske komore Vojvodine.
      Poseduje sertifikate za odbranu maloletnih učinilaca krivičnih dela i zastupanje maloletnih oštećenih lica, sertifikat za zastupanje klijenata u medijaciji, sertifikat o završenoj obuci pravna zaštita od nasilja u porodici.
      Pored maternjeg srpskog jezika govori još i engleski jezik, a služi se ruskim jezikom.
      `,
      email: "adv.davormaric@gmail.com",
      phone: "381637457275",
    },
    {
      title: "Advokat",
      name: "Milan Nedić",
      logo: logoMilan,
      img: milan,
      desc: `Milan Nedić je rođen u Novom Sadu 1988. godine. Nakon završene srednje škole, 2007. godine upisuje Pravni fakultet Univerziteta u Novom Sadu, usmerenje unutrašnji poslovi, čiju diplomu dobija 2011. godine. Tokom izvođenja pripravničke vezbe u Osnovnom sudu u Novom Sadu, bio je zadužen za izradu sudskih odluka u istražnoj, krivičnoj i parničnoj referadi. Polaganjem pravosudnog ispita 2014. godine, počinje sa radom na mestu sekretara Predškolske ustanove "Ljuba Stanković" u Beočinu. U Imeniku advokata Advokatske komore Vojvodine se nalazi od 2015. godine.
      Poseduje sertifikat za odbranu maloletnih učinioca krivičnih dela i zastupanje maloletnih lica kao oštećenih krivičnim delom.`,
      email: "nedicmilan9@gmail.com",
      phone: "381642311738",
    },
    {
      title: "Advokat",
      name: "Dijana Biro",
      logo: logoDijana,
      img: dijana,
      desc: `Advokat Dijana Biro rođena je 1991. godine u Kikindi. Nakon završetka gimnazije „Dušan Vasiljev“ u Kikindi, upisuje Pravni fakultet za privredu i pravosuđe u Novom Sadu, na kom je i diplomirala 2014. godine. Tokom studiranja učestvovala je na takmičenju u besedništvu, i uspešno završila kurseve sa temama „Imovinski odnosi bračnih i vanbračnih partnera“ i „Metodologija izrade presude u parničnom postupku“. Po završetku studija, pripravničku vežbu obavlja u Višem sudu u Novom Sadu, radeći u svojstvu sudijskog pripravnika na prvostepenom krivičnom i  prvostepenom parničnom odeljenju, drugostepenom parničnom odeljenju, kao i na odeljenju za maloletnike. Pravosudni ispit polaže 2018. godine, a advokatski ispit 2019. godine, koje godine i osniva  svoju advokatsku kancelariju. Dijana Biro poseduje sertifikat za odbranu maloletnih učinilaca krivičnih dela i zastupanje maloletnih lica oštećenih krivičnim delima.`,
      email: "adv.birodijana@gmail.com",
      phone: "38163650603",
    },
  ];
  const interns = [];
  const latinSayings = [
    {
      latin: "Alteri stipulari nemo potest",
      translate: "Niko ne može svojom izjave volje obavezati drugog",
    },
    {
      latin: "Ambulatoria est voluntas defuncti usque ad vitae supremum exitum",
      translate: "Volja ostavioca je promenljiva do zadnjeg časa života",
    },
    {
      latin: "Causa est origo et materia negotii",
      translate: "Causa je izvor i sadržaj pravnog posla",
    },
    {
      latin: "Contractus contrahentibus lex esto",
      translate: "Ugovor neka bude stranama zakon",
    },
    {
      latin: "Pacta sunt servanda",
      translate: "Ugovor neka bude stranama zakon",
    },
    {
      latin: "Culpa lata dolo aequiparatur",
      translate: "Teški nehat izjednačava se sa namerom",
    },
    {
      latin: "Dicat testator et erit lex",
      translate: "Što odredi ostavilac postaće zakon",
    },
    {
      latin: "Dies interpelat pro homine",
      translate: "Rok opominje umesto čoveka",
    },
    {
      latin: "Errantis consensus nullus est",
      translate: "Ništava je saglasnost lica koje je u zabludi",
    },
    {
      latin: "Ex nudo pacto non nascitus obligation",
      translate: "Iz proste saglasnosti volja ne nastaje obligacija",
    },
    {
      latin: "Falsa demonstration non nocet",
      translate: "Netačan opis ne škodi",
    },
  ];
  const values = [
    {
      type: "Nezavisno",
      desc: "u skladu sa svojim uverenjima, zasnovanim na pozitivnom pravu, pravnoj nauci i praksi, međunarodnim pravnim standardima, statutu i Kodeksu",
      img: skupstina,
    },
    {
      type: "Stručno ",
      desc: "sa znanjem za koje smo stekli kvalifikacije i sa višegodišnjim iskustvom u pravosuđu i drugim granama prava",
      img: library,
    },
    {
      type: "Savesno",
      desc: "pri čemu vodimo računa da zastupanje bude brižljivo, marljivo, odlučno i blagovremeno. Bez odlaganja ukazujemo na sve povrede prava i druga kršenja zakona na štetu klijenata. Interese klijenata stavljamo ispred sopstvenih interesa, interesa drugih učesnika u postupku i trećih lica.",
      img: greekInterior,
    },
    {
      type: "Objektivno i odgovorno",
      desc: "gde u svakom pojedinačnom predmetu klijenta obavestimo potpuno, otvoreno i iskreno o pravnoj oceni slučaja, proceni izgleda za uspeh i izvršavanju ili neizvršavanju svojih obaveza",
      img: ladyJustice,
    },
  ];
  const fieldsOfWork = [
    {
      title: "Ugovorno pravo",
      desc: "Konsultacije, proučavanje i izrada svih vrsta ugovora: ugovor o kupoprodaji nepokretnosti  (stana, kuće, pracele), ugovor o kupoprodaji pokretnih stvari, ugovor o doživotnom izdržavanju, ugovor o zakupu, ugovor o poklonu, ugovor o zajmu itd, sačinjavanje svih vrsta izjava i specijalnih punomoći, postupak pred javnim beležnikom",
      icon: contract,
    },
    {
      title: "Naknada štete",
      desc: "Zastupanje u svim postupcima naknade materijalne i nematerijalne štete prilkom saobraćajne nezgode, povrede nastale na javnoj površini, povrede nastale od strane životinja, povrede časti i ugleda, povreda na radu, zbog neispunjenja ugovornih obaveza, zbog izgubljene dobiti, neisplaćene zarade, umanjenje imovine, zastupanje pred sudom i pred osiguravajućim društvima.",
      icon: damage,
    },
    {
      title: "Radno pravo",
      desc: "Konsultacije, proučavanje i analiza spornih radnopravnih situacija, izrada opštih i pojedinačnih radnopravnih akata, i zastupanje u sudskim postupcima. Ostvarivanje prava zaposlenih u slučaju nezakonitog prestanka radnog odnosa, naplata potraživanja po osnovu rada, naknada štete prouzrokovane u toku rada.",
      icon: work,
    },
    {
      title: "Postupak pred APR - Privredno pravo",
      desc: "Osnivanje i registracija preduzetnika i pravnih lica, promena pravne forme privrednog društva i rešavanje statusnih pitanja, izrada opštih i posebnih pravnih akata, postupak registracije i zaštite patenta, zastupanje u privrednim sporovima, privrednim prestupima i stečajnim postupcima i likvidaciji.",
      icon: economy,
    },
    {
      title: "Stvarno i građansko pravo",
      desc: `Zastupamo klijenate u parničnim, vanparničnim i drugim postupcima gde prilikom konsultacija dajemo procenu mogućnosti uspeha u postupku. Konsultacije i zastupanje u predmetima iz porodičnog prava, u postupcima razvoda braka, poveravanje maloletne dece roditeljima, alimentacija, podela zajedničke imovine, kao i u postupcima iz naslednog prava, sastavljanje zaveštanja, ugovora o doživotnom izdržavanju, pokretanje ostavinskog postupka, zastupanje u ostavinskom postupku. Konsultacije I zastupanje u postupcima proglašenja nestalog lica za umrlo, lišenje poslovne sposobnosti.`,
      icon: pedestrian,
    },
    {
      title: "Krivično i prekršajno pravo",
      desc: "Odbrana punoletnih i maloletnih okrivljenih u krivičnom postupku i prekršajnom postupku, zastupanje oštećenih punoletnih i maloletnih lica u krivičnom postupku",
      icon: criminal,
    },
    {
      title: "Upravno pravo",
      desc: "Pružamo pravnu pomoć zastupanja i savetovanja u pravnim stvarima u postupcima pred svim organima uprave kao što su Poreska uprava, Uprave carina i drugih republičkih, pokrajinskih ili lokalnih organa uprave.",
      icon: administrative,
    },
    {
      title: "Postupak naplate potraživanja",
      desc: "Konsultacije i vođenje postupka prinudne naplate potraživanja na osnovu verodostojne i izvršne isprave pred javnim izvršiteljima.",
      icon: search,
    },
    {
      title: "Postupak pred Katastrom",
      desc: "Uknjizba, provera imovine, promena podataka u listovima nepokretnosti pred RGZ",
      icon: cadastre,
    },
    {
      title: "Zastupanje u javnim prodajama",
      desc: "Zastupanje klijenata na javnim prodajama, licitacijama u kojim se kupuju nepokretnosti, pokretnosti",
      icon: megaphone,
    },
    {
      title: "Ostalo",
      desc: "Konsultacije, proučavanje, izrada, vođenje postupka u svim ostalim pravnim stvarima",
      icon: other,
    },
  ];

  return (
    <GeneralContext.Provider
      value={{ ourTeam, latinSayings, values, fieldsOfWork, interns }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
