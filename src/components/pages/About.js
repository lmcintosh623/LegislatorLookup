import React from 'react';
import final_explore_prototype from '../../assets/final_explore.png';
import final_home_prototype from '../../assets/final_home.png';

export default function SignUp() {
  return (
    <div>
      {/**/}
      {/*Main Title*/}
      <h1>LegislatorLookup</h1>
      <hr></hr>
      {/*Project Members*/}
      <div>
        <h2> Project Members </h2>
        <h3> Gideon Wolfe </h3>
        <p> wolfeg2@wwu.edu</p>
        <h3> Lukas McIntosh</h3>
        <p> mcintol@wwu.edu</p>
        <h3> Laura Martin</h3>
        <p> marti335@wwu.edu</p>
        <h3> Jacob Nemeth</h3>
        <p> nemethj2@wwu.edu</p>
      </div>
      <hr></hr>
      {/*Description of Project*/}
      <div>
        <h2> Project Description </h2>
        <p>

          {/*What is the problem?*/}
          Disinformation has become a problem facing societies who wish to maintain and improve their democratic political systems. Part of this issue is a lack of factual source material from which people may derive their political opinions, specifically so when it comes to the individual legislators that appear on our ballots. LegislatorLookup primarily aims to support SDG goal number 16, "Peace, Justice, and Strong Institutions".
          <br></br>
          <br></br>
          The problem of voter misinformation has the potential to sway the outcome of previously stable democratic institutions, and should be addressed with utmost urgency. LegislatorLookup targets users of these institutions, particularly within the United States. Millions of these citizens can benefit from gaining access to easily verifiable, factual information regarding legislators in their country or jurisdiction. 
          <br></br>
          <br></br>
          According to the <a href="https://circle.tufts.edu/latest-research/growing-voters-profile-youngest-eligible-voters-2020">CIRCLE intitute at Tufts University</a>, "Systems are not doing enough to reach youth with accessible information to register and vote during the pandemic. One-third (34%) said they did not know if their state has online voter registration. Just 25% have voted by mail before, and more than a quarter said they wouldn't know where to get information about mail-in voting."
          <br></br>
          <br></br>
          Unlike existing solutions, LegislatorLookup aims to provide an easy to use interface for exploring politicians, without the clutter introduced by many services in the form of news bulletins and account registration services. We accomplished this by using querying a pre-existing API for legislator data, and implemented solutions with React JS to manipulate queries and filter results.

        </p>
      </div>
      <hr></hr>
      {/*Research Methodology*/}
      <div>
        <h2> Research Methodology </h2>
          <br></br>
          <br></br>
        In order to develop ideas for our implementation, we analyzed 12 similar systems to establish what works and what we want to omit from our project. The main issue that we found was that solutions were too generalized and information dense (<a href="https://ballotpedia.org/Main_Page">BallotPedia</a>), while others were too narrow in their scope and only focused on individual states (<a href="leg.wa.gov">leg.wa.gov</a>, <a href="oregonlegislature.gov">oregonlegislature.gov</a>) We wanted to show this in our prototype by making it as user friendly as possible.

        {/*TODO Prototype image here*/}
          <br></br>
          <img src={final_home_prototype} style={{width:200,height:150,}} alt="Final Explore Prototype"/>
          <br></br>
          <br></br>

        Each one of our 4 team members conducted an interview where we aksed the participants to rate their own familiarity with the political system and then give feedback on our prototype. Throughout all the interviews, the participants made it clear that their top priorities were unbiased information, and being able to see that information easily clearly. We editied our prototype to remove some features, such as the map, that were of questionable utility to prospective users.

        {/*TODO Prototype image here*/}
        <br></br>
        <img src={final_explore_prototype} style={{width:200,height:150,}} alt="Final Explore Prototype"/>
      </div>
      <hr></hr>
      {/*Final Product*/}
      <div>
        <h2> Final Product </h2>
      </div>
      <hr></hr>
      {/*Video*/}
      <div>
        <h2> Video </h2>
      </div>
      <hr></hr>
      {/*Future Work*/}
      <div>
        <h2> Future Work </h2>
      </div>
      <hr></hr>
    </div>
  );
}
