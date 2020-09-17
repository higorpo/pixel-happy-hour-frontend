import React, { useMemo } from 'react';
import './styles.scss';
import Color from 'color';


interface AvatarProps {
    name: string;
    color: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
    return (
        <>
            <div
                data-tip={props.name}
                className="avatar"
                style={{
                    backgroundColor: props.color,
                    color: Color(props.color).isDark() ? "white" : "black"
                }}>
                <span>{props.name.replace(/[^A-Z]/g, "") || props.name[0]}</span>
            </div>
        </>
    );
}

export default Avatar;