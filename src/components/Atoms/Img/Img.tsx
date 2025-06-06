import Image, {StaticImageData} from "next/image";
import { CSSProperties } from "react";

interface ImgProps {
  src: string | StaticImageData;
  alt?: string;
  height: string | number;
  width: string | number;
  objectFit?: CSSProperties["objectFit"];
}

const Img = (props: ImgProps) => {
  return (
    <div style={{ position: "relative", height: props.height, width: props.width }}>
      <Image fill src={props.src} alt={props.alt ?? "image"} style={{ objectFit: props.objectFit }} />
    </div>
  );
};

export default Img;