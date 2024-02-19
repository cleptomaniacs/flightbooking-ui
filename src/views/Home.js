import React, { useState } from "react";
import { Guideline } from "./Guideline";
import { BookFlight } from "./BookFlight";

const Home = () => {
  const [isGuideline, setIsGuideline] = useState(true);
  const onSetIsGuideline = () => setIsGuideline(false);
  return isGuideline ? (
    <Guideline onSetIsGuideline={onSetIsGuideline} />
  ) : (
    <BookFlight />
  );
};

export default Home;
