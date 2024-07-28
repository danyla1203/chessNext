import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
} from '@nextui-org/react';
import { Profile } from '@/context/UserContext';
import { RestructedGameResult } from '../game/types';
import { GameResultPlayers } from './GameResultPlayers';

export function GamesTable({ profile }: { profile: Profile }) {
  const renderCells = (game: RestructedGameResult, columnKey: string) => {
    const cellValue = game[columnKey];
    switch (columnKey) {
      case 'result':
        if (cellValue.winner) {
          return (
            <GameResultPlayers
              winner={cellValue.winner}
              looser={cellValue.looser}
              profile={profile}
            />
          );
        }
        return <div className="flex justify-center">Draw</div>;
      case 'cnf':
        return (
          <Chip>
            {game.cnf.time}-{game.cnf.inc}
          </Chip>
        );
      default:
        return cellValue;
    }
  };
  return (
    <Table topContent={<h1>Games</h1>}>
      <TableHeader className="border-0">
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="cnf">Max time - Time increment</TableColumn>
        <TableColumn key="sidepick">Side picking</TableColumn>
        <TableColumn className="flex justify-center items-center" key="result">
          Winner - Looser
        </TableColumn>
      </TableHeader>
      <TableBody items={profile.games} emptyContent={'No games played.'}>
        {(item: RestructedGameResult) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{renderCells(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
