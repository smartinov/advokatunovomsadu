import { LAW, SERVICES, SOURCES, VERIFIED_ON, notaryFee, readQuery, toParams } from "../beleznik";
import { rsd } from "../calc";
import { Sources } from "../components/CalcParts";
import { href } from "../components/Layout";
import { FeeCalculator } from "./AprFee";

const example = (service, value, counts) => notaryFee({ service, value, counts }).total;
const label = (id) => SERVICES.find((s) => s.id === id).label;

export function NotaryFee() {
  return (
    <FeeCalculator
      label="Javnobeležnička tarifa"
      title="Kalkulator troškova javnog beležnika"
      lede="Koliko košta notar: nagrada javnog beležnika za solemnizaciju ugovora o kupoprodaji, overu potpisa i prepisa, punomoćje i testament, sa materijalnim troškovima i PDV-om."
      resultLabel="Trošak javnog beležnika"
      services={SERVICES}
      fee={notaryFee}
      readQuery={readQuery}
      toParams={toParams}
      valueLabel="Vrednost ugovora (RSD)"
      initialValue="10.000.000"
      examples={[
        ...[3_000_000, 6_000_000, 10_000_000, 20_000_000].map((v) => [
          `Solemnizacija ugovora, vrednost ${rsd(v)} RSD`,
          example("solemnizacija", v),
        ]),
        [`Javnobeležnički zapis ugovora, vrednost ${rsd(10_000_000)} RSD`, example("zapis", 10_000_000)],
        [`${label("potpis")}, jedan primerak`, example("potpis")],
        [label("potpis-zastupnik"), example("potpis-zastupnik")],
        ["Overa prepisa isprave od pet stranica", example("prepis", undefined, { stranice: 5 })],
        [label("punomocje"), example("punomocje")],
        [label("testament"), example("testament")],
      ]}
      notes={
        <>
          <li>
            Bod iznosi 180 dinara bez PDV-a (član 10). Javni beležnici obračunavaju PDV 20%, pa ga kalkulator dodaje na
            nagradu i materijalne troškove. Sporazum o drugačijoj nagradi je ništav (član 11).
          </li>
          <li>
            Osnovica je stvarna tržišna vrednost, bez odbijanja dugova, i javni beležnik je može odrediti i drugačije od
            cene iz ugovora (član 5). Za tačno 10.000.000 dinara tarifa navodi dva razreda; računamo niži, 240 bodova.
          </li>
          <li>
            Kalkulator ne računa ugovore za koje Tarifni broj 1 propisuje 50% nagrade (predugovor, raskid, poklon roditelja
            detetu, lična službenost), ni hipoteku, kod koje je osnovica obezbeđeno potraživanje.
          </li>
          <li>
            Overa potpisa računa se za jednog potpisnika. Za testament materijalni troškovi nisu uračunati.
          </li>
          <li>
            Posebno se plaćaju treća i svaka sledeća stranka, svedok ili tumač i rad van kancelarije ili radnog vremena
            (Tarifni broj 18), kao i <a href={href("/porez-na-prenos-i-nasledje/")}>porez na prenos</a> i{" "}
            <a href={href("/katastar-takse/")}>taksa za upis u katastar</a>.
          </li>
        </>
      }
      sources={
        <Sources
          law={LAW}
          basis="članovi 5, 10 i 14, tarifni brojevi 1, 3, 4, 8, 9 i 10"
          verifiedOn={VERIFIED_ON}
          sources={SOURCES}
        >
          iznos za ostavinski postupak određuje se po posebnoj tarifi i ovde nije obuhvaćen.
        </Sources>
      }
    />
  );
}
