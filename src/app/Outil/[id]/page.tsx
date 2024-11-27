'use client'

import Rating from '@/components/Molecules/Rating/Rating';
import styles from './page.module.scss';
import Button from '@/components/Atoms/Button/Button';
import Img from '@/components/Atoms/Img/Img';
import Pourcentage from '@/components/Atoms/Pourcentage/Pourcentage';
import UserCard from '@/components/Molecules/UserCard/UserCard';
import Link from 'next/link';
import InputRange from '@/components/Atoms/Input/InputRange';
import Container from '@/components/Atoms/Container/Container';
import Wrapper from '@/components/Atoms/Wrapper/Wrapper';
import H3 from '@/components/Atoms/Title/H3/H3';
import WrapperRow from '@/components/Atoms/Wrapper/WrapperRow';
import H1 from '@/components/Atoms/Title/H1/H1';
import P from '@/components/Atoms/Paragraph/P';
import Elipse from '@/components/Atoms/Elipse/Elipse';
import OutilImg from '@/components/Atoms/Img/OutilImg';
import H2 from '@/components/Atoms/Title/H2/H2';
import TextArea from '@/components/Atoms/Input/TextArea';
import {useState, useEffect, FormEvent} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import InputButton from '@/components/Atoms/Input/InputButton';

interface OutilDetailProps {
  params: {
    id: string;
  };
}

interface Outil {
  name: string;
  description: string;
  imageURL: string;
}

interface Avis {
  message: string;
  user: {
    name: string;
  };
  note: number;
}

