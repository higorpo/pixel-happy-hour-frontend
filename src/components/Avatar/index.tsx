import React, { useMemo } from 'react';
import './styles.scss';
import Color from 'color';


interface AvatarProps {
    name: string
}

const Avatar: React.FC<AvatarProps> = (props) => {
    const randomColor = useMemo(() => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }, []);

    return (
        <>
            <div
                data-tip={props.name}
                className="avatar"
                style={{
                    backgroundColor: randomColor,
                    color: Color(randomColor).isDark() ? "white" : "black"
                }}>
                <span>{props.name.replace(/[^A-Z]/g, "")}</span>
            </div>
        </>
    );
}

export default Avatar;