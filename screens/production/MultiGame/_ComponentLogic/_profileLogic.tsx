import React, { RefObject } from "react"
import Profile from "../../../../components/Profile"
import expressions, { SupportedExpression } from "../../../../components/Profile/Expressions"
import useMultiGameSocket from "../../../../hooks/useMultiGameSocket"
import usePlayData from "../../../../hooks/usePlayData"

type MultiGameProfileLogicParams = {
  playerProfileRef: RefObject<Profile>;
  opponentProfileRef: RefObject<Profile>;
  socket: ReturnType<typeof useMultiGameSocket>;
  playData: ReturnType<typeof usePlayData>;
}

const multiGameProfileLogic = (param: MultiGameProfileLogicParams) => {
  const {opponentProfileRef, playerProfileRef, socket, playData} = param;
  const { players, roomId } = socket.getRoomData();
  const player = players.find((player) => player.id === playData.user.id);
  const opponent = players.find((player) => player.id !== playData.user.id);

  const PlayerProfile = (
    <Profile
      ref={playerProfileRef}
      photoUri={player?.photo}
      iconColor="dodgerblue"
    />
  )
  
  const OpponentProfile = (
    <Profile
      ref={opponentProfileRef}
      photoUri={opponent?.photo}
      iconColor="black"
    />
  )

  const playerExpress = (expression: SupportedExpression) => {
    playerProfileRef.current?.express(expressions[expression], "topLeft", 40)
  }

  const opponentExpress = (expression: SupportedExpression) => {
    opponentProfileRef.current?.express(expressions[expression], "topLeft", 40)
  }

  const playerProfile = {
    name: player ? player.name : '나',
    photo: PlayerProfile
  }

  const opponentProfile = {
    name: opponent ? opponent.name : '상대',
    photo: OpponentProfile
  }

  return {
    playerExpress,
    opponentExpress,
    playerProfile,
    opponentProfile,
  }
}

export default multiGameProfileLogic