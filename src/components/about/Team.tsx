import React from 'react';

interface TeamMember {
    imgSrc: string;
    imgAlt: string;
    name: string;
    role: string;
}

interface TeamProps {
    team: TeamMember[];
}

export default function Team(props: TeamProps) {
    return (
        <div className="team-section">
            <h2>Meet Our Team</h2>
            <p>Our talented team is working hard to bring you the best experience.</p>

            <div className="team-member-container">
                {props.team.map((member: any, index: number) => (
                    <div key={index} className="team-member">
                        <img src={member.imgSrc} alt={member.imgAlt} />
                        <h4>{member.name}</h4>
                        <div>{member.role}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}