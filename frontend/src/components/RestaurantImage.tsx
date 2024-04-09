"use client"
import Image from "next/image";
import { useState } from "react";

export default function(props:React.ComponentProps<typeof Image>){
    
    const [imgSrc, setImgSrc] = useState(props.src);
    const {src, ...rest} = props;
    return (
        <Image
            {...rest}
            src={imgSrc}
            onError={() => {
                setImgSrc(`/img/pure_logo.jpg`);
            }}
        ></Image>
    )
}