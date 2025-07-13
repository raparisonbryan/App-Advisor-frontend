import Btn from "@/components/Atoms/Button/Btn";
import Img from "@/components/Atoms/Img/Img";
import Elipse from "@/components/Atoms/Elipse/Elipse";
import Card from "@/components/Atoms/Card/Card";
import Separator from "@/components/Atoms/Separator/Separator";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import H3 from "@/components/Atoms/Title/H3/H3";

interface OutilCardProps {
    image: string;
    nom: string;
    description?: string;
    onClick?: () => void;
}

const OutilCard = (props: OutilCardProps) => {
    const { image, nom, description, onClick } = props;

    return (
        <Card>
            <Wrapper padding="20px" width="100%">
                <Img src={image} height={175} width="100%" objectFit="scale-down" />
            </Wrapper>
            <Separator />
            <Wrapper justifyContent="space-between" height="60%" padding="20px" gap="20px" width="100%">
                <Wrapper gap="20px">
                    <WrapperRow alignItems="center" justifyContent="space-between">
                        <H3>{nom}</H3>
                    </WrapperRow>
                    <Elipse>{description}</Elipse>
                </Wrapper>
                <Btn onClick={onClick}>Voir plus</Btn>
            </Wrapper>
        </Card>
    );
}

export default OutilCard;