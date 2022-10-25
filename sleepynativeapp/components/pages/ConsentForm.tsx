import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IconButton } from "../material/IconButton";
import { PageTemplate } from "../material/PageTemplate";
import Close from "../../assets/close.svg";
import { useNavigation } from "@react-navigation/native";

export function ConsentForm() {
  const navigation = useNavigation();

  const style = StyleSheet.create({
    sectionheading: {
        fontSize: 18,
        textTransform: "uppercase",
        marginVertical: 3
     },
    mainheading: {
        fontSize: 24,
        marginVertical: 10,
        textTransform: "uppercase"
    },
    bodytext: {
        marginVertical: 3
    },
    closeButton: {
        position: "absolute",
        width: "100%",
        top: 0,
        alignItems: "flex-end",
        paddingRight: 10,
        justifyContent: "center",
        paddingTop: 30,
        height: 80
    },
    pagewrapper: {
        padding: 10,
        marginTop: 70
    },
  });

  return (
    <View>
        <View style={style.closeButton}>
          <IconButton onClick={navigation.goBack}>
            <Close />
          </IconButton>
        </View>
      <ScrollView style={style.pagewrapper}>
        <View>
          <Text style={style.sectionheading}>
            Forespørsel om deltakelse i forskningsprosjektet
          </Text>
        </View>
        <View>
          <Text style={style.mainheading}>
            Oppfølging av pasienter med SØVNPROBLEMER via app: EN randomisert
            kontrollert studie
          </Text>
        </View>
        <Text style={style.bodytext}>
          Dette er et spørsmål til deg om å delta i et forskningsprosjekt for å
          undersøke nytten og brukervennligheten av en app («??») for personer
          med søvnproblemer. Til studien ønsker vi å rekruttere personer med
          kroniske søvnproblemer. Institutt for samfunnsmedisin og sykepleie ved
          Norges Teknisk-Naturvitenskapelige Universitet (NTNU) er ansvarlig for
          studien.
        </Text>
        <View>
          <Text style={style.sectionheading}>Hva innebærer PROSJEKTET?</Text>
        </View>
        <Text style={style.bodytext}>
          Vi vil be deg fylle inn et spørreskjema der vi innhenter opplysninger
          om din bakgrunn og helsetilstand – dette tar ca. 20 min. Etter at du
          har fylt inn spørreskjemaet vil du ved tilfeldig trekning bli fordelt
          til en kontrollgruppe eller en forsøksgruppe. Hvis du fordeles til
          kontrollgruppen vil du ikke få noe videre oppfølging fra oss og du vil
          ikke få tilgang til å bruke appen (se beskrivelse nedenfor). Deltakere
          i både forsøksgruppen og kontrollgruppen vil bli bedt om å svare på et
          spørreskjema etter 6 uker, 3, 6 og 9 måneder. Dette tar 15-25 min hver
          gang.{" "}
        </Text>
        <Text style={style.bodytext}>
          Hvis du fordeles til forsøksgruppen vil vi be deg om å bruke «??»
          appen i inntil 9 måneder. Appen vil gi deg råd om hvordan du bør
          håndtere søvnproblemene dine. Noen av rådene er basert på de
          opplysningene du oppgir i spørreskjemaet på starten av studien. I
          tillegg vil du via appen få ukentlige spørsmål om hvordan det går med
          plagene dine – dette tar ca. 2-3 min per uke. Du kan også bli invitert
          til et intervju der vi spør mer detaljert om hvordan du har brukt
          appen og hva som fungerte bra/mindre bra. Deltakelse i intervjuet er
          frivillig – dette kan gjennomføres på telefon.
        </Text>
        <Text style={style.bodytext}>
          I prosjektet vil vi innhente og registrere opplysninger om deg. Dette
          gjelder din e-post adresse og ditt telefonnummer – dette trenger vi
          får å kunne gi deg tilgang til de elektroniske spørreskjemaene som
          brukes i studien og for å kunne kontakte deg underveis i studien. I
          spørreskjemaene spør vi om helsemessige forhold som kan ha betydning
          for søvnproblemene dine.{" "}
        </Text>
        <View>
          <Text style={style.sectionheading}>Mulige fordeler og ulemper</Text>
        </View>
        <Text style={style.bodytext}>
          Hvis du fordeles til forsøksgruppen vil du få råd via appen om hvordan
          du bør håndtere søvnproblemene dine. Behandlingen består blant annet
          av informasjon om søvnproblemer, utfylling av søvndagbok, vaneendring
          og stimuluskontroll, søvnrestriksjon, og diverse mentale strategier.
          Uansett om du fordeles til forsøksgruppen eller kontrollgruppen vil du
          være med på å gi et viktig bidrag til utviklingen et nytt verktøy som
          kan være til stor hjelp for mange personer med søvnproblemer.
        </Text>
        <Text style={style.bodytext}>
          Det er ingen kjent risiko med deltakelse i studien, men
          søvnrestriksjon kan for enkelte være krevende i starten av
          behandlingen. Hvis du har spørsmål underveis i studien har du mulighet
          for å kontakte oss på telefon eller via e-post. Deltakelse i studien
          vil ikke ha noen innvirkning eller konsekvens for annen behandling du
          mottar.
        </Text>
        <View>
          <Text style={style.sectionheading}>
            Frivillig deltakelse og mulighet for å trekke sitt samtykke
          </Text>
        </View>
        <Text style={style.bodytext}>
          Det er frivillig å delta i prosjektet. Dersom du ønsker å delta,
          samtykker du ved registrering. Du kan når som helst og uten å oppgi
          noen grunn trekke ditt samtykke. Dette vil ikke få konsekvenser for
          din videre behandling (dvs. hvis du mottar behandling underveis i
          studien). Dersom du trekker deg fra prosjektet, kan du kreve å få
          slettet innsamlede opplysninger, med mindre opplysningene allerede er
          inngått i analyser eller brukt i vitenskapelige publikasjoner.
        </Text>
        <View>
          <Text style={style.sectionheading}>
            Hva skjer med opplysningene om deg?
          </Text>
        </View>
        <Text style={style.bodytext}>
          Informasjonen som registreres om deg skal kun brukes slik som
          beskrevet i hensikten med studien. Du har rett til innsyn i hvilke
          opplysninger som er registrert om deg og rett til å få korrigert
          eventuelle feil i de opplysningene som er registrert.
        </Text>
        <Text style={style.bodytext}>
          Alle opplysningene vil bli behandlet uten navn og fødselsnummer eller
          andre direkte gjenkjennende opplysninger. En kode knytter deg til dine
          opplysninger gjennom en navneliste.
        </Text>
        <Text style={style.bodytext}>
          Prosjektleder har ansvar for den daglige driften av
          forskningsprosjektet og at opplysninger om deg blir behandlet på en
          sikker måte. Informasjon om deg vil bli anonymisert etter
          prosjektslutt. Anonymiserte data vil lagres i inntil 30 år for å kunne
          brukes i videre forskning. Dataene som samles i prosjektet kan bidra
          til å utvikle en datamodell som i fremtiden kan inngå i en mulig
          kommersiell versjon av appen.
        </Text>
        <View>
          <Text style={style.sectionheading}>Forsikring </Text>
        </View>
        <Text style={style.bodytext}>
          Deltakelse i studien innebærer ingen kjent risiko for skade. Det er
          ikke tegnet egen forsikring for prosjektet, men NTNU har et generelt
          erstatningsansvar for denne type prosjekter hvis skade skulle oppstå.
        </Text>
        <View>
          <Text style={style.sectionheading}>Økonomi</Text>
        </View>
        <Text style={style.bodytext}>
          Alle som deltar i studien er med trekningen av en iPad (verdi ca. kr
          3000,- per stk). Utover dette vil du ikke motta noen godtgjørelse for
          deltakelse i studien.
        </Text>
        <View>
          <Text style={style.sectionheading}>Godkjenning</Text>
        </View>
        <Text style={style.bodytext}>
          Regional komité for medisinsk og helsefaglig forskningsetikk har
          vurdert prosjektet, og har gitt forhåndsgodkjenning (REK ###).
        </Text>
        <Text style={style.bodytext}>
          Etter ny personopplysningslov har dataansvarlig NTNU og prosjektleder
          Eivind Schjelderup Skarpsno et selvstendig ansvar for å sikre at
          behandlingen av dine opplysninger har et lovlig grunnlag. Dette
          prosjektet har rettslig grunnlag i EUs personvernforordning artikkel
          6a og artikkel 9 nr. 2 og ditt samtykke.
        </Text>
        <Text style={style.bodytext}>
          Du har rett til å klage på behandlingen av dine opplysninger til
          Datatilsynet.
        </Text>
        <View>
          <Text style={style.sectionheading}>kONTAKTOPPLYSNINGER</Text>
        </View>
        <Text style={style.bodytext}>
          Dersom du har spørsmål til prosjektet kan du ta kontakt med
          prosjektleder Eivind Schjelderup Skarpsno, tlf 97521297,
          eivind.s.skarpsno@ntnu.no.
        </Text>
        <View style={{height: 100}}/>
      </ScrollView>
      </View>
  );
}
