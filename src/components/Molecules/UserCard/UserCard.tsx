import styles from "./UserCard.module.scss";
import Card from "@/components/Atoms/Card/Card";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import H3 from "@/components/Atoms/Title/H3/H3";
import P from "@/components/Atoms/Paragraph/P";
import StarFull from "@/components/Atoms/stars/StarFull";

interface UserCardProps {
  avis: string;
  note: number;
  nomUtilisateur: string;
}

const UserCard = ({ avis, note, nomUtilisateur }: UserCardProps) => {
  return (
    <Card>
      <Wrapper justifyContent="space-between" padding="20px" gap="10px" width="100%">
        <WrapperRow alignItems="center" gap="10px">
          <H3>{nomUtilisateur}</H3>
          <WrapperRow alignItems="center" gap="5px">
            <StarFull />
            <P>{note}/5</P>
          </WrapperRow>
        </WrapperRow>
        <P>{avis}</P>
      </Wrapper>
    </Card>
  );
}

export default UserCard;