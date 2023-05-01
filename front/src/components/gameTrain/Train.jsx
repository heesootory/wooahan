import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import TrainLastWord from "./TrainLastWord";
import TrainWordCard from "./TrainWordCard";
import jar from "assets/images/tmp/무공해항아리.avif";
import pig from "assets/images/tmp/넷째돼지.png";
import TrainEnd from "./TrainEnd";

export const Train = (props) => {
  const data = [
    {
      last: "지",
      word1: { word: "돼지", img: pig },
      word2: { word: "항아리", img: jar },
      ans: "돼지",
    },
    {
      last: "비",
      word1: { word: "나방", img: pig },
      word2: { word: "나비", img: jar },
      ans: "나비",
    },
    {
      last: "제",
      word1: { word: "사형제", img: pig },
      word2: { word: "도덕률", img: jar },
      ans: "사형제",
    },
  ];
  const [round, setRound] = useState(0);
  const [end, setEnd] = useState(false);
  const nextGame = () => {
    if (round === 2) {
      setEnd(true);
      return;
    }
    setRound(round + 1);
  };

  return (
    <div className="h-screen">
      <div className=" h-[13rem]"></div>
      {}
      {!end && <TrainLastWord data={data[round].last} />}
      {!end && <TrainWordCard data={data[round]} nextGame={nextGame} />}
      {end && <TrainEnd />}
    </div>
  );
};

Train.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Train);
