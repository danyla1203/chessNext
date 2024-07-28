import { User } from '@nextui-org/react';
import { Profile } from '../lib/context/UserContext';
import { Player } from '../game/types';

export function GameResultPlayers({
  profile,
  winner,
  looser,
}: {
  profile: Profile;
  winner: Player;
  looser: Player;
}) {
  return (
    <div className="gap-5 flex items-center justify-center">
      <User
        name={winner.userId === profile.userId ? 'You' : winner.name}
        description={winner.name}
      >
        {winner.userId === profile.userId ? 'You' : winner.name}
      </User>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>

      <User
        name={looser.userId === profile.userId ? 'You' : looser.name}
        description={looser.name}
      ></User>
    </div>
  );
}
