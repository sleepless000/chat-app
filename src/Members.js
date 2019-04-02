import React from 'react';
import { useCollection } from './hooks/useCollection';

function Members({ channelId }) {
  const members = useCollection('users', undefined, [
    `channels.${channelId}`,
    '==',
    true
  ]);
  console.log(members);
  return (
    <div className="Members">
      <div>
        {members &&
          members.map(member => (
            <div className="Member" key={member.uid}>
              <div className="MemberStatus offline" />
              {member.displayName}
            </div>
          ))}
        <div className="Member">
          <div className="MemberStatus online" />
          cleverbot
        </div>
      </div>
    </div>
  );
}

export default Members;
