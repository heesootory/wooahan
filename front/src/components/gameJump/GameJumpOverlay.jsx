import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GameStatus } from "util/Enums.ts";
import { useDispatch, useSelector } from "react-redux";
import CommonOverlay from "components/common/CommonOverlay";
import { jumpActions } from "store/features/jump/jumpSlice";
import { Navigate } from "react-router-dom";
import { commonActions } from "store/features/common/commonSlice";
import WarningComponent from "components/common/WarningComponent";
import JumpTutorial from "./JumpTutorial";

const GameJumpOverlay = ({ startGame, ...props }) => {
  const gameStatus = useSelector((state) => state.jump.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameStatus === GameStatus.GAME_START) {
      dispatch(jumpActions.setAction(0));
    }
  }, [gameStatus, dispatch]);

  return (() => {
    switch (gameStatus) {
      case GameStatus.GAME_READY:
        return (
          <CommonOverlay type={"blue_overlay"}>
            <GameReadyContainer startGame={startGame} />
          </CommonOverlay>
        );

      case GameStatus.GAME_START:
        return <GameStartContainer startGame={startGame} />;

      case GameStatus.GAME_END:
        return <CommonOverlay></CommonOverlay>;

      default:
        return <div></div>;
    }
  })();
};

const GameStartContainer = () => {
  const warning = useSelector((state) => state.common.warning);
  const dispatch = useDispatch();
  const warn = () => {
    dispatch(commonActions.setWarning());
  };
  return (
    <CommonOverlay type="parent">
      <div className={`absolute flex flex-col justify-between h-full w-full`}>
        <div>
          <div
            onClick={() => {
              warn();
            }}
            className={`absolute ${
              window.innerWidth / window.innerHeight > 1
                ? "h-[7vh] w-[7vh] right-[3vh] top-[3vh] text-[5vh]"
                : "h-[7vw] w-[7vw] right-[3vw] top-[3vw] text-[5vw]"
            } rounded-lg bg-white bg-opacity-40 font-MaplestoryLight flex justify-center`}
          >
            <p>X</p>
          </div>
        </div>
        {warning && <WarningComponent />}
      </div>
    </CommonOverlay>
  );
};

const GameReadyContainer = ({ startGame, ...props }) => {
  const [isTutorial, setIstutorial] = useState(true);
  const closeTutorial = () => {
    setIstutorial(false);
  };
  return (
    <>
      {isTutorial && <JumpTutorial closeTutorial={closeTutorial} />}
      <div className={`absolute flex flex-col h-full w-full`}>
        <h2 className={`text-center font-MaplestoryLight mt-8 text-4xl`}>
          펭글이가 무사히 유치원에
          <br />
          도착할 수 있도록 도와주세요!
        </h2>
        {/* </div> */}
        <div
          className={`w-2/4 p-4 m-8 mx-auto`}
          onClick={() => {
            startGame();
          }}
        >
          <h1
            className={`text-6xl text-center font-MaplestoryBold text-mainBlack-600`}
            style={{
              textShadow: `2px 0 #FFFF00, -2px 0 #FFFF00, 0 2px #FFFF00, 0 -2px #FFFF00`,
            }}
          >
            시 작 !
          </h1>
        </div>
      </div>
    </>
  );
};

GameJumpOverlay.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default GameJumpOverlay;
