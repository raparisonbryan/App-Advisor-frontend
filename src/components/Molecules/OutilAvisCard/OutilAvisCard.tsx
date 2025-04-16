import Rating from "@/components/Molecules/Rating/Rating";
import Button from "@/components/Atoms/Button/Button";
import Img from "@/components/Atoms/Img/Img";
import Elipse from "@/components/Atoms/Elipse/Elipse";
import Card from "@/components/Atoms/Card/Card";
import Separator from "@/components/Atoms/Separator/Separator";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import H3 from "@/components/Atoms/Title/H3/H3";
import {useRouter} from "next/navigation";

interface OutilAvisCardProps {
  image: string;
  nom: string;
  avis: string;
  note: number;
  starSize: number;
  nomUtilisateur: string;
  outilId: string;
}

const OutilAvisCard = (props: OutilAvisCardProps) => {
  const router = useRouter();
  const { image, nom, avis, note, starSize, nomUtilisateur, outilId } = props;

  return (
    <Card>
      <Wrapper padding="20px" width="100%">
        <Img src={image} height={175} width="100%" objectFit="scale-down" />
      </Wrapper>
      <Separator />
      <Wrapper justifyContent="space-between" height="60%" padding="20px" width="100%" gap="20px">
        <Wrapper gap="20px">
          <WrapperRow alignItems="center" justifyContent="space-between">
            <H3>{nom}</H3>
            <Rating note={note} starSize={starSize} />
          </WrapperRow>
          <WrapperRow alignItems="center" justifyContent="space-between">
            <H3 color="#DF6951">{nomUtilisateur}</H3>
            {/* <WrapperRow alignItems="flex-start" gap="5px">
              <FontAwesomeIcon className={styles.icon} icon={faCalendar} />
              <P>8 jours</P>
            </WrapperRow> */}
          </WrapperRow>
          <Elipse>{avis}</Elipse>
        </Wrapper>
        <Button onClick={() => router.push(`/outil/${outilId}`)}>Voir plus</Button>
      </Wrapper>
    </Card>
  );
}

export default OutilAvisCard;