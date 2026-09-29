import { LAW, SERVICES, SOURCES, VERIFIED_ON, cadastreFee, readQuery, toParams } from "../katastar";
import { Sources } from "../components/CalcParts";
import { FeeCalculator } from "./AprFee";

export function CadastreFee() {
  return (
    <FeeCalculator
      label="Katastar"
      title="Kalkulator taksi za katastar"
      lede="Republičke administrativne takse za upis svojine, hipoteke i zabeležbe u katastar nepokretnosti i za list nepokretnosti, kopiju plana i uverenja."
      resultLabel="Taksa za katastar"
      services={SERVICES}
      fee={cadastreFee}
      readQuery={readQuery}
      toParams={toParams}
      valueLabel="Iznos potraživanja koje obezbeđuje hipoteka (RSD)"
      notes={
        <>
          <li>
            Taksu za zahtev od 430 dinara prikazujemo posebno, jer je RGZ po svojoj praksi naplaćuje
            uz taksu za upis.
          </li>
          <li>
            Taksa za upis svojine ne zavisi od vrednosti nepokretnosti ni od toga da li je u pitanju stan, kuća ili
            zemljište, već od broja isprava.
          </li>
          <li>
            Hipoteka na više nepokretnosti kojom se obezbeđuje jedno potraživanje plaća se kao jedna hipoteka. Potraživanje
            u stranoj valuti preračunava se po srednjem kursu NBS na dan podnošenja zahteva.
          </li>
          <li>Predbeležba se plaća kao upis odgovarajućeg prava. Taksa za upis svojine ne plaća se za upis na osnovu
            rešenja o nasleđivanju.</li>
          <li>Nagrada advokata i troškovi javnog beležnika nisu uračunati.</li>
        </>
      }
      sources={
        <Sources law={LAW} basis="tarifni brojevi 1 i 215b" verifiedOn={VERIFIED_ON} sources={SOURCES}>
          iznosi se usklađuju jednom godišnje.
        </Sources>
      }
    />
  );
}
