/* eslint-disable jsx-a11y/alt-text */
import { ComponentProps } from "react";
import crypto from "crypto";
import Image, { ImageProps } from "next/image";

type GravatarAvatarProps = Omit<ImageProps, "src"> & { 
    email: string,
    includeWatermark?: boolean,

    // Here because NextJS requires them but is marked as optional in the type
    width: number,
    height: number
}

export default function GravatarAvatar(props: GravatarAvatarProps) {
    // Gravatar uses MD5 hashes of a trimmed, all lowercased email address
    const correctFormat = props.email.trim().toLowerCase();
    const hash = crypto.createHash("md5").update(correctFormat).digest("hex");

    return props.includeWatermark ? (
        <div className="relative">
            <Image {...props} src={`https://www.gravatar.com/avatar/${hash}?s=${props.width}`} />
            <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-30 rounded-b-lg">
                <span className="text-xs text-white whitespace-nowrap">Gravatar Integrated</span>
            </div>
        </div>
    ) : (
        <Image {...props} src={`https://www.gravatar.com/avatar/${hash}?s=${props.width}`} />
    )
}