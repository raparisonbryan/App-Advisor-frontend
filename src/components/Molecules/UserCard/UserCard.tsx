import styles from "./UserCard.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Card from "@/components/Atoms/Card/Card";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import H3 from "@/components/Atoms/Title/H3/H3";
import P from "@/components/Atoms/Paragraph/P";

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
            <FontAwesomeIcon className={styles.icon} icon={faStar} />
            <P>{note}/5</P>
          </WrapperRow>
        </WrapperRow>
        <P>{avis}</P>
      </Wrapper>
    </Card>
  );
}

export default UserCard;