const OutilDetail = ({ params: { id } }: OutilDetailProps) => {
  const nbAvis = 12;
  const categorie = "Développement web";
  const [message, setMessage] = useState('');
  const [difficulty, setDifficulty] = useState(2.5);
  const [performance, setPerformance] = useState(2.5);
  const [flexibility, setFlexibility] = useState(2.5);
  const [note, setNote] = useState(2.5);
  const [outil, setOutil] = useState<Outil | null>(null);
  const [afficherTous, setAfficherTous] = useState(false);
  const [avisList, setAvisList] = useState<Avis[]>([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const chargerOutil = async () => {
      try {
        const reponse = await axios.get(`http://localhost:3000/outils/${id}`);
        setOutil(reponse.data);
      } catch (erreur) {
        console.error("Erreur lors de la récupération de l'outil:", erreur);
      }
    };

    const fetchAvis = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/avis/outil/${id}`);
        setAvisList(response.data.sort(() => 0.5 - Math.random()));
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      }
    };

    fetchAvis();
    chargerOutil();
  }, [id]);

  const avisAffiches = afficherTous ? avisList : avisList.slice(0, 3);

  const handleSliderChange = (name: string, newValue: number) => {
    switch (name) {
      case 'difficulty':
        setDifficulty(newValue);
        break;
      case 'performance':
        setPerformance(newValue);
        break;
      case 'flexibility':
        setFlexibility(newValue);
        break;
      case 'note':
        setNote(newValue);
        break;
      default:
        console.log(`Invalid Slider Name: ${name}`);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    try {
      await axios.post('http://localhost:3000/avis/', {
        outilId: id,
        message,
        difficulte: difficulty,
        performance,
        flexibilite: flexibility,
        note
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Avis soumis avec succès!");
      setMessage('');
      setDifficulty(2.5);
      setPerformance(2.5);
      setFlexibility(2.5);
      setNote(2.5);
    } catch (error: any) {
      console.error("Erreur lors de la soumission de l'avis:", error.response.data);
    }
  };

  return (
    <main className={styles.main}>
      <Container paddingTop="100px" alignItems="center" justifyContent="space-between" height="100vh">
        <Wrapper width="40%" gap="15px">
          <div>
            <H3 color="#DF6951">{categorie}</H3>
            <WrapperRow alignItems="center" gap="10px">
              <H1>{outil?.name}</H1>
              <Rating note={4} starSize={25} />
              <P>({nbAvis} avis)</P>
            </WrapperRow>
          </div>
          <div>
            <Elipse>{outil?.description}</Elipse>
            <Link style={{ textDecoration: "underline" }} href={"#description"}>Voir plus</Link>
          </div>
          <Button text="Donner un avis" link="#avis" />
        </Wrapper>
        <WrapperRow width="50%" height="400px" alignItems="center" justifyContent="center">
          <OutilImg>
            <Img src={outil?.imageURL ?? ''} height="50%" width="100%" objectFit="scale-down" />
          </OutilImg>
        </WrapperRow>
      </Container>

      <Container id="description" alignItems="center" justifyContent="space-between">
        <Wrapper width="40%" gap="15px">
          <H2>Description</H2>
          <P>{outil?.description}</P>
          <Button text="Classement" link="/Statistiques" />
        </Wrapper>
        <WrapperRow width="40%" alignItems="center" justifyContent="space-between">
          <Wrapper justifyContent="center" alignItems="center" gap="10px">
            <Pourcentage percentage={80} colorStart="#FF4098" colorEnd="#FFB47D" />
            <P>Difficulté</P>
          </Wrapper>
          <Wrapper justifyContent="center" alignItems="center" gap="10px">
            <Pourcentage percentage={60} colorStart="#10E7FF" colorEnd="#8437FF" />
            <P>Performance</P>
          </Wrapper>
          <Wrapper justifyContent="center" alignItems="center" gap="10px">
            <Pourcentage percentage={40} colorStart="#D820F9" colorEnd="#7202FF" />
            <P>Flexibilité</P>
          </Wrapper>
        </WrapperRow>
      </Container>

      <Container id="avis" justifyContent="center" paddingTop="100px">
        <div className={styles.form_wrapper}>
          <H2>Donner un avis</H2>
          {token ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Wrapper width="100%" gap="20px">
                <TextArea message={message} placeholder="message" onChange={(e) => setMessage(e.target.value)} />
                <WrapperRow justifyContent="space-between" gap="20px">
                  <Wrapper width="50%" gap="20px">
                    <Wrapper width="100%" gap="10px">
                      <InputRange label="Difficulté" id="difficulty" value={difficulty} onChange={(e) => handleSliderChange('difficulty', parseFloat(e.target.value))} />
                    </Wrapper>
                    <Wrapper width="100%" gap="10px">
                      <InputRange label="Performance" id="performance" value={performance} onChange={(e) => handleSliderChange('performance', parseFloat(e.target.value))} />
                    </Wrapper>
                    <Wrapper width="100%" gap="10px">
                      <InputRange label="Flexibilité" id="flexibility" value={flexibility} onChange={(e) => handleSliderChange('flexibility', parseFloat(e.target.value))} />
                    </Wrapper>
                  </Wrapper>
                  <Wrapper width="30%" gap="20px" alignItems="center" justifyContent="center">
                    <H3 color="#DF6951">Note globale</H3>
                    <Wrapper width="100%" gap="10px">
                      <InputRange label="Note" id="note" value={note} onChange={(e) => handleSliderChange('note', parseFloat(e.target.value))} />
                    </Wrapper>
                    <InputButton text="Valider" />
                  </Wrapper>
                </WrapperRow>
              </Wrapper>
            </form>
          ) : (
            <P>Vous devez être connecté pour donner un avis</P>
          )}
        </div>
      </Container>

      <Container flexDirection="column" alignItems="center" paddingTop="100px" gap="50px">
        <H2>Avis</H2>
        <WrapperRow justifyContent="center" wrap="wrap" gap="20px">
          {avisAffiches.map((avis, index) => (
            <UserCard
              key={index}
              avis={avis.message}
              nomUtilisateur={avis.user.name}
              note={avis.note}
            />
          ))}
        </WrapperRow>
        {!afficherTous && avisList.length > 3 && (
          <button className={styles.button} onClick={() => setAfficherTous(true)}>Voir plus</button>
        )}
      </Container>
    </main>
  );
}

export default OutilDetail;